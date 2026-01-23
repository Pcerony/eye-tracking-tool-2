import { useEffect, useRef } from 'react';

interface GazePlotProps {
  imageUrl: string;
  data: Array<{ x: number; y: number; timestamp: number }>;
  width?: number;
  height?: number;
}

export function GazePlot({ imageUrl, data, width = window.innerWidth, height = window.innerHeight }: GazePlotProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw image first (optional, if we want to draw it on canvas instead of using img tag)
    // For now we use absolute positioning over the img tag

    if (data.length < 2) return;

    // Draw path
    ctx.beginPath();
    ctx.moveTo(data[0].x, data[0].y);
    
    for (let i = 1; i < data.length; i++) {
      ctx.lineTo(data[i].x, data[i].y);
    }

    ctx.strokeStyle = 'rgba(37, 99, 235, 0.6)'; // Primary blue with opacity
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();

    // Draw points
    data.forEach((point, index) => {
      ctx.beginPath();
      ctx.arc(point.x, point.y, 4 + (index / data.length) * 4, 0, 2 * Math.PI); // Size grows with time
      ctx.fillStyle = `rgba(37, 99, 235, ${0.4 + (index / data.length) * 0.6})`; // Opacity grows with time
      ctx.fill();
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Draw sequence numbers for key points (e.g., every 10th point)
      if (index % 10 === 0 || index === 0 || index === data.length - 1) {
        ctx.fillStyle = 'white';
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(index.toString(), point.x, point.y);
      }
    });

  }, [data, width, height]);

  return (
    <div 
      className="relative overflow-hidden rounded-lg shadow-2xl border border-border"
      style={{ width: '100%', height: '100%', minHeight: '600px' }}
    >
      <img 
        src={imageUrl} 
        alt="Analyzed Target" 
        className="absolute inset-0 w-full h-full object-contain z-0"
      />
      <canvas 
        ref={canvasRef}
        width={width}
        height={height}
        className="absolute inset-0 w-full h-full z-10 pointer-events-none"
      />
    </div>
  );
}
