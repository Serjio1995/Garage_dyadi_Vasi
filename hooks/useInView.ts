"use client";
import { useEffect, useState, RefObject } from "react";

/** true, пока элемент в зоне видимости (с запасом margin). once — не сбрасывать после первого показа */
export function useInView(ref: RefObject<Element>, margin = "200px", once = false) {
  const [inView, set] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      set(e.isIntersecting);
      if (once && e.isIntersecting) io.disconnect();
    }, { rootMargin: margin });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, margin, once]);
  return inView;
}

/** Слабое устройство / экономия / reduced motion — облегчаем 3D */
export function isLowPower() {
  if (typeof window === "undefined") return true;
  const n = navigator as any;
  return matchMedia("(prefers-reduced-motion: reduce)").matches || matchMedia("(pointer: coarse)").matches ||
    (n.hardwareConcurrency ?? 8) <= 4 || n.connection?.saveData === true || (n.deviceMemory ?? 8) <= 4;
}
