import Shrimp from '../Shrimp';
import { useState } from 'react';

export default function ShrimpExample() {
  const [caughtShrimp, setCaughtShrimp] = useState<string[]>([]);
  
  const handleCatch = (id: string) => {
    setCaughtShrimp(prev => [...prev, id]);
    console.log(`Shrimp ${id} caught! +30 points`);
  };

  const shrimpData = [
    { id: 'shrimp1', x: 50, y: 60, direction: 1, speed: 2 },
    { id: 'shrimp2', x: 200, y: 80, direction: -1, speed: 1.8 },
  ];

  return (
    <div className="relative h-48 bg-gradient-to-b from-blue-300 to-blue-600 overflow-hidden">
      {shrimpData.map(shrimp => (
        <Shrimp
          key={shrimp.id}
          id={shrimp.id}
          x={shrimp.x}
          y={shrimp.y}
          direction={shrimp.direction}
          speed={shrimp.speed}
          isCaught={caughtShrimp.includes(shrimp.id)}
          onCatch={handleCatch}
        />
      ))}
      <div className="absolute top-2 left-2 bg-white/80 p-2 rounded text-sm">
        捕獲的蝦子: {caughtShrimp.length}
      </div>
    </div>
  );
}