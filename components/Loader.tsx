'use client';

import React from 'react';

const Loader = () => {
  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-xs flex items-center justify-center"
      role="status"
      aria-label="Loading content"
    >
      <div className="relative w-10 h-10 perspective-[80px] flex items-center justify-center">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute left-1/2 w-full h-full bg-[#ddb03499] rounded-md"
            style={{
              transformOrigin: 'left',
              animation: 'spinY 2s infinite',
              animationDelay: `${i * 0.15}s`,
            }}
          />
        ))}

        <style jsx>{`
          @keyframes spinY {
            0% {
              transform: rotateY(0deg);
              opacity: 1;
            }
            50%,
            80% {
              transform: rotateY(-180deg);
              opacity: 1;
            }
            90%,
            100% {
              transform: rotateY(-180deg);
              opacity: 0;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default Loader;
