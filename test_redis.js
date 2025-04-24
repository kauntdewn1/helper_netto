const { redisClient, cache } = require('./redis');
const logger = require('./logger');

async function testRedisConnection() {
  try {
    console.log('Iniciando teste de conexão com Redis...');
    console.log('URL do Redis:', process.env.REDIS_URL);

    // Testar conexão básica
    console.log('\n1. Testando conexão básica...');
    await redisClient.set('test', 'Hello Redis');
    const value = await redisClient.get('test');
    console.log('✓ Test value:', value);

    // Testar cache
    console.log('\n2. Testando cache...');
    await cache.set('test_cache', { message: 'Hello Cache' });
    const cachedValue = await cache.get('test_cache');
    console.log('✓ Cached value:', cachedValue);

    // Testar expiração
    console.log('\n3. Testando expiração...');
    await cache.set('test_expire', 'Will expire', 5);
    console.log('✓ Value set with expiration');

    // Testar incremento
    console.log('\n4. Testando incremento...');
    const count = await cache.increment('test_counter');
    console.log('✓ Counter:', count);

    // Testar performance
    console.log('\n5. Testando performance...');
    const start = Date.now();
    for (let i = 0; i < 100; i++) {
      await cache.set(`perf_test_${i}`, `value_${i}`);
    }
    const end = Date.now();
    console.log(`✓ Performance: ${end - start}ms para 100 operações`);

    // Limpar testes
    console.log('\n6. Limpando dados de teste...');
    await cache.del('test');
    await cache.del('test_cache');
    await cache.del('test_expire');
    await cache.del('test_counter');
    for (let i = 0; i < 100; i++) {
      await cache.del(`perf_test_${i}`);
    }
    console.log('✓ Dados de teste removidos');

    console.log('\n✅ Todos os testes completados com sucesso!');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Erro no teste do Redis:', error);
    console.error('\nDetalhes do erro:');
    console.error('- Mensagem:', error.message);
    console.error('- Stack:', error.stack);
    process.exit(1);
  }
}

testRedisConnection(); 