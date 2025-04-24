import React, { createContext, useState, useContext, useEffect } from 'react';
import { messageService } from '../services/api';

// Criação do contexto de mensagens
const MessageContext = createContext(null);

// Provider do contexto de mensagens
export const MessageProvider = ({ children }) => {
  const [conversations, setConversations] = useState([]);
  const [currentConversation, setCurrentConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Carregar conversas ao inicializar
  useEffect(() => {
    const fetchConversations = async () => {
      setLoading(true);
      try {
        const data = await messageService.getConversations();
        setConversations(data);
        if (data.length > 0) {
          setCurrentConversation(data[0]);
        }
      } catch (err) {
        console.error('Erro ao carregar conversas:', err);
        setError('Falha ao carregar conversas');
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, []);

  // Carregar mensagens quando a conversa atual mudar
  useEffect(() => {
    if (currentConversation) {
      const fetchMessages = async () => {
        setLoading(true);
        try {
          const data = await messageService.getMessages(currentConversation.id);
          setMessages(data);
        } catch (err) {
          console.error('Erro ao carregar mensagens:', err);
          setError('Falha ao carregar mensagens');
        } finally {
          setLoading(false);
        }
      };

      fetchMessages();
    }
  }, [currentConversation]);

  // Função para enviar mensagem
  const sendMessage = async (content) => {
    if (!currentConversation) return;
    
    try {
      const newMessage = await messageService.sendMessage(currentConversation.id, content);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      
      // Atualizar a última mensagem na lista de conversas
      setConversations((prevConversations) => 
        prevConversations.map((conv) => 
          conv.id === currentConversation.id 
            ? { ...conv, lastMessage: content, time: new Date().toLocaleTimeString() } 
            : conv
        )
      );
      
      return newMessage;
    } catch (err) {
      console.error('Erro ao enviar mensagem:', err);
      setError('Falha ao enviar mensagem');
      throw err;
    }
  };

  // Função para criar nova conversa
  const createConversation = async (name) => {
    try {
      const newConversation = await messageService.createConversation(name);
      setConversations((prevConversations) => [...prevConversations, newConversation]);
      setCurrentConversation(newConversation);
      setMessages([]);
      return newConversation;
    } catch (err) {
      console.error('Erro ao criar conversa:', err);
      setError('Falha ao criar conversa');
      throw err;
    }
  };

  // Função para selecionar conversa
  const selectConversation = (conversationId) => {
    const conversation = conversations.find((conv) => conv.id === conversationId);
    if (conversation) {
      setCurrentConversation(conversation);
    }
  };

  // Valor do contexto
  const value = {
    conversations,
    currentConversation,
    messages,
    loading,
    error,
    sendMessage,
    createConversation,
    selectConversation
  };

  return <MessageContext.Provider value={value}>{children}</MessageContext.Provider>;
};

// Hook personalizado para usar o contexto de mensagens
export const useMessages = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error('useMessages deve ser usado dentro de um MessageProvider');
  }
  return context;
};

export default MessageContext;
