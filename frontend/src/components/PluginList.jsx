import React, { useEffect, useState } from 'react';
import api from '../api';
import PluginForm from './PluginForm';

const PluginList = () => {
  const [plugins, setPlugins] = useState([]);
  const [editing, setEditing] = useState(null);

  const fetchPlugins = async () => {
    const res = await api.get('/plugins');
    setPlugins(res.data);
  };

  useEffect(() => {
    fetchPlugins();
  }, []);

  const handleDelete = async (id) => {
    await api.delete(`/plugins/${id}`);
    fetchPlugins();
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Plugins</h2>
      <PluginForm onSaved={fetchPlugins} editing={editing} />
      <ul>
        {plugins.map((plugin) => (
          <li key={plugin._id} className="border p-2 my-2 flex justify-between items-center">
            <span>
              <strong>{plugin.name}</strong> - {plugin.version} - {plugin.enabled ? "Enabled" : "Disabled"}
            </span>
            <div>
              <button onClick={() => setEditing(plugin)} className="mr-2 text-blue-500">Edit</button>
              <button onClick={() => handleDelete(plugin._id)} className="text-red-500">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PluginList;
