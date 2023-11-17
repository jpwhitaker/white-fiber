"use client";

import { useRef, useEffect } from "react";
import { VSMShadowMap } from "three";
import { Canvas } from "@react-three/fiber";
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
  const groupRef = useRef();
  useEffect(() => {
    const handleScroll = event => {
      // Calculate the amount to move the group
      const scrollAmount = event.deltaY * 0.01; // Adjust this value as needed

      // Animate the group position using GSAP
      if (groupRef.current) {
        gsap.to(groupRef.current.position, {
          y: `+=${scrollAmount}`, 
          ease: 'power1.out', // You can choose different easing functions
          duration: 0.5 // Adjust duration for smoother or faster animation
        });
      }
    };

    // Attach the event listener to the window or a specific element
    window.addEventListener('wheel', handleScroll);

    // Clean up the event listener
    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, []);

  return (
    <div id="canvas-container" className="h-full text-white bg-white relative">
      <Canvas shadows camera={{ position: [0, 0, 5], fov: 50 }} shadowmap={{ type: VSMShadowMap }}>
        <group ref={groupRef}>
            <Scene />
      </group>

    </Canvas>
    </div >
  );
};

