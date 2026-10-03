"use client";
import { useEffect, useState } from "react";
import { pick } from "@/lib/img";
import { AnimatePresence, motion } from "framer-motion";

// Только то, что нужно первому экрану; остальное грузится лениво
const assets = () => [pick("gate"), pick("interior"), "/images/metal-512.webp"];

export default function Preloader() {
  const [pct, setPct] = useState(0);
  const [done, setDone] = useState(false);
  useEffect(() => {
    let n = 0;
    const lenis = (window as any).__lenis; lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    const safety = setTimeout(() => setDone(true), 3500);
    const ASSETS = assets(); ASSETS.forEach((src) => { const i = new Image(); i.onload = i.onerror = () => { n++; setPct(Math.round((n / ASSETS.length) * 100)); if (n === ASSETS.length) setTimeout(() => setDone(true), 200); }; i.src = src; });
  }, []);
  useEffect(() => {
    if (!done) return;
    // Фоновая подгрузка остального, чтобы при быстром скролле не было пустых кадров
    const small = innerWidth <= 800;
    const rest = [small ? "work-1080" : "work-1920", small ? "p-bg-1080" : "p-bg-1920", small ? "p-car-900" : "p-car-1600", "c1-800", "c2-800", "c3-800", "c4-800", "c5-800"];
    const idle = (cb: () => void) => ((window as any).requestIdleCallback ? (window as any).requestIdleCallback(cb, { timeout: 2000 }) : setTimeout(cb, 300));
    idle(() => rest.forEach((n) => { const i = new Image(); i.decoding = "async"; i.src = `/images/${n}.webp`; i.decode?.().catch(() => {}); }));
  }, [done]);
  useEffect(() => { if (done) { document.documentElement.style.overflow = ""; (window as any).__lenis?.start(); window.scrollTo(0,0); window.dispatchEvent(new Event("app:ready")); } }, [done]);
  return (
    <AnimatePresence>
      {!done && (
        <motion.div exit={{ clipPath: "inset(0 0 100% 0)" }} transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="metal fixed inset-0 z-[95] flex flex-col items-center justify-center gap-6">
          <img src="/images/emblem.png" alt="" className="h-28 w-28 animate-[spin_6s_linear_infinite]" />
          <div className="font-mono text-sm text-beton">ПРОГРЕВ ДВИГАТЕЛЯ</div>
          <div className="relative h-3 w-64 border border-zholty/60"><div className="hazard h-full transition-all" style={{ width: pct + "%" }} /></div>
          <div className="font-poster text-5xl text-zholty">{String(pct).padStart(3,"0")}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
