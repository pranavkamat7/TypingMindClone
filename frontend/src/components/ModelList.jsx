import React, { useEffect, useState } from 'react';
import api from '../api';
import ModelForm from './ModelForm';

const ModelList = () => {
  const [models, setModels] = useState([]);
  const [editing, setEditing] = useState(null);

  const fetchModels = async () => {
    const res = await api.get('/models');
    setModels(res.data);
  };

  useEffect(() => {
    fetchModels();
  }, []);

  const handleDelete = async (id) => {
    await api.delete(`/models/${id}`);
    alert('Model Deleted Successfully')
    fetchModels();
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Models</h2>
      <ModelForm onSaved={fetchModels} editing={editing} />
      <ul>
        {models.map((model) => (
          <li key={model._id} className="border p-2 my-2 flex justify-between items-center">
            <span>
              <strong>{model.name}</strong> - {model.status}
            </span>
            <div>
              <button onClick={() => setEditing(model)} className="mr-2 text-blue-500">Edit</button>
              <button onClick={() => handleDelete(model._id)} className="text-red-500">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ModelList;
