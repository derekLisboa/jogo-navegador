import React, { useState, useEffect } from 'react';
import '../Game/Game.css'


function Game({ players, setPlayers }) {
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [letter, setLetter] = useState('');
  const [timer, setTimer] = useState(60);
  const [input, setInput] = useState('');
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [message, setMessage] = useState('');
  const [kpopSongs, setKpopSongs] = useState([]);
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    fetch('/songs.json')
      .then(response => response.json())
      .then(data => setKpopSongs(data.songs))
      .catch(error => console.error('Erro ao carregar músicas:', error));
  }, []);

  useEffect(() => {
    if (countdown > 0) {
      const countdownTimer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(countdownTimer);
    } else {
      setLetter(String.fromCharCode(65 + Math.floor(Math.random() * 26)));
      setTimer(60);
      setCorrectAnswers([]);
      setMessage('');
      setPlayers(players.map(player => ({ ...player, score: 0 })));
    }
  }, [countdown]);

  useEffect(() => {
    if (timer > 0 && countdown === 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    }
  }, [timer, countdown]);

  const checkAnswer = () => {
    const normalizedInput = input.trim().toLowerCase();
    const normalizedSongs = kpopSongs.map(song => song.toLowerCase());

    if (normalizedSongs.includes(normalizedInput) && input.charAt(0).toUpperCase() === letter && !correctAnswers.includes(normalizedInput)) {
      setCorrectAnswers([...correctAnswers, normalizedInput]);
      setMessage('Resposta certa!');

      const updatedPlayers = players.map((player, index) => {
        if (index === currentPlayerIndex) {
          return { ...player, score: player.score + 10 };
        }
        return player;
      });

      setPlayers(updatedPlayers);
      setCurrentPlayerIndex((currentPlayerIndex + 1) % players.length);
    } else {
      setMessage('Resposta errada!');
    }
    setInput('');
  };

  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

  return (
    <div className="game-container">
      {countdown > 0 ? (
        <h2 className="countdown">Preparar! <br></br><span className='countdown-number'>{countdown}</span></h2>
        
      ) : (
        <div className="game-content">
          <div className='timer-letter'>
            <h1 className={`timer ${timer <= 10 ? 'red' : 'green'}`}>{timer}s</h1>
            <h2 className="letter-display">Letra: </h2>
            <span className="highlight">{letter}</span>
          </div>
          <div className="game-left">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
              className="input"
              placeholder="Digite o nome da música"
            />
            <p className="message">{message}</p>
          </div>
          <div className="ranking-container">
            <h2 className="subtitle">Ranking:</h2>
            <ul className="ranking-list">
              {sortedPlayers.map((player, index) => (
                <li key={index} className="ranking-item">{player.name}: <span className="score">{player.score}</span> pontos</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Game;