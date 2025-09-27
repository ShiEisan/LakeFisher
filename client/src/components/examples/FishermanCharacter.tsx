import FishermanCharacter from '../FishermanCharacter';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function FishermanCharacterExample() {
  const [isAnimating, setIsAnimating] = useState(false);

  return (
    <div className="relative h-64 bg-gradient-to-b from-blue-200 to-green-100 overflow-hidden">
      <FishermanCharacter isAnimating={isAnimating} />
      <div className="absolute top-4 right-4">
        <Button 
          onClick={() => setIsAnimating(!isAnimating)}
          data-testid="button-animate-fisherman"
        >
          {isAnimating ? '停止動畫' : '開始動畫'}
        </Button>
      </div>
    </div>
  );
}