
import React from 'react';

interface LoadingCircleProps {
  className?: string;
}

const LoadingCircle: React.FC<LoadingCircleProps> = ({ className = "" }) => {
  return (
    <div className={`loading-circle ${className}`}>
      {/* Palm tree icon in the center */}
      <div className="absolute z-10">
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C12 8 8 9 8 16C8 18 10 22 12 22C14 22 16 18 16 16C16 9 12 8 12 2Z" stroke="#2E5B3E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 16C10 16 7 15 7 12" stroke="#2E5B3E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 16C14 16 17 15 17 12" stroke="#2E5B3E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
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
