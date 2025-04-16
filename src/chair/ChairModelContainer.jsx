import { Canvas } from "@react-three/fiber";
import React, { Suspense, useEffect, useRef } from "react";
import { ChairModel } from "./ChairModel";
import { OrbitControls, Stage } from "@react-three/drei";
import { ARButton } from "three/examples/jsm/webxr/ARButton";
import ARControls from "../components/ARControls";

const ChairModelContainer = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
  
    const renderer = canvas.__reactThreeFiber?.gl;
    if (!renderer) return;
  
    renderer.xr.enabled = true;
  
    const button = ARButton.createButton(renderer, {
      requiredFeatures: ["hit-test"],
    });
  
    // Append the AR button to the new container
    const arButtonContainer = document.getElementById("ar-button-container");
    if (arButtonContainer) {
      arButtonContainer.appendChild(button);
    } else {
      // Fallback: append to body if the container is not found
      document.body.appendChild(button);
    }
  
    // Clean up AR button on unmount
    return () => {
      if (button && button.parentElement) {
        button.parentElement.removeChild(button);
      }
    };
  }, []);
  
  return (
    <div className="h-screen w-full relative">
    {/* Container for AR Button */}
    <div id="ar-button-container" className="fixed bottom-4 left-4 z-50" />
    
    <Canvas
      ref={canvasRef}
      onCreated={({ gl }) => {
        gl.xr.enabled = true;
      }}
    >
      <Suspense fallback="Loading...">
        <Stage environment="city">
          <ChairModel position={[0, 0, 0]} scale={1} />
        </Stage>
        <OrbitControls enableZoom={false} />
      </Suspense>
      <ARControls />
    </Canvas>
  </div>  );
};

export default ChairModelContainer;
