import React, { createContext, useState, useContext, useEffect } from 'react';
import { eventService } from '../services/api';

// Criação do contexto de eventos
const EventContext = createContext(null);

// Provider do contexto de eventos
export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dateRange, setDateRange] = useState({
    start: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    end: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
  });

  // Carregar eventos ao inicializar ou quando o intervalo de datas mudar
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const data = await eventService.getEvents(dateRange.start, dateRange.end);
        setEvents(data);
      } catch (err) {
        console.error('Erro ao carregar eventos:', err);
        setError('Falha ao carregar eventos');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [dateRange]);

  // Função para criar evento
  const createEvent = async (eventData) => {
    setLoading(true);
    try {
      const newEvent = await eventService.createEvent(eventData);
      setEvents((prevEvents) => [...prevEvents, newEvent]);
      return newEvent;
    } catch (err) {
      console.error('Erro ao criar evento:', err);
      setError('Falha ao criar evento');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Função para atualizar evento
  const updateEvent = async (eventId, eventData) => {
    setLoading(true);
    try {
      const updatedEvent = await eventService.updateEvent(eventId, eventData);
      setEvents((prevEvents) =>
        prevEvents.map((event) => (event.id === eventId ? updatedEvent : event))
      );
      return updatedEvent;
    } catch (err) {
      console.error('Erro ao atualizar evento:', err);
      setError('Falha ao atualizar evento');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Função para excluir evento
  const deleteEvent = async (eventId) => {
    setLoading(true);
    try {
      await eventService.deleteEvent(eventId);
      setEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId));
    } catch (err) {
      console.error('Erro ao excluir evento:', err);
      setError('Falha ao excluir evento');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Função para atualizar o intervalo de datas
  const updateDateRange = (start, end) => {
    setDateRange({ start, end });
  };

  // Valor do contexto
  const value = {
    events,
    loading,
    error,
    dateRange,
    createEvent,
    updateEvent,
    deleteEvent,
    updateDateRange
  };

  return <EventContext.Provider value={value}>{children}</EventContext.Provider>;
};

// Hook personalizado para usar o contexto de eventos
export const useEvents = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvents deve ser usado dentro de um EventProvider');
  }
  return context;
};

export default EventContext;
