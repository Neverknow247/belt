import React, {useState, useEffect} from 'react';
import './App.css';
import Main from './views/Main';
import {Router} from '@reach/router';
import PetDisplay from './components/PetDisplay';
import PetUpdate from './components/PetUpdate';
import PetForm from './components/PetForm';
import io from "socket.io-client"

function App() {
  const [socket] = useState(() => io(':8000'));

  useEffect(()=>{
    console.log('Us this running?');
    socket.on('Welcome', data => console.log(data));
    return () => socket.disconnect(true);
  },[]);
  return (
    <div className="App">
      <Router>
        <Main path="/" />
        <PetDisplay path="/:id" />
        <PetUpdate path="/:id/edit" />
        <PetForm path="/pets/new" />
      </Router>
    </div>
  );
}

export default App;