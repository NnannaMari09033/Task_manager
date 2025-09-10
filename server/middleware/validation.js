const { body, param, validationResult } = require('express-validator');
const { VALIDATION_RULES, HTTP_STATUS, MESSAGES } = require('../config/constants');

// Validation rules for creating a task
const validateCreateTask = [
  body('title')
    .trim()
    .isLength({ min: VALIDATION_RULES.TODO.TITLE.MIN_LENGTH, max: VALIDATION_RULES.TODO.TITLE.MAX_LENGTH })
    .withMessage(`Title must be between ${VALIDATION_RULES.TODO.TITLE.MIN_LENGTH} and ${VALIDATION_RULES.TODO.TITLE.MAX_LENGTH} characters`)
    .escape(),
  
  body('description')
    .optional()
    .trim()
    .isLength({ max: VALIDATION_RULES.TODO.DESCRIPTION.MAX_LENGTH })
    .withMessage(`Description cannot exceed ${VALIDATION_RULES.TODO.DESCRIPTION.MAX_LENGTH} characters`)
    .escape(),
  
  body('priority')
    .optional()
    .isIn(VALIDATION_RULES.TODO.PRIORITY.ALLOWED_VALUES)
    .withMessage(`Priority must be one of: ${VALIDATION_RULES.TODO.PRIORITY.ALLOWED_VALUES.join(', ')}`),
  
  body('dueDate')
    .optional()
    .isISO8601()
    .withMessage('Due date must be a valid ISO 8601 date')
];

// Validation rules for updating a task
const validateUpdateTask = [
  param('id')
    .isUUID()
    .withMessage('Invalid task ID format'),
  
  body('title')
    .optional()
    .trim()
    .isLength({ min: VALIDATION_RULES.TODO.TITLE.MIN_LENGTH, max: VALIDATION_RULES.TODO.TITLE.MAX_LENGTH })
    .withMessage(`Title must be between ${VALIDATION_RULES.TODO.TITLE.MIN_LENGTH} and ${VALIDATION_RULES.TODO.TITLE.MAX_LENGTH} characters`)
    .escape(),
  
  body('description')
    .optional()
    .trim()
    .isLength({ max: VALIDATION_RULES.TODO.DESCRIPTION.MAX_LENGTH })
    .withMessage(`Description cannot exceed ${VALIDATION_RULES.TODO.DESCRIPTION.MAX_LENGTH} characters`)
    .escape(),
  
  body('priority')
    .optional()
    .isIn(VALIDATION_RULES.TODO.PRIORITY.ALLOWED_VALUES)
    .withMessage(`Priority must be one of: ${VALIDATION_RULES.TODO.PRIORITY.ALLOWED_VALUES.join(', ')}`),
  
  body('dueDate')
    .optional()
    .isISO8601()
    .withMessage('Due date must be a valid ISO 8601 date'),
  
  body('completed')
    .optional()
    .isBoolean()
    .withMessage('Completed status must be a boolean value')
];

// Validation rules for task ID parameter
const validateTaskId = [
  param('id')
    .isUUID()
    .withMessage('Invalid task ID format')
];

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(error => error.msg);
    
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      message: MESSAGES.ERROR.INVALID_INPUT,
      errors: errorMessages
    });
  }
  
  next();
};

module.exports = {
  validateCreateTask,
  validateUpdateTask,
  validateTaskId,
  handleValidationErrors
};