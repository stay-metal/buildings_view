import { MutableRefObject, useRef, useEffect } from "react";
import initScene from "./scene";
import useMouseControl from "./useMouseControl";
import startAnimation from "./animation";

const useCubemap = (
  mountRef: MutableRefObject<HTMLDivElement | null>,
  cubemapPath: string
) => {
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  const isUserInteracting = useRef(false);
  const onMouseDownMouseX = useRef(0);
  const onMouseDownMouseY = useRef(0);
  const lon = useRef(0);
  const onMouseDownLon = useRef(0);
  const lat = useRef(0);
  const onMouseDownLat = useRef(0);
  const phi = useRef(0);
  const theta = useRef(0);

  useEffect(() => {
    if (!mountRef.current) return;

    const { camera, scene, renderer } = initScene(
      mountRef.current,
      cubemapPath
    );
    cameraRef.current = camera;
    sceneRef.current = scene;
    rendererRef.current = renderer;

    const cleanupMouseControl = useMouseControl({
      camera,
      renderer,
      isUserInteracting,
      onMouseDownMouseX,
      onMouseDownMouseY,
      lon,
      onMouseDownLon,
      lat,
      onMouseDownLat,
    });

    startAnimation({
      camera,
      scene,
      renderer,
      isUserInteracting,
      lon,
      lat,
      phi,
      theta,
    });

    return () => {
      cleanupMouseControl();
      if (renderer) mountRef.current?.removeChild(renderer.domElement);
    };
  }, [cubemapPath]);

  return null;
};

export default useCubemap;
