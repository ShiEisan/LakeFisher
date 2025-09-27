interface FishermanCharacterProps {
  isAnimating?: boolean;
}

export default function FishermanCharacter({ isAnimating = false }: FishermanCharacterProps) {
  return (
    <div className="absolute bottom-1/3 left-8 z-20">
      <svg width="80" height="120" viewBox="0 0 80 120" className={isAnimating ? "animate-pulse" : ""}>
        {/* Fisherman silhouette */}
        {/* Head */}
        <circle cx="40" cy="20" r="12" fill="hsl(30, 25%, 25%)" />
        
        {/* Hat */}
        <ellipse cx="40" cy="18" rx="15" ry="8" fill="hsl(200, 30%, 20%)" />
        
        {/* Body */}
        <rect x="30" y="32" width="20" height="40" rx="5" fill="hsl(200, 40%, 30%)" />
        
        {/* Arms */}
        <rect x="20" y="38" width="8" height="25" rx="4" fill="hsl(30, 25%, 25%)" 
              transform={isAnimating ? "rotate(-10 24 50)" : ""} />
        <rect x="52" y="38" width="8" height="25" rx="4" fill="hsl(30, 25%, 25%)" 
              transform={isAnimating ? "rotate(15 56 50)" : ""} />
        
        {/* Legs */}
        <rect x="32" y="72" width="8" height="30" rx="4" fill="hsl(220, 30%, 25%)" />
        <rect x="42" y="72" width="8" height="30" rx="4" fill="hsl(220, 30%, 25%)" />
        
        {/* Feet */}
        <ellipse cx="36" cy="108" rx="8" ry="4" fill="hsl(30, 20%, 20%)" />
        <ellipse cx="46" cy="108" rx="8" ry="4" fill="hsl(30, 20%, 20%)" />
        
        {/* Fishing hat detail */}
        <rect x="35" y="15" width="10" height="2" fill="hsl(45, 60%, 40%)" />
      </svg>
      
      {/* Shadow */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-4 bg-black/20 rounded-full blur-sm"></div>
    </div>
  );
}