import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import {
  useFrame,
  useLoader,
  Canvas,
  extend,
  useThree,
} from '@react-three/fiber';
import sphereImg from '../../assets/sphere.png';
import { Suspense, useCallback, useMemo, useRef } from 'react';
extend({ OrbitControls });

function CameraControls() {
  const {
    camera,
    gl: { domElement },
  } = useThree();

  const controlsRef = useRef();
  useFrame(() => {
    controlsRef.current.update();
    console.log(camera.position);
  });

  return (
    <orbitControls
      ref={controlsRef}
      args={[camera, domElement]}
      //autoRotate
      //autoRotateSpeed={0.2}
    />
  );
}

function Points() {
  const imgTex = useLoader(THREE.TextureLoader, sphereImg);
  const bufferRef = useRef();
  const colors = ['0xff5050', '0x66ffcc', '0xcc66ff', '0x66ff66'];

  let phaseShift = 0;
  let frequency = 0.002;
  let amplitude = 3;
  const graph = useCallback(
    (x, z) => {
      return Math.sin(frequency * (x ** 2 + z ** 2 + phaseShift)) * amplitude;
    },
    [phaseShift, frequency, amplitude]
  );

  //Sin Wave
  const count = 100;
  const sep = 3;
  let positions = useMemo(() => {
    let positions = [];

    for (let xi = 0; xi < count; xi++) {
      for (let zi = 0; zi < count; zi++) {
        let x = sep * (xi - count / 2);
        let z = sep * (zi - count / 2);
        let y = graph(x, z);
        positions.push(x, y, z);
      }
    }

    return new Float32Array(positions);
  }, [count, sep, graph]);

  useFrame(() => {
    phaseShift += 15;

    const positions = bufferRef.current.array;

    let i = 0;
    for (let xi = 0; xi < count; xi++) {
      for (let zi = 0; zi < count; zi++) {
        let x = sep * (xi - count / 2);
        let z = sep * (zi - count / 2);

        positions[i + 1] = graph(x, z);
        i += 3;
      }
    }

    bufferRef.current.needsUpdate = true;
  });

  return (
    <points>
      <bufferGeometry attach='geometry'>
        <bufferAttribute
          ref={bufferRef}
          attachObject={['attributes', 'position']}
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>

      <pointsMaterial
        attach='material'
        map={imgTex}
        color={0x66ccff}
        size={0.5}
        sizeAttenuation
        transparent={false}
        alphaTest={0.5}
        opacity={1.0}
      />
    </points>
  );
}

function AnimationCanvas() {
  return (
    <Canvas
      colorManagement={false}
      camera={{ position: [68, 4, 130], fov: 75 }}
    >
      <Suspense fallback={null}>
        <Points />
      </Suspense>
      <CameraControls />
    </Canvas>
  );
}

export const SceneTwo = () => {
  return (
    <div className='anim'>
      <Suspense fallback={<div>Loading...</div>}>
        <AnimationCanvas />
      </Suspense>
    </div>
  );
};
