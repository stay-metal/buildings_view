import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const CubemapViewer = ({ cubemapPath }) => {
  const mountRef = useRef(null);
  const isDragging = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });
  const cameraRotation = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    // Create scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      1,
      1100
    );
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    mountRef.current.appendChild(renderer.domElement);

    // Load panoramic texture
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(cubemapPath, () => {
      // Start animation only after the texture is loaded
      animate();
    });

    // Create sphere geometry and apply panoramic texture
    const geometry = new THREE.SphereGeometry(500, 60, 40);
    geometry.scale(-1, 1, 1); // Invert the geometry to view the inside of the sphere
    // const material = new THREE.MeshBasicMaterial({ map: texture });
    const material = new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load(cubemapPath),
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    camera.position.set(0, 0, 0.1);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      camera.rotation.x = cameraRotation.current.x;
      camera.rotation.y = cameraRotation.current.y;
      renderer.render(scene, camera);
    };

    // Handle mouse down
    const onMouseDown = (event) => {
      isDragging.current = true;
      previousMousePosition.current = { x: event.clientX, y: event.clientY };
    };

    // Handle mouse move
    const onMouseMove = (event: any) => {
      if (!isDragging.current) return;

      const deltaX = event.clientX - previousMousePosition.current.x;
      const deltaY = event.clientY - previousMousePosition.current.y;

      // Update camera rotation based on mouse movement
      cameraRotation.current.y -= deltaX * 0.005; // Left-right rotation
      cameraRotation.current.x -= deltaY * 0.005; // Top-bottom rotation

      //   Optionally, clamp the x rotation to prevent the camera from flipping upside down
      cameraRotation.current.x = Math.max(
        -Math.PI / 2,
        Math.min(Math.PI / 2, cameraRotation.current.x)
      );

      previousMousePosition.current = { x: event.clientX, y: event.clientY };
    };

    // Handle mouse up
    const onMouseUp = () => {
      isDragging.current = false;
    };

    // Add event listeners
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    // Cleanup event listeners on component unmount
    return () => {
      mountRef.current.removeChild(renderer.domElement);
    };
  }, [cubemapPath]);

  return (
    <div
      ref={mountRef}
      style={{ width: "100%", height: "100vh", cursor: "pointer" }}
    ></div>
  );
};

export default CubemapViewer;
