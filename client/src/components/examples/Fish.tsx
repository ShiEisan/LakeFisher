import Fish from '../Fish';
import { useState } from 'react';

export default function FishExample() {
  const [caughtFish, setCaughtFish] = useState<string[]>([]);
  
  const handleCatch = (id: string) => {
    setCaughtFish(prev => [...prev, id]);
    console.log(`Fish ${id} caught!`);
  };

  const fishData = [
    { id: 'fish1', x: 50, y: 50, type: 'small' as const },
    { id: 'fish2', x: 150, y: 80, type: 'medium' as const },
    { id: 'fish3', x: 250, y: 60, type: 'large' as const },
  ];

  return (
    <div className="relative h-48 bg-gradient-to-b from-blue-300 to-blue-500 overflow-hidden">
      {fishData.map(fish => (
        <Fish
          key={fish.id}
          id={fish.id}
          x={fish.x}
          y={fish.y}
          type={fish.type}
          isCaught={caughtFish.includes(fish.id)}
          onCatch={handleCatch}
        />
      ))}
      <div className="absolute top-2 left-2 bg-white/80 p-2 rounded text-sm">
        捕獲的魚: {caughtFish.length}
      </div>
    </div>
  );
}