const axios = require('axios');
const logger = require('../utils/logger');

class WhatsAppService {
  constructor() {
    this.webhookUrl = process.env.WHATSAPP_WEBHOOK;
    // Configurações adicionais para a API do WhatsApp Business via Ultramsg
    this.ultramsgInstance = process.env.ULTRAMSG_INSTANCE || '';
    this.ultramsgToken = process.env.ULTRAMSG_TOKEN || '';
    this.apiUrl = `https://api.ultramsg.com/${this.ultramsgInstance}`;
  }

  /**
   * Envia uma mensagem para um número específico via WhatsApp
   * @param {string} phone - Número de telefone com código do país (ex: 5511999999999)
   * @param {string} message - Texto da mensagem
   * @returns {Promise} - Resposta da API do WhatsApp
   */
  async sendMessage(phone, message) {
    try {
      const response = await axios.post(`${this.apiUrl}/messages/chat`, {
        token: this.ultramsgToken,
        to: phone,
        body: message
      });
      
      logger.info(`Mensagem enviada para o WhatsApp ${phone}`);
      return response.data;
    } catch (error) {
      logger.error(`Erro ao enviar mensagem para o WhatsApp: ${error.message}`);
      throw error;
    }
  }

  /**
   * Envia uma mensagem de mídia para um número específico via WhatsApp
   * @param {string} phone - Número de telefone com código do país
   * @param {string} mediaUrl - URL da mídia a ser enviada
   * @param {string} caption - Legenda da mídia (opcional)
   * @param {string} mediaType - Tipo de mídia (image, document, audio, video)
   * @returns {Promise} - Resposta da API do WhatsApp
   */
  async sendMedia(phone, mediaUrl, caption = '', mediaType = 'image') {
    try {
      const response = await axios.post(`${this.apiUrl}/messages/chat`, {
        token: this.ultramsgToken,
        to: phone,
        image: mediaType === 'image' ? mediaUrl : undefined,
        document: mediaType === 'document' ? mediaUrl : undefined,
        audio: mediaType === 'audio' ? mediaUrl : undefined,
        video: mediaType === 'video' ? mediaUrl : undefined,
        caption: caption
      });
      
      logger.info(`Mídia enviada para o WhatsApp ${phone}`);
      return response.data;
    } catch (error) {
      logger.error(`Erro ao enviar mídia para o WhatsApp: ${error.message}`);
      throw error;
    }
  }

  /**
   * Processa uma atualização recebida do webhook do WhatsApp
   * @param {Object} update - Objeto de atualização do WhatsApp
   * @returns {Object} - Dados processados da mensagem
   */
  processUpdate(update) {
    if (!update || !update.data || !update.data.body) {
      logger.warn('Atualização do WhatsApp sem dados válidos');
      return null;
    }

    const data = update.data;
    const phone = data.from;
    const message = data.body;
    const contactName = data.sender?.name || phone;
    
    return {
      platform: 'whatsapp',
      direction: 'incoming',
      content: message,
      metadata: {
        messageId: data.id,
        chatId: phone,
        contactName: contactName,
        contactPhone: phone
      }
    };
  }
}

module.exports = new WhatsAppService();
