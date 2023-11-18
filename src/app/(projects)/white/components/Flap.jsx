import { DoubleSide, MeshStandardMaterial } from "three";
import { useRef, useState } from "react";
import { Svg } from "@react-three/drei";
import { a, useSpring } from '@react-spring/three';

const Flap = ({flippedOnce}) => {
  const [material, setMaterial] = useState(new MeshStandardMaterial({ color: '#bbb', transparent: true, opacity: 1}))

  // Animate the properties of the material
  useSpring({
    opacity: flippedOnce ? 0 : 1, // Animate to 0 if flippedOnce is true, else to 1
    config: { duration: 400 }, // Animation duration of 100ms
    onChange: ({ value }) => {
      
      console.log(value.opacity)
      
      setMaterial(new MeshStandardMaterial({ color: '#bbb', transparent: true, opacity: value.opacity}))  // Update the material's opacity
    }
  });

  
  return (
    <>
      <a.group position={[0, 0.5, 0]} name='group'>
        <Svg
          position={[
            -0.06,
            -0.43,
            0.01
          ]}
          scale={0.005}
          src="./click.svg"
          fillMaterial={material}
          
        />
        <mesh name="plane" position={[0, -0.5, 0]} >
          <planeGeometry args={[1, 1]} />
          <meshStandardMaterial toneMapped={false} side={DoubleSide} />
        </mesh>
      </a.group>
    </>
  )
}

export default Flap