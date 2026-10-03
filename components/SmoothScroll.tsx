"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Пересчёт позиций ScrollTrigger после шрифтов/картинок/ресайза — иначе триггеры ниже по странице «съезжают»
    let t: any;
    const refresh = () => { clearTimeout(t); t = setTimeout(() => ScrollTrigger.refresh(), 120); };
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);
    window.addEventListener("app:ready", refresh);
    return () => { window.removeEventListener("load", refresh); window.removeEventListener("app:ready", refresh); clearTimeout(t); };
  }, []);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    (window as any).__lenis = lenis;
    return () => { gsap.ticker.remove(tick); lenis.destroy(); };
  }, []);
  return <>{children}</>;
}
