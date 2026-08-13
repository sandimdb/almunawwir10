import React, { useEffect, useRef, useMemo } from 'react';

export default function ParticleBackground() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  const particleCount = 80;

  // Generate particles once with useMemo
  const particles = useMemo(() => {
    return Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      radius: Math.random() * 2.5 + 0.5,
      speedY: Math.random() * 0.6 + 0.2,
      speedX: (Math.random() - 0.5) * 0.4,
      opacity: Math.random() * 0.7 + 0.15,
      twinkleSpeed: Math.random() * 0.015 + 0.005,
      twinklePhase: Math.random() * Math.PI * 2,
      // Shape: 0 = circle/dot, 1 = star (small cross), 2 = crescent (arc)
      shape: i % 7 === 0 ? 'star' : i % 13 === 0 ? 'ring' : 'dot',
      size: Math.random() * 3 + 1,
    }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    let time = 0;

    const drawStar = (ctx, cx, cy, size, color) => {
      const spikes = 4;
      const outerRadius = size * 1.6;
      const innerRadius = size * 0.6;
      ctx.beginPath();
      for (let i = 0; i < spikes * 2; i++) {
        const angle = (i * Math.PI) / spikes - Math.PI / 2;
        const r = i % 2 === 0 ? outerRadius : innerRadius;
        const x = cx + Math.cos(angle) * r;
        const y = cy + Math.sin(angle) * r;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
    };

    const drawRing = (ctx, cx, cy, size, color) => {
      ctx.beginPath();
      ctx.arc(cx, cy, size * 1.5, 0, Math.PI * 2);
      ctx.strokeStyle = color;
      ctx.lineWidth = 0.7;
      ctx.stroke();
    };

    const drawDot = (ctx, cx, cy, radius, color) => {
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.016;

      for (const p of particles) {
        // Drift downward (snow-like)
        p.y += p.speedY;
        p.x += Math.sin(time * 0.5 + p.twinklePhase) * 0.3 + p.speedX;

        // Reset if out of screen
        if (p.y > canvas.height + 10) {
          p.y = -10;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;

        // Twinkling opacity
        const twinkleOp = p.opacity * (0.6 + 0.4 * Math.sin(time * p.twinkleSpeed * 60 + p.twinklePhase));

        // Emerald or gold color palette
        const colorPalette = [
          `rgba(16, 185, 129, ${twinkleOp})`,  // emerald
          `rgba(52, 211, 153, ${twinkleOp})`,  // lighter emerald
          `rgba(245, 158, 11, ${twinkleOp * 0.7})`,  // amber/gold accent (subtle)
          `rgba(255, 255, 255, ${twinkleOp * 0.4})`,  // white faint
        ];
        const color = colorPalette[p.id % colorPalette.length];

        if (p.shape === 'star') {
          drawStar(ctx, p.x, p.y, p.size, color);
        } else if (p.shape === 'ring') {
          drawRing(ctx, p.x, p.y, p.size, color);
        } else {
          drawDot(ctx, p.x, p.y, p.radius, color);
        }
      }

      // Draw connecting lines between close dots (subtle network effect)
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 80) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(16, 185, 129, ${0.05 * (1 - dist / 80)})`;
            ctx.lineWidth = 0.4;
            ctx.stroke();
          }
        }
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [particles]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
