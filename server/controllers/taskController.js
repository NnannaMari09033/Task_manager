const taskService = require('../services/taskService');
const { HTTP_STATUS, MESSAGES } = require('../config/constants');

class TaskController {
  async getAllTasks(req, res) {
    try {
      const tasks = await taskService.getAllTasks();
      
      res.status(HTTP_STATUS.OK).json({
        success: true,
        data: tasks,
        message: MESSAGES.SUCCESS.TODOS_RETRIEVED
      });
    } catch (error) {
      console.error('Get all tasks error:', error);
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: MESSAGES.ERROR.TODOS_FETCH_FAILED
      });
    }
  }

  async createTask(req, res) {
    try {
      const taskData = req.body;
      const newTask = await taskService.createTask(taskData);

      res.status(HTTP_STATUS.CREATED).json({
        success: true,
        data: newTask,
        message: MESSAGES.SUCCESS.TODO_CREATED
      });
    } catch (error) {
      console.error('Create task error:', error);
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: MESSAGES.ERROR.TODO_CREATE_FAILED
      });
    }
  }

  async updateTask(req, res) {
    try {
      const { id } = req.params;
      const updates = req.body;

      const updatedTask = await taskService.updateTask(id, updates);

      if (!updatedTask) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({
          success: false,
          message: MESSAGES.ERROR.TODO_NOT_FOUND
        });
      }

      res.status(HTTP_STATUS.OK).json({
        success: true,
        data: updatedTask,
        message: MESSAGES.SUCCESS.TODO_UPDATED
      });
    } catch (error) {
      console.error('Update task error:', error);
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: MESSAGES.ERROR.TODO_UPDATE_FAILED
      });
    }
  }

  async deleteTask(req, res) {
    try {
      const { id } = req.params;

      const deletedTask = await taskService.deleteTask(id);

      if (!deletedTask) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({
          success: false,
          message: MESSAGES.ERROR.TODO_NOT_FOUND
        });
      }

      res.status(HTTP_STATUS.OK).json({
        success: true,
        data: deletedTask,
        message: MESSAGES.SUCCESS.TODO_DELETED
      });
    } catch (error) {
      console.error('Delete task error:', error);
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: MESSAGES.ERROR.TODO_DELETE_FAILED
      });
    }
  }

  async toggleTaskCompletion(req, res) {
    try {
      const { id } = req.params;

      const updatedTask = await taskService.toggleTaskCompletion(id);

      if (!updatedTask) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({
          success: false,
          message: MESSAGES.ERROR.TODO_NOT_FOUND
        });
      }

      res.status(HTTP_STATUS.OK).json({
        success: true,
        data: updatedTask,
        message: MESSAGES.SUCCESS.TODO_TOGGLED
      });
    } catch (error) {
      console.error('Toggle task completion error:', error);
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: MESSAGES.ERROR.TODO_TOGGLE_FAILED
      });
    }
  }

  async healthCheck(req, res) {
    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: MESSAGES.SUCCESS.HEALTH_CHECK,
      timestamp: new Date().toISOString(),
      version: '1.0.0'
    });
  }
}

module.exports = new TaskController();