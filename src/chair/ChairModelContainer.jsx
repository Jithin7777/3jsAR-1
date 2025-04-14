import { Canvas } from "@react-three/fiber";
import React, { Suspense, useRef, useEffect } from "react";
import { ChairModel } from "./ChairModel";
import { OrbitControls, Stage } from "@react-three/drei";
import ARControls from "../components/ARControls";
import { ARButton } from "three/examples/jsm/webxr/ARButton";

const ChairModelContainer = () => {
  const canvasRef = useRef();

  // This hook will initialize the WebXR environment
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const gl = canvas.getContext("webgl2");
      if (gl && navigator.xr) {
        const xrButton = ARButton.createButton(gl, {
          requiredFeatures: ["hit-test"],
        });
        document.body.appendChild(xrButton);

        return () => {
          document.body.removeChild(xrButton);
        };
      }
    }
  }, []);

  return (
    <div className="h-[500px] w-full mt-20">
      <Canvas ref={canvasRef}>
        <Suspense fallback="loading...">
          <Stage environment="city">
            <ChairModel position={[0, 0, -0.5]} scale={10} />
          </Stage>
          <OrbitControls enableZoom={false} />
        </Suspense>
        <ARControls />
      </Canvas>
    </div>
  );
};

export default ChairModelContainer;
