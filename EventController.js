const Event = require('../models/Event');
const User = require('../models/User');
const googleCalendarService = require('../services/GoogleCalendarService');
const logger = require('../utils/logger');

class EventController {
  /**
   * Cria um novo evento
   * @param {Object} req - Requisição HTTP
   * @param {Object} res - Resposta HTTP
   */
  async createEvent(req, res) {
    try {
      const { userId, title, description, startTime, endTime, location, participants, category, priority } = req.body;
      
      // Verifica se o usuário existe
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }
      
      // Cria o evento no banco de dados
      const event = new Event({
        user: userId,
        title,
        description,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        location,
        participants: participants || [],
        category: category || 'meeting',
        priority: priority || 'medium'
      });
      
      await event.save();
      
      // Se o usuário tiver configuração do Google Calendar, cria o evento lá também
      if (googleCalendarService.auth) {
        try {
          const googleEvent = googleCalendarService.formatEventToGoogleCalendar(event);
          const googleResponse = await googleCalendarService.createEvent(googleEvent);
          
          // Atualiza o evento com o ID do Google Calendar
          event.googleCalendarId = googleResponse.id;
          await event.save();
        } catch (googleError) {
          logger.error('Erro ao criar evento no Google Calendar', { error: googleError });
          // Continua mesmo com erro no Google Calendar
        }
      }
      
      return res.status(201).json(event);
    } catch (error) {
      logger.error('Erro ao criar evento', { error });
      return res.status(500).json({ error: 'Erro interno' });
    }
  }
  
  /**
   * Lista eventos de um usuário
   * @param {Object} req - Requisição HTTP
   * @param {Object} res - Resposta HTTP
   */
  async listEvents(req, res) {
    try {
      const { userId, startDate, endDate, category, limit = 50, skip = 0 } = req.query;
      
      const query = { user: userId };
      
      if (startDate) {
        query.startTime = { $gte: new Date(startDate) };
      }
      
      if (endDate) {
        query.endTime = { $lte: new Date(endDate) };
      }
      
      if (category) {
        query.category = category;
      }
      
      const events = await Event.find(query)
        .sort({ startTime: 1 })
        .skip(parseInt(skip))
        .limit(parseInt(limit));
      
      return res.status(200).json(events);
    } catch (error) {
      logger.error('Erro ao listar eventos', { error });
      return res.status(500).json({ error: 'Erro interno' });
    }
  }
  
  /**
   * Atualiza um evento
   * @param {Object} req - Requisição HTTP
   * @param {Object} res - Resposta HTTP
   */
  async updateEvent(req, res) {
    try {
      const { eventId } = req.params;
      const updates = req.body;
      
      // Remove campos que não podem ser atualizados diretamente
      delete updates.user;
      delete updates.createdAt;
      delete updates.googleCalendarId;
      
      // Atualiza o evento no banco de dados
      const event = await Event.findByIdAndUpdate(
        eventId,
        updates,
        { new: true, runValidators: true }
      );
      
      if (!event) {
        return res.status(404).json({ error: 'Evento não encontrado' });
      }
      
      // Se o evento tiver ID do Google Calendar, atualiza lá também
      if (event.googleCalendarId && googleCalendarService.auth) {
        try {
          const googleEvent = googleCalendarService.formatEventToGoogleCalendar(event);
          await googleCalendarService.updateEvent(event.googleCalendarId, googleEvent);
        } catch (googleError) {
          logger.error('Erro ao atualizar evento no Google Calendar', { error: googleError });
          // Continua mesmo com erro no Google Calendar
        }
      }
      
      return res.status(200).json(event);
    } catch (error) {
      logger.error('Erro ao atualizar evento', { error });
      return res.status(500).json({ error: 'Erro interno' });
    }
  }
  
  /**
   * Remove um evento
   * @param {Object} req - Requisição HTTP
   * @param {Object} res - Resposta HTTP
   */
  async deleteEvent(req, res) {
    try {
      const { eventId } = req.params;
      
      const event = await Event.findById(eventId);
      
      if (!event) {
        return res.status(404).json({ error: 'Evento não encontrado' });
      }
      
      // Se o evento tiver ID do Google Calendar, remove lá também
      if (event.googleCalendarId && googleCalendarService.auth) {
        try {
          await googleCalendarService.deleteEvent(event.googleCalendarId);
        } catch (googleError) {
          logger.error('Erro ao remover evento do Google Calendar', { error: googleError });
          // Continua mesmo com erro no Google Calendar
        }
      }
      
      await Event.findByIdAndDelete(eventId);
      
      return res.status(200).json({ message: 'Evento removido com sucesso' });
    } catch (error) {
      logger.error('Erro ao remover evento', { error });
      return res.status(500).json({ error: 'Erro interno' });
    }
  }
}

module.exports = new EventController();
