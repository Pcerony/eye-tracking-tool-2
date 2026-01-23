import { useEffect, useRef } from 'react';
// @ts-ignore
import h337 from 'heatmap.js';

interface HeatmapProps {
  imageUrl: string;
  data: Array<{ x: number; y: number; value?: number }>;
  width?: number;
  height?: number;
}

export function Heatmap({ imageUrl, data, width = window.innerWidth, height = window.innerHeight }: HeatmapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const heatmapInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize heatmap instance
    heatmapInstanceRef.current = h337.create({
      container: containerRef.current,
      radius: 50,
      maxOpacity: 0.6,
      minOpacity: 0,
      blur: 0.75,
    });

    // Prepare data
    const points = data.map(point => ({
      x: Math.round(point.x),
      y: Math.round(point.y),
      value: point.value || 1
    }));

    // Set data
    heatmapInstanceRef.current.setData({
      max: 5, // Threshold for "hot" spots
      data: points
    });

    return () => {
      // Cleanup if needed (heatmap.js usually appends a canvas, we might want to remove it)
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [data, width, height]);

  return (
    <div 
      ref={containerRef} 
      className="relative overflow-hidden rounded-lg shadow-2xl border border-border"
      style={{ width: '100%', height: '100%', minHeight: '600px' }}
    >
      <img 
        src={imageUrl} 
        alt="Analyzed Target" 
        className="absolute inset-0 w-full h-full object-contain z-0"
      />
      {/* Heatmap canvas will be injected here by heatmap.js with z-index > 0 */}
    </div>
  );
}
