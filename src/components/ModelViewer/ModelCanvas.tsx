import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Bounds, Html, OrbitControls, useGLTF } from "@react-three/drei";

export type Hotspot = {
  position: [number, number, number];
  label: string;
  text: string;
};

function Model({ path }: { path: string }) {
  const { scene } = useGLTF(path);
  return <primitive object={scene} />;
}

function Spot({ h }: { h: Hotspot }) {
  const [open, setOpen] = useState(false);
  return (
    <Html position={h.position}>
      <button
        aria-label={h.label}
        onClick={() => setOpen(!open)}
        style={{ padding: "6px 10px", fontSize: 12 }}
      >
        {open ? h.text : "+"}
      </button>
    </Html>
  );
}

export default function ModelCanvas({
  modelPath,
  hotspots = [],
}: {
  modelPath: string;
  hotspots?: Hotspot[];
}) {
  return (
    <Canvas camera={{ position: [0, 1, 4], fov: 45 }}>
      <ambientLight intensity={1.2} />
      <directionalLight position={[5, 5, 5]} intensity={2} />
      <Bounds fit observe margin={1.3}>
        <Model path={modelPath} />
        {hotspots.map((h) => (
          <Spot key={h.label} h={h} />
        ))}
      </Bounds>
      <OrbitControls enablePan={false} minDistance={0.5} maxDistance={20} />
    </Canvas>
  );
}
