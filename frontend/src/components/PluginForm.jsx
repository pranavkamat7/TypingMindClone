import React, { useEffect, useState } from 'react';
import api from '../api';

const PluginForm = ({ onSaved, editing }) => {
  const [form, setForm] = useState({
    name: '',
    description: '',
    version: '',
    enabled: false,
  });

  useEffect(() => {
    if (editing) {
      setForm(editing);
    }
  }, [editing]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      await api.put(`/plugins/${editing._id}`, form);
    } else {
      await api.post('/plugins', form);
    }
    setForm({ name: '', description: '', version: '', enabled: false });
    if(editing){
      alert('Plugin Updated Successfully')
    }else{
      alert('Plugin Saved Successfully')
    }
    onSaved();
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input name="name" placeholder="Plugin name" value={form.name} onChange={handleChange} required className="mr-2" />
      <input name="description" placeholder="Description" value={form.description} onChange={handleChange} className="mr-2" />
      <input name="version" placeholder="Version" value={form.version} onChange={handleChange} className="mr-2" />
      <label className="mr-2">
        <input type="checkbox" name="enabled" checked={form.enabled} onChange={handleChange} />
        Enabled
      </label>
      <button type="submit" className="bg-green-500 text-white px-2 py-1 ml-5">{editing ? 'Update' : 'Add'}</button>
    </form>
  );
};

export default PluginForm;
