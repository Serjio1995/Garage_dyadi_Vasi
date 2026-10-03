"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/** Морфинг-переход между секциями: сжимающаяся «шторка» и бегущая строка */
export default function Transition({ text, color = "krasny" }: { text: string; color?: "krasny" | "zholty" }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".tr-band", { clipPath: "polygon(0 45%,100% 55%,100% 55%,0 45%)" },
        { clipPath: "polygon(0 0,100% 10%,100% 90%,0 100%)", ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "center center", scrub: true } });
      gsap.fromTo(".tr-text", { xPercent: 0 }, { xPercent: -50, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } });
    }, root);
    return () => ctx.revert();
  }, []);
  const bg = color === "krasny" ? "bg-krasny text-zholty" : "bg-zholty text-black";
  return (
    <div ref={root} className="relative -my-[6vh] h-[30vh] overflow-hidden">
      <div className={`tr-band absolute inset-0 flex items-center ${bg}`}>
        <div className="tr-text whitespace-nowrap font-poster text-[9vw] leading-none">{(text + " ★ ").repeat(6)}</div>
      </div>
    </div>
  );
}
