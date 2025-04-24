const axios = require('axios');
const logger = require('../utils/logger');

class TelegramService {
  constructor() {
    this.token = process.env.TELEGRAM_TOKEN;
    this.apiUrl = `https://api.telegram.org/bot${this.token}`;
  }

  /**
   * Envia uma mensagem para um chat específico
   * @param {string} chatId - ID do chat para enviar a mensagem
   * @param {string} text - Texto da mensagem
   * @param {Object} options - Opções adicionais para a mensagem
   * @returns {Promise} - Resposta da API do Telegram
   */
  async sendMessage(chatId, text, options = {}) {
    try {
      const response = await axios.post(`${this.apiUrl}/sendMessage`, {
        chat_id: chatId,
        text: text,
        parse_mode: options.parseMode || 'HTML',
        reply_markup: options.replyMarkup || null
      });
      
      logger.info(`Mensagem enviada para o chat ${chatId}`);
      return response.data;
    } catch (error) {
      logger.error(`Erro ao enviar mensagem para o Telegram: ${error.message}`);
      throw error;
    }
  }

  /**
   * Configura o webhook para receber atualizações do Telegram
   * @param {string} url - URL do webhook
   * @returns {Promise} - Resposta da API do Telegram
   */
  async setWebhook(url) {
    try {
      const response = await axios.post(`${this.apiUrl}/setWebhook`, {
        url: url
      });
      
      logger.info(`Webhook configurado para ${url}`);
      return response.data;
    } catch (error) {
      logger.error(`Erro ao configurar webhook do Telegram: ${error.message}`);
      throw error;
    }
  }

  /**
   * Processa uma atualização recebida do Telegram
   * @param {Object} update - Objeto de atualização do Telegram
   * @returns {Object} - Dados processados da mensagem
   */
  processUpdate(update) {
    if (!update || !update.message) {
      logger.warn('Atualização do Telegram sem mensagem');
      return null;
    }

    const message = update.message;
    const chatId = message.chat.id;
    const text = message.text || '';
    const from = message.from;
    
    return {
      platform: 'telegram',
      direction: 'incoming',
      content: text,
      metadata: {
        messageId: message.message_id,
        chatId: chatId,
        contactName: `${from.first_name || ''} ${from.last_name || ''}`.trim(),
        username: from.username
      }
    };
  }
}

module.exports = new TelegramService();
