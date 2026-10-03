"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { srcSet } from "@/lib/img";

export default function Parallax() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true };
      gsap.fromTo(".px-bg", { yPercent: -15, scale: 1.2 }, { yPercent: 15, scale: 1.05, ease: "none", scrollTrigger: st });
      gsap.fromTo(".px-word", { xPercent: 20 }, { xPercent: -40, ease: "none", scrollTrigger: st });
      gsap.fromTo(".px-car", { xPercent: -35 }, { xPercent: 20, ease: "none", scrollTrigger: st });
      gsap.fromTo(".px-fg", { yPercent: 40 }, { yPercent: -60, ease: "none", scrollTrigger: st });
      gsap.from(".px-text .word", { yPercent: 110, stagger: 0.05, duration: 1, ease: "power3.out", scrollTrigger: { trigger: ".px-text", start: "top 85%" } });
    }, root);
    return () => ctx.revert();
  }, []);
  const words = "Волга 1962 года. Приехала на эвакуаторе. Уехала своим ходом.".split(" ");
  return (
    <section ref={root} className="relative h-[160vh] overflow-hidden bg-black">
      <div className="sticky top-0 h-screen overflow-hidden">
        <img src="/images/p-bg-1920.webp" srcSet={srcSet("p-bg")} sizes="100vw" loading="lazy" decoding="async" alt="" className="will-change-transform px-bg absolute inset-0 h-full w-full object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
        <div className="px-word absolute top-[14vh] whitespace-nowrap font-poster text-[24vw] leading-none text-krasny/25">ГАЗ-21 · ГАЗ-21</div>
        <img src="/images/p-car-1600.webp" srcSet="/images/p-car-900.webp 900w, /images/p-car-1600.webp 1600w" sizes="(max-width:768px) 110vw, 70vw" loading="lazy" decoding="async" alt="Волга ГАЗ-21" className="px-car will-change-transform absolute bottom-[4vh] left-[15vw] w-[110vw] max-w-none md:w-[70vw]" />
        <div className="px-fg pointer-events-none absolute inset-x-0 bottom-0 h-[30vh] bg-gradient-to-t from-black to-transparent" />
        <div className="px-fg absolute right-6 top-[40vh] h-24 w-24 hazard opacity-60 md:right-[8vw]" style={{ clipPath: "polygon(50% 0,100% 100%,0 100%)" }} />
        <div className="px-text absolute left-6 top-[10vh] max-w-xl md:left-[6vw]">
          <div className="font-mono text-xs text-zholty">ГЛАВА IV · ДО И ПОСЛЕ</div>
          <p className="mt-4 font-body text-4xl font-medium leading-tight md:text-6xl">
            {words.map((w, i) => <span key={i} className="inline-block overflow-hidden align-bottom"><span className="word inline-block">{w}&nbsp;</span></span>)}
          </p>
          <p className="mt-4 font-mono text-sm text-beton">14 месяцев. 2 300 фотографий в отчёте. Хозяин плакал, но просил не писать.</p>
        </div>
      </div>
    </section>
  );
}
