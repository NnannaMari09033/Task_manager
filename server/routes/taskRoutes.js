const express = require('express');
const taskController = require('../controllers/taskController');
const {
  validateCreateTask,
  validateUpdateTask,
  validateTaskId,
  handleValidationErrors
} = require('../middleware/validation');

const router = express.Router();

// GET /api/tasks - Get all tasks
router.get('/tasks', taskController.getAllTasks);

// POST /api/tasks - Create a new task
router.post('/tasks', 
  validateCreateTask,
  handleValidationErrors,
  taskController.createTask
);

// PUT /api/tasks/:id - Update a task
router.put('/tasks/:id',
  validateUpdateTask,
  handleValidationErrors,
  taskController.updateTask
);

// DELETE /api/tasks/:id - Delete a task
router.delete('/tasks/:id',
  validateTaskId,
  handleValidationErrors,
  taskController.deleteTask
);

// PATCH /api/tasks/:id/toggle - Toggle task completion
router.patch('/tasks/:id/toggle',
  validateTaskId,
  handleValidationErrors,
  taskController.toggleTaskCompletion
);

// GET /api/health - Health check endpoint
router.get('/health', taskController.healthCheck);

module.exports = router;