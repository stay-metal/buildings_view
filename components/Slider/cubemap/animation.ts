import * as THREE from "three";

interface AnimationProps {
  camera: THREE.PerspectiveCamera;
  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;
  isUserInteracting: React.MutableRefObject<boolean>;
  lon: React.MutableRefObject<number>;
  lat: React.MutableRefObject<number>;
  phi: React.MutableRefObject<number>;
  theta: React.MutableRefObject<number>;
}

const startAnimation = ({
  camera,
  scene,
  renderer,
  isUserInteracting,
  lon,
  lat,
  phi,
  theta,
}: AnimationProps) => {
  const animate = () => {
    requestAnimationFrame(animate);
    update();
  };

  const update = () => {
    if (!isUserInteracting.current) {
      lon.current += 0.1;
    }

    lat.current = Math.max(-85, Math.min(85, lat.current));
    phi.current = THREE.Math.degToRad(90 - lat.current);
    theta.current = THREE.Math.degToRad(lon.current);

    camera.target.x = 500 * Math.sin(phi.current) * Math.cos(theta.current);
    camera.target.y = 500 * Math.cos(phi.current);
    camera.target.z = 500 * Math.sin(phi.current) * Math.sin(theta.current);

    camera.lookAt(camera.target);
    renderer.render(scene, camera);
  };

  animate();
};

export default startAnimation;
