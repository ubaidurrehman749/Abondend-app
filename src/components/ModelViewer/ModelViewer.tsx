import { Component, lazy, Suspense, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import type { Hotspot } from "./ModelCanvas.tsx";

const ModelCanvas = lazy(() => import("./ModelCanvas.tsx"));

class Boundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

function hasWebGL(): boolean {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

type Props = {
  modelPath: string;
  fallbackSrc: string;
  alt: string;
  hotspots?: Hotspot[];
};

export default function ModelViewer({ modelPath, fallbackSrc, alt, hotspots }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const img = (
    <img
      src={fallbackSrc}
      alt={alt}
      style={{ width: "100%", height: "100%", objectFit: "contain" }}
    />
  );

  return (
    <div ref={ref} style={{ width: "100%", maxWidth: 480, height: 320 }}>
      {visible && hasWebGL() ? (
        <Boundary fallback={img}>
          <Suspense fallback={<p>Loading 3D model…</p>}>
            <ModelCanvas modelPath={modelPath} hotspots={hotspots} />
          </Suspense>
        </Boundary>
      ) : (
        img
      )}
    </div>
  );
}
