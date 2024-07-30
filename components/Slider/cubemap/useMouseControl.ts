import { useEffect } from "react";
import * as THREE from "three";

interface UseMouseControlProps {
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  isUserInteracting: React.MutableRefObject<boolean>;
  onMouseDownMouseX: React.MutableRefObject<number>;
  onMouseDownMouseY: React.MutableRefObject<number>;
  lon: React.MutableRefObject<number>;
  onMouseDownLon: React.MutableRefObject<number>;
  lat: React.MutableRefObject<number>;
  onMouseDownLat: React.MutableRefObject<number>;
}

const useMouseControl = ({
  camera,
  renderer,
  isUserInteracting,
  onMouseDownMouseX,
  onMouseDownMouseY,
  lon,
  onMouseDownLon,
  lat,
  onMouseDownLat,
}: UseMouseControlProps) => {
  useEffect(() => {
    const onMouseDown = (event: MouseEvent) => {
      event.preventDefault();
      isUserInteracting.current = true;
      onMouseDownMouseX.current = event.clientX;
      onMouseDownMouseY.current = event.clientY;
      onMouseDownLon.current = lon.current;
      onMouseDownLat.current = lat.current;
    };

    const onMouseMove = (event: MouseEvent) => {
      if (isUserInteracting.current) {
        lon.current =
          (onMouseDownMouseX.current - event.clientX) * 0.1 +
          onMouseDownLon.current;
        lat.current =
          (event.clientY - onMouseDownMouseY.current) * 0.1 +
          onMouseDownLat.current;
      }
    };

    const onMouseUp = () => {
      isUserInteracting.current = false;
    };

    const onMouseWheel = (event: WheelEvent) => {
      camera.fov += event.deltaY * 0.05;
      camera.updateProjectionMatrix();
    };

    const resizeHandler = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    document.addEventListener("mousedown", onMouseDown, false);
    document.addEventListener("mousemove", onMouseMove, false);
    document.addEventListener("mouseup", onMouseUp, false);
    document.addEventListener("wheel", onMouseWheel, false);
    window.addEventListener("resize", resizeHandler, false);

    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("wheel", onMouseWheel);
      window.removeEventListener("resize", resizeHandler);
    };
  }, [
    camera,
    renderer,
    isUserInteracting,
    onMouseDownMouseX,
    onMouseDownMouseY,
    lon,
    onMouseDownLon,
    lat,
    onMouseDownLat,
  ]);

  return () => {
    document.removeEventListener("mousedown", onMouseDown);
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
    document.removeEventListener("wheel", onMouseWheel);
    window.removeEventListener("resize", resizeHandler);
  };
};

export default useMouseControl;
