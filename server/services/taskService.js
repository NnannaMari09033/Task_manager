const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { APP_CONFIG } = require('../config/constants');

class TaskService {
  constructor() {
    this.dataFile = path.join(APP_CONFIG.DATA_DIRECTORY, APP_CONFIG.TODOS_FILE_NAME);
  }

  async ensureDataDirectory() {
    try {
      await fs.access(APP_CONFIG.DATA_DIRECTORY);
    } catch {
      await fs.mkdir(APP_CONFIG.DATA_DIRECTORY, { recursive: true });
    }
  }

  async initializeDataFile() {
    try {
      await fs.access(this.dataFile);
    } catch {
      const initialTasks = [
        {
          id: uuidv4(),
          title: 'Complete project documentation',
          description: 'Write comprehensive documentation for the new feature',
          dueDate: new Date('2024-02-15').toISOString(),
          priority: 'high',
          completed: false,
          createdAt: new Date('2024-01-20').toISOString()
        },
        {
          id: uuidv4(),
          title: 'Review pull requests',
          description: 'Review and merge pending pull requests from team members',
          dueDate: new Date('2024-02-10').toISOString(),
          priority: 'medium',
          completed: false,
          createdAt: new Date('2024-01-21').toISOString()
        },
        {
          id: uuidv4(),
          title: 'Update dependencies',
          description: 'Update all npm packages to latest versions',
          dueDate: null,
          priority: 'low',
          completed: true,
          createdAt: new Date('2024-01-18').toISOString()
        },
        {
          id: uuidv4(),
          title: 'Plan team meeting',
          description: 'Schedule and prepare agenda for next sprint planning',
          dueDate: new Date('2024-02-12').toISOString(),
          priority: 'medium',
          completed: false,
          createdAt: new Date('2024-01-22').toISOString()
        }
      ];
      
      await this.saveTasks(initialTasks);
    }
  }

  async getAllTasks() {
    try {
      const data = await fs.readFile(this.dataFile, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading tasks:', error);
      throw new Error('Failed to read tasks from storage');
    }
  }

  async saveTasks(tasks) {
    try {
      await fs.writeFile(this.dataFile, JSON.stringify(tasks, null, 2));
      return true;
    } catch (error) {
      console.error('Error saving tasks:', error);
      throw new Error('Failed to save tasks to storage');
    }
  }

  async createTask(taskData) {
    const tasks = await this.getAllTasks();
    
    const newTask = {
      id: uuidv4(),
      title: taskData.title.trim(),
      description: taskData.description?.trim() || '',
      dueDate: taskData.dueDate || null,
      priority: taskData.priority || 'medium',
      completed: false,
      createdAt: new Date().toISOString()
    };

    tasks.push(newTask);
    await this.saveTasks(tasks);
    
    return newTask;
  }

  async updateTask(taskId, updates) {
    const tasks = await this.getAllTasks();
    const taskIndex = tasks.findIndex(task => task.id === taskId);

    if (taskIndex === -1) {
      return null;
    }

    // Clean and validate updates
    const cleanUpdates = {};
    if (updates.title !== undefined) cleanUpdates.title = updates.title.trim();
    if (updates.description !== undefined) cleanUpdates.description = updates.description.trim();
    if (updates.dueDate !== undefined) cleanUpdates.dueDate = updates.dueDate;
    if (updates.priority !== undefined) cleanUpdates.priority = updates.priority;
    if (updates.completed !== undefined) cleanUpdates.completed = updates.completed;

    tasks[taskIndex] = { ...tasks[taskIndex], ...cleanUpdates };
    await this.saveTasks(tasks);
    
    return tasks[taskIndex];
  }

  async deleteTask(taskId) {
    const tasks = await this.getAllTasks();
    const taskIndex = tasks.findIndex(task => task.id === taskId);

    if (taskIndex === -1) {
      return null;
    }

    const deletedTask = tasks.splice(taskIndex, 1)[0];
    await this.saveTasks(tasks);
    
    return deletedTask;
  }

  async toggleTaskCompletion(taskId) {
    const tasks = await this.getAllTasks();
    const taskIndex = tasks.findIndex(task => task.id === taskId);

    if (taskIndex === -1) {
      return null;
    }

    tasks[taskIndex].completed = !tasks[taskIndex].completed;
    await this.saveTasks(tasks);
    
    return tasks[taskIndex];
  }

  async getTaskById(taskId) {
    const tasks = await this.getAllTasks();
    return tasks.find(task => task.id === taskId) || null;
  }
}

module.exports = new TaskService();