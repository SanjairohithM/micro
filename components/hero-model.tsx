"use client"

import { useRef, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import type * as THREE from "three"
import gsap from "gsap"

export default function HeroModel() {
  const group = useRef<THREE.Group>(null)

  // For demo purposes, we'll use a simple geometry instead of loading a model
  // In a real implementation, you would use useGLTF to load your custom model

  useEffect(() => {
    if (group.current) {
      // Initial animation
      gsap.from(group.current.position, {
        y: -2,
        duration: 2,
        ease: "elastic.out(1, 0.3)",
      })

      gsap.from(group.current.rotation, {
        y: Math.PI * 2,
        duration: 2.5,
        ease: "power3.out",
      })
    }
  }, [])

  useFrame((state, delta) => {
    if (group.current) {
      // Subtle floating animation
      group.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      group.current.rotation.y += delta * 0.1
    }
  })

  return (
    <group ref={group}>
      <mesh>
        <torusKnotGeometry args={[1, 0.3, 128, 32]} />
        <meshStandardMaterial
          color="#0070f3"
          metalness={0.7}
          roughness={0.2}
          emissive="#0070f3"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Particles */}
      {[...Array(100)].map((_, i) => (
        <mesh key={i} position={[(Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10]}>
          <sphereGeometry args={[0.02, 16, 16]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      ))}
    </group>
  )
}
