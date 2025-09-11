import { Task, TaskFormData } from '../types/task.types';
import { UI_MESSAGES } from '../config/constants';

class TaskService {
  private readonly STORAGE_KEY = 'tasks';

  private getTasksFromStorage(): Task[] {
    try {
      const tasksJson = localStorage.getItem(this.STORAGE_KEY);
      return tasksJson ? JSON.parse(tasksJson) : [];
    } catch (error) {
      console.error('Failed to retrieve tasks from localStorage:', error);
      return [];
    }
  }

  private saveTasksToStorage(tasks: Task[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error('Failed to save tasks to localStorage:', error);
    }
  }

  async getAllTasks(): Promise<Task[]> {
    const tasks = this.getTasksFromStorage();
    return Promise.resolve(tasks);
  }

  async createTask(taskData: TaskFormData): Promise<Task> {
    const tasks = this.getTasksFromStorage();
    const newTask: Task = {
      id: crypto.randomUUID(),
      created_at: new Date().toISOString(),
      completed: false,
      ...taskData,
    };
    const updatedTasks = [...tasks, newTask];
    this.saveTasksToStorage(updatedTasks);
    return Promise.resolve(newTask);
  }

  async updateTask(taskId: string, updates: Partial<TaskFormData>): Promise<Task> {
    const tasks = this.getTasksFromStorage();
    const taskIndex = tasks.findIndex((task) => task.id === taskId);

    if (taskIndex === -1) {
      return Promise.reject(new Error(UI_MESSAGES.ERROR.TASK_NOT_FOUND));
    }

    const updatedTask = { ...tasks[taskIndex], ...updates };
    tasks[taskIndex] = updatedTask;
    this.saveTasksToStorage(tasks);

    return Promise.resolve(updatedTask);
  }

  async deleteTask(taskId: string): Promise<string> {
    let tasks = this.getTasksFromStorage();
    const initialLength = tasks.length;
    tasks = tasks.filter((task) => task.id !== taskId);

    if (tasks.length === initialLength) {
      return Promise.reject(new Error(UI_MESSAGES.ERROR.TASK_NOT_FOUND));
    }

    this.saveTasksToStorage(tasks);
    return Promise.resolve(taskId);
  }

  async toggleTaskCompletion(taskId: string): Promise<Task> {
    const tasks = this.getTasksFromStorage();
    const taskIndex = tasks.findIndex((task) => task.id === taskId);

    if (taskIndex === -1) {
      return Promise.reject(new Error(UI_MESSAGES.ERROR.TASK_NOT_FOUND));
    }

    const updatedTask = { ...tasks[taskIndex], completed: !tasks[taskIndex].completed };
    tasks[taskIndex] = updatedTask;
    this.saveTasksToStorage(tasks);

    return Promise.resolve(updatedTask);
  }
}

export const taskService = new TaskService();
export default taskService;