import React, { useState } from 'react';
import axios from 'axios';


const API_URL = 'http://localhost:5000/api';

function AddAIPage() {
  const [aiData, setAiData] = useState({
    name: '',
    type: 'api',
    description: '',
    config: {}
  });

  const handleInputChange = (e) => {
    setAiData({ ...aiData, [e.target.name]: e.target.value });
  };

  const handleConfigChange = (e) => {
    setAiData({
      ...aiData,
      config: { ...aiData.config, [e.target.name]: e.target.value }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/add_ai`, aiData);
      alert('AI added successfully!');
      setAiData({ name: '', type: 'api', description: '', config: {} });
    } catch (error) {
      console.error('Error adding AI:', error);
      alert('Error adding AI. Please try again.');
    }
  };

  return (
    <div className="add-ai-page">
      <h2>Add New AI Service</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" className="form-control" name="name" value={aiData.name} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label>Type:</label>
          <select className="form-control" name="type" value={aiData.type} onChange={handleInputChange}>
            <option value="api">API</option>
            <option value="bot">Bot</option>
            <option value="local_ai">Local AI</option>
            <option value="custom_ai">Custom AI</option>
          </select>
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea className="form-control" name="description" value={aiData.description} onChange={handleInputChange} required />
        </div>
        {aiData.type === 'api' && (
          <>
            <div className="form-group">
              <label>API Key:</label>
              <input type="text" className="form-control" name="api_key" onChange={handleConfigChange} required />
            </div>
            <div className="form-group">
              <label>Endpoint:</label>
              <input type="text" className="form-control" name="endpoint" onChange={handleConfigChange} required />
            </div>
          </>
        )}
        {aiData.type === 'bot' && (
          <div className="form-group">
            <label>Module Name:</label>
            <input type="text" className="form-control" name="module_name" onChange={handleConfigChange} required />
          </div>
        )}
        {aiData.type === 'local_ai' && (
          <div className="form-group">
            <label>Command:</label>
            <input type="text" className="form-control" name="command" onChange={handleConfigChange} required />
          </div>
        )}
        {aiData.type === 'custom_ai' && (
          <div className="form-group">
            <label>Module Name:</label>
            <input type="text" className="form-control" name="module_name" onChange={handleConfigChange} required />
          </div>
        )}
        <button type="submit" className="btn btn-primary">Add AI</button>
      </form>
    </div>
  );
}

export default AddAIPage;