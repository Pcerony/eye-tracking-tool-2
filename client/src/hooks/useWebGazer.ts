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
  const [gazeData, setGazeData] = useState<GazeData | null>(null);
  const gazeDataRef = useRef<GazeData[]>([]);

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
              if (isTracking) {
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
        webgazer.showVideoPreview(true)
          .showPredictionPoints(true)
          .applyKalmanFilter(true);

        // Adjust video position to be less intrusive during dev/calibration
        const videoElement = document.getElementById('webgazerVideoFeed');
        if (videoElement) {
          videoElement.style.display = 'block';
          videoElement.style.position = 'fixed';
          videoElement.style.top = '10px';
          videoElement.style.left = '10px';
          videoElement.style.width = '320px';
          videoElement.style.height = '240px';
          videoElement.style.zIndex = '9999';
          videoElement.style.borderRadius = '12px';
          videoElement.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
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
