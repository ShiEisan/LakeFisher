interface LakesideBackgroundProps {
  children?: React.ReactNode;
}

export default function LakesideBackground({ children }: LakesideBackgroundProps) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-blue-300 via-blue-200 to-green-100">
      {/* Sky and Mountains */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-400 via-blue-300 to-blue-200" />
      
      {/* Mountains */}
      <div className="absolute bottom-1/2 left-0 right-0 h-1/3">
        <svg viewBox="0 0 1200 300" className="w-full h-full">
          <polygon points="0,300 200,100 400,150 600,80 800,120 1000,90 1200,140 1200,300" 
                   fill="hsl(200, 30%, 40%)" opacity="0.8" />
          <polygon points="0,300 150,180 350,200 550,160 750,180 950,150 1200,170 1200,300" 
                   fill="hsl(200, 35%, 45%)" opacity="0.9" />
        </svg>
      </div>

      {/* Trees */}
      <div className="absolute bottom-0 left-0 right-0 h-1/2">
        <svg viewBox="0 0 1200 400" className="w-full h-full">
          {/* Tree silhouettes */}
          <circle cx="100" cy="320" r="40" fill="hsl(120, 60%, 25%)" />
          <rect x="95" y="320" width="10" height="80" fill="hsl(30, 40%, 30%)" />
          
          <circle cx="250" cy="300" r="50" fill="hsl(120, 55%, 20%)" />
          <rect x="245" y="300" width="10" height="100" fill="hsl(30, 40%, 25%)" />
          
          <circle cx="400" cy="310" r="45" fill="hsl(120, 58%, 22%)" />
          <rect x="395" y="310" width="10" height="90" fill="hsl(30, 40%, 28%)" />
          
          <circle cx="900" cy="300" r="55" fill="hsl(120, 52%, 18%)" />
          <rect x="895" y="300" width="12" height="100" fill="hsl(30, 40%, 22%)" />
          
          <circle cx="1050" cy="320" r="40" fill="hsl(120, 60%, 25%)" />
          <rect x="1045" y="320" width="10" height="80" fill="hsl(30, 40%, 30%)" />
        </svg>
      </div>

      {/* Lake water */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-b from-blue-400/80 to-blue-600/90">
        {/* Water ripples animation */}
        <div className="absolute inset-0 opacity-30">
          <div className="animate-pulse bg-white/10 rounded-full w-20 h-4 absolute top-1/2 left-1/4"></div>
          <div className="animate-pulse bg-white/10 rounded-full w-16 h-3 absolute top-1/3 left-3/4 delay-1000"></div>
          <div className="animate-pulse bg-white/10 rounded-full w-12 h-2 absolute top-2/3 left-1/2 delay-2000"></div>
        </div>
        
        {/* Underwater plants/seaweed */}
        <div className="absolute bottom-0 left-0 right-0 h-full">
          <svg viewBox="0 0 1200 200" className="w-full h-full">
            {/* Water plants */}
            <g opacity="0.6">
              {/* Seaweed 1 */}
              <path d="M100,200 Q105,150 110,100 Q115,50 120,20" 
                    stroke="hsl(120, 40%, 30%)" strokeWidth="3" fill="none" 
                    className="animate-pulse" />
              <path d="M95,200 Q98,160 102,120 Q106,80 108,40" 
                    stroke="hsl(120, 45%, 25%)" strokeWidth="2" fill="none" 
                    className="animate-pulse delay-500" />
              
              {/* Seaweed 2 */}
              <path d="M300,200 Q295,150 290,100 Q285,50 280,10" 
                    stroke="hsl(120, 40%, 30%)" strokeWidth="4" fill="none" 
                    className="animate-pulse delay-1000" />
              <path d="M305,200 Q308,160 312,120 Q316,80 318,30" 
                    stroke="hsl(120, 45%, 25%)" strokeWidth="2" fill="none" 
                    className="animate-pulse delay-1500" />
              
              {/* Seaweed 3 */}
              <path d="M500,200 Q505,150 510,100 Q515,50 520,15" 
                    stroke="hsl(120, 40%, 30%)" strokeWidth="3" fill="none" 
                    className="animate-pulse delay-2000" />
                    
              {/* Seaweed 4 */}
              <path d="M700,200 Q695,150 690,100 Q685,50 680,25" 
                    stroke="hsl(120, 40%, 30%)" strokeWidth="4" fill="none" 
                    className="animate-pulse" />
              <path d="M705,200 Q708,160 712,120 Q716,80 718,45" 
                    stroke="hsl(120, 45%, 25%)" strokeWidth="2" fill="none" 
                    className="animate-pulse delay-500" />
              
              {/* Seaweed 5 */}
              <path d="M900,200 Q905,150 910,100 Q915,50 920,20" 
                    stroke="hsl(120, 40%, 30%)" strokeWidth="3" fill="none" 
                    className="animate-pulse delay-1000" />
                    
              {/* Small water plants */}
              <circle cx="150" cy="180" r="8" fill="hsl(120, 50%, 35%)" opacity="0.7" className="animate-pulse" />
              <circle cx="250" cy="190" r="6" fill="hsl(120, 50%, 35%)" opacity="0.7" className="animate-pulse delay-1000" />
              <circle cx="450" cy="185" r="10" fill="hsl(120, 50%, 35%)" opacity="0.7" className="animate-pulse delay-500" />
              <circle cx="650" cy="175" r="7" fill="hsl(120, 50%, 35%)" opacity="0.7" className="animate-pulse delay-1500" />
              <circle cx="850" cy="190" r="9" fill="hsl(120, 50%, 35%)" opacity="0.7" className="animate-pulse delay-2000" />
            </g>
          </svg>
        </div>
      </div>

      {/* Flying birds */}
      <div className="absolute top-1/4 left-1/3 animate-pulse">
        <svg width="30" height="20" viewBox="0 0 30 20">
          <path d="M5,10 Q10,5 15,10 Q20,5 25,10" stroke="hsl(0, 0%, 30%)" strokeWidth="2" fill="none" />
        </svg>
      </div>
      <div className="absolute top-1/3 right-1/4 animate-pulse delay-1000">
        <svg width="25" height="15" viewBox="0 0 25 15">
          <path d="M3,8 Q8,3 13,8 Q18,3 23,8" stroke="hsl(0, 0%, 30%)" strokeWidth="2" fill="none" />
        </svg>
      </div>

      {/* Content overlay */}
      <div className="relative z-10 h-full">
        {children}
      </div>
    </div>
  );
}