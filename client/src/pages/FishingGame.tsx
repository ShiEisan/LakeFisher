import { useState, useEffect, useCallback } from 'react';
import LakesideBackground from '@/components/LakesideBackground';
import FishermanCharacter from '@/components/FishermanCharacter';
import FishingRod from '@/components/FishingRod';
import Fish from '@/components/Fish';
import ScoreDisplay from '@/components/ScoreDisplay';
import GameControls from '@/components/GameControls';

interface FishData {
  id: string;
  x: number;
  y: number;
  direction: number; // -1 for left, 1 for right
  speed: number;
  type: 'small' | 'medium' | 'large';
  spawnTime: number;
}

export default function FishingGame() {
  const [gameState, setGameState] = useState<'playing' | 'paused' | 'ended'>('playing');
  const [isCasting, setIsCasting] = useState(false);
  const [fishCaught, setFishCaught] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(300); // 5 minutes
  const [fish, setFish] = useState<FishData[]>([]);
  const [caughtFishIds, setCaughtFishIds] = useState<string[]>([]);

  // Fish spawn system - spawn from screen edges
  const spawnFish = useCallback(() => {
    if (gameState !== 'playing') return;
    
    const fishTypes: Array<'small' | 'medium' | 'large'> = ['small', 'small', 'medium', 'large'];
    const randomType = fishTypes[Math.floor(Math.random() * fishTypes.length)];
    
    // Random direction (-1 for left to right, 1 for right to left)
    const direction = Math.random() < 0.5 ? -1 : 1;
    
    // Speed varies by fish type
    const speedVariation = {
      small: 1.5 + Math.random() * 1,
      medium: 1 + Math.random() * 0.8,
      large: 0.6 + Math.random() * 0.6
    };
    
    // Use safe defaults for screen dimensions
    const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const screenHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
    
    const newFish: FishData = {
      id: `fish-${Date.now()}-${Math.random()}`,
      // Spawn from appropriate edge based on direction
      x: direction === 1 ? -50 : screenWidth + 50,
      y: screenHeight * 0.6 + Math.random() * 150,
      direction,
      speed: speedVariation[randomType],
      type: randomType,
      spawnTime: Date.now()
    };
    
    setFish(prev => [...prev, newFish]);
  }, [gameState]);

  // Timer and fish spawning
  useEffect(() => {
    if (gameState !== 'playing') return;
    
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          setGameState('ended');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const fishSpawner = setInterval(spawnFish, 3000 + Math.random() * 2000);

    return () => {
      clearInterval(timer);
      clearInterval(fishSpawner);
    };
  }, [gameState, spawnFish]);

  // Handle casting
  const handleCast = () => {
    if (gameState !== 'playing' || isCasting) return;
    
    setIsCasting(true);
    console.log('Casting fishing rod...');
    
    setTimeout(() => {
      setIsCasting(false);
      // Chance to spawn a fish near the hook
      if (Math.random() < 0.3) {
        spawnFish();
      }
    }, 2000);
  };

  // Handle fish position updates and boundary removal
  const handleFishPositionUpdate = useCallback((fishId: string, newX: number, newY: number) => {
    // Use safe defaults for screen dimensions
    const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
    
    // Remove fish if they swim off screen boundaries
    if (newX < -100 || newX > screenWidth + 100) {
      setFish(prev => prev.filter(f => f.id !== fishId));
    }
  }, []);

  // Handle fish catch
  const handleFishCatch = (fishId: string) => {
    const caughtFish = fish.find(f => f.id === fishId);
    if (!caughtFish || caughtFishIds.includes(fishId)) return;
    
    setCaughtFishIds(prev => [...prev, fishId]);
    setFishCaught(prev => prev + 1);
    
    const points = {
      small: 10,
      medium: 25, 
      large: 50
    };
    
    setTotalScore(prev => prev + points[caughtFish.type]);
    console.log(`Caught a ${caughtFish.type} fish! +${points[caughtFish.type]} points`);
    
    // Remove caught fish after animation
    setTimeout(() => {
      setFish(prev => prev.filter(f => f.id !== fishId));
    }, 500);
  };

  // Handle game restart
  const handleRestart = () => {
    setGameState('playing');
    setIsCasting(false);
    setFishCaught(0);
    setTotalScore(0);
    setTimeRemaining(300);
    setFish([]);
    setCaughtFishIds([]);
    console.log('Game restarted');
  };

  // Handle lake click for casting
  const handleLakeClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleCast();
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden" data-testid="fishing-game">
      <LakesideBackground>
        {/* Clickable lake area for casting */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-1/3 cursor-pointer"
          onClick={handleLakeClick}
          data-testid="lake-area"
        />
        
        {/* Game characters and objects */}
        <FishermanCharacter isAnimating={isCasting} />
        <FishingRod 
          isCasting={isCasting} 
          onCast={handleCast}
          lineLength={100}
        />
        
        {/* Fish */}
        {fish.map(fishData => (
          <Fish
            key={fishData.id}
            id={fishData.id}
            x={fishData.x}
            y={fishData.y}
            direction={fishData.direction}
            speed={fishData.speed}
            type={fishData.type}
            isCaught={caughtFishIds.includes(fishData.id)}
            onCatch={handleFishCatch}
            onPositionUpdate={handleFishPositionUpdate}
          />
        ))}
        
        {/* UI Elements */}
        <ScoreDisplay 
          fishCaught={fishCaught}
          totalScore={totalScore}
          timeRemaining={timeRemaining}
        />
        
        <GameControls 
          onCast={handleCast}
          onRestart={handleRestart}
          isCasting={isCasting}
          gameState={gameState}
        />
        
        {/* Game Over Screen */}
        {gameState === 'ended' && (
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 text-center max-w-md mx-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">遊戲結束！</h2>
              <div className="space-y-2 text-gray-600">
                <p>釣到的魚: <span className="font-bold text-primary">{fishCaught}</span></p>
                <p>總分數: <span className="font-bold text-accent">{totalScore}</span></p>
              </div>
              <button 
                onClick={handleRestart}
                className="mt-6 bg-primary text-primary-foreground px-6 py-2 rounded-lg hover-elevate active-elevate-2"
                data-testid="button-play-again"
              >
                再玩一次
              </button>
            </div>
          </div>
        )}
      </LakesideBackground>
    </div>
  );
}