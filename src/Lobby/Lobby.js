import React, { useState, useEffect } from 'react';
import '../Lobby/Lobby.css';

function Lobby({ players, setPlayers, setLobby }) {
  const [playerName, setPlayerName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const enterLobby = () => {
    if (playerName.trim()) {
      const nameExists = players.some(player => player.name.toLowerCase() === playerName.trim().toLowerCase());
      if (nameExists) {
        setErrorMessage('Esse usuário já existe');
      } else if (players.length < 8) {
        setPlayers([...players, { name: playerName, score: 0 }]);
        setPlayerName('');
        setErrorMessage('');
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      enterLobby();
    }
  };

  return (
    <div className="lobby-container">
      <h2 className="title">Digite seu nome para entrar no lobby:</h2>
      <input
        type="text"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        onKeyDown={handleKeyPress}
        className="input"
        placeholder="Seu nome"
        disabled={players.length >= 8}
      />
      <button 
        onClick={enterLobby} 
        className="button"
        disabled={players.length >= 8}
      >
        {players.length >= 8 ? 'Lobby cheio' : 'Entrar'}
      </button>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <h2 className="subtitle">Jogadores no lobby:</h2>
      <ul className="player-list">
        {players.map((player, index) => (
          <li key={index}>{player.name}</li>
        ))}
      </ul>
      {players.length > 1 && (
        <button onClick={() => setLobby(false)} className="button start-button">
          Iniciar Jogo
        </button>
      )}
    </div>
  );
}

export default Lobby;