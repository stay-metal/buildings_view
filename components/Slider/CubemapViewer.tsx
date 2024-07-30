import React, { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { TextureLoader, Vector2, BackSide, Mesh } from "three";
import { useLoader } from "@react-three/fiber";

type CubemapViewerProps = {
  cubemapPath: string;
};

const Sphere = ({ texturePath }: { texturePath: string }) => {
  const texture = useLoader(TextureLoader, texturePath);
  const sphereRef = useRef<Mesh>(null);

  const isDraggingRef = useRef(false);
  const previousMousePosition = useRef(new Vector2());
  const cameraRotation = useRef({ lat: 0, lon: 0 });

  const handlePointerDown = (event: PointerEvent) => {
    isDraggingRef.current = true;
    previousMousePosition.current.set(event.clientX, event.clientY);
  };

  const handlePointerMove = (event: PointerEvent) => {
    if (!isDraggingRef.current) {
      return;
    }

    const deltaX = event.clientX - previousMousePosition.current.x;
    const deltaY = event.clientY - previousMousePosition.current.y;

    // Invert deltaY for intuitive camera control
    cameraRotation.current.lon += deltaX * 0.1; // Move right when dragging right
    cameraRotation.current.lat += deltaY * 0.1; // Move down when dragging up

    // Clamp the latitude to prevent flipping
    cameraRotation.current.lat = Math.max(
      -85,
      Math.min(85, cameraRotation.current.lat)
    );

    previousMousePosition.current.set(event.clientX, event.clientY);
  };

  const handlePointerUp = (event: PointerEvent) => {
    isDraggingRef.current = false;
  };

  useEffect(() => {
    const downListener = (event: PointerEvent) => handlePointerDown(event);
    const moveListener = (event: PointerEvent) => handlePointerMove(event);
    const upListener = (event: PointerEvent) => handlePointerUp(event);

    window.addEventListener("pointerdown", downListener);
    window.addEventListener("pointermove", moveListener);
    window.addEventListener("pointerup", upListener);

    return () => {
      window.removeEventListener("pointerdown", downListener);
      window.removeEventListener("pointermove", moveListener);
      window.removeEventListener("pointerup", upListener);
    };
  }, []);

  useFrame(({ camera }) => {
    camera.rotation.order = "YXZ"; // Ensure correct rotation order
    camera.rotation.y = cameraRotation.current.lon * (Math.PI / 180);
    camera.rotation.x = cameraRotation.current.lat * (Math.PI / 180);
  });

  return (
    <mesh ref={sphereRef} rotation={[0, 0, 0]}>
      <sphereGeometry args={[500, 60, 40]} />
      <meshBasicMaterial map={texture} side={BackSide} />
    </mesh>
  );
};

const CubemapViewer = ({ cubemapPath }: CubemapViewerProps) => {
  return (
    <Canvas
      camera={{
        fov: 75,
        aspect: window.innerWidth / window.innerHeight,
        near: 1,
        far: 1100,
        position: [0, 0, 0], // Keep the camera at the origin
      }}
      style={{ width: "100%", height: "100vh", cursor: "pointer" }}
    >
      <Sphere texturePath={cubemapPath} />
    </Canvas>
  );
};

export default CubemapViewer;
