# ✨ Modern Task Management Application (Supabase Edition)

A secure, scalable task management application with a beautiful glassmorphism UI, now powered by Supabase.

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
- ☁️ **Supabase Backend** - Reliable, scalable, and secure backend powered by Supabase.

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with concurrent features
- **TypeScript** - Type-safe development with strict typing
- **Material-UI v6** - Modern component library with theming
- **Redux Toolkit** - Predictable state management with async thunks
- **Emotion** - CSS-in-JS styling with theme integration
- **Vite** - Fast build tool with hot module replacement

### Backend
- **Supabase** - The Open Source Firebase Alternative for building secure and scalable backends.
  - **PostgreSQL Database** for data persistence.
  - **Authentication** for user management.
  - **Instant APIs** for automatic API generation.
  - **Realtime Subscriptions** for live data synchronization.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm (v8 or higher) or yarn
- A Supabase account and project

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

3. **Configure Supabase**
   - **Create a `.env` file** in the root of the project by copying the `.env.example` file:
     ```bash
     cp .env.example .env
     ```
   - **Update the `.env` file** with your Supabase project URL and public `anon` key. You can find these in your Supabase project dashboard under **Project Settings > API**.
     ```env
     VITE_SUPABASE_URL="YOUR_SUPABASE_URL"
     VITE_SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_KEY"
     ```
   - **Create the `tasks` table** in your Supabase database. You can use the following SQL script in the Supabase SQL Editor:
     ```sql
     CREATE TABLE tasks (
       id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
       created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
       title TEXT NOT NULL,
       description TEXT,
       due_date TIMESTAMP WITH TIME ZONE,
       priority TEXT NOT NULL DEFAULT 'Medium',
       completed BOOLEAN NOT NULL DEFAULT false
     );

     -- Optional: Enable Row Level Security (RLS) for multi-tenancy if you add user authentication
     -- ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
     ```

### Running the Application

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`.

## 📁 Project Structure

```
task-management-app/
├── src/                          # Frontend source code
│   ├── components/               # React components
│   ├── services/                 # Service layer
│   │   ├── supabaseClient.ts    # Supabase client initialization
│   │   └── taskService.ts       # Task-specific Supabase methods
│   ├── store/                    # Redux store configuration
│   ├── types/                    # TypeScript type definitions
│   └── ...                     # Other frontend directories
├── .env.example                  # Example environment variables
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
# Deploy the dist/ folder to your hosting service (e.g., Vercel, Netlify)
```
Make sure to set your Supabase environment variables in your hosting provider's settings.

## 🤝 Contributing

... (Same as before) ...

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Material-UI team for the excellent component library
- React team for the powerful framework
- Supabase team for the amazing backend platform
- Open source community for inspiration and tools
