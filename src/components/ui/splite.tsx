"use client";

import { Suspense, lazy } from "react";

const Spline = lazy(() => import("@splinetool/react-spline"));

interface SplineSceneProps {
  scene: string;
  className?: string;
  /** Fires once the 3D scene has fully loaded and rendered. */
  onLoad?: () => void;
}

export function SplineScene({ scene, className, onLoad }: SplineSceneProps) {
  return (
    <Suspense
      fallback={
        <div className="w-full h-full flex items-center justify-center bg-transparent">
          <span className="loader" aria-label="Loading 3D scene" />
        </div>
      }
    >
      <div className="spline-host w-full h-full cursor-default">
        <Spline scene={scene} className={className} onLoad={onLoad ? () => onLoad() : undefined} />
      </div>
    </Suspense>
  );
}
