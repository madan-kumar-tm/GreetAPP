import { useEffect, useRef } from 'react';

const ANIMATIONS = ['snow', 'birthday', 'fire'];

function snowFalling(containerRef, activeIdRef, rafRef) {
  const id = ++activeIdRef.current;
  const container = containerRef.current;
  if (!container) return;

  container.innerHTML = '';
  const vw = window.innerWidth;
  const flakeCount = 60;
  const startTime = performance.now();

  for (let i = 0; i < flakeCount; i++) {
    const flake = document.createElement('div');
    const size = 4 + Math.random() * 8;
    const startX = Math.random() * vw;
    const delay = Math.random() * 2;
    const speed = 1 + Math.random() * 2;
    const drift = (Math.random() - 0.5) * 60;
    flake.style.cssText = `
      position:absolute;left:${startX}px;top:-20px;
      width:${size}px;height:${size}px;background:white;border-radius:50%;
      opacity:${0.5 + Math.random() * 0.5};box-shadow:0 0 6px rgba(255,255,255,0.6);
    `;
    flake.dataset.speed = speed;
    flake.dataset.drift = drift;
    flake.dataset.delay = delay;
    flake.dataset.startX = startX;
    container.appendChild(flake);
  }

  function tick() {
    if (id !== activeIdRef.current) return;
    const elapsed = (performance.now() - startTime) / 1000;
    const flakes = container.querySelectorAll('div');

    flakes.forEach((flake) => {
      const speed = parseFloat(flake.dataset.speed) || 1;
      const drift = parseFloat(flake.dataset.drift) || 0;
      const delay = parseFloat(flake.dataset.delay) || 0;
      const startX = parseFloat(flake.dataset.startX) || 0;
      if (elapsed < delay) return;

      const t = elapsed - delay;
      const y = -20 + t * 80 * speed;
      const x = startX + Math.sin(t * 2) * drift;
      flake.style.top = `${y}px`;
      flake.style.left = `${x}px`;
    });

    if (elapsed < 8) {
      rafRef.current = requestAnimationFrame(tick);
    } else if (id === activeIdRef.current) {
      container.innerHTML = '';
    }
  }
  rafRef.current = requestAnimationFrame(tick);
}

function birthdayPop(containerRef, activeIdRef, rafRef) {
  const id = ++activeIdRef.current;
  const container = containerRef.current;
  if (!container) return;

  container.innerHTML = '';
  const colors = ['#e8b86d', '#e74c3c', '#3498db', '#2ecc71', '#9b59b6', '#f39c12', '#1abc9c'];
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const cx = vw / 2;
  const cy = vh / 2;
  const count = 120;
  const startTime = performance.now();
  const duration = 2;

  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    const size = 6 + Math.random() * 12;
    const angle = (i / count) * Math.PI * 2 + Math.random() * Math.PI;
    const dist = 200 + Math.random() * Math.max(vw, vh);
    const tx = cx + Math.cos(angle) * dist;
    const ty = cy + Math.sin(angle) * dist;
    p.style.cssText = `
      position:absolute;left:${cx}px;top:${cy}px;
      width:${size}px;height:${size}px;
      background:${colors[Math.floor(Math.random() * colors.length)]};
      transform:translate(-50%,-50%);border-radius:${Math.random() > 0.5 ? '2px' : '50%'};opacity:1;
    `;
    p.dataset.tx = tx - cx;
    p.dataset.ty = ty - cy;
    p.dataset.rot = (Math.random() - 0.5) * 720;
    container.appendChild(p);
  }

  function tick() {
    if (id !== activeIdRef.current) return;
    const t = Math.min(1, (performance.now() - startTime) / 1000 / duration);
    const particles = container.querySelectorAll('div');

    particles.forEach((p) => {
      const dx = parseFloat(p.dataset.tx) * t;
      const dy = parseFloat(p.dataset.ty) * t;
      const rot = parseFloat(p.dataset.rot) * t;
      const opacity = Math.max(0, 1 - t);
      p.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) rotate(${rot}deg)`;
      p.style.opacity = opacity;
    });

    if (t < 1) {
      rafRef.current = requestAnimationFrame(tick);
    } else if (id === activeIdRef.current) {
      container.innerHTML = '';
    }
  }
  rafRef.current = requestAnimationFrame(tick);
}

function fireBlast(containerRef, activeIdRef, rafRef) {
  const id = ++activeIdRef.current;
  const container = containerRef.current;
  if (!container) return;

  container.innerHTML = '';
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const cx = vw / 2;
  const cy = vh / 2;
  const fireColors = ['#ff6b35', '#f7931e', '#fdc830', '#e8b86d', '#ff4500', '#ffa500'];
  const emberCount = 80;
  const startTime = performance.now();
  const duration = 2;

  for (let i = 0; i < emberCount; i++) {
    const p = document.createElement('div');
    const size = 8 + Math.random() * 16;
    const angle = (i / emberCount) * Math.PI * 2 + Math.random();
    const dist = 150 + Math.random() * Math.max(vw, vh) * 0.6;
    p.style.cssText = `
      position:absolute;left:${cx}px;top:${cy}px;
      width:${size}px;height:${size}px;
      background:radial-gradient(circle,${fireColors[Math.floor(Math.random() * fireColors.length)]}, transparent);
      transform:translate(-50%,-50%) scale(0);border-radius:50%;opacity:1;box-shadow:0 0 20px currentColor;
    `;
    p.dataset.tx = Math.cos(angle) * dist;
    p.dataset.ty = Math.sin(angle) * dist;
    p.dataset.scale = 0.5 + Math.random();
    container.appendChild(p);
  }

  function tick() {
    if (id !== activeIdRef.current) return;
    const t = Math.min(1, (performance.now() - startTime) / 1000 / duration);
    const easeOut = 1 - Math.pow(1 - t, 2);
    const particles = container.querySelectorAll('div');

    particles.forEach((p) => {
      const dx = parseFloat(p.dataset.tx) * easeOut;
      const dy = parseFloat(p.dataset.ty) * easeOut;
      const scale = parseFloat(p.dataset.scale) * Math.min(1, t * 2);
      const opacity = Math.max(0, 1 - t);
      p.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(${scale})`;
      p.style.opacity = opacity;
    });

    if (t < 1) {
      rafRef.current = requestAnimationFrame(tick);
    } else if (id === activeIdRef.current) {
      container.innerHTML = '';
    }
  }
  rafRef.current = requestAnimationFrame(tick);
}

const RUNNERS = {
  snow: snowFalling,
  birthday: birthdayPop,
  fire: fireBlast,
};

export function AnimationLayer({ trigger }) {
  const containerRef = useRef(null);
  const activeIdRef = useRef(0);
  const rafRef = useRef(null);

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    if (trigger == null || trigger === 0) return;

    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    const key = ANIMATIONS[Math.floor(Math.random() * ANIMATIONS.length)];
    RUNNERS[key](containerRef, activeIdRef, rafRef);
  }, [trigger]);

  return (
    <div
      className="animation-layer"
      ref={containerRef}
      aria-hidden="true"
    />
  );
}
