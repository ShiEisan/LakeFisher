import GameControls from '../GameControls';
import { useState } from 'react';

export default function GameControlsExample() {
  const [isCasting, setIsCasting] = useState(false);
  const [gameState, setGameState] = useState<'playing' | 'paused' | 'ended'>('playing');

  const handleCast = () => {
    setIsCasting(true);
    setTimeout(() => setIsCasting(false), 2000);
    console.log('Cast triggered');
  };

  const handleRestart = () => {
    setGameState('playing');
    setIsCasting(false);
    console.log('Game restarted');
  };

  return (
    <div className="relative h-48 bg-gradient-to-b from-blue-200 to-green-100 flex items-end justify-center">
      <GameControls 
        onCast={handleCast}
        onRestart={handleRestart}
        isCasting={isCasting}
        gameState={gameState}
      />
      <div className="absolute top-4 left-4 space-x-2">
        <button 
          onClick={() => setGameState('playing')}
          className="bg-green-500 text-white px-3 py-1 rounded text-sm"
        >
          進行中
        </button>
        <button 
          onClick={() => setGameState('paused')}
          className="bg-yellow-500 text-white px-3 py-1 rounded text-sm"
        >
          暫停
        </button>
        <button 
          onClick={() => setGameState('ended')}
          className="bg-red-500 text-white px-3 py-1 rounded text-sm"
        >
          結束
        </button>
      </div>
    </div>
  );
}