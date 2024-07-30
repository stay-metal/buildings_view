import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";

const SequenceViewer = ({ imageSequence }: { imageSequence: any }) => {
  const mountRef = useRef(null);
  const isDragging = useRef(false);
  const previousMousePosition = useRef({ x: 0 });
  const currentFrame = useRef(0);
  const [textures, setTextures] = useState([]);

  useEffect(() => {
    const loadTextures = async () => {
      const textureLoader = new THREE.TextureLoader();
      const loadedTextures = await Promise.all(
        imageSequence.map(
          (imagePath) =>
            new Promise((resolve) => {
              textureLoader.load(imagePath, resolve);
            })
        )
      );
      setTextures(loadedTextures);
    };

    loadTextures();
  }, [imageSequence]);

  useEffect(() => {
    if (textures.length === 0) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    // Create scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(
      width / -2,
      width / 2,
      height / 2,
      height / -2,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    mountRef.current.appendChild(renderer.domElement);

    // Create plane geometry and apply the first texture
    const geometry = new THREE.PlaneGeometry(width, height);
    const material = new THREE.MeshBasicMaterial({
      map: textures[0],
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    camera.position.set(0, 0, 1);

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
          (currentFrame.current + direction + textures.length) %
          textures.length;
        mesh.material.map = textures[currentFrame.current];
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

    // Cleanup on unmount
    return () => {
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      mountRef.current.removeChild(renderer.domElement);
      renderer.dispose();
      geometry.dispose();
      textures.forEach((texture) => texture.dispose());
    };
  }, [textures]);

  return (
    <div
      ref={mountRef}
      style={{ width: "100%", height: "100vh", cursor: "pointer" }}
    ></div>
  );
};

export default SequenceViewer;
