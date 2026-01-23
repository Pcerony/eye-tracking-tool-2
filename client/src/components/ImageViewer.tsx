import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useEffect, useRef } from "react";

interface ImageViewerProps {
  imageUrl: string;
  onClose: () => void;
  onStartTracking: () => void;
  onStopTracking: () => void;
}

export function ImageViewer({ imageUrl, onClose, onStartTracking, onStopTracking }: ImageViewerProps) {
  // Use a ref to track if we have already started tracking to prevent double calls
  const hasStartedRef = useRef(false);

  useEffect(() => {
    // Start immediately without countdown
    if (!hasStartedRef.current) {
      hasStartedRef.current = true;
      onStartTracking();
    }
  }, [onStartTracking]);

  const handleFinish = () => {
    onStopTracking();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-white flex items-center justify-center">
      <div className="relative w-full h-full flex items-center justify-center bg-white">
        <img 
          src={imageUrl} 
          alt="Tracking Target" 
          className="max-w-full max-h-full object-contain"
        />
        
        <Button 
          variant="destructive" 
          size="icon"
          className="absolute top-4 right-4 rounded-full w-12 h-12 hover:scale-110 transition-transform shadow-lg"
          onClick={handleFinish}
        >
          <X className="w-6 h-6" />
        </Button>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm text-white px-6 py-2 rounded-full text-sm font-medium border border-white/10 shadow-sm">
          Tracking in progress... Click X to finish
        </div>
      </div>
    </div>
  );
}
