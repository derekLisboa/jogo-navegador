import React, { useState, useEffect } from 'react';
import Lobby from './Lobby/Lobby';
import Game from './Game/Game';
import './App.css';

export default function KpopQuizGame() {
  const [players, setPlayers] = useState([]);
  const [lobby, setLobby] = useState(true);

  return (
    <div className="app-container">
      <h1 className="main-title">K-pop Music Quiz</h1>
      {lobby ? <Lobby players={players} setPlayers={setPlayers} setLobby={setLobby} /> : <Game players={players} setPlayers={setPlayers} />}
    </div>
  );
} 
