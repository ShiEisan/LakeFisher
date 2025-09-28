import Crab from '../Crab';
import { useState } from 'react';

export default function CrabExample() {
  const [caughtCrabs, setCaughtCrabs] = useState<string[]>([]);
  
  const handleCatch = (id: string) => {
    setCaughtCrabs(prev => [...prev, id]);
    console.log(`Crab ${id} caught! Line broken! -40 points`);
  };

  const crabData = [
    { id: 'crab1', x: 100, y: 90, direction: 1, speed: 0.8 },
    { id: 'crab2', x: 300, y: 85, direction: -1, speed: 1 },
  ];

  return (
    <div className="relative h-48 bg-gradient-to-b from-blue-300 to-blue-600 overflow-hidden">
      {crabData.map(crab => (
        <Crab
          key={crab.id}
          id={crab.id}
          x={crab.x}
          y={crab.y}
          direction={crab.direction}
          speed={crab.speed}
          isCaught={caughtCrabs.includes(crab.id)}
          onCatch={handleCatch}
        />
      ))}
      <div className="absolute top-2 left-2 bg-white/80 p-2 rounded text-sm">
        遇到的螃蟹: {caughtCrabs.length}
      </div>
    </div>
  );
}