"use client";
import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { gsap } from "@/lib/gsap";
import { useInView, isLowPower } from "@/hooks/useInView";
import Magnetic from "@/components/ui/Magnetic";
import SplineScene from "@/components/three/SplineScene";
const Gear = dynamic(() => import("@/components/three/Gear"), { ssr: false });

export default function Finale() {
  const root = useRef<HTMLElement>(null);
  const near = useInView(root, "600px", true);
  const visible = useInView(root, "0px");
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".fin-big span", { yPercent: 110, stagger: 0.08, duration: 1, ease: "power4.out", scrollTrigger: { trigger: ".fin-big", start: "top 80%" } });
      gsap.from(".fin-info > *", { y: 30, opacity: 0, stagger: 0.1, scrollTrigger: { trigger: ".fin-info", start: "top 85%" } });
    }, root);
    return () => ctx.revert();
  }, []);
  return (
    <footer ref={root} className="metal relative min-h-screen overflow-hidden px-6 pb-10 pt-[18vh] md:px-[6vw]">
      <div className="pointer-events-auto absolute right-[-10vw] top-[6vh] h-[70vh] w-[70vw] opacity-90 md:right-[-4vw] md:w-[50vw]">{near && <Gear active={visible && !isLowPower()} />}</div>
      <SplineScene className="absolute inset-0 opacity-80" />
      <div className="relative">
        <div className="font-mono text-xs text-zholty">ГЛАВА V · ПРИЕЗЖАЙТЕ</div>
        <h2 className="fin-big mt-6 font-poster text-[15vw] leading-[0.85] md:text-[10vw]">
          <span className="block overflow-hidden"><span className="inline-block">ВОРОТА</span></span>
          <span className="block overflow-hidden"><span className="inline-block text-krasny">ОТКРЫТЫ</span></span>
          <span className="block overflow-hidden"><span className="inline-block text-zholty">С 9 ДО 21</span></span>
        </h2>
        <p className="mt-8 max-w-lg text-xl font-light text-beton">Кроме воскресенья. Если закрыто в будни — значит, Вася на рынке за запчастями. Позвоните, он вернётся.</p>
        <div className="mt-12 flex flex-wrap items-center gap-6">
          <Magnetic><a href="tel:+78120000000" className="block bg-krasny px-10 py-6 font-poster text-2xl text-zholty shadow-[6px_6px_0_#F2B705] transition hover:shadow-[2px_2px_0_#F2B705]">ПОЗВОНИТЬ ВАСЕ</a></Magnetic>
          <Magnetic><a href="https://t.me/" className="block border-2 border-zholty px-8 py-5 font-poster text-xl text-zholty">НАПИСАТЬ В TELEGRAM</a></Magnetic>
        </div>
        <div className="fin-info mt-[14vh] grid gap-8 border-t border-white/10 pt-8 font-mono text-sm md:grid-cols-4">
          <div><div className="text-zholty">Телефон</div>+7 (812) 000-00-00</div>
          <div><div className="text-zholty">Адрес</div>Санкт-Петербург, ГК «Мотор», ул. Примерная, 17, ряд 4, бокс 17</div>
          <div><div className="text-zholty">Часы</div>Пн–Сб 09:00–21:00<br />Вс — рыбалка</div>
          <div><div className="text-zholty">Ориентир</div>Синие ворота с номером 17. Собаку зовут Карбюратор, она не кусается.</div>
        </div>
        <div className="mt-12 flex items-center justify-between font-mono text-xs text-beton/60">
          <span>© 1987–2026 Гараж дяди Васи</span>
          <button onClick={() => (window as any).__lenis?.scrollTo(0, { duration: 3 }) ?? window.scrollTo(0, 0)}>НАВЕРХ ↑</button>
        </div>
      </div>
    </footer>
  );
}
