import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

interface ScoreDisplayProps {
  fishCaught: number;
  totalScore: number;
  timeRemaining?: number;
}

export default function ScoreDisplay({ fishCaught, totalScore, timeRemaining }: ScoreDisplayProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="absolute top-4 right-4 p-4 bg-white/80 backdrop-blur-sm border-primary/20 z-40">
      <div className="space-y-2" data-testid="score-display">
        {/* Fish caught counter */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-foreground">🐟 魚獲:</span>
          <Badge variant="secondary" className="bg-primary text-primary-foreground">
            {fishCaught}
          </Badge>
        </div>
        
        {/* Total score */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-foreground">分數:</span>
          <Badge variant="default" className="bg-accent text-accent-foreground font-bold">
            {totalScore}
          </Badge>
        </div>
        
        {/* Time remaining (if provided) */}
        {timeRemaining !== undefined && (
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-foreground">⏰ 時間:</span>
            <Badge 
              variant={timeRemaining < 30 ? "destructive" : "outline"}
              className={timeRemaining < 30 ? "animate-pulse" : ""}
            >
              {formatTime(timeRemaining)}
            </Badge>
          </div>
        )}
      </div>
    </Card>
  );
}