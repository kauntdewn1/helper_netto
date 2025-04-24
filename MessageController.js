const Message = require('../models/Message');
const User = require('../models/User');
const telegramService = require('../services/TelegramService');
const whatsAppService = require('../services/WhatsAppService');
const aiService = require('../services/AIService');
const logger = require('../utils/logger');

class MessageController {
  /**
   * Processa mensagens recebidas do Telegram
   * @param {Object} req - Requisição HTTP
   * @param {Object} res - Resposta HTTP
   */
  async processTelegramWebhook(req, res) {
    try {
      const update = req.body;
      logger.info('Recebida atualização do Telegram', { update });
      
      // Processa a atualização do Telegram
      const messageData = telegramService.processUpdate(update);
      
      if (!messageData) {
        return res.status(200).send('OK');
      }
      
      // Busca ou cria usuário
      let user = await User.findOne({ 'preferences.telegramChatId': messageData.metadata.chatId });
      
      if (!user) {
        user = new User({
          name: messageData.metadata.contactName || 'Usuário Telegram',
          email: `telegram_${messageData.metadata.chatId}@placeholder.com`,
          phone: '',
          preferences: {
            telegramChatId: messageData.metadata.chatId
          }
        });
        await user.save();
      }
      
      // Salva a mensagem no banco de dados
      const message = new Message({
        user: user._id,
        ...messageData
      });
      await message.save();
      
      // Processa a mensagem com IA e gera resposta
      const response = await aiService.processMessage(message, user);
      
      // Envia resposta ao usuário
      await telegramService.sendMessage(messageData.metadata.chatId, response);
      
      // Salva a resposta no banco de dados
      const responseMessage = new Message({
        user: user._id,
        platform: 'telegram',
        direction: 'outgoing',
        content: response,
        metadata: {
          chatId: messageData.metadata.chatId,
          contactName: 'IA Assistente'
        }
      });
      await responseMessage.save();
      
      return res.status(200).send('OK');
    } catch (error) {
      logger.error('Erro ao processar webhook do Telegram', { error });
      return res.status(500).send('Erro interno');
    }
  }
  
  /**
   * Processa mensagens recebidas do WhatsApp
   * @param {Object} req - Requisição HTTP
   * @param {Object} res - Resposta HTTP
   */
  async processWhatsAppWebhook(req, res) {
    try {
      const update = req.body;
      logger.info('Recebida atualização do WhatsApp', { update });
      
      // Processa a atualização do WhatsApp
      const messageData = whatsAppService.processUpdate(update);
      
      if (!messageData) {
        return res.status(200).send('OK');
      }
      
      // Busca ou cria usuário
      let user = await User.findOne({ phone: messageData.metadata.contactPhone });
      
      if (!user) {
        user = new User({
          name: messageData.metadata.contactName || 'Usuário WhatsApp',
          email: `whatsapp_${messageData.metadata.contactPhone}@placeholder.com`,
          phone: messageData.metadata.contactPhone,
          preferences: {}
        });
        await user.save();
      }
      
      // Salva a mensagem no banco de dados
      const message = new Message({
        user: user._id,
        ...messageData
      });
      await message.save();
      
      // Processa a mensagem com IA e gera resposta
      const response = await aiService.processMessage(message, user);
      
      // Envia resposta ao usuário
      await whatsAppService.sendMessage(messageData.metadata.contactPhone, response);
      
      // Salva a resposta no banco de dados
      const responseMessage = new Message({
        user: user._id,
        platform: 'whatsapp',
        direction: 'outgoing',
        content: response,
        metadata: {
          chatId: messageData.metadata.contactPhone,
          contactName: 'IA Assistente'
        }
      });
      await responseMessage.save();
      
      return res.status(200).send('OK');
    } catch (error) {
      logger.error('Erro ao processar webhook do WhatsApp', { error });
      return res.status(500).send('Erro interno');
    }
  }
  
  /**
   * Lista mensagens de um usuário
   * @param {Object} req - Requisição HTTP
   * @param {Object} res - Resposta HTTP
   */
  async listMessages(req, res) {
    try {
      const { userId, platform, limit = 50, skip = 0 } = req.query;
      
      const query = { user: userId };
      if (platform) {
        query.platform = platform;
      }
      
      const messages = await Message.find(query)
        .sort({ createdAt: -1 })
        .skip(parseInt(skip))
        .limit(parseInt(limit));
      
      return res.status(200).json(messages);
    } catch (error) {
      logger.error('Erro ao listar mensagens', { error });
      return res.status(500).json({ error: 'Erro interno' });
    }
  }
}

module.exports = new MessageController();
