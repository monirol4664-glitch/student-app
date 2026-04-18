import React from 'react';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

const App: React.FC = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Student App</h1>
      <p>Your app is working perfectly on Android!</p>
      <button 
        onClick={() => alert('Hello from your phone!')}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#3880ff',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer'
        }}
      >
        Tap Me
      </button>
    </div>
  );
};

export default App;
