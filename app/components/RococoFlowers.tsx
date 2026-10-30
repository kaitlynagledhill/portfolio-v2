
"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export default function RococoFlowers() {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/rococo-flowers.glb");

  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.25;
    }
  });

return (
  <group ref={group} scale={3.2} position={[0, -0.6, 0]}>
    <primitive object={scene} />
  </group>
);
}

useGLTF.preload("/rococo-flowers.glb");
