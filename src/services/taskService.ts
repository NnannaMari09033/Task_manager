import { apiClient } from './apiClient';
import { Task, TaskFormData } from '../types/task.types';
import { UI_MESSAGES } from '../config/constants';

class TaskService {
  private readonly endpoints = {
    tasks: '/tasks',
    health: '/health',
  } as const;

  async getAllTasks(): Promise<Task[]> {
    try {
      const response = await apiClient.get<Task[]>(this.endpoints.tasks);
      return response.data || [];
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
      throw new Error(UI_MESSAGES.ERROR.NETWORK_ERROR);
    }
  }

  async createTask(taskData: TaskFormData): Promise<Task> {
    try {
      const response = await apiClient.post<Task>(this.endpoints.tasks, taskData);
      
      if (!response.data) {
        throw new Error(UI_MESSAGES.ERROR.SERVER_ERROR);
      }
      
      return response.data;
    } catch (error) {
      console.error('Failed to create task:', error);
      
      if (error instanceof Error && error.message.includes('400')) {
        throw new Error(UI_MESSAGES.ERROR.VALIDATION_ERROR);
      }
      
      throw new Error(UI_MESSAGES.ERROR.SERVER_ERROR);
    }
  }

  async updateTask(taskId: string, updates: Partial<Task>): Promise<Task> {
    try {
      const response = await apiClient.put<Task>(`${this.endpoints.tasks}/${taskId}`, updates);
      
      if (!response.data) {
        throw new Error(UI_MESSAGES.ERROR.SERVER_ERROR);
      }
      
      return response.data;
    } catch (error) {
      console.error('Failed to update task:', error);
      
      if (error instanceof Error && error.message.includes('404')) {
        throw new Error(UI_MESSAGES.ERROR.TASK_NOT_FOUND);
      }
      
      if (error instanceof Error && error.message.includes('400')) {
        throw new Error(UI_MESSAGES.ERROR.VALIDATION_ERROR);
      }
      
      throw new Error(UI_MESSAGES.ERROR.SERVER_ERROR);
    }
  }

  async deleteTask(taskId: string): Promise<void> {
    try {
      await apiClient.delete(`${this.endpoints.tasks}/${taskId}`);
    } catch (error) {
      console.error('Failed to delete task:', error);
      
      if (error instanceof Error && error.message.includes('404')) {
        throw new Error(UI_MESSAGES.ERROR.TASK_NOT_FOUND);
      }
      
      throw new Error(UI_MESSAGES.ERROR.SERVER_ERROR);
    }
  }

  async toggleTaskCompletion(taskId: string): Promise<Task> {
    try {
      const response = await apiClient.patch<Task>(`${this.endpoints.tasks}/${taskId}/toggle`);
      
      if (!response.data) {
        throw new Error(UI_MESSAGES.ERROR.SERVER_ERROR);
      }
      
      return response.data;
    } catch (error) {
      console.error('Failed to toggle task completion:', error);
      
      if (error instanceof Error && error.message.includes('404')) {
        throw new Error(UI_MESSAGES.ERROR.TASK_NOT_FOUND);
      }
      
      throw new Error(UI_MESSAGES.ERROR.SERVER_ERROR);
    }
  }

  async checkHealth(): Promise<boolean> {
    try {
      const response = await apiClient.get(this.endpoints.health);
      return response.success;
    } catch (error) {
      console.error('Health check failed:', error);
      return false;
    }
  }
}

export const taskService = new TaskService();
export default taskService;