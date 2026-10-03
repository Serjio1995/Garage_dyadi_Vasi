"use client";
import dynamic from "next/dynamic";
const Spline = dynamic(() => import("@splinetool/react-spline"), { ssr: false });

/** Опциональная сцена Spline. Задайте NEXT_PUBLIC_SPLINE_SCENE=https://prod.spline.design/XXXX/scene.splinecode в .env.local */
export default function SplineScene({ className = "" }: { className?: string }) {
  const scene = process.env.NEXT_PUBLIC_SPLINE_SCENE;
  if (!scene) return null;
  return <div className={className}><Spline scene={scene} /></div>;
}
