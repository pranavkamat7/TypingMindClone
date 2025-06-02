import React, { useEffect, useState } from 'react';
import api from '../api';

const ModelForm = ({ onSaved, editing }) => {
  const [form, setForm] = useState({
    name: '',
    description: '',
    apiEndpoint: '',
    status: 'active',
  });

  useEffect(() => {
    if (editing) {
      setForm(editing);
    }
  }, [editing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      await api.put(`/models/${editing._id}`, form);
    } else {
      await api.post('/models', form);
    }
    setForm({ name: '', description: '', apiEndpoint: '', status: 'active' });

    if(editing){
      alert('Model Updated Successfully')
    }else{
      alert('Model Saved Successfully')
    }
    
    onSaved();
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input name="name" placeholder="Model name" value={form.name} onChange={handleChange} required className="mr-2" />
      <input name="description" placeholder="Description" value={form.description} onChange={handleChange} className="mr-2" />
      <input name="apiEndpoint" placeholder="API Endpoint" value={form.apiEndpoint} onChange={handleChange} className="mr-2" />
      <select name="status" value={form.status} onChange={handleChange} className="p-2 rounded bg-gray-800 text-white border border-gray-600">
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
      <button type="submit" className="bg-blue-500 text-white px-2 py-1 ml-5">{editing ? 'Update' : 'Add'}</button>
    </form>
  );
};

export default ModelForm;
