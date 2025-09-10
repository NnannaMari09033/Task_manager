import { supabase } from './supabaseClient';
import { Task, TaskFormData } from '../types/task.types';
import { UI_MESSAGES } from '../config/constants';

class TaskService {
  private readonly TABLE_NAME = 'tasks';

  async getAllTasks(): Promise<Task[]> {
    const { data, error } = await supabase
      .from(this.TABLE_NAME)
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Failed to fetch tasks:', error);
      throw new Error(UI_MESSAGES.ERROR.NETWORK_ERROR);
    }

    return data || [];
  }

  async createTask(taskData: TaskFormData): Promise<Task> {
    const { data, error } = await supabase
      .from(this.TABLE_NAME)
      .insert([taskData])
      .select()
      .single();

    if (error) {
      console.error('Failed to create task:', error);
      throw new Error(UI_MESSAGES.ERROR.SERVER_ERROR);
    }

    return data;
  }

  async updateTask(taskId: string, updates: Partial<Task>): Promise<Task> {
    const { data, error } = await supabase
      .from(this.TABLE_NAME)
      .update(updates)
      .eq('id', taskId)
      .select()
      .single();

    if (error) {
      console.error('Failed to update task:', error);
      if (error.code === 'PGRST116') { // PostgREST error for "Not a single row was returned"
        throw new Error(UI_MESSAGES.ERROR.TASK_NOT_FOUND);
      }
      throw new Error(UI_MESSAGES.ERROR.SERVER_ERROR);
    }

    return data;
  }

  async deleteTask(taskId: string): Promise<void> {
    const { error } = await supabase
      .from(this.TABLE_NAME)
      .delete()
      .eq('id', taskId);

    if (error) {
      console.error('Failed to delete task:', error);
      throw new Error(UI_MESSAGES.ERROR.SERVER_ERROR);
    }
  }

  async toggleTaskCompletion(taskId: string, currentStatus: boolean): Promise<Task> {
    const { data, error } = await supabase
      .from(this.TABLE_NAME)
      .update({ completed: !currentStatus })
      .eq('id', taskId)
      .select()
      .single();

    if (error) {
      console.error('Failed to toggle task completion:', error);
      if (error.code === 'PGRST116') {
        throw new Error(UI_MESSAGES.ERROR.TASK_NOT_FOUND);
      }
      throw new Error(UI_MESSAGES.ERROR.SERVER_ERROR);
    }
    return data;
  }
}

export const taskService = new TaskService();
export default taskService;