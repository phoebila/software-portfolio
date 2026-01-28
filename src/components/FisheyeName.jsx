import React, { useState, useEffect } from 'react';

const FisheyeName = ({ name = 'Phoebe Royer' }) => {
  const letters = name.split('');
  const [rotation, setRotation] = useState(0);
  
  const containerSize = 350;
  const radiusX = 140;
  const radiusZ = 80;

  // Smooth rotation animation
  useEffect(() => {
    let animationId;
    const animate = () => {
      setRotation(prev => (prev + 0.3) % 360);
      animationId = requestAnimationFrame(animate);
    };
    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: containerSize,
      height: containerSize,
      perspective: '600px',
    }}>
      <div style={{
        position: 'relative',
        width: containerSize,
        height: 120,
        transformStyle: 'preserve-3d',
      }}>
        {/* Main text - 3D Carousel */}
        {letters.map((letter, index) => {
          const baseAngle = (index / letters.length) * 360;
          const currentAngle = baseAngle + rotation;
          const radian = (currentAngle * Math.PI) / 180;
          
          const x = Math.sin(radian) * radiusX;
          const z = Math.cos(radian) * radiusZ;
          
          const isVisible = z > -20;
          
          const normalizedZ = Math.max(0, (z + radiusZ) / (2 * radiusZ));
          const scale = 0.6 + normalizedZ * 0.9;
          const opacity = isVisible ? (0.3 + normalizedZ * 0.7) : 0;
          const blur = (1 - normalizedZ) * 1.5;
          
          return (
            <span
              key={index}
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: `
                  translateX(-50%)
                  translateY(-50%)
                  translateX(${x}px)
                  translateZ(${z}px)
                  scale(${scale})
                `,
                fontSize: '2.4rem',
                fontWeight: 700,
                color: '#fff',
                textShadow: normalizedZ > 0.4 ? `
                  0 0 ${15 * normalizedZ}px rgba(0, 255, 255, ${opacity}),
                  0 0 ${30 * normalizedZ}px rgba(0, 255, 255, ${opacity * 0.5}),
                  0 0 ${50 * normalizedZ}px rgba(0, 200, 255, ${opacity * 0.3})
                ` : 'none',
                opacity: opacity,
                filter: blur > 0.3 ? `blur(${blur}px)` : 'none',
                zIndex: Math.round(normalizedZ * 100),
                willChange: 'transform, opacity',
                letterSpacing: '0.05em',
                transition: 'opacity 0.1s ease',
                fontFamily: 'inherit',
              }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </span>
          );
        })}
        
        {/* Epicenter - falling code */}
        <div style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: 80,
          height: 100,
          overflow: 'hidden',
          pointerEvents: 'none',
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
        }}>
          {[0, 1, 2, 3, 4].map((col) => (
            <div
              key={col}
              style={{
                position: 'absolute',
                left: `${col * 18 + 5}px`,
                top: 0,
                width: 14,
                height: '200%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                animation: `fall ${2 + col * 0.3}s linear infinite`,
                animationDelay: `${col * 0.4}s`,
              }}
            >
              {['ア', 'イ', 'ウ', '0', '1', 'エ', 'オ', '/', '>', 'カ', 'キ', '=', 'ク', 'ケ', 'コ'].map((char, i) => (
                <span
                  key={i}
                  style={{
                    fontSize: '10px',
                    fontFamily: 'monospace',
                    color: `rgba(0, ${200 + Math.random() * 55}, 255, 0.9)`,
                    textShadow: '0 0 8px rgba(0, 255, 255, 0.9)',
                    marginBottom: '4px',
                    opacity: 0.4 + (Math.random() * 0.6),
                  }}
                >
                  {char}
                </span>
              ))}
            </div>
          ))}
        </div>
        
        <style>{`
          @keyframes fall {
            0% { transform: translateY(-50%); }
            100% { transform: translateY(0%); }
          }
        `}</style>
      </div>
    </div>
  );
};

export default FisheyeName;
