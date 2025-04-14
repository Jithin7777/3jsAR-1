import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";
import { ChairModel } from "./ChairModel";
import { OrbitControls, Stage } from "@react-three/drei";

const ChairModelContainer = () => {
  return (
    <div className="h-[500px] w-full mt-20">
      <Canvas
        xr
        onCreated={({ gl }) => {
          gl.xr.enabled = true;
        }}
      >
        <Suspense fallback="loading...">
          <Stage environment={"city"}>
            {" "}
            <ChairModel position={[0, 0, -0.5]} scale={10} />
          </Stage>
          <OrbitControls enableZoom={false} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ChairModelContainer;
