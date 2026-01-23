import { GazeCursor } from "@/components/GazeCursor";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckCircle2, MousePointerClick, Play } from "lucide-react";
import { useState } from "react";

interface CalibrationProps {
  onCalibrate: (x: number, y: number) => void;
  onComplete: () => void;
  gazeX: number;
  gazeY: number;
}

const CALIBRATION_POINTS = [
  // Row 1
  { x: '10%', y: '10%' },
  { x: '50%', y: '10%' },
  { x: '90%', y: '10%' },
  // Row 2
  { x: '10%', y: '50%' },
  { x: '50%', y: '50%' },
  { x: '90%', y: '50%' },
  // Row 3
  { x: '10%', y: '90%' },
  { x: '50%', y: '90%' },
  { x: '90%', y: '90%' },
];

const CLICKS_PER_POINT = 3;

export function Calibration({ onCalibrate, onComplete, gazeX, gazeY }: CalibrationProps) {
  const [clicks, setClicks] = useState<Record<number, number>>({});
  const [accuracy, setAccuracy] = useState<number>(0);
  const [isStarted, setIsStarted] = useState(false);

  const handlePointClick = (index: number, e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    onCalibrate(clientX, clientY);
    
    setClicks(prev => {
      const newClicks = { ...prev, [index]: (prev[index] || 0) + 1 };
      
      // Calculate progress
      const totalClicks = Object.values(newClicks).reduce((a, b) => a + b, 0);
      const requiredClicks = CALIBRATION_POINTS.length * CLICKS_PER_POINT;
      setAccuracy(Math.min(100, (totalClicks / requiredClicks) * 100));
      
      return newClicks;
    });
  };

  const isComplete = Object.keys(clicks).length === CALIBRATION_POINTS.length && 
                     Object.values(clicks).every(c => c >= CLICKS_PER_POINT);

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex flex-col items-center justify-center">
      
      {/* Gaze Cursor - Always visible when started to give feedback */}
      <GazeCursor x={gazeX} y={gazeY} active={isStarted} />

      {/* Step 1: Instructions Overlay - Only shown before starting */}
      {!isStarted && (
        <div className="absolute inset-0 z-[60] flex items-center justify-center bg-background/80 backdrop-blur-md">
          <div className="text-center space-y-6 animate-in fade-in zoom-in duration-500 bg-card p-8 rounded-3xl border border-border shadow-2xl max-w-lg mx-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto text-primary">
              <MousePointerClick className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">Calibration Setup</h2>
              <p className="text-muted-foreground text-lg">
                We need to map your eye movements to the screen.
              </p>
            </div>
            <div className="bg-muted/50 p-4 rounded-xl text-left space-y-3 text-sm">
              <p className="flex items-start gap-2">
                <span className="bg-primary text-primary-foreground w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0 mt-0.5">1</span>
                Click each red dot <strong>{CLICKS_PER_POINT} times</strong> while looking directly at it.
              </p>
              <p className="flex items-start gap-2">
                <span className="bg-primary text-primary-foreground w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0 mt-0.5">2</span>
                Keep your head still and maintain a comfortable distance.
              </p>
              <p className="flex items-start gap-2">
                <span className="bg-primary text-primary-foreground w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0 mt-0.5">3</span>
                Points will turn green when calibrated.
              </p>
            </div>
            <Button 
              size="lg" 
              className="w-full text-lg h-12 rounded-xl"
              onClick={() => setIsStarted(true)}
            >
              <Play className="w-5 h-5 mr-2" />
              Start Calibration
            </Button>
          </div>
        </div>
      )}

      {/* Step 2: Calibration Points - Only active after starting */}
      {isStarted && (
        <>
          {/* Minimal Progress Indicator */}
          <div className="absolute top-8 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-background/80 backdrop-blur px-4 py-2 rounded-full border border-border shadow-sm animate-in fade-in slide-in-from-top-4 z-20">
            <span className="text-sm font-medium text-muted-foreground">Progress</span>
            <div className="h-2 w-32 bg-secondary rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-500 ease-out"
                style={{ width: `${accuracy}%` }}
              />
            </div>
            <span className="text-sm font-bold text-primary">{Math.round(accuracy)}%</span>
          </div>

          {CALIBRATION_POINTS.map((pos, index) => {
            const clickCount = clicks[index] || 0;
            const isDone = clickCount >= CLICKS_PER_POINT;
            
            return (
              <button
                key={index}
                className={cn(
                  "absolute w-8 h-8 rounded-full transition-all duration-300 flex items-center justify-center outline-none focus:ring-4 focus:ring-primary/30 z-10",
                  isDone 
                    ? "bg-green-500 shadow-[0_0_20px_rgba(34,197,94,0.5)] scale-75 cursor-default" 
                    : "bg-destructive shadow-[0_0_15px_rgba(239,68,68,0.5)] hover:scale-125 active:scale-90 cursor-pointer animate-pulse"
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
        </>
      )}

      {isComplete && (
        <div className="absolute bottom-12 animate-in fade-in slide-in-from-bottom-8 duration-500 z-[70]">
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
