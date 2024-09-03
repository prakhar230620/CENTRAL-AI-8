import React, { useState, useEffect } from 'react';
import axios from 'axios';


const API_URL = 'http://localhost:5000/api';

function AIManagerPage() {
  const [aiList, setAiList] = useState([]);

  useEffect(() => {
    fetchAIList();
  }, []);

  const fetchAIList = async () => {
    try {
      const response = await axios.get(`${API_URL}/get_all_ai`);
      setAiList(response.data.data);
    } catch (error) {
      console.error('Error fetching AI list:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this AI?')) {
      try {
        await axios.delete(`${API_URL}/delete_ai`, { data: { id } });
        fetchAIList();
      } catch (error) {
        console.error('Error deleting AI:', error);
      }
    }
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      await axios.put(`${API_URL}/update_ai`, { id, data: updatedData });
      fetchAIList();
    } catch (error) {
      console.error('Error updating AI:', error);
    }
  };

  return (
    <div className="ai-manager-page">
      <h2>AI Manager</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {aiList.map((ai) => (
            <tr key={ai.id}>
              <td>{ai.name}</td>
              <td>{ai.type}</td>
              <td>{ai.description}</td>
              <td>
                <button className="btn btn-sm btn-danger mr-2" onClick={() => handleDelete(ai.id)}>Delete</button>
                <button className="btn btn-sm btn-primary" onClick={() => handleUpdate(ai.id, { ...ai, name: ai.name + ' (Updated)' })}>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AIManagerPage;