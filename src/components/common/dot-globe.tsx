"use client";

import { useEffect, useRef } from "react";

type City = { name: string; lat: number; lon: number };

// Markets we serve; arcs are drawn from the first city (delivery center) to the rest.
const cities: City[] = [
  { name: "Lahore", lat: 31.5, lon: 74.3 },
  { name: "Dubai", lat: 25.2, lon: 55.3 },
  { name: "Riyadh", lat: 24.7, lon: 46.7 },
  { name: "London", lat: 51.5, lon: -0.1 },
  { name: "New York", lat: 40.7, lon: -74.0 },
];

const POINT_COUNT = 900;
const TILT = 0.35; // radians the globe leans toward the viewer
const SPEED = 0.12; // radians per second; positive = anticlockwise seen from the north pole

type Vec = [number, number, number];

function fibonacciSphere(n: number): Vec[] {
  const points: Vec[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    points.push([Math.cos(theta) * r, y, Math.sin(theta) * r]);
  }
  return points;
}

function latLonToVec(lat: number, lon: number): Vec {
  const la = (lat * Math.PI) / 180;
  const lo = (lon * Math.PI) / 180;
  return [Math.cos(la) * Math.sin(lo), Math.sin(la), Math.cos(la) * Math.cos(lo)];
}

// Rotate around the Y axis by `angle`, then tilt around the X axis.
function rotate([x, y, z]: Vec, angle: number): Vec {
  const cosA = Math.cos(angle);
  const sinA = Math.sin(angle);
  const x1 = x * cosA + z * sinA;
  const z1 = -x * sinA + z * cosA;
  const cosT = Math.cos(TILT);
  const sinT = Math.sin(TILT);
  return [x1, y * cosT - z1 * sinT, y * sinT + z1 * cosT];
}

function slerp(a: Vec, b: Vec, t: number): Vec {
  const dot = Math.min(1, Math.max(-1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2]));
  const omega = Math.acos(dot);
  if (omega < 1e-6) return a;
  const s = Math.sin(omega);
  const ka = Math.sin((1 - t) * omega) / s;
  const kb = Math.sin(t * omega) / s;
  return [a[0] * ka + b[0] * kb, a[1] * ka + b[1] * kb, a[2] * ka + b[2] * kb];
}

export function DotGlobe({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const points = fibonacciSphere(POINT_COUNT);
    const cityVecs = cities.map((c) => latLonToVec(c.lat, c.lon));
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    // Start with the Middle East / Pakistan facing the viewer.
    let angle = -1.1;
    let last = performance.now();
    let frame = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      const cx = width / 2;
      const cy = height / 2;
      // 0.38 leaves room for the arcs (lifted 22% above the surface) to stay inside the canvas.
      const radius = Math.min(width, height) * 0.38;
      const project = ([x, y]: Vec) => [cx + x * radius, cy - y * radius] as const;

      ctx.clearRect(0, 0, width, height);

      const glow = ctx.createRadialGradient(cx, cy, radius * 0.1, cx, cy, radius * 1.25);
      glow.addColorStop(0, "rgba(255,255,255,0.10)");
      glow.addColorStop(0.6, "rgba(255,255,255,0.03)");
      glow.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      for (const p of points) {
        const r = rotate(p, angle);
        const depth = (r[2] + 1) / 2; // 0 = back, 1 = front
        const [sx, sy] = project(r);
        ctx.fillStyle = `rgba(255,255,255,${0.08 + depth * 0.85})`;
        ctx.beginPath();
        ctx.arc(sx, sy, 0.6 + depth * 1.3, 0, Math.PI * 2);
        ctx.fill();
      }

      // Arcs from the delivery center to each market, lifted above the surface.
      const origin = cityVecs[0];
      ctx.lineWidth = 1;
      for (let i = 1; i < cityVecs.length; i++) {
        const steps = 48;
        let prev: readonly [number, number] | null = null;
        for (let s = 0; s <= steps; s++) {
          const t = s / steps;
          const lift = 1 + 0.22 * Math.sin(Math.PI * t);
          const base = slerp(origin, cityVecs[i], t);
          const r = rotate([base[0] * lift, base[1] * lift, base[2] * lift], angle);
          const pt = project(r);
          if (prev) {
            ctx.strokeStyle = `rgba(255,255,255,${r[2] > 0 ? 0.55 : 0.12})`;
            ctx.beginPath();
            ctx.moveTo(prev[0], prev[1]);
            ctx.lineTo(pt[0], pt[1]);
            ctx.stroke();
          }
          prev = pt;
        }
      }

      ctx.font = "11px Inter, system-ui, sans-serif";
      ctx.textBaseline = "middle";
      cityVecs.forEach((v, i) => {
        const r = rotate(v, angle);
        if (r[2] < 0.05) return;
        const [sx, sy] = project(r);
        const alpha = Math.min(1, r[2] * 2);
        ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
        ctx.fillStyle = `rgba(0,0,0,${alpha})`;
        ctx.beginPath();
        ctx.arc(sx, sy, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = `rgba(255,255,255,${alpha * 0.85})`;
        ctx.fillText(cities[i].name, sx + 7, sy);
      });
    };

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      angle += SPEED * dt;
      draw();
      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      if (reduceMotion || frame) return;
      last = performance.now();
      frame = requestAnimationFrame(tick);
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    resize();
    draw();
    start();

    const resizeObserver = new ResizeObserver(() => {
      resize();
      draw();
    });
    resizeObserver.observe(canvas);

    // Pause the animation while the hero is scrolled out of view.
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) start();
      else stop();
    });
    intersectionObserver.observe(canvas);

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
