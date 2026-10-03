"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function makeGear(teeth: number, rIn: number, rOut: number, hole: number) {
  const s = new THREE.Shape();
  const step = (Math.PI * 2) / teeth;
  for (let i = 0; i < teeth; i++) {
    const a = i * step;
    const pts = [[a, rIn], [a + step * 0.15, rOut], [a + step * 0.45, rOut], [a + step * 0.6, rIn]] as const;
    pts.forEach(([ang, r], j) => { const x = Math.cos(ang) * r, y = Math.sin(ang) * r; i === 0 && j === 0 ? s.moveTo(x, y) : s.lineTo(x, y); });
  }
  s.closePath();
  const h = new THREE.Path(); h.absarc(0, 0, hole, 0, Math.PI * 2, true); s.holes.push(h);
  return new THREE.ExtrudeGeometry(s, { depth: 0.35, bevelEnabled: true, bevelSize: 0.03, bevelThickness: 0.03, bevelSegments: 1, curveSegments: 4 });
}

function Gears() {
  const g = useRef<THREE.Group>(null);
  const big = useMemo(() => makeGear(18, 1.25, 1.5, 0.45), []);
  const small = useMemo(() => makeGear(10, 0.62, 0.85, 0.22), []);
  const a = useRef<THREE.Mesh>(null), b = useRef<THREE.Mesh>(null);
  useFrame((st, dt) => {
    a.current!.rotation.z += dt * 0.3; b.current!.rotation.z -= dt * 0.3 * 1.8;
    g.current!.rotation.y = THREE.MathUtils.lerp(g.current!.rotation.y, st.pointer.x * 0.5, 0.05);
    g.current!.rotation.x = THREE.MathUtils.lerp(g.current!.rotation.x, -st.pointer.y * 0.3, 0.05);
    g.current!.position.y = Math.sin(st.clock.elapsedTime * 1.4) * 0.12;
  });
  return (
    <group ref={g}>
        <mesh ref={a} geometry={big} position={[-0.5, 0, 0]}><meshStandardMaterial color="#C8102E" metalness={0.85} roughness={0.35} /></mesh>
        <mesh ref={b} geometry={small} position={[1.72, 0.9, 0]}><meshStandardMaterial color="#F2B705" metalness={0.9} roughness={0.3} /></mesh>
      </group>
  );
}

export default function Gear({ active = true }: { active?: boolean }) {
  return (
    <Canvas frameloop={active ? "always" : "demand"} camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 1.5]}
      gl={{ alpha: true, powerPreference: "high-performance", stencil: false }}>
      <ambientLight intensity={0.3} />
      <directionalLight position={[3, 4, 5]} intensity={2.2} color="#ffd9a0" />
      <pointLight position={[-4, -2, 3]} intensity={30} color="#C8102E" />
      <Gears />
    </Canvas>
  );
}
