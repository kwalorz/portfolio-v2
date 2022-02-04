// import { useEffect, useRef } from 'react';
// import * as THREE from 'three';

// const SceneOne = () => {
//   const canvasRef = useRef(null);
//   const innerWidth = window.innerWidth;
//   const innerHeight = window.innerHeight;

//   useEffect(() => {
//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(
//       75,
//       innerWidth / innerHeight,
//       0.1,
//       1000
//     );

//     const renderer = new THREE.WebGLRenderer();
//     renderer.setClearColor(0x000000);
//     renderer.setSize(innerWidth / innerHeight);
//     renderer.setPixelRatio(devicePixelRatio);

//     canvasRef.current.appendChild(renderer.domElement);

//     const planeGeometry = new THREE.PlaneGeometry(5, 5, 10, 10);
//     const material = new THREE.MeshPhongMaterial({
//       color: 0x9966ff,
//       side: THREE.DoubleSide,
//       flatShading: THREE.FlatShading,
//     });
//     const mesh = new THREE.Mesh(planeGeometry, material);

//     scene.add(mesh);

//     const { array } = mesh.geometry.attributes.position;

//     for (let i = 0; i < array.length; i += 3) {
//       const x = array[i];
//       const y = array[i + 1];
//       const z = array[i + 2];

//       array[i + 2] = z + Math.random();
//     }

//     camera.position.z = 5;

//     function animate() {
//       requestAnimationFrame(animate);
//       renderer.render(scene, camera);
//     }

//     function onWindowResize() {
//       camera.aspect = innerWidth / innerHeight;
//       camera.updateProjectionMatrix();
//       renderer.setSize(innerWidth / innerHeight);
//     }

//     window.addEventListener('resize', onWindowResize, false);
//     animate();

//     return () => canvasRef.current.removeChild(renderer.domElement);
//   }, []);

//   return <div ref={canvasRef}></div>;
// };

// export default SceneOne;
