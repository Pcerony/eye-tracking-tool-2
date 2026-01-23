import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckCircle2, MousePointerClick } from "lucide-react";
import { useState } from "react";

interface CalibrationProps {
  onCalibrate: (x: number, y: number) => void;
  onComplete: () => void;
}

const CALIBRATION_POINTS = [
  { x: '10%', y: '10%' },
  { x: '50%', y: '10%' },
  { x: '90%', y: '10%' },
  { x: '10%', y: '50%' },
  { x: '50%', y: '50%' },
  { x: '90%', y: '50%' },
  { x: '10%', y: '90%' },
  { x: '50%', y: '90%' },
  { x: '90%', y: '90%' },
];

export function Calibration({ onCalibrate, onComplete }: CalibrationProps) {
  const [clicks, setClicks] = useState<Record<number, number>>({});
  const [accuracy, setAccuracy] = useState<number>(0);

  const handlePointClick = (index: number, e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    onCalibrate(clientX, clientY);
    
    setClicks(prev => {
      const newClicks = { ...prev, [index]: (prev[index] || 0) + 1 };
      
      // Calculate progress
      const totalClicks = Object.values(newClicks).reduce((a, b) => a + b, 0);
      const requiredClicks = CALIBRATION_POINTS.length * 5; // 5 clicks per point
      setAccuracy(Math.min(100, (totalClicks / requiredClicks) * 100));
      
      return newClicks;
    });
  };

  const isComplete = Object.keys(clicks).length === CALIBRATION_POINTS.length && 
                     Object.values(clicks).every(c => c >= 5);

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex flex-col items-center justify-center">
      <div className="absolute top-8 text-center space-y-2 animate-in fade-in slide-in-from-top-4 duration-700">
        <h2 className="text-3xl font-bold tracking-tight">Eye Calibration</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Please click each red dot 5 times while looking directly at it. 
          Keep your head still for best results.
        </p>
        <div className="flex items-center justify-center gap-2 mt-4">
          <div className="h-2 w-64 bg-secondary rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-500 ease-out"
              style={{ width: `${accuracy}%` }}
            />
          </div>
          <span className="text-sm font-medium text-muted-foreground">{Math.round(accuracy)}%</span>
        </div>
      </div>

      {CALIBRATION_POINTS.map((pos, index) => {
        const clickCount = clicks[index] || 0;
        const isDone = clickCount >= 5;
        
        return (
          <button
            key={index}
            className={cn(
              "absolute w-8 h-8 rounded-full transition-all duration-300 flex items-center justify-center",
              isDone 
                ? "bg-green-500 shadow-[0_0_20px_rgba(34,197,94,0.5)] scale-75" 
                : "bg-destructive shadow-[0_0_15px_rgba(239,68,68,0.5)] hover:scale-125 active:scale-90"
            )}
            style={{ left: pos.x, top: pos.y }}
            onClick={(e) => handlePointClick(index, e)}
            disabled={isDone}
          >
            {isDone ? (
              <CheckCircle2 className="w-5 h-5 text-white" />
            ) : (
              <div className="w-2 h-2 bg-white rounded-full opacity-50" />
            )}
          </button>
        );
      })}

      {isComplete && (
        <div className="absolute bottom-12 animate-in fade-in slide-in-from-bottom-8 duration-500">
          <Button 
            size="lg" 
            onClick={onComplete}
            className="text-lg px-8 py-6 rounded-full shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all"
          >
            <MousePointerClick className="mr-2 h-5 w-5" />
            Finish Calibration
          </Button>
        </div>
      )}
    </div>
  );
}
