import { useEffect, useState } from "react";
import { Html } from "@react-three/drei";

const ARControls = () => {
  const [arSupported, setArSupported] = useState(false);

  useEffect(() => {
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
          <div className="bg-white px-4 py-2 rounded shadow-md text-black">
            <p>Scan your environment to view the chair in AR!</p>
          </div>
        </Html>
      )}
    </>
  );
};

export default ARControls;
