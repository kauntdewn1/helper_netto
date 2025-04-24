import React, { createContext, useState, useContext, useEffect } from 'react';
import { taskService } from '../services/api';

// Criação do contexto de tarefas
const TaskContext = createContext(null);

// Provider do contexto de tarefas
export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    status: 'all',
    priority: 'all',
    category: 'all'
  });

  // Carregar tarefas ao inicializar ou quando os filtros mudarem
  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const data = await taskService.getTasks(filters);
        setTasks(data);
      } catch (err) {
        console.error('Erro ao carregar tarefas:', err);
        setError('Falha ao carregar tarefas');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [filters]);

  // Função para criar tarefa
  const createTask = async (taskData) => {
    setLoading(true);
    try {
      const newTask = await taskService.createTask(taskData);
      setTasks((prevTasks) => [...prevTasks, newTask]);
      return newTask;
    } catch (err) {
      console.error('Erro ao criar tarefa:', err);
      setError('Falha ao criar tarefa');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Função para atualizar tarefa
  const updateTask = async (taskId, taskData) => {
    setLoading(true);
    try {
      const updatedTask = await taskService.updateTask(taskId, taskData);
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === taskId ? updatedTask : task))
      );
      return updatedTask;
    } catch (err) {
      console.error('Erro ao atualizar tarefa:', err);
      setError('Falha ao atualizar tarefa');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Função para excluir tarefa
  const deleteTask = async (taskId) => {
    setLoading(true);
    try {
      await taskService.deleteTask(taskId);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (err) {
      console.error('Erro ao excluir tarefa:', err);
      setError('Falha ao excluir tarefa');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Função para alternar status de conclusão da tarefa
  const toggleTaskComplete = async (taskId) => {
    setLoading(true);
    try {
      const updatedTask = await taskService.toggleTaskComplete(taskId);
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === taskId ? updatedTask : task))
      );
      return updatedTask;
    } catch (err) {
      console.error('Erro ao alternar status da tarefa:', err);
      setError('Falha ao alternar status da tarefa');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Função para atualizar filtros
  const updateFilters = (newFilters) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
  };

  // Valor do contexto
  const value = {
    tasks,
    loading,
    error,
    filters,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskComplete,
    updateFilters
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

// Hook personalizado para usar o contexto de tarefas
export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks deve ser usado dentro de um TaskProvider');
  }
  return context;
};

export default TaskContext;
