import FishingRod from '../FishingRod';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function FishingRodExample() {
  const [isCasting, setIsCasting] = useState(false);
  const [lineLength, setLineLength] = useState(100);

  const handleCast = () => {
    setIsCasting(true);
    setTimeout(() => setIsCasting(false), 2000);
    console.log('Cast triggered');
  };

  return (
    <div className="relative h-64 bg-gradient-to-b from-blue-200 to-blue-400 overflow-hidden">
      <FishingRod 
        isCasting={isCasting} 
        onCast={handleCast}
        lineLength={lineLength}
      />
      <div className="absolute top-4 right-4 space-y-2">
        <Button 
          onClick={handleCast}
          disabled={isCasting}
          data-testid="button-cast-example"
        >
          {isCasting ? '拋竿中...' : '拋竿'}
        </Button>
        <div className="flex gap-2">
          <Button size="sm" onClick={() => setLineLength(Math.max(50, lineLength - 20))}>
            線短一點
          </Button>
          <Button size="sm" onClick={() => setLineLength(Math.min(150, lineLength + 20))}>
            線長一點
          </Button>
        </div>
      </div>
    </div>
  );
}