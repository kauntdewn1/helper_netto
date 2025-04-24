import axios from 'axios';

// Configuração base do axios
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para adicionar token de autenticação
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratamento de erros
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Tratamento de erros de autenticação
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Serviços de autenticação
export const authService = {
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
  
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  }
};

// Serviços de mensagens
export const messageService = {
  getMessages: async (conversationId) => {
    try {
      const response = await api.get(`/messages/${conversationId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  sendMessage: async (conversationId, content) => {
    try {
      const response = await api.post(`/messages/${conversationId}`, { content });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  getConversations: async () => {
    try {
      const response = await api.get('/messages/conversations');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  createConversation: async (name) => {
    try {
      const response = await api.post('/messages/conversations', { name });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

// Serviços de tarefas
export const taskService = {
  getTasks: async (filters = {}) => {
    try {
      const response = await api.get('/tasks', { params: filters });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  createTask: async (taskData) => {
    try {
      const response = await api.post('/tasks', taskData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  updateTask: async (taskId, taskData) => {
    try {
      const response = await api.put(`/tasks/${taskId}`, taskData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  deleteTask: async (taskId) => {
    try {
      const response = await api.delete(`/tasks/${taskId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  toggleTaskComplete: async (taskId) => {
    try {
      const response = await api.patch(`/tasks/${taskId}/toggle`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

// Serviços de eventos/calendário
export const eventService = {
  getEvents: async (start, end) => {
    try {
      const response = await api.get('/events', { 
        params: { 
          start: start ? start.toISOString() : undefined,
          end: end ? end.toISOString() : undefined
        } 
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  createEvent: async (eventData) => {
    try {
      const response = await api.post('/events', eventData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  updateEvent: async (eventId, eventData) => {
    try {
      const response = await api.put(`/events/${eventId}`, eventData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  deleteEvent: async (eventId) => {
    try {
      const response = await api.delete(`/events/${eventId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

// Serviços de geração de conteúdo
export const contentService = {
  generateContent: async (params) => {
    try {
      const response = await api.post('/content/generate', params);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  getContentHistory: async () => {
    try {
      const response = await api.get('/content/history');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  saveContent: async (content) => {
    try {
      const response = await api.post('/content/save', content);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

// Serviços de configurações do usuário
export const userService = {
  getProfile: async () => {
    try {
      const response = await api.get('/users/profile');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  updateProfile: async (profileData) => {
    try {
      const response = await api.put('/users/profile', profileData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  updatePassword: async (passwordData) => {
    try {
      const response = await api.put('/users/password', passwordData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  updateSettings: async (settings) => {
    try {
      const response = await api.put('/users/settings', settings);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  getSettings: async () => {
    try {
      const response = await api.get('/users/settings');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

// Serviços de integração
export const integrationService = {
  getIntegrations: async () => {
    try {
      const response = await api.get('/integrations');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  connectIntegration: async (type, credentials) => {
    try {
      const response = await api.post(`/integrations/${type}/connect`, credentials);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  disconnectIntegration: async (type) => {
    try {
      const response = await api.delete(`/integrations/${type}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  getIntegrationStatus: async (type) => {
    try {
      const response = await api.get(`/integrations/${type}/status`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

// Exportar a instância do axios para uso direto se necessário
export default api;
