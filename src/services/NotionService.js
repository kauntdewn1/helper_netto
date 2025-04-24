const axios = require('axios');
const logger = require('../utils/logger');

class NotionService {
  constructor() {
    this.token = process.env.NOTION_TOKEN;
    this.apiUrl = 'https://api.notion.com/v1';
    this.headers = {
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json',
      'Notion-Version': '2022-06-28'
    };
  }

  /**
   * Busca uma página no Notion pelo ID
   * @param {string} pageId - ID da página no Notion
   * @returns {Promise} - Dados da página
   */
  async getPage(pageId) {
    try {
      const response = await axios.get(`${this.apiUrl}/pages/${pageId}`, {
        headers: this.headers
      });
      
      logger.info(`Página ${pageId} recuperada do Notion`);
      return response.data;
    } catch (error) {
      logger.error(`Erro ao buscar página do Notion: ${error.message}`);
      throw error;
    }
  }

  /**
   * Busca uma base de dados no Notion pelo ID
   * @param {string} databaseId - ID da base de dados no Notion
   * @returns {Promise} - Dados da base de dados
   */
  async getDatabase(databaseId) {
    try {
      const response = await axios.get(`${this.apiUrl}/databases/${databaseId}`, {
        headers: this.headers
      });
      
      logger.info(`Base de dados ${databaseId} recuperada do Notion`);
      return response.data;
    } catch (error) {
      logger.error(`Erro ao buscar base de dados do Notion: ${error.message}`);
      throw error;
    }
  }

  /**
   * Consulta itens em uma base de dados do Notion
   * @param {string} databaseId - ID da base de dados no Notion
   * @param {Object} filter - Filtro para a consulta (opcional)
   * @param {Array} sorts - Ordenação para a consulta (opcional)
   * @returns {Promise} - Resultados da consulta
   */
  async queryDatabase(databaseId, filter = {}, sorts = []) {
    try {
      const response = await axios.post(`${this.apiUrl}/databases/${databaseId}/query`, {
        filter: filter,
        sorts: sorts
      }, {
        headers: this.headers
      });
      
      logger.info(`Consulta realizada na base de dados ${databaseId} do Notion`);
      return response.data;
    } catch (error) {
      logger.error(`Erro ao consultar base de dados do Notion: ${error.message}`);
      throw error;
    }
  }

  /**
   * Cria uma página no Notion (pode ser um item em uma base de dados)
   * @param {Object} properties - Propriedades da página
   * @param {string} parentId - ID do pai (database_id ou page_id)
   * @param {string} parentType - Tipo do pai ('database_id' ou 'page_id')
   * @returns {Promise} - Dados da página criada
   */
  async createPage(properties, parentId, parentType = 'database_id') {
    try {
      const response = await axios.post(`${this.apiUrl}/pages`, {
        parent: {
          [parentType]: parentId
        },
        properties: properties
      }, {
        headers: this.headers
      });
      
      logger.info(`Página criada no Notion com sucesso`);
      return response.data;
    } catch (error) {
      logger.error(`Erro ao criar página no Notion: ${error.message}`);
      throw error;
    }
  }

  /**
   * Atualiza uma página no Notion
   * @param {string} pageId - ID da página no Notion
   * @param {Object} properties - Propriedades a serem atualizadas
   * @returns {Promise} - Dados da página atualizada
   */
  async updatePage(pageId, properties) {
    try {
      const response = await axios.patch(`${this.apiUrl}/pages/${pageId}`, {
        properties: properties
      }, {
        headers: this.headers
      });
      
      logger.info(`Página ${pageId} atualizada no Notion`);
      return response.data;
    } catch (error) {
      logger.error(`Erro ao atualizar página no Notion: ${error.message}`);
      throw error;
    }
  }

  /**
   * Converte uma tarefa do sistema para o formato de propriedades do Notion
   * @param {Object} task - Objeto de tarefa do sistema
   * @returns {Object} - Propriedades formatadas para o Notion
   */
  formatTaskToNotionProperties(task) {
    return {
      "Nome": {
        "title": [
          {
            "text": {
              "content": task.title
            }
          }
        ]
      },
      "Status": {
        "select": {
          "name": this.mapStatusToNotion(task.status)
        }
      },
      "Prioridade": {
        "select": {
          "name": this.mapPriorityToNotion(task.priority)
        }
      },
      "Data de Vencimento": task.dueDate ? {
        "date": {
          "start": task.dueDate.toISOString().split('T')[0]
        }
      } : null,
      "Descrição": task.description ? {
        "rich_text": [
          {
            "text": {
              "content": task.description
            }
          }
        ]
      } : null
    };
  }

  /**
   * Mapeia o status do sistema para o formato do Notion
   * @param {string} status - Status no sistema
   * @returns {string} - Status no formato do Notion
   */
  mapStatusToNotion(status) {
    const statusMap = {
      'pending': 'A fazer',
      'in_progress': 'Em andamento',
      'completed': 'Concluído',
      'cancelled': 'Cancelado'
    };
    return statusMap[status] || 'A fazer';
  }

  /**
   * Mapeia a prioridade do sistema para o formato do Notion
   * @param {string} priority - Prioridade no sistema
   * @returns {string} - Prioridade no formato do Notion
   */
  mapPriorityToNotion(priority) {
    const priorityMap = {
      'low': 'Baixa',
      'medium': 'Média',
      'high': 'Alta',
      'urgent': 'Urgente'
    };
    return priorityMap[priority] || 'Média';
  }
}

module.exports = new NotionService();
