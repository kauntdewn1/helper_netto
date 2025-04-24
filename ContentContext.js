import React, { createContext, useState, useContext } from 'react';
import { contentService } from '../services/api';

// Criação do contexto de geração de conteúdo
const ContentContext = createContext(null);

// Provider do contexto de geração de conteúdo
export const ContentProvider = ({ children }) => {
  const [generatedContent, setGeneratedContent] = useState('');
  const [contentHistory, setContentHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Carregar histórico de conteúdo
  const fetchContentHistory = async () => {
    setLoading(true);
    try {
      const data = await contentService.getContentHistory();
      setContentHistory(data);
      return data;
    } catch (err) {
      console.error('Erro ao carregar histórico de conteúdo:', err);
      setError('Falha ao carregar histórico de conteúdo');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Função para gerar conteúdo
  const generateContent = async (params) => {
    setLoading(true);
    setError(null);
    try {
      const data = await contentService.generateContent(params);
      setGeneratedContent(data.content);
      return data;
    } catch (err) {
      console.error('Erro ao gerar conteúdo:', err);
      setError('Falha ao gerar conteúdo');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Função para salvar conteúdo
  const saveContent = async (content) => {
    setLoading(true);
    try {
      const savedContent = await contentService.saveContent(content);
      setContentHistory((prevHistory) => [savedContent, ...prevHistory]);
      return savedContent;
    } catch (err) {
      console.error('Erro ao salvar conteúdo:', err);
      setError('Falha ao salvar conteúdo');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Valor do contexto
  const value = {
    generatedContent,
    contentHistory,
    loading,
    error,
    generateContent,
    saveContent,
    fetchContentHistory
  };

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
};

// Hook personalizado para usar o contexto de geração de conteúdo
export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent deve ser usado dentro de um ContentProvider');
  }
  return context;
};

export default ContentContext;
