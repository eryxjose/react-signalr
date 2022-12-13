import React from 'react';
import ChatMessage from '../features/chatMessages/chatMessage';
import './styles.css';

function App() {


  return (
    <div className="App">
      <header className="App-header">
        <p>
          Chat
        </p>
        <ChatMessage />
        
      </header>
    </div>
  );
}

export default App;
