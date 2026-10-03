"use client";
import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { gsap } from "@/lib/gsap";
import { useInView, isLowPower } from "@/hooks/useInView";
import { srcSet } from "@/lib/img";
import { timeline } from "@/lib/content";
const Sparks = dynamic(() => import("@/components/three/Sparks"), { ssr: false });

export default function Cinematic() {
  const root = useRef<HTMLElement>(null);
  const near = useInView(root, "400px", true);   // загрузить three.js заранее, один раз
  const visible = useInView(root, "0px");          // крутить рендер только на экране
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top top", end: "+=400%", pin: true, scrub: 0.8 } });
      tl.fromTo(".cine-frame", { clipPath: "inset(18% 22% 18% 22%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: "power2.inOut" })
        .fromTo(".cine-img", { scale: 1.35, xPercent: -6 }, { scale: 1, xPercent: 4, duration: 4, ease: "none" }, 0)
        .to(".cine-bars", { scaleY: 1, duration: 0.6 }, 0.6);
      gsap.utils.toArray<HTMLElement>(".cine-tc").forEach((el, i) => {
        tl.fromTo(el, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.3 }, 1 + i * 0.75)
          .to(el, { opacity: 0, x: 30, duration: 0.3 }, 1.5 + i * 0.75);
      });
      tl.fromTo(".cine-clock", { innerText: 7 }, { innerText: 24, duration: 3.2, snap: { innerText: 1 }, ease: "none" }, 1);
    }, root);
    return () => ctx.revert();
  }, []);
  return (
    <section ref={root} className="relative h-screen overflow-hidden bg-black">{/* cine */}
      <div className="cine-frame absolute inset-0 overflow-hidden">
        <img src="/images/work-1920.webp" srcSet={srcSet("work")} sizes="100vw" loading="lazy" decoding="async" alt="Сварка кузова" className="cine-img h-full w-full object-cover will-change-transform" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
        {near && <div className="absolute inset-0"><Sparks active={visible} count={isLowPower() ? 300 : 700} /></div>}
      </div>
      <div className="cine-bars pointer-events-none absolute inset-x-0 top-0 h-[9vh] origin-top scale-y-0 bg-black" />
      <div className="cine-bars pointer-events-none absolute inset-x-0 bottom-0 h-[9vh] origin-bottom scale-y-0 bg-black" />
      <div className="absolute left-6 top-[12vh] font-mono text-xs text-zholty md:left-[6vw]">ГЛАВА II · ОДИН ДЕНЬ · <span className="text-krasny">● REC</span></div>
      <div className="absolute right-6 top-[12vh] font-poster text-5xl text-white/80 md:right-[6vw]"><span className="cine-clock">7</span>:00</div>
      <div className="absolute bottom-[14vh] left-6 md:left-[6vw]">
        {timeline.map((t) => (
          <div key={t.tc} className="cine-tc absolute bottom-0 left-0 w-[80vw] max-w-2xl opacity-0">
            <div className="font-mono text-zholty">{t.tc}</div>
            <div className="font-body text-3xl font-medium md:text-5xl">{t.t}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
