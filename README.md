# ✨ Modern Task Management Application

A secure, scalable task management application with a beautiful glassmorphism UI and robust backend integration.

## 🚀 Features

### Frontend
- ✨ **Modern Glassmorphism UI** - Beautiful glass effects and gradients
- 🎨 **Dark/Light Mode** - Seamless theme switching with persistence
- 📱 **Responsive Design** - Mobile-first approach, works on all devices
- 🔍 **Smart Search & Filter** - Debounced search with real-time filtering
- 📅 **Due Date Management** - Set and track due dates with overdue indicators
-  **Priority System** - Color-coded priority levels (High, Medium, Low)
- ⚡ **Real-time Updates** - Optimistic UI updates with loading states
- 🎭 **Smooth Animations** - Delightful hover effects and transitions
- ♿ **Accessibility** - ARIA labels, keyboard navigation, screen reader support

### Backend
- 🔐 **Security First** - Helmet, rate limiting, input validation, CORS protection
- 🏗️ **Scalable Architecture** - Modular design with separation of concerns
- 💾 **Data Persistence** - JSON file storage with atomic operations
- ✅ **Input Validation** - Server-side validation with detailed error messages
- 🚦 **Rate Limiting** - Configurable request limits to prevent abuse
- 📊 **Health Monitoring** - Health check endpoints for monitoring
- 🔧 **Environment Configuration** - Secure configuration management

## 🛠️ Tech Stack

### Frontend
- **React 19** - Latest React with modern features
- **TypeScript** - Type-safe development with strict typing
- **Material-UI v7** - Modern component library with theming
- **Redux Toolkit** - Predictable state management with async thunks
- **Emotion** - CSS-in-JS styling with theme integration
- **Vite** - Fast build tool with hot module replacement

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Minimal web framework
- **Helmet** - Security middleware for HTTP headers
- **Express Rate Limit** - Rate limiting middleware
- **Express Validator** - Input validation and sanitization
- **Compression** - Response compression middleware
- **CORS** - Cross-origin resource sharing configuration

## 🔒 Security Features

### Backend Security
- **Helmet.js** - Sets various HTTP headers for security
- **Rate Limiting** - Prevents brute force attacks and abuse
- **Input Validation** - Sanitizes and validates all user inputs
- **CORS Protection** - Configurable cross-origin request handling
- **Error Handling** - Secure error messages without sensitive data exposure

### Frontend Security
- **XSS Prevention** - Input sanitization and safe rendering
- **Type Safety** - TypeScript prevents runtime errors
- **Secure Storage** - Safe localStorage usage with error handling

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm (v8 or higher)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd task-management-app
```

2. **Install dependencies**
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
npm run server:install
```

3. **Configure environment**
```bash
# Copy environment template
cp server/.env.example server/.env

# Edit server/.env with your configuration
```

### Running the Application

#### Development Mode (Recommended)
```bash
# Run both frontend and backend
npm run full-dev
```

#### Production Mode
```bash
# Start backend
npm run server:start

# Build and serve frontend
npm run build
npm run preview
```

### Access Points
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/api/health

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| GET | `/tasks` | Get all tasks | - |
| POST | `/tasks` | Create a new task | `{ title, description?, dueDate?, priority? }` |
| PUT | `/tasks/:id` | Update a task | `{ title?, description?, dueDate?, priority?, completed? }` |
| DELETE | `/tasks/:id` | Delete a task | - |
| PATCH | `/tasks/:id/toggle` | Toggle task completion | - |
| GET | `/health` | Health check | - |

### Response Format
```json
{
  "success": true,
  "data": {...},
  "message": "Operation completed successfully"
}
```

### Error Response Format
```json
{
  "success": false,
  "message": "Error description",
  "errors": ["Detailed error messages"]
}
```

## 📁 Project Structure

```
task-management-app/
├── src/                          # Frontend source code
│   ├── components/               # React components
│   │   ├── TaskApp.tsx          # Main application component
│   │   ├── TaskCard.tsx         # Individual task card
│   │   ├── TaskForm.tsx         # Task creation/editing form
│   │   ├── TaskList.tsx         # Task list container
│   │   ├── FilterBar.tsx        # Search and filter controls
│   │   └── ThemeToggle.tsx      # Theme switching component
│   ├── services/                # API service layer
│   │   ├── apiClient.ts         # HTTP client with retry logic
│   │   └── taskService.ts       # Task-specific API methods
│   ├── store/                   # Redux store configuration
│   │   ├── store.ts             # Store setup
│   │   └── taskSlice.ts         # Task state management
│   ├── types/                   # TypeScript type definitions
│   │   └── task.types.ts        # Task-related types
│   ├── utils/                   # Utility functions
│   │   └── taskUtils.ts         # Task manipulation utilities
│   ├── hooks/                   # Custom React hooks
│   │   ├── useLocalStorage.ts   # localStorage management
│   │   └── useDebounce.ts       # Debouncing hook
│   ├── config/                  # Configuration constants
│   │   └── constants.ts         # Application constants
│   └── theme/                   # MUI theme configuration
│       └── theme.ts             # Theme definition
├── server/                      # Backend source code
│   ├── config/                  # Configuration files
│   │   └── constants.js         # Server constants
│   ├── controllers/             # Request handlers
│   │   └── taskController.js    # Task CRUD operations
│   ├── middleware/              # Express middleware
│   │   ├── security.js          # Security middleware
│   │   └── validation.js        # Input validation
│   ├── routes/                  # API routes
│   │   └── taskRoutes.js        # Task endpoints
│   ├── services/                # Business logic
│   │   └── taskService.js       # Task data operations
│   ├── data/                    # Data storage
│   │   └── tasks.json           # JSON data file
│   ├── .env                     # Environment variables
│   └── server.js                # Express server setup
└── public/                      # Static assets
```

## 🎨 Design System

### Color Palette
- **Primary**: Indigo gradient (#6366f1 → #4f46e5)
- **Secondary**: Pink gradient (#ec4899 → #db2777)
- **Success**: Emerald (#10b981)
- **Warning**: Amber (#f59e0b)
- **Error**: Red (#ef4444)

### Typography
- **Primary Font**: Poppins (headings, UI elements)
- **Secondary Font**: Inter (body text, descriptions)

### Design Principles
- **Glassmorphism**: Translucent surfaces with backdrop blur
- **Gradient Accents**: Vibrant gradients for interactive elements
- **Smooth Animations**: Cubic-bezier transitions for natural feel
- **Accessibility First**: WCAG 2.1 AA compliance

## 🧪 Development

### Code Quality
```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Build verification
npm run build
```

### Environment Variables

#### Backend (.env)
```env
PORT=5000
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:5173
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

#### Frontend (Vite)
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## 🚀 Deployment

### Frontend Deployment
```bash
npm run build
# Deploy dist/ folder to your hosting service
```

### Backend Deployment
```bash
cd server
npm install --production
NODE_ENV=production npm start
```

## 📊 Performance

### Frontend Optimizations
- **Code Splitting**: Lazy loading of components
- **Debounced Search**: Reduces API calls
- **Memoization**: React.memo and useMemo for expensive operations
- **Bundle Optimization**: Tree shaking and minification

### Backend Optimizations
- **Compression**: Gzip compression for responses
- **Rate Limiting**: Prevents server overload
- **Efficient File I/O**: Atomic write operations
- **Error Handling**: Graceful error recovery

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript strict mode
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Follow the existing code style

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Material-UI team for the excellent component library
- React team for the powerful framework
- Express.js community for the robust web framework
- Open source community for inspiration and tools