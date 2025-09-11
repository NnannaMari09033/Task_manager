import React from 'react';
import TaskApp from './src/components/TaskApp';


const App: React.FC = () => {
  // Debug: Log Supabase env variables
  console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
  console.log('Supabase Key:', import.meta.env.VITE_SUPABASE_ANON_KEY);

  // Test render message
  return (
    <div>
      <h1 style={{textAlign: 'center', color: 'red'}}>Test Render</h1>
      <TaskApp />
    </div>
  );
};

export default App;