"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { pick } from "@/lib/img";

const clamp = (v: number) => Math.min(1, Math.max(0, v));
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

function cover(ctx: CanvasRenderingContext2D, img: HTMLImageElement, W: number, H: number, s = 1, oy = 0) {
  const r = Math.max(W / img.width, H / img.height) * s;
  const w = img.width * r, h = img.height * r;
  ctx.drawImage(img, (W - w) / 2, (H - h) / 2 + oy, w, h);
}

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = canvas.current!, ctx = c.getContext("2d", { alpha: false })!;
    const gate = new Image(), inside = new Image(), metal = new Image();
    gate.decoding = inside.decoding = "async";
    gate.src = pick("gate"); inside.src = pick("interior"); metal.src = "/images/metal-512.webp";
    let p = 0, W = 0, H = 0, dpr = 1, raf = 0, lastP = -1;
    // Кэш: ворота и виньетка рендерятся один раз на размер экрана, а не на каждый кадр
    let shutter: HTMLCanvasElement | null = null, vignette: HTMLCanvasElement | null = null;

    const off = () => { const o = document.createElement("canvas"); o.width = W; o.height = H; return o; };
    const buildCache = () => {
      vignette = off(); const v = vignette.getContext("2d")!;
      const vg = v.createRadialGradient(W / 2, H / 2, H * 0.3, W / 2, H / 2, H);
      vg.addColorStop(0, "rgba(0,0,0,0)"); vg.addColorStop(1, "rgba(0,0,0,.75)"); v.fillStyle = vg; v.fillRect(0, 0, W, H);
      if (!metal.complete || !metal.naturalWidth) return;
      shutter = off(); const g = shutter.getContext("2d")!;
      g.fillStyle = "#2a2d2f"; g.fillRect(0, 0, W, H);
      g.globalAlpha = 0.9; g.fillStyle = g.createPattern(metal, "repeat")!; g.fillRect(0, 0, W, H); g.globalAlpha = 1;
      const rib = 34 * dpr, lg = g.createLinearGradient(0, 0, 0, rib);
      lg.addColorStop(0, "rgba(255,255,255,.10)"); lg.addColorStop(0.45, "rgba(0,0,0,0)"); lg.addColorStop(0.9, "rgba(0,0,0,.55)");
      g.fillStyle = lg; for (let y = 0; y < H; y += rib) { g.save(); g.translate(0, y); g.fillRect(0, 0, W, rib); g.restore(); }
      const font = getComputedStyle(document.documentElement).getPropertyValue("--f-poster");
      g.globalAlpha = 0.2; g.fillStyle = "#C8102E"; g.font = `${Math.round(W * 0.16)}px ${font}, sans-serif`; g.textAlign = "center";
      g.fillText("17", W / 2, H * 0.62); g.globalAlpha = 1;
      g.fillStyle = "#111"; g.fillRect(0, H - 22 * dpr, W, 22 * dpr); g.fillStyle = "#F2B705";
      for (let x = -40; x < W; x += 36 * dpr) { g.beginPath(); g.moveTo(x, H); g.lineTo(x + 18 * dpr, H - 22 * dpr); g.lineTo(x + 36 * dpr, H - 22 * dpr); g.lineTo(x + 18 * dpr, H); g.fill(); }
    };
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio, 1.5);
      W = c.width = Math.round(innerWidth * dpr); H = c.height = Math.round(innerHeight * dpr);
      buildCache(); lastP = -1; schedule();
    };
    const draw = () => {
      raf = 0;
      if (p === lastP) return; lastP = p;
      ctx.fillStyle = "#0b0b0b"; ctx.fillRect(0, 0, W, H);
      if (!gate.complete || !inside.complete) return;
      const g = ease(clamp(p / 0.4)), s = ease(clamp((p - 0.42) / 0.45)), outA = 1 - clamp((p - 0.3) / 0.14);
      const edge = H * (1 - s);
      if (outA < 1) {
        if (s > 0) cover(ctx, inside, W, H, 1.25 - 0.2 * s, 0);
        if (edge > 0) {
          if (shutter) ctx.drawImage(shutter, 0, H - edge, W, edge, 0, 0, W, edge); // сдвиг вверх = drawImage окна
          if (s > 0) { const lg = ctx.createLinearGradient(0, edge, 0, edge + H * 0.3); lg.addColorStop(0, `rgba(255,190,90,${0.55 * (1 - s)})`); lg.addColorStop(1, "rgba(0,0,0,0)"); ctx.fillStyle = lg; ctx.fillRect(0, edge, W, H * 0.3); }
        }
      }
      if (outA > 0) { ctx.globalAlpha = outA; cover(ctx, gate, W, H, 1 + 0.9 * g, H * 0.08 * g); ctx.globalAlpha = 1; }
      if (vignette) ctx.drawImage(vignette, 0, 0);
    };
    const schedule = () => { if (!raf) raf = requestAnimationFrame(draw); };
    gate.onload = inside.onload = () => { lastP = -1; schedule(); };
    metal.onload = () => { buildCache(); lastP = -1; schedule(); };
    document.fonts?.ready.then(() => { buildCache(); lastP = -1; schedule(); });

    const ctxG = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: "top top", end: "+=320%", pin: true, scrub: 0.6,
          onUpdate: (st) => { p = Math.round(st.progress * 1000) / 1000; schedule(); } },
      });
      tl.to(".hero-letter", { yPercent: -120, opacity: 0, stagger: 0.015, duration: 0.25, ease: "power2.in" }, 0)
        .to(".hero-meta", { opacity: 0, duration: 0.1 }, 0)
        .fromTo(".hero-open", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.12 }, 0.86)
        .to({}, { duration: 0.02 }, 0.98);
      gsap.from(".hero-letter", { yPercent: 110, stagger: 0.04, duration: 1.1, ease: "power4.out", delay: 0.4 });
    }, root);
    let rt: any; const onResize = () => { clearTimeout(rt); rt = setTimeout(resize, 150); };
    addEventListener("resize", onResize); resize();
    return () => { ctxG.revert(); removeEventListener("resize", onResize); cancelAnimationFrame(raf); };
  }, []);

  const Line = ({ t }: { t: string }) => (
    <span className="block overflow-hidden">{t.split("").map((ch, i) => <span key={i} className="hero-letter inline-block">{ch === " " ? "\u00a0" : ch}</span>)}</span>
  );

  return (
    <section ref={root} className="relative h-screen w-full overflow-hidden">
      <canvas ref={canvas} className="absolute inset-0 h-full w-full" />
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
        <h1 className="font-poster text-[13vw] leading-[0.9] text-zholty drop-shadow-[0_6px_0_#C8102E] md:text-[10vw]">
          <Line t="ГАРАЖ" /><Line t="ДЯДИ ВАСИ" />
        </h1>
        <p className="hero-meta mt-6 font-mono text-sm tracking-widest text-beton">КООПЕРАТИВ «МОТОР» · РЯД 4 · БОКС 17 · С 1987 ГОДА</p>
        <div className="hero-open absolute bottom-[14vh] font-poster text-4xl text-zholty opacity-0 md:text-6xl">ОТКРЫТО. ЗАХОДИТЕ.</div>
      </div>
      <div className="hero-meta absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-xs text-beton/70">КРУТИТЕ ВНИЗ — ПОДНИМЕМ ВОРОТА ↓</div>
      <img src="/images/emblem.png" alt="Гараж дяди Васи" width={56} height={56} decoding="async" className="absolute left-6 top-6 z-10 h-14 w-14" />
    </section>
  );
}
