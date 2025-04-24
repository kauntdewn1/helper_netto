const axios = require('axios');
const logger = require('../utils/logger');

class AIService {
  constructor() {
    // Configuração para integração com Ollama (quando disponível)
    this.ollamaUrl = process.env.OLLAMA_URL || 'http://localhost:11434/api/generate';
    this.ollamaModel = process.env.OLLAMA_MODEL || 'llama3';
    
    // Contexto e memória para cada usuário
    this.userContexts = new Map();
    
    // Instruções para o modelo de IA
    this.systemPrompt = `
      Você é um assistente executivo estratégico digital para Netto Mello, CEO e Head da FlowOFF.
      
      Suas principais responsabilidades são:
      1. Organizar tarefas, agenda e compromissos estratégicos
      2. Filtrar e priorizar mensagens recebidas
      3. Sugerir e acompanhar execuções baseadas em prazos e objetivos
      4. Gerar conteúdo com visão estratégica multicanal (Flow 360)
      5. Apoiar a tomada de decisão com base em dados e contexto
      
      Mantenha um tom profissional, estratégico e proativo. Seja conciso e objetivo em suas respostas.
      Quando não tiver certeza sobre algo, pergunte para esclarecer em vez de assumir.
      
      Você deve priorizar tarefas e mensagens com base em:
      - Urgência (prazos próximos)
      - Importância estratégica
      - Alinhamento com objetivos da FlowOFF
      
      A FlowOFF é uma agência de marketing digital que combina estratégias Web2 e Web3, oferecendo:
      - Flow 360: Estratégia exclusiva que integra múltiplos canais digitais
      - Sites e Performance: Desenvolvimento web e campanhas de aquisição
      - Bots Inteligentes: Automação personalizada com IA
      - Business Intelligence: Dashboards e análise de dados em tempo real
    `;
  }

  /**
   * Processa uma mensagem recebida e gera uma resposta
   * @param {Object} message - Objeto de mensagem
   * @param {Object} user - Objeto de usuário
   * @returns {Promise<string>} - Resposta gerada
   */
  async processMessage(message, user) {
    try {
      // Recupera ou inicializa o contexto do usuário
      if (!this.userContexts.has(user._id.toString())) {
        this.userContexts.set(user._id.toString(), {
          history: [],
          lastInteraction: new Date()
        });
      }
      
      const userContext = this.userContexts.get(user._id.toString());
      
      // Atualiza o histórico de conversas (mantém apenas as últimas 10 mensagens)
      userContext.history.push({
        role: 'user',
        content: message.content
      });
      
      if (userContext.history.length > 20) {
        userContext.history = userContext.history.slice(-20);
      }
      
      // Atualiza o timestamp da última interação
      userContext.lastInteraction = new Date();
      
      // Analisa a mensagem para identificar intenções
      const intent = await this.identifyIntent(message.content);
      
      // Gera resposta com base na intenção identificada
      let response;
      
      switch (intent.type) {
        case 'task_creation':
          response = await this.handleTaskCreation(message, user, intent);
          break;
        case 'event_creation':
          response = await this.handleEventCreation(message, user, intent);
          break;
        case 'question':
          response = await this.handleQuestion(message, user, intent);
          break;
        case 'content_generation':
          response = await this.handleContentGeneration(message, user, intent);
          break;
        default:
          response = await this.generateResponse(message.content, userContext.history);
      }
      
      // Adiciona a resposta ao histórico
      userContext.history.push({
        role: 'assistant',
        content: response
      });
      
      return response;
    } catch (error) {
      logger.error('Erro ao processar mensagem com IA', { error });
      return 'Desculpe, tive um problema ao processar sua mensagem. Pode tentar novamente?';
    }
  }

  /**
   * Identifica a intenção da mensagem do usuário
   * @param {string} message - Conteúdo da mensagem
   * @returns {Promise<Object>} - Objeto com tipo de intenção e detalhes
   */
  async identifyIntent(message) {
    // Implementação simplificada - em produção, usaria NLP mais avançado
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('criar tarefa') || lowerMessage.includes('nova tarefa') || 
        lowerMessage.includes('adicionar tarefa') || lowerMessage.includes('agendar tarefa')) {
      return { type: 'task_creation' };
    }
    
    if (lowerMessage.includes('criar evento') || lowerMessage.includes('novo evento') || 
        lowerMessage.includes('agendar reunião') || lowerMessage.includes('marcar compromisso')) {
      return { type: 'event_creation' };
    }
    
    if (lowerMessage.includes('criar conteúdo') || lowerMessage.includes('gerar post') || 
        lowerMessage.includes('escrever texto') || lowerMessage.includes('criar campanha')) {
      return { type: 'content_generation' };
    }
    
    if (lowerMessage.includes('?') || lowerMessage.startsWith('o que') || 
        lowerMessage.startsWith('como') || lowerMessage.startsWith('quando') || 
        lowerMessage.startsWith('onde') || lowerMessage.startsWith('por que')) {
      return { type: 'question' };
    }
    
    return { type: 'general' };
  }

  /**
   * Gera uma resposta usando o modelo de IA
   * @param {string} message - Mensagem do usuário
   * @param {Array} history - Histórico de conversas
   * @returns {Promise<string>} - Resposta gerada
   */
  async generateResponse(message, history) {
    try {
      // Versão simplificada - em produção, integraria com Ollama ou outra API de IA
      // Aqui estamos simulando respostas para o protótipo
      
      // Em uma implementação real, seria algo como:
      /*
      const response = await axios.post(this.ollamaUrl, {
        model: this.ollamaModel,
        prompt: message,
        system: this.systemPrompt,
        messages: history
      });
      
      return response.data.response;
      */
      
      // Simulação de resposta para o protótipo
      const responses = [
        "Entendi. Vou organizar isso para você. Qual a prioridade dessa tarefa?",
        "Vou adicionar esse compromisso à sua agenda. Precisa de algum lembrete específico?",
        "Baseado nos dados atuais, recomendo focar primeiro na campanha de Instagram, que tem mostrado melhor ROI.",
        "Analisei seu cronograma e identifiquei que você tem 3 horas disponíveis amanhã entre as reuniões.",
        "Vou preparar um rascunho de conteúdo para essa campanha seguindo a estratégia Flow 360.",
        "Priorizei suas mensagens. Há 2 clientes aguardando resposta urgente que requerem sua atenção.",
        "Lembrete: você tem uma reunião estratégica com a equipe de marketing em 30 minutos.",
        "Baseado no histórico de interações, sugiro uma abordagem mais personalizada para este cliente."
      ];
      
      // Seleciona uma resposta aleatória para simulação
      const randomIndex = Math.floor(Math.random() * responses.length);
      return responses[randomIndex];
    } catch (error) {
      logger.error('Erro ao gerar resposta com IA', { error });
      return 'Desculpe, estou com dificuldades para processar sua solicitação no momento.';
    }
  }

  /**
   * Processa a criação de uma tarefa
   * @param {Object} message - Mensagem original
   * @param {Object} user - Usuário
   * @param {Object} intent - Intenção identificada
   * @returns {Promise<string>} - Resposta confirmando a criação
   */
  async handleTaskCreation(message, user, intent) {
    // Implementação simplificada - em produção, extrairia detalhes da tarefa com NLP
    return "Entendi que você quer criar uma nova tarefa. Por favor, forneça mais detalhes como título, descrição e prazo.";
  }

  /**
   * Processa a criação de um evento
   * @param {Object} message - Mensagem original
   * @param {Object} user - Usuário
   * @param {Object} intent - Intenção identificada
   * @returns {Promise<string>} - Resposta confirmando a criação
   */
  async handleEventCreation(message, user, intent) {
    // Implementação simplificada - em produção, extrairia detalhes do evento com NLP
    return "Vou agendar esse compromisso para você. Poderia confirmar a data, horário e participantes?";
  }

  /**
   * Processa uma pergunta
   * @param {Object} message - Mensagem original
   * @param {Object} user - Usuário
   * @param {Object} intent - Intenção identificada
   * @returns {Promise<string>} - Resposta à pergunta
   */
  async handleQuestion(message, user, intent) {
    return await this.generateResponse(message.content, this.userContexts.get(user._id.toString()).history);
  }

  /**
   * Processa solicitação de geração de conteúdo
   * @param {Object} message - Mensagem original
   * @param {Object} user - Usuário
   * @param {Object} intent - Intenção identificada
   * @returns {Promise<string>} - Resposta com conteúdo gerado ou solicitação de mais informações
   */
  async handleContentGeneration(message, user, intent) {
    return "Posso ajudar a criar esse conteúdo. Para qual plataforma e público-alvo você precisa? Qual o objetivo principal?";
  }
}

module.exports = new AIService();
