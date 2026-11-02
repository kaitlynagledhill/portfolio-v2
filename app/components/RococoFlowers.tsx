"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

const DESKTOP_SCALE = 3.4;

export default function RococoFlowers() {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/rococo-flowers.glb");
  const viewport = useThree((state) => state.viewport);

  // Center the model horizontally on its own rotation axis
  const { model, diameter } = useMemo(() => {
    const clone = scene.clone(true);
    const box = new THREE.Box3().setFromObject(clone);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());

    clone.position.x -= center.x;
    clone.position.z -= center.z;

    return { model: clone, diameter: Math.hypot(size.x, size.z) };
  }, [scene]);

  // Shrink to fit narrow canvases, never exceed the desktop size
  const fit = (viewport.width * 0.92) / diameter;
  const scale = Math.min(DESKTOP_SCALE, fit);

  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.25;
    }
  });

  return (
    <group
      ref={group}
      scale={scale}
      position={[0, -0.6 * (scale / DESKTOP_SCALE), 0]}
    >
      <primitive object={model} />
    </group>
  );
}

useGLTF.preload("/rococo-flowers.glb");
