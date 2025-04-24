const { google } = require('googleapis');
const logger = require('../utils/logger');

class GoogleCalendarService {
  constructor() {
    this.calendar = google.calendar('v3');
    this.auth = null;
  }

  /**
   * Configura a autenticação com o Google Calendar
   * @param {Object} credentials - Credenciais OAuth2 do Google
   * @param {string} token - Token de acesso
   */
  async setupAuth(credentials, token) {
    try {
      const { client_secret, client_id, redirect_uris } = credentials.installed;
      const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]
      );
      
      oAuth2Client.setCredentials(JSON.parse(token));
      this.auth = oAuth2Client;
      
      logger.info('Autenticação com Google Calendar configurada com sucesso');
    } catch (error) {
      logger.error(`Erro ao configurar autenticação com Google Calendar: ${error.message}`);
      throw error;
    }
  }

  /**
   * Lista eventos do calendário
   * @param {Date} timeMin - Data de início para buscar eventos
   * @param {Date} timeMax - Data de fim para buscar eventos
   * @param {number} maxResults - Número máximo de resultados
   * @returns {Promise} - Lista de eventos
   */
  async listEvents(timeMin = new Date(), timeMax = null, maxResults = 10) {
    if (!this.auth) {
      throw new Error('Autenticação não configurada');
    }

    try {
      const params = {
        auth: this.auth,
        calendarId: 'primary',
        timeMin: timeMin.toISOString(),
        maxResults: maxResults,
        singleEvents: true,
        orderBy: 'startTime'
      };

      if (timeMax) {
        params.timeMax = timeMax.toISOString();
      }

      const response = await this.calendar.events.list(params);
      
      logger.info(`${response.data.items.length} eventos recuperados do Google Calendar`);
      return response.data.items;
    } catch (error) {
      logger.error(`Erro ao listar eventos do Google Calendar: ${error.message}`);
      throw error;
    }
  }

  /**
   * Cria um evento no calendário
   * @param {Object} eventData - Dados do evento a ser criado
   * @returns {Promise} - Evento criado
   */
  async createEvent(eventData) {
    if (!this.auth) {
      throw new Error('Autenticação não configurada');
    }

    try {
      const response = await this.calendar.events.insert({
        auth: this.auth,
        calendarId: 'primary',
        resource: eventData
      });
      
      logger.info(`Evento criado no Google Calendar: ${response.data.htmlLink}`);
      return response.data;
    } catch (error) {
      logger.error(`Erro ao criar evento no Google Calendar: ${error.message}`);
      throw error;
    }
  }

  /**
   * Atualiza um evento no calendário
   * @param {string} eventId - ID do evento a ser atualizado
   * @param {Object} eventData - Novos dados do evento
   * @returns {Promise} - Evento atualizado
   */
  async updateEvent(eventId, eventData) {
    if (!this.auth) {
      throw new Error('Autenticação não configurada');
    }

    try {
      const response = await this.calendar.events.update({
        auth: this.auth,
        calendarId: 'primary',
        eventId: eventId,
        resource: eventData
      });
      
      logger.info(`Evento ${eventId} atualizado no Google Calendar`);
      return response.data;
    } catch (error) {
      logger.error(`Erro ao atualizar evento no Google Calendar: ${error.message}`);
      throw error;
    }
  }

  /**
   * Remove um evento do calendário
   * @param {string} eventId - ID do evento a ser removido
   * @returns {Promise} - Resultado da operação
   */
  async deleteEvent(eventId) {
    if (!this.auth) {
      throw new Error('Autenticação não configurada');
    }

    try {
      const response = await this.calendar.events.delete({
        auth: this.auth,
        calendarId: 'primary',
        eventId: eventId
      });
      
      logger.info(`Evento ${eventId} removido do Google Calendar`);
      return response.data;
    } catch (error) {
      logger.error(`Erro ao remover evento do Google Calendar: ${error.message}`);
      throw error;
    }
  }

  /**
   * Converte um evento do sistema para o formato do Google Calendar
   * @param {Object} event - Objeto de evento do sistema
   * @returns {Object} - Evento formatado para o Google Calendar
   */
  formatEventToGoogleCalendar(event) {
    return {
      summary: event.title,
      description: event.description || '',
      location: event.location || '',
      start: {
        dateTime: event.startTime.toISOString(),
        timeZone: 'America/Sao_Paulo'
      },
      end: {
        dateTime: event.endTime.toISOString(),
        timeZone: 'America/Sao_Paulo'
      },
      attendees: event.participants ? event.participants.map(p => ({ email: p.email })) : [],
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 },
          { method: 'popup', minutes: 30 }
        ]
      }
    };
  }
}

module.exports = new GoogleCalendarService();
