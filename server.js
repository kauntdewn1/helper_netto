const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const fs = require('fs');
const path = require('path');
const logger = require('./utils/logger');
const routes = require('./routes');

// Configuração de variáveis de ambiente
dotenv.config();

// Inicialização do app Express
const app = express();

// Configuração de segurança
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "https://api.flowoff.xyz"],
    },
  },
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // limite de 100 requisições por IP
});
app.use('/api/', limiter);

// Configuração de middlewares
app.use(cors());
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Sanitização de dados
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

// Criar diretório de logs se não existir
const logDir = 'logs';
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// Rota de teste
app.get('/', (req, res) => {
  res.json({ message: 'API da IA Assistente FlowOFF está funcionando!' });
});

// Configuração das rotas da API
app.use('/api', routes);

// Middleware de erro
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: 'Algo deu errado!'
  });
});

// Porta do servidor
const PORT = process.env.PORT || 3000;

// Conexão com o MongoDB (comentada até configurarmos o MongoDB)
/*
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  logger.info('Conectado ao MongoDB');
})
.catch(err => {
  logger.error('Erro ao conectar ao MongoDB', err);
});
*/

// Inicialização do servidor
app.listen(PORT, () => {
  logger.info(`Servidor rodando na porta ${PORT}`);
  logger.info(`Webhooks disponíveis em:`);
  logger.info(`- Telegram: http://localhost:${PORT}/api/telegram/webhook`);
  logger.info(`- WhatsApp: http://localhost:${PORT}/api/whatsapp/webhook`);
});

module.exports = app;
