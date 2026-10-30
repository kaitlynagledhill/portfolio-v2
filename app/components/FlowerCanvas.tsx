
"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import RococoFlowers from "./RococoFlowers";

export default function FlowerCanvas() {
  return (
    <div className="flower-canvas">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 40 }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={1.5} />
        <directionalLight position={[3, 4, 5]} intensity={2} />
        <directionalLight
          position={[-3, 1, -2]}
          intensity={1}
        />

        <Suspense fallback={null}>
          <RococoFlowers />
        </Suspense>
      </Canvas>
    </div>
  );
}
