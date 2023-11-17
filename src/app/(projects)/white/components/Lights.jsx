import { BackSide, MeshStandardMaterial } from "three";

const Lights = ({ spot }) => {

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
    </>
  )
}

export default Lights