import React, { useEffect, useRef } from 'react';

const PS2Background = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    let time = 0;

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Floating shapes
    const shapes = [];
    const numShapes = 15;
    
    // PS2 button symbols and geometric shapes
    const shapeTypes = ['triangle', 'circle', 'square', 'cross', 'diamond', 'ring'];
    
    for (let i = 0; i < numShapes; i++) {
      shapes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 1000 + 200, // depth
        size: Math.random() * 40 + 20,
        type: shapeTypes[Math.floor(Math.random() * shapeTypes.length)],
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        rotation: Math.random() * Math.PI * 2,
        driftX: (Math.random() - 0.5) * 0.3,
        driftY: (Math.random() - 0.5) * 0.2,
        driftZ: (Math.random() - 0.5) * 0.5,
      });
    }

    // Particles
    const particles = [];
    const numParticles = 200;
    
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 2000,
        size: Math.random() * 2 + 0.5,
        speed: Math.random() * 0.5 + 0.1,
      });
    }

    const drawShape = (shape, projectedX, projectedY, projectedSize, alpha) => {
      ctx.save();
      ctx.translate(projectedX, projectedY);
      ctx.rotate(shape.rotation);
      
      const size = projectedSize;
      ctx.strokeStyle = `rgba(0, 255, 255, ${alpha * 0.6})`;
      ctx.fillStyle = `rgba(0, 255, 255, ${alpha * 0.1})`;
      ctx.lineWidth = 1.5;
      ctx.shadowColor = 'rgba(0, 255, 255, 0.8)';
      ctx.shadowBlur = 15;

      switch (shape.type) {
        case 'triangle':
          ctx.beginPath();
          ctx.moveTo(0, -size);
          ctx.lineTo(size * 0.866, size * 0.5);
          ctx.lineTo(-size * 0.866, size * 0.5);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          break;
          
        case 'circle':
          ctx.beginPath();
          ctx.arc(0, 0, size * 0.7, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
          break;
          
        case 'square':
          ctx.beginPath();
          ctx.rect(-size * 0.6, -size * 0.6, size * 1.2, size * 1.2);
          ctx.fill();
          ctx.stroke();
          break;
          
        case 'cross':
          const thickness = size * 0.25;
          ctx.beginPath();
          // Vertical bar
          ctx.moveTo(-thickness, -size * 0.8);
          ctx.lineTo(thickness, -size * 0.8);
          ctx.lineTo(thickness, -thickness);
          ctx.lineTo(size * 0.8, -thickness);
          ctx.lineTo(size * 0.8, thickness);
          ctx.lineTo(thickness, thickness);
          ctx.lineTo(thickness, size * 0.8);
          ctx.lineTo(-thickness, size * 0.8);
          ctx.lineTo(-thickness, thickness);
          ctx.lineTo(-size * 0.8, thickness);
          ctx.lineTo(-size * 0.8, -thickness);
          ctx.lineTo(-thickness, -thickness);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          break;
          
        case 'diamond':
          ctx.beginPath();
          ctx.moveTo(0, -size);
          ctx.lineTo(size * 0.6, 0);
          ctx.lineTo(0, size);
          ctx.lineTo(-size * 0.6, 0);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          break;
          
        case 'ring':
          ctx.beginPath();
          ctx.arc(0, 0, size * 0.7, 0, Math.PI * 2);
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(0, 0, size * 0.5, 0, Math.PI * 2);
          ctx.stroke();
          break;
          
        default:
          break;
      }
      
      ctx.restore();
    };

    const animate = () => {
      time += 0.016;
      
      // Clear with fade effect
      ctx.fillStyle = 'rgba(0, 8, 12, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Deep background gradient
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width * 0.8
      );
      gradient.addColorStop(0, 'rgba(0, 20, 30, 0.1)');
      gradient.addColorStop(0.5, 'rgba(0, 10, 20, 0.1)');
      gradient.addColorStop(1, 'rgba(0, 5, 10, 0.1)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach(p => {
        p.z -= p.speed;
        if (p.z < 1) {
          p.z = 2000;
          p.x = Math.random() * canvas.width;
          p.y = Math.random() * canvas.height;
        }
        
        const scale = 800 / p.z;
        const projectedX = (p.x - canvas.width / 2) * scale + canvas.width / 2;
        const projectedY = (p.y - canvas.height / 2) * scale + canvas.height / 2;
        const projectedSize = p.size * scale;
        const alpha = Math.min(1, (2000 - p.z) / 1500) * 0.6;
        
        ctx.beginPath();
        ctx.arc(projectedX, projectedY, projectedSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 200, 255, ${alpha})`;
        ctx.fill();
      });

      // Update and draw shapes
      shapes.forEach(shape => {
        // Drift movement
        shape.x += shape.driftX;
        shape.y += shape.driftY;
        shape.z += shape.driftZ;
        shape.rotation += shape.rotationSpeed;
        
        // Wrap around
        if (shape.x < -100) shape.x = canvas.width + 100;
        if (shape.x > canvas.width + 100) shape.x = -100;
        if (shape.y < -100) shape.y = canvas.height + 100;
        if (shape.y > canvas.height + 100) shape.y = -100;
        if (shape.z < 100) shape.z = 1000;
        if (shape.z > 1000) shape.z = 100;
        
        // 3D projection
        const scale = 500 / shape.z;
        const projectedX = (shape.x - canvas.width / 2) * scale + canvas.width / 2;
        const projectedY = (shape.y - canvas.height / 2) * scale + canvas.height / 2;
        const projectedSize = shape.size * scale;
        const alpha = Math.min(1, (1000 - shape.z) / 800);
        
        drawShape(shape, projectedX, projectedY, projectedSize, alpha);
      });

      animationId = requestAnimationFrame(animate);
    };

    // Initial clear
    ctx.fillStyle = '#000a0f';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      }}
    />
  );
};

export default PS2Background;
