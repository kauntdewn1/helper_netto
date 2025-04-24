import React from 'react';
import { useRealTime } from '../contexts/RealTimeContext';
import { useMessages } from '../contexts/MessageContext';
import { useTasks } from '../contexts/TaskContext';
import { useEvents } from '../contexts/EventContext';

// Componente para gerenciar notificações em tempo real
const RealTimeNotifications = () => {
  const { subscribe } = useRealTime();
  const { setMessages, conversations, setConversations } = useMessages();
  const { setTasks } = useTasks();
  const { setEvents } = useEvents();

  // Efeito para assinar eventos em tempo real
  React.useEffect(() => {
    // Inscrever-se para novas mensagens
    const unsubscribeNewMessage = subscribe('new_message', (data) => {
      // Atualizar mensagens se a conversa atual estiver aberta
      if (data.conversationId === conversations.find(c => c.id === data.conversationId)?.id) {
        setMessages(prev => [...prev, data]);
      }
      
      // Atualizar lista de conversas
      setConversations(prev => 
        prev.map(conv => 
          conv.id === data.conversationId 
            ? { 
                ...conv, 
                lastMessage: data.content, 
                time: new Date().toLocaleTimeString(),
                unread: (conv.unread || 0) + 1
              } 
            : conv
        )
      );
    });
    
    // Inscrever-se para atualizações de tarefas
    const unsubscribeTaskUpdate = subscribe('task_update', (data) => {
      setTasks(prev => 
        prev.map(task => 
          task.id === data.id ? data : task
        )
      );
    });
    
    // Inscrever-se para novas tarefas
    const unsubscribeNewTask = subscribe('new_task', (data) => {
      setTasks(prev => [...prev, data]);
    });
    
    // Inscrever-se para exclusão de tarefas
    const unsubscribeTaskDelete = subscribe('task_delete', (taskId) => {
      setTasks(prev => prev.filter(task => task.id !== taskId));
    });
    
    // Inscrever-se para atualizações de eventos
    const unsubscribeEventUpdate = subscribe('event_update', (data) => {
      setEvents(prev => 
        prev.map(event => 
          event.id === data.id ? data : event
        )
      );
    });
    
    // Inscrever-se para novos eventos
    const unsubscribeNewEvent = subscribe('new_event', (data) => {
      setEvents(prev => [...prev, data]);
    });
    
    // Inscrever-se para exclusão de eventos
    const unsubscribeEventDelete = subscribe('event_delete', (eventId) => {
      setEvents(prev => prev.filter(event => event.id !== eventId));
    });
    
    // Limpar inscrições ao desmontar
    return () => {
      unsubscribeNewMessage();
      unsubscribeTaskUpdate();
      unsubscribeNewTask();
      unsubscribeTaskDelete();
      unsubscribeEventUpdate();
      unsubscribeNewEvent();
      unsubscribeEventDelete();
    };
  }, [subscribe, setMessages, conversations, setConversations, setTasks, setEvents]);

  // Este componente não renderiza nada visualmente
  return null;
};

export default RealTimeNotifications;
