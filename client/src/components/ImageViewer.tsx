import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface ImageViewerProps {
  imageUrl: string;
  onClose: () => void;
  onStartTracking: () => void;
  onStopTracking: () => void;
}

export function ImageViewer({ imageUrl, onClose, onStartTracking, onStopTracking }: ImageViewerProps) {
  const [countdown, setCountdown] = useState(3);
  const [isViewing, setIsViewing] = useState(false);

  // Use a ref to track if we have already started tracking to prevent double calls
  const hasStartedRef = useRef(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(c => c - 1), 1000);
    } else if (!hasStartedRef.current) {
      hasStartedRef.current = true;
      setIsViewing(true);
      onStartTracking();
    }
    return () => clearTimeout(timer);
  }, [countdown, onStartTracking]);

  const handleFinish = () => {
    onStopTracking();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      {!isViewing ? (
        <div className="text-center space-y-4 animate-in zoom-in duration-300">
          <div className="text-9xl font-bold text-white font-mono">{countdown}</div>
          <p className="text-white/70 text-xl">Get ready...</p>
        </div>
      ) : (
        <div className="relative w-full h-full flex items-center justify-center bg-black">
          <img 
            src={imageUrl} 
            alt="Tracking Target" 
            className="max-w-full max-h-full object-contain"
          />
          
          <Button 
            variant="destructive" 
            size="icon"
            className="absolute top-4 right-4 rounded-full w-12 h-12 hover:scale-110 transition-transform"
            onClick={handleFinish}
          >
            <X className="w-6 h-6" />
          </Button>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm text-white px-6 py-2 rounded-full text-sm font-medium border border-white/10">
            Tracking in progress... Click X to finish
          </div>
        </div>
      )}
    </div>
  );
}
