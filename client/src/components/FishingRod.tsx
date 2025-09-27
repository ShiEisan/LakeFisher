import { useState, useEffect } from 'react';

interface FishingRodProps {
  isCasting?: boolean;
  onCast?: () => void;
  lineLength?: number;
}

export default function FishingRod({ isCasting = false, onCast, lineLength = 100 }: FishingRodProps) {
  const [rodAngle, setRodAngle] = useState(45);

  useEffect(() => {
    if (isCasting) {
      setRodAngle(80);
      setTimeout(() => setRodAngle(45), 1000);
    }
  }, [isCasting]);

  return (
    <div className="absolute bottom-1/3 left-16 z-30" data-testid="fishing-rod">
      <svg width="150" height="200" viewBox="0 0 150 200" className="cursor-pointer" onClick={onCast}>
        {/* Fishing rod */}
        <line 
          x1="20" 
          y1="180" 
          x2={20 + Math.cos((rodAngle * Math.PI) / 180) * 80} 
          y2={180 - Math.sin((rodAngle * Math.PI) / 180) * 80}
          stroke="hsl(30, 40%, 35%)" 
          strokeWidth="4" 
          strokeLinecap="round"
          className={isCasting ? "animate-pulse" : ""}
        />
        
        {/* Rod handle */}
        <rect x="15" y="175" width="10" height="20" rx="2" fill="hsl(0, 0%, 20%)" />
        
        {/* Fishing line */}
        <line 
          x1={20 + Math.cos((rodAngle * Math.PI) / 180) * 80} 
          y1={180 - Math.sin((rodAngle * Math.PI) / 180) * 80}
          x2={20 + Math.cos((rodAngle * Math.PI) / 180) * 80} 
          y2={180 - Math.sin((rodAngle * Math.PI) / 180) * 80 + lineLength}
          stroke="hsl(0, 0%, 10%)" 
          strokeWidth="1"
          className={isCasting ? "animate-bounce" : ""}
        />
        
        {/* Hook */}
        <circle 
          cx={20 + Math.cos((rodAngle * Math.PI) / 180) * 80} 
          cy={180 - Math.sin((rodAngle * Math.PI) / 180) * 80 + lineLength}
          r="3" 
          fill="hsl(45, 60%, 50%)" 
          className={isCasting ? "animate-bounce" : ""}
        />
        
        {/* Reel */}
        <circle cx="25" cy="160" r="8" fill="hsl(0, 0%, 30%)" stroke="hsl(0, 0%, 20%)" strokeWidth="2" />
        <circle cx="25" cy="160" r="4" fill="hsl(0, 0%, 50%)" />
      </svg>
      
      {/* Water splash effect when casting */}
      {isCasting && (
        <div className="absolute bottom-0 left-20 animate-ping">
          <div className="w-8 h-8 bg-blue-400/50 rounded-full"></div>
        </div>
      )}
    </div>
  );
}