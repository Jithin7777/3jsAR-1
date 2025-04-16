import { useEffect, useState, useRef } from "react";
import { Html } from "@react-three/drei";

const ARControls = () => {
  const [arSupported, setArSupported] = useState(false);
  const arButtonRef = useRef(null);

  useEffect(() => {
    // Check if WebXR is available
    if (navigator.xr) {
      navigator.xr.isSessionSupported("immersive-ar").then((supported) => {
        setArSupported(supported);
      });
    }
  }, []);

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
