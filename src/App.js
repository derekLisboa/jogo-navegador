import React, { useState, useEffect } from 'react';

function Lobby({ players, setPlayers, setLobby }) {
  const [playerName, setPlayerName] = useState('');

  const enterLobby = () => {
    if (playerName.trim()) {
      setPlayers([...players, { name: playerName, score: 0 }]);
      setPlayerName('');
    }
  };

  return (
    <div className="text-center bg-white bg-opacity-20 backdrop-blur-md rounded-xl p-6 shadow-xl">
      <h2 className="text-3xl mb-4 font-semibold">Digite seu nome para entrar no lobby:</h2>
      <input
        type="text"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        className="p-3 border border-gray-300 rounded-lg text-black w-full focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        placeholder="Seu nome"
      />
      <button onClick={enterLobby} className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded-full text-xl shadow-lg transition-transform transform hover:scale-105">
        Entrar
      </button>
      <h2 className="text-2xl mt-6 mb-2 font-semibold">Jogadores no lobby:</h2>
      <ul className="list-disc text-left text-lg">
        {players.map((player, index) => (
          <li key={index}>{player.name}</li>
        ))}
      </ul>
      {players.length >1 && (
        <button onClick={() => setLobby(false)} className="mt-6 px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-full text-2xl shadow-lg transition-transform transform hover:scale-105">
          Iniciar Jogo
        </button>
      )}
    </div>
  );
}

export default function KpopQuizGame() {
  const [players, setPlayers] = useState([]);
  const [lobby, setLobby] = useState(true);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 p-4 text-white">
      <h1 className="text-5xl font-extrabold mb-6 drop-shadow-lg">K-pop music Quiz </h1>
      {lobby ? <Lobby players={players} setPlayers={setPlayers} setLobby={setLobby} />: ''}
    </div>
  );
} 
