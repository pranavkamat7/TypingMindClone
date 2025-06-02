import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ChatInterface from './components/ChatInterface';
import ModelList from './components/ModelList';
import PluginList from './components/PluginList';
import LoginForm from './components/Login';
import SignupForm from './components/Signup';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

function MainApp() {
  const [view, setView] = useState('chat');

  return (
    <div className="flex min-h-screen bg-gray-800 text-white">
      <Sidebar onSelect={setView} />

      <div className="flex-1 md:ml-48 p-4 pb-20">
        <h1 className="text-2xl font-bold mb-4 text-center">TypingMind Clone</h1>
        {view === 'chat' && <ChatInterface />}
        {view === 'models' && (
          <div className="mt-6 bg-gray-900 p-4 rounded">
            <ModelList />
          </div>
        )}
        {view === 'plugins' && (
          <div className="mt-6 bg-gray-900 p-4 rounded">
            <PluginList />
          </div>
        )}
      </div>

      <div className="fixed bottom-0 w-full flex md:hidden bg-gray-900 text-white border-t border-gray-700">
        <button
          className={`flex-1 p-3 ${view === 'chat' ? 'bg-gray-700' : ''}`}
          onClick={() => setView('chat')}
        >
          🗯️ AI Chat
        </button>
        <button
          className={`flex-1 p-3 ${view === 'plugins' ? 'bg-gray-700' : ''}`}
          onClick={() => setView('plugins')}
        >
          🧩 Plugins
        </button>
        <button
          className={`flex-1 p-3 ${view === 'models' ? 'bg-gray-700' : ''}`}
          onClick={() => setView('models')}
        >
          🤖 Models
        </button>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <MainApp />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
