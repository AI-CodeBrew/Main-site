"use client";

import { Suspense, lazy } from "react";

const Spline = lazy(() => import("@splinetool/react-spline"));

interface SplineSceneProps {
  scene: string;
  className?: string;
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <Suspense
      fallback={
        <div className="w-full h-full flex items-center justify-center bg-transparent">
          <span className="loader" aria-label="Loading 3D scene" />
        </div>
      }
    >
      <div className="spline-host w-full h-full cursor-default">
        <Spline scene={scene} className={className} />
      </div>
    </Suspense>
  );
}
