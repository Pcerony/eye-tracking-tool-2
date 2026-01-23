import { Calibration } from "@/components/Calibration";
import { ImageViewer } from "@/components/ImageViewer";
import { PrivacyNotice } from "@/components/PrivacyNotice";
import { Report } from "@/components/Report";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useWebGazer } from "@/hooks/useWebGazer";
import { Eye, Upload } from "lucide-react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

export default function Home() {
  const { isReady, calibratePoint, startTracking, stopTracking, gazeData } = useWebGazer();
  const [isCalibrating, setIsCalibrating] = useState(false);
  const [hasCalibrated, setHasCalibrated] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isViewing, setIsViewing] = useState(false);
  const [reportData, setReportData] = useState<any>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setUploadedImage(url);
      setIsViewing(true);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: { 'image/*': [] },
    multiple: false,
    disabled: !hasCalibrated
  });

  const handleStartCalibration = () => {
    setIsCalibrating(true);
  };

  const handleCalibrationComplete = () => {
    setIsCalibrating(false);
    setHasCalibrated(true);
  };

  const handleTrackingStop = () => {
    const data = stopTracking();
    setReportData({
      image: uploadedImage,
      gazeData: data,
      timestamp: new Date().toISOString()
    });
    setIsViewing(false);
  };

  if (reportData) {
    return (
      <div className="min-h-screen bg-background">
        <Report 
          data={reportData} 
          onBack={() => {
            setReportData(null);
            setUploadedImage(null);
          }} 
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <PrivacyNotice />
      
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/hero-bg.jpg')] bg-cover bg-center opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/80 to-background" />
      </div>

      <main className="container flex-1 flex flex-col items-center justify-center py-12 space-y-12">
        
        {/* Hero Section */}
        <div className="text-center space-y-6 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000">

          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-secondary">
            Visual Analytics
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Advanced eye tracking technology powered by your webcam. 
            Understand user attention and visual flow with precision heatmaps.
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid md:grid-cols-2 gap-6 w-full max-w-4xl animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
          
          {/* Calibration Card */}
          <Card className="glass-panel p-8 flex flex-col items-center text-center space-y-6 hover:scale-[1.02] transition-transform duration-300">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <Eye className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-semibold">1. Calibrate</h3>
              <p className="text-muted-foreground">
                Configure the tracker to your eyes and screen environment for maximum accuracy.
              </p>
            </div>
            <Button 
              size="lg" 
              className="w-full rounded-xl text-lg h-12"
              onClick={handleStartCalibration}
              disabled={!isReady}
            >
              {isReady ? (hasCalibrated ? "Recalibrate" : "Start Calibration") : "Initializing Camera..."}
            </Button>
          </Card>

          {/* Upload & Track Card */}
          <Card 
            {...getRootProps()}
            className={`glass-panel p-8 flex flex-col items-center text-center space-y-6 transition-all duration-300 cursor-pointer
              ${!hasCalibrated ? 'opacity-50 grayscale cursor-not-allowed' : 'hover:scale-[1.02] hover:border-primary/50'}
              ${isDragActive ? 'border-primary ring-2 ring-primary/20' : ''}
            `}
          >
            <input {...getInputProps()} />
            <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary-foreground">
              <Upload className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-semibold">2. Upload & Track</h3>
              <p className="text-muted-foreground">
                {isDragActive ? "Drop image here..." : "Drag & drop or click to upload image"}
              </p>
            </div>
            <Button 
              size="lg" 
              variant="secondary"
              className="w-full rounded-xl text-lg h-12 pointer-events-none" // Button is visual only, click handled by dropzone
              disabled={!hasCalibrated}
            >
              Select Image
            </Button>
          </Card>
        </div>

        {/* Real-time Gaze Indicator (Debug) */}
        {gazeData && !isViewing && !isCalibrating && (
          <div 
            className="fixed w-6 h-6 rounded-full border-2 border-primary bg-primary/30 pointer-events-none z-[9999] transition-all duration-75 ease-out"
            style={{ 
              left: gazeData.x, 
              top: gazeData.y,
              transform: 'translate(-50%, -50%)'
            }}
          />
        )}

      </main>

      {isCalibrating && (
        <Calibration 
          onCalibrate={calibratePoint}
          onComplete={handleCalibrationComplete}
        />
      )}

      {isViewing && uploadedImage && (
        <ImageViewer
          imageUrl={uploadedImage}
          onClose={() => setIsViewing(false)}
          onStartTracking={startTracking}
          onStopTracking={handleTrackingStop}
        />
      )}
    </div>
  );
}
