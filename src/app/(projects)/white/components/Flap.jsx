import { DoubleSide, MeshStandardMaterial } from "three";
import { Svg } from "@react-three/drei";
import { a } from '@react-spring/three';

const Flap = () => {

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
          fillMaterial={new MeshStandardMaterial({ color: '#bbb' })}
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