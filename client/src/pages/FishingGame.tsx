import { useState, useEffect, useCallback } from 'react';
import LakesideBackground from '@/components/LakesideBackground';
import FishermanCharacter from '@/components/FishermanCharacter';
import FishingRod from '@/components/FishingRod';
import Fish from '@/components/Fish';
import Shrimp from '@/components/Shrimp';
import Crab from '@/components/Crab';
import ScoreDisplay from '@/components/ScoreDisplay';
import GameControls from '@/components/GameControls';

interface CreatureData {
  id: string;
  x: number;
  y: number;
  direction: number; // -1 for left, 1 for right
  speed: number;
  type: 'fish' | 'shrimp' | 'crab';
  subtype?: 'small' | 'medium' | 'large'; // For fish only
  spawnTime: number;
}

export default function FishingGame() {
  const [gameState, setGameState] = useState<'playing' | 'paused' | 'ended'>('playing');
  const [isCasting, setIsCasting] = useState(false);
  const [fishCaught, setFishCaught] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(300); // 5 minutes
  const [creatures, setCreatures] = useState<CreatureData[]>([]);
  const [caughtCreatureIds, setCaughtCreatureIds] = useState<string[]>([]);

  // Creature spawn system - spawn from screen edges
  const spawnCreature = useCallback(() => {
    if (gameState !== 'playing') return;
    
    // Creature spawn probabilities: fish 70%, shrimp 20%, crab 10%
    const creatureTypes = ['fish', 'fish', 'fish', 'fish', 'fish', 'fish', 'fish', 'shrimp', 'shrimp', 'crab'] as const;
    const randomCreatureType = creatureTypes[Math.floor(Math.random() * creatureTypes.length)];
    
    // Random direction (-1 for left to right, 1 for right to left)
    const direction = Math.random() < 0.5 ? -1 : 1;
    
    // Use safe defaults for screen dimensions
    const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const screenHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
    
    let newCreature: CreatureData;
    
    if (randomCreatureType === 'fish') {
      const fishSubtypes: Array<'small' | 'medium' | 'large'> = ['small', 'small', 'medium', 'large'];
      const randomSubtype = fishSubtypes[Math.floor(Math.random() * fishSubtypes.length)];
      
      const speedVariation = {
        small: 1.5 + Math.random() * 1,
        medium: 1 + Math.random() * 0.8,
        large: 0.6 + Math.random() * 0.6
      };
      
      newCreature = {
        id: `fish-${Date.now()}-${Math.random()}`,
        x: direction === 1 ? -50 : screenWidth + 50,
        y: screenHeight * 0.6 + Math.random() * 120,
        direction,
        speed: speedVariation[randomSubtype],
        type: 'fish',
        subtype: randomSubtype,
        spawnTime: Date.now()
      };
    } else if (randomCreatureType === 'shrimp') {
      newCreature = {
        id: `shrimp-${Date.now()}-${Math.random()}`,
        x: direction === 1 ? -50 : screenWidth + 50,
        y: screenHeight * 0.65 + Math.random() * 100,
        direction,
        speed: 1.8 + Math.random() * 0.5,
        type: 'shrimp',
        spawnTime: Date.now()
      };
    } else { // crab
      newCreature = {
        id: `crab-${Date.now()}-${Math.random()}`,
        x: direction === 1 ? -50 : screenWidth + 50,
        y: screenHeight * 0.75 + Math.random() * 80, // Bottom dwellers
        direction,
        speed: 0.8 + Math.random() * 0.4,
        type: 'crab',
        spawnTime: Date.now()
      };
    }
    
    setCreatures(prev => [...prev, newCreature]);
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

    const creatureSpawner = setInterval(spawnCreature, 3000 + Math.random() * 2000);

    return () => {
      clearInterval(timer);
      clearInterval(creatureSpawner);
    };
  }, [gameState, spawnCreature]);

  // Handle casting
  const handleCast = () => {
    if (gameState !== 'playing' || isCasting) return;
    
    setIsCasting(true);
    console.log('Casting fishing rod...');
    
    setTimeout(() => {
      setIsCasting(false);
      // Chance to spawn a creature near the hook
      if (Math.random() < 0.3) {
        spawnCreature();
      }
    }, 2000);
  };

  // Handle creature position updates and boundary removal
  const handleCreaturePositionUpdate = useCallback((creatureId: string, newX: number, newY: number) => {
    // Use safe defaults for screen dimensions
    const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
    
    // Remove creatures if they swim off screen boundaries
    if (newX < -100 || newX > screenWidth + 100) {
      setCreatures(prev => prev.filter(c => c.id !== creatureId));
    }
  }, []);

  // Handle creature catch
  const handleCreatureCatch = (creatureId: string) => {
    const caughtCreature = creatures.find(c => c.id === creatureId);
    if (!caughtCreature || caughtCreatureIds.includes(creatureId)) return;
    
    setCaughtCreatureIds(prev => [...prev, creatureId]);
    
    if (caughtCreature.type === 'fish') {
      setFishCaught(prev => prev + 1);
      const points = {
        small: 10,
        medium: 25, 
        large: 50
      };
      const fishPoints = points[caughtCreature.subtype!];
      setTotalScore(prev => prev + fishPoints);
      console.log(`Caught a ${caughtCreature.subtype} fish! +${fishPoints} points`);
    } else if (caughtCreature.type === 'shrimp') {
      setFishCaught(prev => prev + 1); // Count as catch
      setTotalScore(prev => prev + 30);
      console.log('Caught a shrimp! +30 points');
    } else if (caughtCreature.type === 'crab') {
      setTotalScore(prev => prev - 40);
      console.log('Caught a crab! Fishing line broken! -40 points');
      // Visual feedback for broken line
      alert('🦀 螃蟹咬斷了釣魚線！扣 40 分');
    }
    
    // Remove caught creature after animation
    setTimeout(() => {
      setCreatures(prev => prev.filter(c => c.id !== creatureId));
    }, 500);
  };

  // Handle game restart
  const handleRestart = () => {
    setGameState('playing');
    setIsCasting(false);
    setFishCaught(0);
    setTotalScore(0);
    setTimeRemaining(300);
    setCreatures([]);
    setCaughtCreatureIds([]);
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
        
        {/* Creatures */}
        {creatures.map(creature => {
          if (creature.type === 'fish') {
            return (
              <Fish
                key={creature.id}
                id={creature.id}
                x={creature.x}
                y={creature.y}
                direction={creature.direction}
                speed={creature.speed}
                type={creature.subtype!}
                isCaught={caughtCreatureIds.includes(creature.id)}
                onCatch={handleCreatureCatch}
                onPositionUpdate={handleCreaturePositionUpdate}
              />
            );
          } else if (creature.type === 'shrimp') {
            return (
              <Shrimp
                key={creature.id}
                id={creature.id}
                x={creature.x}
                y={creature.y}
                direction={creature.direction}
                speed={creature.speed}
                isCaught={caughtCreatureIds.includes(creature.id)}
                onCatch={handleCreatureCatch}
                onPositionUpdate={handleCreaturePositionUpdate}
              />
            );
          } else if (creature.type === 'crab') {
            return (
              <Crab
                key={creature.id}
                id={creature.id}
                x={creature.x}
                y={creature.y}
                direction={creature.direction}
                speed={creature.speed}
                isCaught={caughtCreatureIds.includes(creature.id)}
                onCatch={handleCreatureCatch}
                onPositionUpdate={handleCreaturePositionUpdate}
              />
            );
          }
          return null;
        })}
        
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