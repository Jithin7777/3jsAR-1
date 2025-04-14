import { useEffect, useState } from "react";
import { useThree } from "@react-three/fiber";
import { ARButton } from "three/examples/jsm/webxr/ARButton";

const ARControls = () => {
  const { gl } = useThree();
  const [arAvailable, setArAvailable] = useState(false);

  useEffect(() => {
    gl.xr.enabled = true;

    const button = ARButton.createButton(gl, {
      requiredFeatures: ["hit-test"],
    });

    // Check if WebXR is available, and toggle AR UI accordingly
    if (navigator.xr) {
      setArAvailable(true);
    }

    document.body.appendChild(button);

    return () => {
      document.body.removeChild(button); // Clean up
    };
  }, [gl]);

  return (
    <div>
      {arAvailable && (
        <div className="ar-instructions">
          <button
            className="ar-button"
            onClick={() => {
              // Optional: Add any extra behavior on click if needed
            }}
          >
            Tap to View in AR
          </button>
          <div className="ar-text">
            <p>Scan your environment to view the model in augmented reality!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ARControls;
