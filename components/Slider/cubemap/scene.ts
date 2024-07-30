import * as THREE from "three";

const initScene = (container: HTMLDivElement, cubemapPath: string) => {
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    1100
  );
  camera.target = new THREE.Vector3(0, 0, 0);

  const scene = new THREE.Scene();

  const geometry = new THREE.SphereGeometry(500, 60, 40);
  geometry.scale(-1, 1, 1);

  const material = new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load(cubemapPath),
  });

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  const renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  return { camera, scene, renderer };
};

export default initScene;
