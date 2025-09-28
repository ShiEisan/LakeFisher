import { useState, useEffect } from 'react';

interface FishProps {
  id: string;
  x: number;
  y: number;
  direction: number; // -1 for left, 1 for right
  speed: number;
  type?: 'small' | 'medium' | 'large';
  isCaught?: boolean;
  onCatch?: (id: string) => void;
  onPositionUpdate?: (id: string, newX: number, newY: number) => void;
}

export default function Fish({ 
  id, 
  x, 
  y, 
  direction, 
  speed, 
  type = 'small', 
  isCaught = false, 
  onCatch, 
  onPositionUpdate 
}: FishProps) {
  const [currentX, setCurrentX] = useState(x);
  const [currentY, setCurrentY] = useState(y);
  const [isVisible, setIsVisible] = useState(true);

  // Swimming animation - continuous movement
  useEffect(() => {
    if (isCaught || !isVisible) return;

    const interval = setInterval(() => {
      setCurrentX(prevX => {
        const newX = prevX + (direction * speed);
        
        // Small vertical movement for natural swimming
        setCurrentY(prevY => {
          const newY = prevY + (Math.sin(Date.now() * 0.005) * 0.5);
          onPositionUpdate?.(id, newX, newY);
          return newY;
        });
        
        return newX;
      });
    }, 50); // 20 FPS movement

    return () => clearInterval(interval);
  }, [direction, speed, isCaught, isVisible, id, onPositionUpdate]);

  useEffect(() => {
    if (isCaught) {
      setIsVisible(false);
    }
  }, [isCaught]);

  const sizes = {
    small: { width: 20, height: 12, points: 10 },
    medium: { width: 30, height: 18, points: 25 },
    large: { width: 40, height: 24, points: 50 }
  };

  const size = sizes[type];
  const colors = {
    small: 'hsl(45, 80%, 60%)',
    medium: 'hsl(20, 70%, 55%)',
    large: 'hsl(10, 75%, 50%)'
  };

  if (!isVisible) return null;

  return (
    <div 
      className="absolute cursor-pointer hover:scale-110 transition-transform z-10"
      style={{ 
        left: currentX, 
        top: currentY,
        transform: `scaleX(${direction})`,
        transition: 'transform 0.1s ease-out'
      }}
      onClick={() => onCatch?.(id)}
      data-testid={`fish-${id}`}
    >
      <svg width={size.width} height={size.height} viewBox={`0 0 ${size.width} ${size.height}`}>
        {/* Fish body with swimming animation */}
        <ellipse 
          cx={size.width * 0.4} 
          cy={size.height * 0.5} 
          rx={size.width * 0.3} 
          ry={size.height * 0.35} 
          fill={colors[type]}
          className="animate-pulse"
        />
        
        {/* Fish tail with wiggle animation */}
        <polygon 
          points={`${size.width * 0.1},${size.height * 0.3} ${size.width * 0.1},${size.height * 0.7} 0,${size.height * 0.5}`}
          fill={colors[type]}
          className="animate-bounce"
        />
        
        {/* Fish eye */}
        <circle 
          cx={size.width * 0.5} 
          cy={size.height * 0.4} 
          r={size.width * 0.08} 
          fill="white"
        />
        <circle 
          cx={size.width * 0.52} 
          cy={size.height * 0.38} 
          r={size.width * 0.04} 
          fill="black"
        />
        
        {/* Fish fins with movement */}
        <ellipse 
          cx={size.width * 0.35} 
          cy={size.height * 0.7} 
          rx={size.width * 0.1} 
          ry={size.height * 0.15} 
          fill={colors[type]}
          opacity="0.8"
          className="animate-pulse"
        />
      </svg>
      
      {/* Points indicator */}
      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-accent text-accent-foreground text-xs px-2 py-1 rounded-full opacity-0 hover:opacity-100 transition-opacity">
        +{size.points}
      </div>
      
    </div>
  );
}