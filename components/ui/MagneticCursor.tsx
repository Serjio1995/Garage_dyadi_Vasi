"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function MagneticCursor() {
  const x = useMotionValue(-100), y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40 }), sy = useSpring(y, { stiffness: 500, damping: 40 });
  const [hover, setHover] = useState(false);
  const [on, setOn] = useState(false);
  const hv = useRef(false);
  useEffect(() => {
    if (!window.matchMedia("(pointer:fine)").matches) return;
    setOn(true);
    const move = (e: PointerEvent) => {
      x.set(e.clientX); y.set(e.clientY);
      const h = !!(e.target as HTMLElement).closest?.("a,button,[data-magnetic]");
      if (h !== hv.current) { hv.current = h; setHover(h); }
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);
  if (!on) return null;
  return (
    <motion.div style={{ x: sx, y: sy }} className="pointer-events-none fixed left-0 top-0 z-[100] mix-blend-difference">
      <motion.div animate={{ width: hover ? 72 : 14, height: hover ? 72 : 14, rotate: hover ? 45 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        className="-translate-x-1/2 -translate-y-1/2 border-2 border-zholty bg-zholty/0"
        style={{ background: hover ? "transparent" : "#F2B705" }} />
    </motion.div>
  );
}
