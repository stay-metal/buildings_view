import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";

const SequanceViewer = ({ imageSequence }) => {
  const mountRef = useRef(null);
  const isDragging = useRef(false);
  const previousMousePosition = useRef({ x: 0 });
  const currentFrame = useRef(0);
  const [textures, setTextures] = useState([]);

  useEffect(() => {
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    // Create scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    mountRef.current.appendChild(renderer.domElement);

    // Load sequence of images
    const textureLoader = new THREE.TextureLoader();
    const loadedTextures = [];
    imageSequence.forEach((imagePath) => {
      loadedTextures.push(textureLoader.load(imagePath));
    });
    setTextures(loadedTextures);

    // Create sphere geometry and apply the first texture
    const geometry = new THREE.SphereGeometry(500, 60, 40);
    geometry.scale(-1, 1, 1); // Invert the geometry to view the inside of the sphere
    const material = new THREE.MeshBasicMaterial({
      map: loadedTextures[0],
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    camera.position.set(0, 0, 0.1);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // Handle mouse down
    const onMouseDown = (event) => {
      isDragging.current = true;
      previousMousePosition.current = { x: event.clientX };
    };

    // Handle mouse move
    const onMouseMove = (event) => {
      if (!isDragging.current) return;

      const deltaX = event.clientX - previousMousePosition.current.x;

      if (Math.abs(deltaX) > 10) {
        const direction = deltaX > 0 ? 1 : -1;
        currentFrame.current =
          (currentFrame.current + direction + loadedTextures.length) %
          loadedTextures.length;
        mesh.material.map = loadedTextures[currentFrame.current];
        mesh.material.needsUpdate = true;
        previousMousePosition.current = { x: event.clientX };
      }
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
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      mountRef.current.removeChild(renderer.domElement);
    };
  }, [imageSequence]);

  return (
    <div
      ref={mountRef}
      style={{ width: "100%", height: "100vh", cursor: "pointer" }}
    ></div>
  );
};

export default SequanceViewer;
