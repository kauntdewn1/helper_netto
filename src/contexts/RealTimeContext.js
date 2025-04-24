import React, { createContext, useState, useContext, useEffect } from 'react';
import io from 'socket.io-client';

// Criação do contexto de comunicação em tempo real
const RealTimeContext = createContext(null);

// Provider do contexto de comunicação em tempo real
export const RealTimeProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState(null);

  // Inicializar conexão com o socket
  useEffect(() => {
    const socketInstance = io(process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000', {
      transports: ['websocket'],
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000
    });

    socketInstance.on('connect', () => {
      console.log('Socket conectado:', socketInstance.id);
      setConnected(true);
      setError(null);
    });

    socketInstance.on('disconnect', (reason) => {
      console.log('Socket desconectado:', reason);
      setConnected(false);
    });

    socketInstance.on('connect_error', (err) => {
      console.error('Erro de conexão:', err);
      setError('Falha ao conectar com o servidor em tempo real');
      setConnected(false);
    });

    setSocket(socketInstance);

    // Limpar conexão ao desmontar
    return () => {
      if (socketInstance) {
        socketInstance.disconnect();
      }
    };
  }, []);

  // Função para enviar evento
  const emit = (event, data, callback) => {
    if (socket && connected) {
      socket.emit(event, data, callback);
    } else {
      console.error('Socket não está conectado');
      if (callback) {
        callback(new Error('Socket não está conectado'));
      }
    }
  };

  // Função para assinar evento
  const subscribe = (event, callback) => {
    if (socket) {
      socket.on(event, callback);
      return () => socket.off(event, callback);
    }
    return () => {};
  };

  // Valor do contexto
  const value = {
    socket,
    connected,
    error,
    emit,
    subscribe
  };

  return <RealTimeContext.Provider value={value}>{children}</RealTimeContext.Provider>;
};

// Hook personalizado para usar o contexto de comunicação em tempo real
export const useRealTime = () => {
  const context = useContext(RealTimeContext);
  if (!context) {
    throw new Error('useRealTime deve ser usado dentro de um RealTimeProvider');
  }
  return context;
};

export default RealTimeContext;
