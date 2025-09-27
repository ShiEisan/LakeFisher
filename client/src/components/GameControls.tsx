import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface GameControlsProps {
  onCast: () => void;
  onRestart: () => void;
  isCasting: boolean;
  gameState: 'playing' | 'paused' | 'ended';
}

export default function GameControls({ onCast, onRestart, isCasting, gameState }: GameControlsProps) {
  return (
    <Card className="absolute bottom-4 left-1/2 transform -translate-x-1/2 p-4 bg-white/80 backdrop-blur-sm border-primary/20 z-40">
      <div className="flex items-center gap-4" data-testid="game-controls">
        {/* Cast button */}
        <Button 
          onClick={onCast}
          disabled={isCasting || gameState !== 'playing'}
          variant="default"
          size="lg"
          className="bg-primary hover-elevate active-elevate-2"
          data-testid="button-cast"
        >
          {isCasting ? '拋竿中...' : '🎣 拋竿'}
        </Button>
        
        {/* Game status indicator */}
        <div className="text-sm text-muted-foreground">
          {gameState === 'playing' && '點擊拋竿按鈕或湖面來釣魚'}
          {gameState === 'paused' && '遊戲暫停'}
          {gameState === 'ended' && '遊戲結束'}
        </div>
        
        {/* Restart button */}
        <Button 
          onClick={onRestart}
          variant="outline"
          size="default"
          className="hover-elevate active-elevate-2"
          data-testid="button-restart"
        >
          🔄 重新開始
        </Button>
      </div>
      
      {/* Instructions */}
      <div className="mt-2 text-xs text-muted-foreground text-center">
        點擊魚兒來捕獲牠們 • 不同大小的魚有不同分數
      </div>
    </Card>
  );
}