const winston = require('winston');
const { format } = winston;
const fs = require('fs');
const path = require('path');

// Configuração do logger
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  defaultMeta: { 
    service: 'ia-assistente',
    environment: process.env.NODE_ENV || 'development'
  },
  transports: [
    // Console transport com cores
    new winston.transports.Console({
      format: format.combine(
        format.colorize(),
        format.printf(
          info => `${info.timestamp} ${info.level}: ${info.message}`
        )
      )
    }),
    // Arquivo de erros
    new winston.transports.File({ 
      filename: 'logs/error.log', 
      level: 'error',
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      tailable: true
    }),
    // Arquivo de logs combinados
    new winston.transports.File({ 
      filename: 'logs/combined.log',
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      tailable: true
    }),
    // Arquivo de logs de acesso
    new winston.transports.File({ 
      filename: 'logs/access.log',
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      tailable: true
    })
  ]
});

// Criar diretório de logs se não existir
const logDir = 'logs';
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// Função para log de requisições HTTP
logger.http = function(req, res, next) {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.info({
      method: req.method,
      url: req.url,
      status: res.statusCode,
      duration: `${duration}ms`,
      ip: req.ip,
      userAgent: req.get('user-agent')
    });
  });
  next();
};

// Função para log de erros
logger.errorHandler = function(err, req, res, next) {
  logger.error({
    error: err.message,
    stack: err.stack,
    method: req.method,
    url: req.url,
    body: req.body,
    params: req.params,
    query: req.query,
    headers: req.headers
  });
  next(err);
};

// Função para log de eventos do sistema
logger.system = function(event, data) {
  logger.info({
    type: 'system',
    event,
    data
  });
};

// Função para log de eventos de IA
logger.ai = function(event, data) {
  logger.info({
    type: 'ai',
    event,
    data
  });
};

// Função para log de eventos de integração
logger.integration = function(service, event, data) {
  logger.info({
    type: 'integration',
    service,
    event,
    data
  });
};

module.exports = logger;
