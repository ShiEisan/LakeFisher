import { useState, useEffect } from 'react';

interface CrabProps {
  id: string;
  x: number;
  y: number;
  direction: number; // -1 for left, 1 for right
  speed: number;
  isCaught?: boolean;
  onCatch?: (id: string) => void;
  onPositionUpdate?: (id: string, newX: number, newY: number) => void;
}

export default function Crab({ 
  id, 
  x, 
  y, 
  direction, 
  speed, 
  isCaught = false, 
  onCatch, 
  onPositionUpdate 
}: CrabProps) {
  const [currentX, setCurrentX] = useState(x);
  const [currentY, setCurrentY] = useState(y);
  const [isVisible, setIsVisible] = useState(true);

  // Swimming animation - continuous movement
  useEffect(() => {
    if (isCaught || !isVisible) return;

    const interval = setInterval(() => {
      setCurrentX(prevX => {
        const newX = prevX + (direction * speed);
        
        // Bottom dwelling movement
        setCurrentY(prevY => {
          const newY = prevY + (Math.sin(Date.now() * 0.003) * 0.3);
          onPositionUpdate?.(id, newX, newY);
          return newY;
        });
        
        return newX;
      });
    }, 60); // Slower movement for crab

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
      data-testid={`crab-${id}`}
    >
      <svg width="28" height="20" viewBox="0 0 28 20">
        {/* Crab body */}
        <ellipse 
          cx="14" 
          cy="12" 
          rx="8" 
          ry="6" 
          fill="hsl(0, 60%, 45%)"
          className="animate-pulse"
        />
        
        {/* Crab shell pattern */}
        <ellipse cx="14" cy="12" rx="6" ry="4" fill="hsl(0, 65%, 40%)" opacity="0.8" />
        <ellipse cx="14" cy="12" rx="4" ry="2.5" fill="hsl(0, 70%, 35%)" opacity="0.6" />
        
        {/* Crab claws */}
        <ellipse 
          cx="6" 
          cy="10" 
          rx="3" 
          ry="2" 
          fill="hsl(0, 60%, 45%)"
          className="animate-pulse delay-200"
        />
        <ellipse 
          cx="22" 
          cy="10" 
          rx="3" 
          ry="2" 
          fill="hsl(0, 60%, 45%)"
          className="animate-pulse delay-400"
        />
        
        {/* Crab legs */}
        <line x1="8" y1="16" x2="6" y2="18" stroke="hsl(0, 50%, 40%)" strokeWidth="2" className="animate-pulse" />
        <line x1="11" y1="17" x2="9" y2="19" stroke="hsl(0, 50%, 40%)" strokeWidth="2" className="animate-pulse delay-100" />
        <line x1="17" y1="17" x2="19" y2="19" stroke="hsl(0, 50%, 40%)" strokeWidth="2" className="animate-pulse delay-200" />
        <line x1="20" y1="16" x2="22" y2="18" stroke="hsl(0, 50%, 40%)" strokeWidth="2" className="animate-pulse delay-300" />
        
        {/* Crab eyes */}
        <circle cx="11" cy="8" r="1.5" fill="hsl(0, 0%, 10%)" className="animate-pulse" />
        <circle cx="17" cy="8" r="1.5" fill="hsl(0, 0%, 10%)" className="animate-pulse delay-500" />
        
        {/* Eye stalks */}
        <line x1="11" y1="8" x2="11" y2="6" stroke="hsl(0, 50%, 40%)" strokeWidth="1" />
        <line x1="17" y1="8" x2="17" y2="6" stroke="hsl(0, 50%, 40%)" strokeWidth="1" />
      </svg>
      
      {/* Warning indicator */}
      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-destructive text-destructive-foreground text-xs px-2 py-1 rounded-full opacity-0 hover:opacity-100 transition-opacity">
        ⚠️ -40
      </div>
    </div>
  );
}