 import React, { useEffect, useRef } from 'react';
  import { Box, useColorModeValue } from '@chakra-ui/react';
  
  interface SparklineChartProps {
    data: number[];
    height?: string;
    color?: string;
  }
  
  const SparklineChart: React.FC<SparklineChartProps> = ({ 
    data, 
    height = "40px",
    color 
  }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const positiveColor = 'green'
    const negativeColor = 'red'
    
    // Determine if trend is positive
    const isPositive = data.length > 1 ? data[data.length - 1] >= data[0] : true;
    const lineColor =  color || (isPositive ? positiveColor : negativeColor);
    
    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas || data.length < 2) return;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
 
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Find min/max for scaling
      const min = Math.min(...data);
      const max = Math.max(...data);
      const range = max - min || 1; 
   
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      
      
      ctx.beginPath();
      
     
      data.forEach((value, index) => {
        const x = (index / (data.length - 1)) * canvas.width;
        const normalizedValue = (value - min) / range;
        const y = canvas.height - (normalizedValue * canvas.height * 0.8) - canvas.height * 0.1;
        
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      
      ctx.stroke();
    }, [data, lineColor]);
    
    return (
      <Box height={height} width="100%">
        <canvas 
          ref={canvasRef} 
          height="40" 
          width="100" 
          style={{ width: '100%', height: '100%' }} 
        />
      </Box>
    );
  };
  
  export default SparklineChart;
  
