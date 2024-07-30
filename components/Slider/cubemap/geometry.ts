import * as THREE from "three";

const createGeometry = (cubemapPath: string) => {
  const geometry = new THREE.SphereGeometry(500, 60, 40);
  geometry.scale(-1, 1, 1);

  const material = new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load(cubemapPath),
  });

  const mesh = new THREE.Mesh(geometry, material);
  return mesh;
};

export default createGeometry;
