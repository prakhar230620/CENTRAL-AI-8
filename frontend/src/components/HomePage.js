import React, { useState, useRef } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';  // Update this if your backend is running on a different port

function HomePage() {
  const [input, setInput] = useState('');
  const [outputText, setOutputText] = useState('');
  const [outputImage, setOutputImage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const audioRef = useRef(null);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/process_input`, { input, type: 'text' });
      handleOutput(response.data.data);
    } catch (error) {
      console.error('Error processing input:', error);
    }
  };

  const handleVoiceInput = () => {
    setIsListening(true);
    const recognition = new window.webkitSpeechRecognition();
    recognition.onresult = async (event) => {
      const voiceInput = event.results[0][0].transcript;
      setInput(voiceInput);
      try {
        const response = await axios.post(`${API_URL}/process_input`, { input: voiceInput, type: 'voice' });
        handleOutput(response.data.data);
      } catch (error) {
        console.error('Error processing voice input:', error);
      }
      setIsListening(false);
    };
    recognition.start();
  };

  const handleOutput = (output) => {
    if (output.type === 'text') {
      setOutputText(output.text);
      setOutputImage('');
      if (audioRef.current) {
        audioRef.current.src = `data:audio/mp3;base64,${output.audio}`;
        audioRef.current.play();
      }
    } else if (output.type === 'image') {
      setOutputText('');
      setOutputImage(output.image_url);
    }
  };

  return (
    <div className="home-page">
      <h1 className="mb-4">AI Integration Platform</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter your query..."
            value={input}
            onChange={handleInputChange}
          />
          <div className="input-group-append">
            <button className="btn btn-primary" type="submit">Submit</button>
            <button className="btn btn-secondary" type="button" onClick={handleVoiceInput} disabled={isListening}>
              {isListening ? 'Listening...' : 'Voice Input'}
            </button>
          </div>
        </div>
      </form>
      {outputText && <div className="alert alert-info mt-3">{outputText}</div>}
      {outputImage && <img src={outputImage} alt="Output" className="img-fluid mt-3" />}
      <audio ref={audioRef} style={{display: 'none'}} />
    </div>
  );
}

export default HomePage;