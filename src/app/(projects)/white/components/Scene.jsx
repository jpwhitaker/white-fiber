"use client";

import { useFrame } from "@react-three/fiber";
import { Mask, useMask } from "@react-three/drei";
import { useSpring} from '@react-spring/three';
import { useState, useEffect, useRef } from "react";
import { Shiba } from '../Shiba'
import { usePlayOn, usePlayOpen, usePlayClose } from './useAppSounds';
import OpenBox from './OpenBox'
import Lights from './Lights'
import Flap from './Flap'

export default function Scene() {
  const [isFlipped, setIsFlipped] = useState(false);
  const stencil = useMask(1)
  const [spot, setSpot] = useState(false)
  const [flippedOnce, setFlippedOnce] = useState(false)
  // Ref to track the first render
  const isFirstRender = useRef(true);

  const [playOn] = usePlayOn();
  const [playOpen] = usePlayOpen();
  const [playClose] = usePlayClose();


  useEffect(() => {
    const handleDocumentClick = () => {
      setIsFlipped(prev => !prev);
      setFlippedOnce(true);
    };
    document.addEventListener('click', handleDocumentClick);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  // Define the spring-animated state
  const [springProps, setSpringProps] = useSpring(() => ({
    rotation: [0, 0, 0], // Initial rotation
    config: { mass: 5, tension: 400, friction: 40, precision: 0.0001 }
  }));

  useEffect(() => {
    // Skip the effect on the first render
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (isFlipped) {
      playOpen();
    } else {
      playClose();
    }

    setSpringProps({
      rotation: isFlipped ? [-Math.PI / 2.2, 0, 0] : [0, 0, 0]
    });

    if (isFlipped) {
      setTimeout(() => {
        playOn();
        setSpot(true);
      }, 800);
    } else {
      setSpot(false);
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
      <Lights spot={spot} />
      <Mask id={1}>
        <planeGeometry args={[1, 1]} />
      </Mask>
      <Shiba scale={0.2} position={[0, -0.498, -0.7]} rotation={[0, 0.1 * Math.PI, 0]} stencil={stencil} castShadow />
      <Flap flippedOnce={flippedOnce}/>
      <OpenBox stencil={stencil} />
    </>
  )
}

