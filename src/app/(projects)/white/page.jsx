"use client";
import { BackSide, DoubleSide, MeshStandardMaterial, VSMShadowMap, MeshBasicMaterial } from "three";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { Svg, ScrollControls, Scroll, Mask, useMask } from "@react-three/drei";
import { useControls, Leva, useCreateStore } from "leva";
import { useSpring, a } from '@react-spring/three';
import './styles.css';
import { useState, useEffect, useRef } from "react";
import { Shiba } from './Shiba'
import useSound from 'use-sound';
// import click from 'click4.ogg';
//todo, can i import sounds up here?
//todo, make it so i can click anywhere to open/close the door
//todo change cursor to pointer on hover over square
//todo clean up code
//fix title and icon and description

export default function CanvasWrapper() {

  const [opacity, setOpacity] = useState(1); // Initial opacity is 1

  return (
    <div id="canvas-container" className="h-full text-white bg-white relative">
      <Canvas shadows camera={{ position: [0, 0, 5], fov: 50 }} shadowmap={{ type: VSMShadowMap }}>
        <ScrollControls pages={3} damping={0.1}>
          <Scroll>
            <Scene />
          </Scroll>
        </ScrollControls>
      </Canvas>

    </div>
  );
};

const Scene = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const stencil = useMask(1)
  const [spot, setSpot] = useState(false)
  // Ref to track the first render
  const isFirstRender = useRef(true);
  useEffect(() => {
    const handleDocumentClick = () => setIsFlipped(prev => !prev);
    document.addEventListener('click', handleDocumentClick);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  const materials = [
    new MeshStandardMaterial({ ...stencil, color: 'white', side: BackSide }),
    new MeshStandardMaterial({ ...stencil, color: 'white', side: BackSide }),
    new MeshStandardMaterial({ ...stencil, color: 'white', side: BackSide }),
    new MeshStandardMaterial({ ...stencil, color: 'white', side: BackSide }),
    new MeshStandardMaterial({ ...stencil, color: 'red', side: BackSide, visible: false }),
    new MeshStandardMaterial({ ...stencil, color: '#777', side: BackSide }),
  ];

  // Define the spring-animated state
  const [springProps, setSpringProps] = useSpring(() => ({
    rotation: [0, 0, 0], // Initial rotation
    config: { mass: 5, tension: 400, friction: 40, precision: 0.0001 }
  }));

  const [playOn] = useSound(
    './click4.ogg',
    { volume: 0.75 }
  );
  const [playOpen] = useSound(
    './cloth3.ogg',
    { volume: 0.75 }
  );
  const [playClose] = useSound(
    './cloth1.ogg',
    { volume: 0.75 }
  );

  useEffect(() => {

    console.log('hi')
    // Skip the effect on the first render
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    console.log('why am i triggered');
    if (isFlipped) {
      playOpen();
    } else {
      playClose();
    }

    setSpringProps({
      rotation: isFlipped ?  [-Math.PI / 2.2, 0, 0] : [0, 0, 0]
    });

    if (isFlipped) {
      setTimeout(() => {
        playOn();
        setSpot(true);
        console.log("on");
      }, 800);
    } else {
      setSpot(false);
      console.log("off");
    }

  }, [isFlipped]);


  // Use useFrame to update the rotation of the plane
  useFrame(({ scene }) => {
    const plane = scene.getObjectByName('group');
    if (plane) {
      plane.rotation.x = springProps.rotation.get()[0];
    }
  });

  return (
    <>
      <group>
        <spotLight
          color={0xffffff}
          intensity={spot ? 15 : 0}
          position={[0.4, 0.3, 2]}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-near={0.5}
          shadow-camera-far={10}
          shadow-bias={-0.0001}
          shadow-radius={10}
          angle={Math.PI / 18} // cone angle of the spotlight
          penumbra={0.1} // edge softness
          decay={1.4}
          target-position={[10, 10, -0.5]} // doesnt work
        />
      </group>

      <spotLight
        color={0xffffff}
        intensity={15}
        position={[0, 0.0, 3]}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={0.5}
        shadow-camera-far={10}
        shadow-bias={-0.0001}
        shadow-radius={10}
        angle={Math.PI / 4} // cone angle of the spotlight
        penumbra={0.1} // edge softness
        decay={1.4}
        target-position={[5, 0, 0]} // doesnt work
      />
      <ambientLight intensity={0.2} />

      <Mask id={1}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial color={"red"} />
      </Mask>

      <Shiba scale={0.2} position={[0, -0.48, -0.7]} rotation={[0, 0.1 * Math.PI, 0]} stencil={stencil} castShadow />

      <a.group  position={[0, 0.5, 0]} name='group'>
      <Svg
          position={[
            -0.12,
            -0.32,
            0.01
          ]}
          scale={0.01}
          src="./click.svg"
          fillMaterial={new MeshStandardMaterial({ color: '#aaa' })}
          
        />
        <mesh name="plane" position={[0, -0.5, 0]} >
          <planeGeometry args={[1, 1]} />
          <meshStandardMaterial toneMapped={false} side={DoubleSide} />
        </mesh>
      </a.group>


      <mesh position={[0, 0, -0.75]}
        castShadow={true}
        receiveShadow={true}
        material={materials}
        >
        <boxGeometry args={[1, 1, 1.5]} />
      </mesh>
    </>
  )
}