import React from 'react';

const Sidebar = ({ onSelect }) => {
  return (
    <div className="hidden md:block fixed left-0 top-0 h-full w-48 bg-gray-900 text-white p-4 border-r border-gray-700">
      <h2 className="text-xl font-bold mb-6">Settings</h2>
      <button
        className="w-full text-left p-2 mb-2 hover:bg-gray-800 rounded"
        onClick={() => onSelect('chat')}
      >
        🗯️ AI Chat
      </button>
      <button
        className="w-full text-left p-2 mb-2 hover:bg-gray-800 rounded"
        onClick={() => onSelect('models')}
      >
        🤖 Manage Models
      </button>
      <button
        className="w-full text-left p-2 hover:bg-gray-800 rounded"
        onClick={() => onSelect('plugins')}
      >
        🧩 Manage Plugins
      </button>
    </div>
  );
};


export default Sidebar;
