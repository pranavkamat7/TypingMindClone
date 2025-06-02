import React, { useEffect, useState } from 'react';
import api from '../api';

const ChatInterface = () => {
  const [models, setModels] = useState([]);
  const [plugins, setPlugins] = useState([]);
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedPlugins, setSelectedPlugins] = useState([]);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const [modelRes, pluginRes] = await Promise.all([
        api.get('/models'),
        api.get('/plugins'),
      ]);
      setModels(modelRes.data.filter(m => m.status === 'active'));
      setPlugins(pluginRes.data.filter(p => p.enabled));
    };
    fetchData();
  }, []);

  const handlePluginToggle = (pluginId) => {
    setSelectedPlugins(prev =>
      prev.includes(pluginId)
        ? prev.filter(id => id !== pluginId)
        : [...prev, pluginId]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(selectedModel == ''){
      alert('Please Select any model to proceed')
    }
    if (!userInput.trim() || !selectedModel) return;

    

    const userMessage = { role: 'user', text: userInput };
    const botMessage = {
      role: 'bot',
      text: `Mocked response to "${userInput}" using model "${selectedModel}" and plugins: ${selectedPlugins.join(', ')}`,
    };

    setMessages(prev => [...prev, userMessage, botMessage]);
    setUserInput('');
  };

  return (
    <div className="p-4 border mt-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-2">AI Chat Interface</h2>

      <div className="flex flex-wrap items-center gap-4 mb-4">
        {/* Model Selection Dropdown */}
        <select
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
          className="p-2 rounded bg-gray-800 text-white border border-gray-600"
        >
          <option value="">Select Model</option>
          {models.map((model) => (
            <option key={model._id} value={model.name}>
              {model.name}
            </option>
          ))}
        </select>

        {/* Plugin Checkboxes */}
        <div className="flex flex-wrap items-center gap-3">
          {plugins.map((plugin) => (
            <label
              key={plugin._id}
              className="flex items-center space-x-1 text-sm bg-gray-700 px-2 py-1 rounded"
            >
              <input
                type="checkbox"
                checked={selectedPlugins.includes(plugin.name)}
                onChange={() => handlePluginToggle(plugin.name)}
              />
              <span>{plugin.name}</span>
            </label>
          ))}
        </div>
      </div>


      {/* Chat Box */}
      <div className="h-64 overflow-y-auto border p-3 bg-gray-100 mb-4 rounded">
        {messages.map((msg, idx) => (
          <div key={idx} className={`mb-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block px-3 py-2 rounded ${msg.role === 'user' ? 'bg-blue-400' : 'bg-green-400'}`}>
              {msg.text}
            </span>
          </div>
        ))}
      </div>

      {/* Input Box */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-grow border p-2 rounded"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded" >Send</button>
      </form>
    </div>
  );
};

export default ChatInterface;
