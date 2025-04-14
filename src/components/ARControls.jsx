import { useEffect, useState, useRef } from "react";
import { useThree } from "@react-three/fiber";
import { ARButton } from "three/examples/jsm/webxr/ARButton";
import { Html } from "@react-three/drei";

const ARControls = () => {
  const { gl } = useThree();
  const [arSupported, setArSupported] = useState(false);
  const arButtonRef = useRef(null);

  useEffect(() => {
    gl.xr.enabled = true;

    if (navigator.xr) {
      navigator.xr.isSessionSupported("immersive-ar").then((supported) => {
        setArSupported(supported);

        if (supported && arButtonRef.current) {
          const button = ARButton.createButton(gl, {
            requiredFeatures: ["hit-test"],
          });

          if (!arButtonRef.current.hasChildNodes()) {
            arButtonRef.current.appendChild(button);
          }
        }
      });
    }
  }, [gl]);

  return (
    <>
      {arSupported && (
        <Html position={[0, 1.5, -2]} center distanceFactor={10}>
          <div className="ar-ui">
            <div ref={arButtonRef} />
            <div className="ar-instructions">
              <p>Scan your environment to view the model in AR!</p>
            </div>
          </div>
        </Html>
      )}
    </>
  );
};

export default ARControls;
