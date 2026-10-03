"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function Particles({ count = 900, color = "#ffae3b", spread = 1, speed = 1 }: { count?: number; color?: string; spread?: number; speed?: number }) {
  const ref = useRef<THREE.Points>(null);
  const { pos, vel } = useMemo(() => {
    const pos = new Float32Array(count * 3), vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos.set([(Math.random() - 0.5) * 0.4, -1.2 + Math.random() * 0.2, 0], i * 3);
      vel.set([(Math.random() - 0.3) * 0.06 * spread, Math.random() * 0.05 + 0.02, (Math.random() - 0.5) * 0.02], i * 3);
    }
    return { pos, vel };
  }, [count, spread]);
  useFrame((_, dt) => {
    const k60 = Math.min(dt * 60, 3); // не зависеть от частоты кадров
    const a = ref.current!.geometry.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < count; i++) {
      const k = i * 3;
      vel[k + 1] -= 0.0012 * speed * k60;
      pos[k] += vel[k] * speed * k60; pos[k + 1] += vel[k + 1] * speed * k60; pos[k + 2] += vel[k + 2] * k60;
      if (pos[k + 1] < -2.5 || Math.abs(pos[k]) > 5) {
        pos[k] = (Math.random() - 0.5) * 0.3 - 0.8; pos[k + 1] = -0.6; pos[k + 2] = 0;
        vel[k] = (Math.random() - 0.2) * 0.08 * spread; vel[k + 1] = Math.random() * 0.06 + 0.01;
      }
    }
    a.needsUpdate = true;
  });
  return (
    <points ref={ref}>
      <bufferGeometry><bufferAttribute attach="attributes-position" args={[pos, 3]} /></bufferGeometry>
      <pointsMaterial size={0.035} color={color} transparent opacity={0.95} blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
  );
}

export default function Sparks({ active = true, ...props }: { active?: boolean; count?: number; color?: string; spread?: number; speed?: number }) {
  return (
    <Canvas frameloop={active ? "always" : "never"} camera={{ position: [0, 0, 4], fov: 50 }} dpr={1}
      gl={{ alpha: true, antialias: false, powerPreference: "high-performance", stencil: false, depth: false }}>
      <Particles {...props} />
    </Canvas>
  );
}
