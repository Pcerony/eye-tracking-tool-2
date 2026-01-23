import { useCallback, useEffect, useRef, useState } from 'react';
// @ts-ignore
import webgazer from 'webgazer';

export interface GazeData {
  x: number;
  y: number;
  timestamp: number;
}

export const useWebGazer = () => {
  const [isReady, setIsReady] = useState(false);
  const [isTracking, setIsTracking] = useState(false);
  const isTrackingRef = useRef(false); // Ref to track state inside closure
  const [gazeData, setGazeData] = useState<GazeData | null>(null);
  const gazeDataRef = useRef<GazeData[]>([]);

  // Sync ref with state
  useEffect(() => {
    isTrackingRef.current = isTracking;
  }, [isTracking]);

  useEffect(() => {
    const initWebGazer = async () => {
      try {
        // Clear any previous data
        webgazer.clearData();
        
        // Initialize webgazer
        await webgazer.setRegression('ridge')
          .setGazeListener((data: any, clock: number) => {
            if (data) {
              const currentGaze = {
                x: data.x,
                y: data.y,
                timestamp: clock
              };
              setGazeData(currentGaze);
              
              // Only record data if we are explicitly tracking (not just calibrating)
              // Use ref to access current state inside closure
              if (isTrackingRef.current) {
                gazeDataRef.current.push(currentGaze);
              }
            }
          })
          .saveDataAcrossSessions(true)
          .begin();

        // Disable default mouse click calibration to prevent "mouse following" bias
        // We will manually handle calibration points
        webgazer.removeMouseEventListeners();

        // Hide the default video preview and prediction points provided by webgazer
        // We will build our own UI
        webgazer.showVideoPreview(false)
          .showPredictionPoints(false)
          .applyKalmanFilter(true);
        
        // Force hide video element if it exists
        const videoElement = document.getElementById('webgazerVideoFeed');
        if (videoElement) {
          videoElement.style.display = 'none';
          // Also set style to ensure it stays hidden
          videoElement.style.opacity = '0';
          videoElement.style.pointerEvents = 'none';
        }



        setIsReady(true);
      } catch (error) {
        console.error("Failed to initialize WebGazer:", error);
      }
    };

    initWebGazer();

    return () => {
      // Cleanup
      webgazer.end();
      const videoElement = document.getElementById('webgazerVideoFeed');
      if (videoElement) {
        videoElement.remove();
      }
    };
  }, []);

  const startTracking = useCallback(() => {
    gazeDataRef.current = [];
    setIsTracking(true);
  }, []);

  const stopTracking = useCallback(() => {
    setIsTracking(false);
    return gazeDataRef.current;
  }, []);

  const calibratePoint = useCallback((x: number, y: number) => {
    webgazer.recordScreenPosition(x, y, 'click');
  }, []);

  return {
    isReady,
    isTracking,
    gazeData,
    startTracking,
    stopTracking,
    calibratePoint,
    webgazer
  };
};
