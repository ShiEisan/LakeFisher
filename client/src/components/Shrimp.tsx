import { useState, useEffect } from 'react';

interface ShrimpProps {
  id: string;
  x: number;
  y: number;
  direction: number; // -1 for left, 1 for right
  speed: number;
  isCaught?: boolean;
  onCatch?: (id: string) => void;
  onPositionUpdate?: (id: string, newX: number, newY: number) => void;
}

export default function Shrimp({ 
  id, 
  x, 
  y, 
  direction, 
  speed, 
  isCaught = false, 
  onCatch, 
  onPositionUpdate 
}: ShrimpProps) {
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
          const newY = prevY + (Math.sin(Date.now() * 0.008) * 0.8);
          onPositionUpdate?.(id, newX, newY);
          return newY;
        });
        
        return newX;
      });
    }, 40); // Faster movement for shrimp

    return () => clearInterval(interval);
  }, [direction, speed, isCaught, isVisible, id, onPositionUpdate]);

  useEffect(() => {
    if (isCaught) {
      setIsVisible(false);
    }
  }, [isCaught]);

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
      data-testid={`shrimp-${id}`}
    >
      <svg width="24" height="12" viewBox="0 0 24 12">
        {/* Shrimp body */}
        <ellipse 
          cx="12" 
          cy="6" 
          rx="10" 
          ry="4" 
          fill="hsl(15, 85%, 65%)"
          className="animate-pulse"
        />
        
        {/* Shrimp segments */}
        <ellipse cx="8" cy="6" rx="3" ry="3" fill="hsl(15, 80%, 60%)" opacity="0.8" />
        <ellipse cx="12" cy="6" rx="3" ry="3" fill="hsl(15, 80%, 60%)" opacity="0.8" />
        <ellipse cx="16" cy="6" rx="3" ry="3" fill="hsl(15, 80%, 60%)" opacity="0.8" />
        
        {/* Shrimp tail */}
        <path 
          d="M2,6 Q4,4 6,6 Q4,8 2,6" 
          fill="hsl(15, 85%, 65%)"
          className="animate-bounce"
        />
        
        {/* Shrimp legs */}
        <line x1="8" y1="8" x2="6" y2="10" stroke="hsl(15, 60%, 50%)" strokeWidth="1" className="animate-pulse" />
        <line x1="12" y1="8" x2="10" y2="10" stroke="hsl(15, 60%, 50%)" strokeWidth="1" className="animate-pulse delay-200" />
        <line x1="16" y1="8" x2="14" y2="10" stroke="hsl(15, 60%, 50%)" strokeWidth="1" className="animate-pulse delay-400" />
        
        {/* Shrimp eyes */}
        <circle cx="18" cy="5" r="1.5" fill="hsl(0, 0%, 10%)" />
        <circle cx="18" cy="7" r="1.5" fill="hsl(0, 0%, 10%)" />
        
        {/* Shrimp antennae */}
        <line x1="20" y1="4" x2="22" y2="2" stroke="hsl(15, 60%, 50%)" strokeWidth="1" className="animate-pulse" />
        <line x1="20" y1="8" x2="22" y2="10" stroke="hsl(15, 60%, 50%)" strokeWidth="1" className="animate-pulse delay-300" />
      </svg>
      
      {/* Points indicator */}
      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-accent text-accent-foreground text-xs px-2 py-1 rounded-full opacity-0 hover:opacity-100 transition-opacity">
        +30
      </div>
    </div>
  );
}