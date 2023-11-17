import { BackSide, MeshStandardMaterial } from "three";

const OpenBox = ({stencil}) => {
  const materials = [
    new MeshStandardMaterial({ ...stencil, color: 'white', side: BackSide }),
    new MeshStandardMaterial({ ...stencil, color: 'white', side: BackSide }),
    new MeshStandardMaterial({ ...stencil, color: 'white', side: BackSide }),
    new MeshStandardMaterial({ ...stencil, color: 'white', side: BackSide }),
    new MeshStandardMaterial({ ...stencil, color: 'red', side: BackSide, visible: false }),
    new MeshStandardMaterial({ ...stencil, color: '#777', side: BackSide }),
  ];
  return (
    <mesh 
      position={[0, 0, -0.75]}
      castShadow={true}
      receiveShadow={true}
      material={materials}
    >
      <boxGeometry args={[1, 1, 1.5]} />
    </mesh>
  )
}

export default OpenBox