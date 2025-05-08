
import React from 'react';
import { TreePalm } from 'lucide-react';

interface LoadingCircleProps {
  className?: string;
}

const LoadingCircle: React.FC<LoadingCircleProps> = ({ className = "" }) => {
  return (
    <div className={`loading-circle ${className}`}>
      {/* Palm tree icon in the center */}
      <div className="absolute z-10 transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
        <TreePalm size={30} color="#2E5B3E" strokeWidth={2} />
      </div>
      
      {/* Loading dots in a circle */}
      <div className="circle-dot dot-1"></div>
      <div className="circle-dot dot-2"></div>
      <div className="circle-dot dot-3"></div>
      <div className="circle-dot dot-4"></div>
      <div className="circle-dot dot-5"></div>
      <div className="circle-dot dot-6"></div>
      <div className="circle-dot dot-7"></div>
      <div className="circle-dot dot-8"></div>
    </div>
  );
};

export default LoadingCircle;
