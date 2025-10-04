import React, { useRef, useState } from "react";
import { Float, Html } from "@react-three/drei";

export function FloatingSportsEquipment({ program, position, onClick, index }) {
  const meshRef = useRef()
  const groupRef = useRef()
  const [hovered, setHovered] = useState(false)
  const { viewport } = useThree()

  // Enhanced animation with multiple axes
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(t * 0.5 + index) * 0.2 + 0.5
      meshRef.current.rotation.y = t * 0.8 + index * 0.5
      meshRef.current.rotation.z = Math.cos(t * 0.7 + index) * 0.1
      // Floating animation
      if (groupRef.current) {
        groupRef.current.position.y = Math.sin(t * 1.5 + index) * 0.15 + position[1]
      }
    }
  })

  // Color mapping based on program
  const getColor = () => {
    switch (program.title) {
      case "Cricket Academy":
        return "#f97316"
      case "Football Training":
        return "#10b981"
      case "Basketball Academy":
        return "#f59e0b"
      default:
        return "#3b82f6"
    }
  }

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5} position={position}>
      <group
        ref={groupRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={(e) => {
          e.stopPropagation()
          onClick(program)
        }}
        scale={hovered ? 1.2 : 1}
      >
        <mesh ref={meshRef} castShadow receiveShadow>
          {program.title.includes("Cricket") && <sphereGeometry args={[0.6, 32, 32]} />}
          {program.title.includes("Football") && <icosahedronGeometry args={[0.55, 1]} />}
          {program.title.includes("Basketball") && <sphereGeometry args={[0.6, 32, 32]} />}
          {!program.title.includes("Cricket") &&
            !program.title.includes("Football") &&
            !program.title.includes("Basketball") && <dodecahedronGeometry args={[0.6, 0]} />}
          <meshStandardMaterial
            color={getColor()}
            roughness={0.3}
            metalness={0.6}
            emissive={hovered ? getColor() : "#000000"}
            emissiveIntensity={hovered ? 0.5 : 0}
          />
        </mesh>
        {/* Glowing effect on hover */}
        {hovered && <pointLight color={getColor()} intensity={1.5} distance={2} decay={2} />}
        {/* Label above object */}
        <Html
          position={[0, 1.2, 0]}
          center
          transform
          occlude
          style={{
            pointerEvents: "none",
            whiteSpace: "nowrap",
          }}
        >
          <div
            className={`px-3 py-1 rounded-full text-xs font-bold bg-black/70 text-white backdrop-blur-sm border border-white/20 ${hovered ? "scale-110" : ""
              } transition-all duration-300`}
          >
            {program.title.split(" ")[0]}
          </div>
        </Html>
      </group>
    </Float>
  )
}