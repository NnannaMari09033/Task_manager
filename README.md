# ✨ Modern Task Management Application (Client-Side)

A beautiful and responsive task management application that runs entirely in your browser, using `localStorage` for data persistence.

## 🚀 Features

- ✨ **Modern Glassmorphism UI** - Beautiful glass effects and gradients
- 🎨 **Dark/Light Mode** - Seamless theme switching with persistence
- 📱 **Responsive Design** - Mobile-first approach, works on all devices
- 🔍 **Smart Search & Filter** - Debounced search with real-time filtering
- 📅 **Due Date Management** - Set and track due dates with overdue indicators
-  **Priority System** - Color-coded priority levels (High, Medium, Low)
- ⚡ **Real-time Updates** - Optimistic UI updates with loading states
- 🎭 **Smooth Animations** - Delightful hover effects and transitions
- ♿ **Accessibility** - ARIA labels, keyboard navigation, screen reader support
- 💾 **Local Storage Persistence** - Your tasks are saved in your browser, so they'll be there when you come back. No backend required.

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with concurrent features
- **TypeScript** - Type-safe development with strict typing
- **Material-UI v6** - Modern component library with theming
- **Redux Toolkit** - Predictable state management with async thunks
- **Emotion** - CSS-in-JS styling with theme integration
- **Vite** - Fast build tool with hot module replacement

### Backend
- **None!** This is a fully client-side application. Data is stored in the browser's `localStorage`.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm (v8 or higher) or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd task-management-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

### Running the Application

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`. Your tasks will be saved automatically in your browser.

## 📁 Project Structure

```
task-management-app/
├── src/                          # Frontend source code
│   ├── components/               # React components
│   ├── services/                 # Service layer
│   │   └── taskService.ts       # Task CRUD operations with localStorage
│   ├── store/                    # Redux store configuration
│   ├── types/                    # TypeScript type definitions
│   └── ...                     # Other frontend directories
└── ...                           # Other project files
```

## 🎨 Design System

... (Same as before) ...

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

## 🚀 Deployment

```bash
npm run build
# Deploy the dist/ folder to any static hosting service (e.g., Vercel, Netlify, GitHub Pages)
```

## 🤝 Contributing

... (Same as before) ...

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Material-UI team for the excellent component library
- React team for the powerful framework
- Open source community for inspiration and tools
