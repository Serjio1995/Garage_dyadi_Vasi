"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { services } from "@/lib/content";

export default function Horizontal() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      const dist = () => track.current!.scrollWidth - innerWidth;
      const tw = gsap.to(track.current, { x: () => -dist(), ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: () => "+=" + dist(), pin: true, scrub: 0.7, invalidateOnRefresh: true } });
      gsap.utils.toArray<HTMLElement>(".svc-img").forEach((img) => {
        gsap.fromTo(img, { xPercent: -12 }, { xPercent: 12, ease: "none",
          scrollTrigger: { trigger: img.parentElement, containerAnimation: tw, start: "left right", end: "right left", scrub: true } });
      });
      gsap.to(".hz-progress", { scaleX: 1, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: () => "+=" + dist(), scrub: true } });
    }, root);
    return () => ctx.revert();
  }, []);
  return (
    <section ref={root} className="metal relative h-screen overflow-hidden">
      <div ref={track} className="flex h-full items-center gap-8 pl-6 pr-[10vw] md:pl-[6vw]">
        <div className="w-[80vw] shrink-0 md:w-[34vw]">
          <div className="font-mono text-xs text-zholty">ГЛАВА III · ЧТО ДЕЛАЕМ</div>
          <h2 className="mt-4 font-poster text-6xl leading-none md:text-8xl">Пять<br />работ,<br /><span className="text-krasny">без</span> «и так<br />сойдёт»</h2>
          <p className="mt-6 max-w-sm font-mono text-sm text-beton">Берём не больше трёх машин в месяц. Поэтому очередь. Поэтому — так.</p>
        </div>
        {services.map((s) => (
          <article key={s.n} data-magnetic className="group rivets relative flex h-[72vh] w-[78vw] shrink-0 flex-col overflow-hidden border border-white/10 bg-black/60 md:w-[30vw]">
            <div className="relative h-[55%] overflow-hidden">
              <img src={s.img} alt={s.t} loading="lazy" decoding="async" width={800} height={1000} className="svc-img absolute inset-0 h-full w-[124%] max-w-none -translate-x-[12%] object-cover grayscale transition duration-700 group-hover:grayscale-0" />
              <div className="absolute left-4 top-4 bg-krasny px-3 py-1 font-poster text-2xl text-zholty">{s.n}</div>
            </div>
            <div className="flex flex-1 flex-col p-6">
              <h3 className="font-poster text-3xl text-zholty">{s.t}</h3>
              <p className="mt-3 text-lg font-light leading-snug text-beton">{s.d}</p>
              <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-4 font-mono text-sm"><span>{s.p}</span><span className="text-krasny">→</span></div>
            </div>
          </article>
        ))}
      </div>
      <div className="absolute bottom-6 left-6 right-6 h-1 bg-white/10 md:left-[6vw] md:right-[6vw]"><div className="hz-progress hazard h-full origin-left scale-x-0" /></div>
    </section>
  );
}
