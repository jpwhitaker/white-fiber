"use client";
import { Layers, BackSide, DoubleSide, FrontSide, MeshStandardMaterial, VSMShadowMap } from "three";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Box, Plane, Svg, ScrollControls, Scroll, Mask, useMask } from "@react-three/drei";
import { useControls, Leva, useCreateStore } from "leva";
import { useSpring, a } from '@react-spring/three';
import './styles.css';
import { useState, useEffect } from "react";
import {Shiba} from './Shiba'

export default function CanvasWrapper() {
  const cameraLayer = new Layers();
  const [opacity, setOpacity] = useState(1); // Initial opacity is 1

  useEffect(() => {
    const handleClick = () => {
      setOpacity(0); // Set opacity to 0 on click
    };

    // Attach the event listener
    window.addEventListener('click', handleClick);

    // Cleanup the event listener
    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div id="canvas-container" className="h-full text-white bg-white relative">
      <Canvas shadows camera={{ position: [0, 0, 5], fov: 50, layers: cameraLayer }} shadowMap={{ type: VSMShadowMap }}>
        <ScrollControls pages={3} damping={0.1}>
          <Scroll>
            <Scene />
          </Scroll>
        </ScrollControls>
        {/* <Plane
          args={[100, 100]} // Size of the plane
          rotation={[-Math.PI / 2, 0, 0]} // Rotated to lie flat
          position={[0, -0.501, 0]} // Position of the plane
          receiveShadow // Enables the plane to receive shadows
        >
          <meshStandardMaterial
            attach="material"
            color="red" // Sets the color of the plane to red
          />
        </Plane> */}
      </Canvas>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#aaaaaa" className="w-6 h-6" style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        opacity: opacity,
        transition: 'opacity 0.1s ease' // Smooth transition for the opacity
      }}>
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59" />
      </svg>
    </div>
  );
};

const Scene = () => {
  const BOX_LAYER = 1;
  const LIGHT_LAYER = 2;
  const cameraLayer = new Layers();
  cameraLayer.enable(BOX_LAYER);
  cameraLayer.enable(LIGHT_LAYER);
  const [isFlipped, setIsFlipped] = useState(false);
  const stencil = useMask(1)
  const [spot, setSpot] = useState(false)

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

  // Event handler to flip the plane
  const handleClick = () => {
    
    setSpringProps({
      rotation: isFlipped ? [0, 0, 0] : [-Math.PI / 2.2, 0, 0]
    });

    if(!isFlipped){
      setTimeout(()=>{setSpot(true); console.log("on")}, 800)
      
    } else {
      setSpot(false)
      console.log("off")
    }

    setIsFlipped(!isFlipped); // Update the flip state


    console.log('click')
  };

  // Use useFrame to update the rotation of the plane
  useFrame(({ scene }) => {
    const plane = scene.getObjectByName('group');
    if (plane) {
      plane.rotation.x = springProps.rotation.get()[0];
    }
  });


  return (
    <>
      {/* <directionalLight
        color={0xffffff}
        intensity={3}
        position={[1, 3, 5]}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={0.5}
        shadow-camera-far={10}
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
        // shadow-bias={-0.001}
        shadow-bias={-0.0001}
        shadow-radius={10}
      /> */}
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
        angle={Math.PI / 18} // This defines the cone angle of the spotlight
        penumbra={0.1} // This defines the softness of the edge of the spotlight
        decay={1.4} // This defines how the light intensity decreases over distance
        target-position={[10, 10, -0.5]} // Target the spotlight at a specific point
      />
      </group>

      <spotLight
        color={0xffffff}
        intensity={15}
        position={[0, 0.0, 3]}
        // castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={0.5}
        shadow-camera-far={10}
        shadow-bias={-0.0001}
        shadow-radius={10}
        angle={Math.PI / 4} // This defines the cone angle of the spotlight
        penumbra={0.1} // This defines the softness of the edge of the spotlight
        decay={1.4} // This defines how the light intensity decreases over distance
        target-position={[5, 0, 0]} // Target the spotlight at a specific point
      />

      {/* <directionalLight
        color={0xffffff}
        intensity={0}
        position={[0, 0, 5]}
        castShadow
        // Other directional light properties
        layers={new Layers().set(LIGHT_LAYER)}
      /> */}
      <ambientLight intensity={0.2} />

      <Mask id={1}>
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial color={"red"}/>
      </Mask>

      <Shiba scale={0.2} position={[0,-0.48, -0.7]} rotation={[0, 0.1 * Math.PI, 0]} stencil={stencil} castShadow/>

      <a.group onClick={handleClick} position={[0, 0.5, 0]} name='group'>
        <mesh name="plane" position={[0, -0.5, 0]} >
          <planeGeometry args={[1, 1]} />
          <meshStandardMaterial toneMapped={false} side={DoubleSide} />
        </mesh>
      </a.group>
      <mesh position={[0, 0, -0.75]}
        castShadow={true} // Enable casting shadows
        receiveShadow={true} // Enable receiving shadows
        material={materials} layers={new Layers().set(BOX_LAYER)} onClick={handleClick}>
        <boxGeometry args={[1, 1, 1.5]} />
      </mesh></>
  )
}