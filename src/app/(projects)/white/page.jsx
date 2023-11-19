"use client";

import { useRef, useEffect } from "react";
import { VSMShadowMap } from "three";
import { Canvas, useThree } from "@react-three/fiber";
import { ScrollControls, Scroll } from "@react-three/drei";
import { useControls, Leva, useCreateStore } from "leva";
import './styles.css';
import Scene from './components/Scene'
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
//todo change cursor to pointer on hover over square
//todo clean up code

export default function CanvasWrapper() {
  gsap.registerPlugin(ScrollTrigger);
  const CameraScroll = () => {
    const { camera } = useThree();

    useEffect(() => {
      const handleScroll = event => {
        const scrollAmount = event.deltaY * 0.01; // Adjust this value as needed

        gsap.to(camera.position, {
          y: `+=${scrollAmount}`,
          ease: 'power1.out',
          duration: 0.5
        });
      };

      window.addEventListener('wheel', handleScroll);

      return () => {
        window.removeEventListener('wheel', handleScroll);
      };
    }, [camera]);

    return null;
  };

  return (
    <div id="canvas-container" className="h-full text-white bg-white relative">
      <Canvas shadows camera={{ position: [0, 0, 5], fov: 50 }} shadowmap={{ type: VSMShadowMap } }>
        <CameraScroll/>
        <group>
            <Scene />
      </group>

    </Canvas>
    </div >
  );
};

