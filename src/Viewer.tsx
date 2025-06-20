import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useGLTF } from "@react-three/drei";

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
/*
const Cube = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      meshRef.current.rotation.x += 0.002;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
};*/

const Model = () => {
  const gltf = useGLTF("Models/timber_truss_roof_structure_and_frame.glb"); // 👈 adjust name as needed

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
  return (
    <div className="w-full h-full relative flex-1 min-h-0">
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
        <Model />
        <OrbitControls enablePan enableRotate enableZoom={true} />
      </Canvas>

      <div
        style={{
          position: "absolute",
          bottom: 10,
          left: 10,
          color: "white",
          backgroundColor: "rgba(0,0,0,0.3)",
          padding: 8,
          borderRadius: 4,
          fontSize: 14,
          maxWidth: "90%",
          userSelect: "none",
          pointerEvents: "none",
        }}
      >
        <p>
          Selected connection type: <strong>{params.type || "None"}</strong>
        </p>
        <p>Results count: {results.length}</p>
      </div>
    </div>
  );
};

export default Viewer;
