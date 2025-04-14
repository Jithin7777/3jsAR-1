import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";
import { ChairModel } from "./ChairModel";
import { OrbitControls, Stage } from "@react-three/drei";
import ARControls from "../components/ARControls";

const ChairModelContainer = () => {
  return (
    <div className="h-[500px] w-full mt-20"> {/* Keep div outside Canvas */}
      <Canvas
        onCreated={({ gl }) => {
          gl.xr.enabled = true; // Enable WebXR
        }}
      >
        <Suspense fallback="loading...">
          <Stage environment={"city"}>
            <ChairModel position={[0, 0, -0.5]} scale={10} />
          </Stage>
          <OrbitControls enableZoom={false} />
        </Suspense>
        <ARControls /> {/* Ensure ARControls handles WebXR functionality */}
      </Canvas>

      {/* Move the AR button and text outside of Canvas */}
      <div className="ar-instructions">
        <button className="ar-button">
          Tap to View in AR
        </button>
        <div className="ar-text">
          <p>Scan your environment to view the model in augmented reality!</p>
        </div>
      </div>
    </div>
  );
};

export default ChairModelContainer;
