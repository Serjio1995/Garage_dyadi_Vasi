"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import SplitWords from "@/components/ui/SplitWords";
import { story, team } from "@/lib/content";

export default function Story() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".story-line").forEach((el) => {
        gsap.from(el.querySelectorAll(".word"), { yPercent: 110, stagger: 0.03, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 80%" } });
        gsap.fromTo(el, { opacity: 0.15 }, { opacity: 1, scrollTrigger: { trigger: el, start: "top 75%", end: "top 40%", scrub: true } });
      });
      gsap.from(".team-card", { y: 60, opacity: 0, stagger: 0.12, duration: 0.8, scrollTrigger: { trigger: ".team", start: "top 80%" } });
    }, root);
    return () => ctx.revert();
  }, []);
  return (
    <section ref={root} className="metal relative px-6 py-[20vh] md:px-[10vw]">
      <div className="mb-16 flex items-center gap-4 font-mono text-xs text-zholty"><span className="h-px w-16 bg-zholty" /> ГЛАВА I · КТО ТУТ РАБОТАЕТ</div>
      <div className="space-y-[14vh]">
        {story.map((s, i) => (
          <p key={i} className={`story-line max-w-4xl font-body text-3xl font-medium leading-tight md:text-5xl ${i % 2 ? "ml-auto text-right" : ""}`}>
            <span className="mr-3 align-top font-mono text-sm text-krasny">{String(i + 1).padStart(2, "0")}</span>
            <SplitWords text={s} />
          </p>
        ))}
      </div>
      <div className="team mt-[20vh] grid grid-cols-2 gap-4 md:grid-cols-4">
        {team.map((m) => (
          <div key={m.name} className="team-card rivets border border-white/10 bg-black/40 p-6 pt-8">
            <div className="font-poster text-xl text-zholty">{m.name}</div>
            <div className="mt-2 font-mono text-xs text-beton">{m.role}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
