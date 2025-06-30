import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useGLTF } from "@react-three/drei";
import { useTranslation } from "react-i18next";

interface ViewerProps {
  params: {
    type: string;
    header: string;
    joist: string;
    fastener: string;
    skew: number;
    slope: number;
  };
  results: any[];
}

// Pass visibility flags as props for demonstration
const Model: React.FC<{
  showCarrying: boolean;
  showCarried: boolean;
  showHanger: boolean;
}> = ({ showCarrying, showCarried, showHanger }) => {
  const { t } = useTranslation();

  const gltf = useGLTF("Models/timber_truss_roof_structure_and_frame.glb");

  // TODO: Implement actual logic to toggle visibility of parts in the model
  // For now, we just render the full model
  return (
    <primitive
      object={gltf.scene}
      position={[0, -1, 0]}
      scale={1.5}
      rotation={[0, Math.PI, 0]}
    />
  );
};

const Viewer: React.FC<ViewerProps> = ({ params, results }) => {
  const [showCarrying, setShowCarrying] = useState(true);
  const [showCarried, setShowCarried] = useState(true);
  const [showHanger, setShowHanger] = useState(true);

  return (
    <div className="w-full h-full relative min-h-0 min-w-0 flex-1 overflow-hidden">
      <Canvas
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          pointerEvents: "auto",
        }}
        camera={{ position: [0, 0, 5], fov: 50 }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Model
          showCarrying={showCarrying}
          showCarried={showCarried}
          showHanger={showHanger}
        />
        <OrbitControls enablePan enableRotate enableZoom />
      </Canvas>

      {/* Bottom-right 3D viewer settings panel */}
      <div
        style={{
          position: "absolute",
          bottom: 10,
          right: 10,
          color: "white",
          backgroundColor: "rgba(0,0,0,0.5)",
          padding: 12,
          borderRadius: 6,
          fontSize: 14,
          maxWidth: 200,
          userSelect: "none",
        }}
      >
        <h4 style={{ marginBottom: 8, fontWeight: "bold" }}>
          Object Visibility
        </h4>

        <label style={{ display: "block", marginBottom: 6 }}>
          <input
            type="checkbox"
            checked={showCarrying}
            onChange={(e) => setShowCarrying(e.target.checked)}
            style={{ marginRight: 6 }}
          />
          Carrying
        </label>

        <label style={{ display: "block", marginBottom: 6 }}>
          <input
            type="checkbox"
            checked={showCarried}
            onChange={(e) => setShowCarried(e.target.checked)}
            style={{ marginRight: 6 }}
          />
          Carried
        </label>

        <label style={{ display: "block", marginBottom: 6 }}>
          <input
            type="checkbox"
            checked={showHanger}
            onChange={(e) => setShowHanger(e.target.checked)}
            style={{ marginRight: 6 }}
          />
          Hanger
        </label>
      </div>
    </div>
  );
};

export default Viewer;
