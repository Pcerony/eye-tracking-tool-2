import { useEffect, useRef } from 'react';

interface HeatmapProps {
  imageUrl: string;
  data: Array<{ x: number; y: number; value?: number }>;
  width?: number;
  height?: number;
}

export function Heatmap({ imageUrl, data, width = window.innerWidth, height = window.innerHeight }: HeatmapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to match container
    const { clientWidth, clientHeight } = container;
    canvas.width = clientWidth;
    canvas.height = clientHeight;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Configuration
    const radius = 40;
    const blur = 20;

    // Draw points
    // We use a temporary canvas to draw the alpha gradients
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    const tempCtx = tempCanvas.getContext('2d');
    
    if (!tempCtx) return;

    // Draw each point as a radial gradient on the temp canvas
    data.forEach(point => {
      // Scale coordinates if necessary (assuming data is in screen coordinates)
      // If data is relative, we might need adjustment. 
      // For now, assuming data.x/y matches the container coordinate system.
      
      // Simple boundary check
      if (point.x < 0 || point.x > canvas.width || point.y < 0 || point.y > canvas.height) return;

      tempCtx.beginPath();
      const gradient = tempCtx.createRadialGradient(point.x, point.y, 0, point.x, point.y, radius);
      gradient.addColorStop(0, `rgba(0, 0, 0, 1)`);
      gradient.addColorStop(1, `rgba(0, 0, 0, 0)`);
      
      tempCtx.fillStyle = gradient;
      // Use lighter composite operation to accumulate density
      tempCtx.globalCompositeOperation = 'lighter'; 
      tempCtx.arc(point.x, point.y, radius, 0, Math.PI * 2);
      tempCtx.fill();
    });

    // Colorize the heatmap
    // 1. Get the alpha channel data from temp canvas
    const imageData = tempCtx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;

    // 2. Create a gradient map (256x1)
    const gradientCanvas = document.createElement('canvas');
    gradientCanvas.width = 256;
    gradientCanvas.height = 1;
    const gradientCtx = gradientCanvas.getContext('2d');
    if (!gradientCtx) return;

    const linearGradient = gradientCtx.createLinearGradient(0, 0, 256, 0);
    // Define heatmap colors: Blue -> Green -> Yellow -> Red
    linearGradient.addColorStop(0.0, 'rgba(0, 0, 255, 0)');
    linearGradient.addColorStop(0.1, 'rgba(0, 0, 255, 0.1)');
    linearGradient.addColorStop(0.3, 'rgba(0, 255, 0, 0.5)');
    linearGradient.addColorStop(0.5, 'rgba(255, 255, 0, 0.7)');
    linearGradient.addColorStop(1.0, 'rgba(255, 0, 0, 0.9)');

    gradientCtx.fillStyle = linearGradient;
    gradientCtx.fillRect(0, 0, 256, 1);
    const gradientData = gradientCtx.getImageData(0, 0, 256, 1).data;

    // 3. Map alpha values to colors
    for (let i = 0; i < pixels.length; i += 4) {
      const alpha = pixels[i + 3]; // Use alpha channel as intensity
      if (alpha > 0) {
        // Map alpha (0-255) to gradient index (0-255)
        // We can cap it at 255
        const offset = Math.min(alpha, 255) * 4;
        
        pixels[i] = gradientData[offset];     // R
        pixels[i + 1] = gradientData[offset + 1]; // G
        pixels[i + 2] = gradientData[offset + 2]; // B
        pixels[i + 3] = gradientData[offset + 3]; // A (preserve gradient alpha)
      }
    }

    // 4. Put colorized data back to main canvas
    ctx.putImageData(imageData, 0, 0);

  }, [data, width, height]);

  return (
    <div 
      ref={containerRef} 
      className="relative overflow-hidden rounded-lg shadow-2xl border border-border bg-white"
      style={{ width: '100%', height: '100%', minHeight: '600px' }}
    >
      <img 
        src={imageUrl} 
        alt="Analyzed Target" 
        className="absolute inset-0 w-full h-full object-contain z-0"
      />
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-10 pointer-events-none"
      />
    </div>
  );
}
