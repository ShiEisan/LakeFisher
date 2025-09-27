import ScoreDisplay from '../ScoreDisplay';
import { useState, useEffect } from 'react';

export default function ScoreDisplayExample() {
  const [fishCaught, setFishCaught] = useState(5);
  const [totalScore, setTotalScore] = useState(125);
  const [timeRemaining, setTimeRemaining] = useState(120);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(prev => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-48 bg-gradient-to-b from-blue-200 to-green-100">
      <ScoreDisplay 
        fishCaught={fishCaught}
        totalScore={totalScore}
        timeRemaining={timeRemaining}
      />
      <div className="absolute bottom-4 left-4 space-x-2">
        <button 
          onClick={() => {
            setFishCaught(prev => prev + 1);
            setTotalScore(prev => prev + 25);
          }}
          className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
        >
          +1 魚
        </button>
        <button 
          onClick={() => setTimeRemaining(120)}
          className="bg-green-500 text-white px-3 py-1 rounded text-sm"
        >
          重置時間
        </button>
      </div>
    </div>
  );
}