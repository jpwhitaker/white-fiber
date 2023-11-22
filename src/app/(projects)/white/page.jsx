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
  const canvasRef = useRef();
  const CameraScroll = () => {
    const { camera } = useThree();

    useEffect(() => {
      const canvasDom = canvasRef.current;
      if (!canvasDom) return;
  
      const preventDefault = (event) => event.preventDefault();
      canvasDom.addEventListener('touchmove', preventDefault, { passive: false });
    
    
  
      return () => {
        canvasDom.removeEventListener('touchmove', preventDefault);
      };
    }, []);

    useEffect(() => {
      let startY; // To keep track of the start Y position of a touch

      const handleScroll = event => {
        const scrollAmount = event.deltaY * 0.01; // Mouse wheel scroll amount
        gsap.to(camera.position, {
          y: `+=${scrollAmount}`,
          ease: 'power1.out',
          duration: 0.5
        });
      };



      const handleTouchStart = event => {
        startY = event.touches[0].clientY;
      };

      const handleTouchMove = event => {
        const touchY = event.touches[0].clientY;
        const scrollAmount = (startY - touchY) * 0.05; // Calculate scroll amount based on touch movement
        startY = touchY; // Update startY for continuous movement

        gsap.to(camera.position, {
          y: `-=${scrollAmount}`,
          ease: 'power1.out',
          duration: 0.5
        });
      };

      window.addEventListener('wheel', handleScroll);
      window.addEventListener('touchstart', handleTouchStart);
      window.addEventListener('touchmove', handleTouchMove);

      return () => {
        window.removeEventListener('wheel', handleScroll);
        window.removeEventListener('touchstart', handleTouchStart);
        window.removeEventListener('touchmove', handleTouchMove);
      };
    }, [camera]);

    return null;
  };


  return (
    <div id="canvas-container" className="h-full text-white bg-white relative">
      <Canvas ref={canvasRef} shadows camera={{ position: [0, 0, 5], fov: 50 }} shadowmap={{ type: VSMShadowMap } }>
        <CameraScroll/>
        <group>
            <Scene />
      </group>

    </Canvas>
    </div >
  );
};

