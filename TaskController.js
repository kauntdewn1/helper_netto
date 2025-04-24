const Task = require('../models/Task');
const User = require('../models/User');
const notionService = require('../services/NotionService');
const logger = require('../utils/logger');

class TaskController {
  /**
   * Cria uma nova tarefa
   * @param {Object} req - Requisição HTTP
   * @param {Object} res - Resposta HTTP
   */
  async createTask(req, res) {
    try {
      const { userId, title, description, dueDate, priority, category } = req.body;
      
      // Verifica se o usuário existe
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }
      
      // Cria a tarefa no banco de dados
      const task = new Task({
        user: userId,
        title,
        description,
        dueDate: dueDate ? new Date(dueDate) : null,
        priority: priority || 'medium',
        category: category || 'work'
      });
      
      await task.save();
      
      // Se o usuário tiver configuração do Notion, cria a tarefa lá também
      if (process.env.NOTION_TASKS_DATABASE_ID) {
        try {
          const notionProperties = notionService.formatTaskToNotionProperties(task);
          const notionResponse = await notionService.createPage(
            notionProperties, 
            process.env.NOTION_TASKS_DATABASE_ID
          );
          
          // Atualiza a tarefa com o ID do Notion
          task.notionId = notionResponse.id;
          await task.save();
        } catch (notionError) {
          logger.error('Erro ao criar tarefa no Notion', { error: notionError });
          // Continua mesmo com erro no Notion
        }
      }
      
      return res.status(201).json(task);
    } catch (error) {
      logger.error('Erro ao criar tarefa', { error });
      return res.status(500).json({ error: 'Erro interno' });
    }
  }
  
  /**
   * Lista tarefas de um usuário
   * @param {Object} req - Requisição HTTP
   * @param {Object} res - Resposta HTTP
   */
  async listTasks(req, res) {
    try {
      const { userId, status, priority, category, limit = 50, skip = 0 } = req.query;
      
      const query = { user: userId };
      
      if (status) {
        query.status = status;
      }
      
      if (priority) {
        query.priority = priority;
      }
      
      if (category) {
        query.category = category;
      }
      
      const tasks = await Task.find(query)
        .sort({ dueDate: 1, priority: -1 })
        .skip(parseInt(skip))
        .limit(parseInt(limit));
      
      return res.status(200).json(tasks);
    } catch (error) {
      logger.error('Erro ao listar tarefas', { error });
      return res.status(500).json({ error: 'Erro interno' });
    }
  }
  
  /**
   * Atualiza uma tarefa
   * @param {Object} req - Requisição HTTP
   * @param {Object} res - Resposta HTTP
   */
  async updateTask(req, res) {
    try {
      const { taskId } = req.params;
      const updates = req.body;
      
      // Remove campos que não podem ser atualizados diretamente
      delete updates.user;
      delete updates.createdAt;
      delete updates.notionId;
      
      // Atualiza a tarefa no banco de dados
      const task = await Task.findByIdAndUpdate(
        taskId,
        updates,
        { new: true, runValidators: true }
      );
      
      if (!task) {
        return res.status(404).json({ error: 'Tarefa não encontrada' });
      }
      
      // Se a tarefa tiver ID do Notion, atualiza lá também
      if (task.notionId) {
        try {
          const notionProperties = notionService.formatTaskToNotionProperties(task);
          await notionService.updatePage(task.notionId, notionProperties);
        } catch (notionError) {
          logger.error('Erro ao atualizar tarefa no Notion', { error: notionError });
          // Continua mesmo com erro no Notion
        }
      }
      
      return res.status(200).json(task);
    } catch (error) {
      logger.error('Erro ao atualizar tarefa', { error });
      return res.status(500).json({ error: 'Erro interno' });
    }
  }
  
  /**
   * Remove uma tarefa
   * @param {Object} req - Requisição HTTP
   * @param {Object} res - Resposta HTTP
   */
  async deleteTask(req, res) {
    try {
      const { taskId } = req.params;
      
      const task = await Task.findById(taskId);
      
      if (!task) {
        return res.status(404).json({ error: 'Tarefa não encontrada' });
      }
      
      // Se a tarefa tiver ID do Notion, marca como concluída lá
      if (task.notionId) {
        try {
          const notionProperties = {
            "Status": {
              "select": {
                "name": "Concluído"
              }
            }
          };
          await notionService.updatePage(task.notionId, notionProperties);
        } catch (notionError) {
          logger.error('Erro ao marcar tarefa como concluída no Notion', { error: notionError });
          // Continua mesmo com erro no Notion
        }
      }
      
      await Task.findByIdAndDelete(taskId);
      
      return res.status(200).json({ message: 'Tarefa removida com sucesso' });
    } catch (error) {
      logger.error('Erro ao remover tarefa', { error });
      return res.status(500).json({ error: 'Erro interno' });
    }
  }
}

module.exports = new TaskController();
