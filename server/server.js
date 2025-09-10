require('dotenv').config();

const express = require('express');
const cors = require('cors');
const compression = require('compression');
const taskService = require('./services/taskService');
const taskRoutes = require('./routes/taskRoutes');
const { rateLimiter, corsOptions, helmetConfig } = require('./middleware/security');
const { APP_CONFIG, HTTP_STATUS, MESSAGES } = require('./config/constants');

const app = express();

// Security middleware
app.use(helmetConfig);
app.use(rateLimiter);
app.use(cors(corsOptions));

// Performance middleware
app.use(compression());

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// API routes
app.use('/api', taskRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Task Management API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      tasks: '/api/tasks'
    }
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(HTTP_STATUS.NOT_FOUND).json({
    success: false,
    message: MESSAGES.ERROR.ENDPOINT_NOT_FOUND,
    requestedUrl: req.originalUrl
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('Server error:', error);
  
  // Handle CORS errors
  if (error.message === 'Request blocked by CORS policy') {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      message: 'Request blocked by CORS policy'
    });
  }
  
  res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: MESSAGES.ERROR.INTERNAL_ERROR,
    ...(APP_CONFIG.NODE_ENV === 'development' && { error: error.message })
  });
});

// Graceful shutdown handler
const gracefulShutdown = (signal) => {
  console.log(`Received ${signal}. Starting graceful shutdown...`);
  
  process.exit(0);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Initialize and start server
const startServer = async () => {
  try {
    await taskService.ensureDataDirectory();
    await taskService.initializeDataFile();
    
    app.listen(APP_CONFIG.PORT, () => {
      console.log(`🚀 Task Management API server running on port ${APP_CONFIG.PORT}`);
      console.log(`📊 Environment: ${APP_CONFIG.NODE_ENV}`);
      console.log(`🏥 Health check: http://localhost:${APP_CONFIG.PORT}/api/health`);
      console.log(`📝 Tasks endpoint: http://localhost:${APP_CONFIG.PORT}/api/tasks`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();