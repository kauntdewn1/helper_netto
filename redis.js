const Redis = require('ioredis');
const logger = require('./logger');

// Configuração do cliente Redis
const redisClient = new Redis(process.env.REDIS_URL || 'redis://localhost:6379', {
  retryStrategy: function(times) {
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
  maxRetriesPerRequest: 3
});

// Eventos do Redis
redisClient.on('connect', () => {
  logger.system('redis', 'Connected to Redis');
});

redisClient.on('error', (err) => {
  logger.error('Redis error:', err);
});

redisClient.on('reconnecting', () => {
  logger.system('redis', 'Reconnecting to Redis');
});

// Funções de cache
const cache = {
  // Obter valor do cache
  async get(key) {
    try {
      const value = await redisClient.get(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      logger.error('Cache get error:', error);
      return null;
    }
  },

  // Definir valor no cache
  async set(key, value, ttl = process.env.CACHE_TTL || 3600) {
    try {
      const stringValue = JSON.stringify(value);
      await redisClient.set(key, stringValue, 'EX', ttl);
      return true;
    } catch (error) {
      logger.error('Cache set error:', error);
      return false;
    }
  },

  // Remover valor do cache
  async del(key) {
    try {
      await redisClient.del(key);
      return true;
    } catch (error) {
      logger.error('Cache del error:', error);
      return false;
    }
  },

  // Limpar todo o cache
  async clear() {
    try {
      await redisClient.flushall();
      return true;
    } catch (error) {
      logger.error('Cache clear error:', error);
      return false;
    }
  },

  // Verificar se chave existe
  async exists(key) {
    try {
      return await redisClient.exists(key);
    } catch (error) {
      logger.error('Cache exists error:', error);
      return false;
    }
  },

  // Incrementar contador
  async increment(key) {
    try {
      return await redisClient.incr(key);
    } catch (error) {
      logger.error('Cache increment error:', error);
      return null;
    }
  },

  // Definir expiração
  async expire(key, ttl) {
    try {
      return await redisClient.expire(key, ttl);
    } catch (error) {
      logger.error('Cache expire error:', error);
      return false;
    }
  }
};

module.exports = {
  redisClient,
  cache
}; 