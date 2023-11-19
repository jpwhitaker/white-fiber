import { BackSide, MeshStandardMaterial } from "three";
import { useState, useEffect } from "react";

const OpenBox = ({ stencil }) => {
  const [hovered, setHovered] = useState(false)
  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto'
  }, [hovered])

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
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={[1, 1, 1.5]} />
    </mesh>
  )
}

export default OpenBox