"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, PerspectiveCamera, Environment, Html, useProgress } from "@react-three/drei"
import type { Group, Mesh } from "three"
import gsap from "gsap"
import { useRouter } from "next/navigation"

// Loading indicator component
function Loader() {
  const { progress } = useProgress()
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-t-blue-500 border-blue-200 rounded-full animate-spin mb-4"></div>
        <p className="text-blue-500 font-medium">{progress.toFixed(0)}% loaded</p>
      </div>
    </Html>
  )
}

// Button models for different product types
function ButtonModel({
  productType,
  productColor,
  onClick,
}: {
  productType: string
  productColor: string
  onClick: () => void
}) {
  const groupRef = useRef<Group>(null)
  const buttonRef = useRef<Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)

  // Initial animation when model loads
  useEffect(() => {
    if (groupRef.current) {
      // Initial entrance animation
      gsap.from(groupRef.current.rotation, {
        y: -Math.PI * 2,
        duration: 1.5,
        ease: "power3.out",
      })

      gsap.from(groupRef.current.scale, {
        x: 0.5,
        y: 0.5,
        z: 0.5,
        duration: 1.5,
        ease: "elastic.out(1, 0.3)",
      })
    }
  }, [])

  // Hover animation
  useEffect(() => {
    if (groupRef.current) {
      gsap.to(groupRef.current.scale, {
        x: hovered ? 1.1 : 1,
        y: hovered ? 1.1 : 1,
        z: hovered ? 1.1 : 1,
        duration: 0.5,
        ease: "power2.out",
      })
    }
  }, [hovered])

  // Click animation
  useEffect(() => {
    if (clicked && buttonRef.current) {
      // Button press animation
      gsap.to(buttonRef.current.position, {
        y: buttonRef.current.position.y - 0.1,
        duration: 0.2,
        ease: "power2.in",
        yoyo: true,
        repeat: 1,
      })

      // Special animation for lamp type
      if (productType === "lamp" && buttonRef.current.material) {
        // Create a glowing effect
        gsap.to(buttonRef.current.material, {
          emissiveIntensity: 3,
          duration: 0.2,
          ease: "power2.in",
        })

        // Fade the glow back down
        gsap.to(buttonRef.current.material, {
          emissiveIntensity: 0,
          duration: 1.5,
          delay: 0.5,
          ease: "power2.out",
        })
      }

      // Reset clicked state after animation
      setTimeout(() => setClicked(false), 1000)
    }
  }, [clicked, productType])

  // Continuous gentle rotation
  useFrame((state, delta) => {
    if (groupRef.current && !hovered && !clicked) {
      groupRef.current.rotation.y += delta * 0.2
    }
  })

  // Render different button types based on product type
  const renderButtonModel = () => {
    switch (productType) {
      case "drill":
        // Round push button with drill-like texture
        return (
          <>
            {/* Button base */}
            <mesh position={[0, -0.1, 0]}>
              <cylinderGeometry args={[0.8, 0.9, 0.2, 32]} />
              <meshStandardMaterial color="#444" metalness={0.6} roughness={0.2} />
            </mesh>

            {/* Button */}
            <mesh ref={buttonRef} position={[0, 0.1, 0]}>
              <cylinderGeometry args={[0.6, 0.6, 0.2, 32]} />
              <meshStandardMaterial color={productColor} metalness={0.4} roughness={0.3} />
            </mesh>

            {/* Button detail */}
            <mesh position={[0, 0.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.3, 0.05, 16, 32]} />
              <meshStandardMaterial color="#222" metalness={0.5} roughness={0.4} />
            </mesh>
          </>
        )

      case "hammer":
        // Square button with hammer-like texture
        return (
          <>
            {/* Button base */}
            <mesh position={[0, -0.1, 0]}>
              <boxGeometry args={[1.6, 0.2, 1.6]} />
              <meshStandardMaterial color="#555" metalness={0.5} roughness={0.3} />
            </mesh>

            {/* Button */}
            <mesh ref={buttonRef} position={[0, 0.1, 0]}>
              <boxGeometry args={[1, 0.2, 1]} />
              <meshStandardMaterial color={productColor} metalness={0.4} roughness={0.5} />
            </mesh>

            {/* Button detail - cross pattern */}
            <mesh position={[0, 0.21, 0]}>
              <boxGeometry args={[1, 0.02, 0.2]} />
              <meshStandardMaterial color="#333" metalness={0.6} roughness={0.2} />
            </mesh>
            <mesh position={[0, 0.21, 0]}>
              <boxGeometry args={[0.2, 0.02, 1]} />
              <meshStandardMaterial color="#333" metalness={0.6} roughness={0.2} />
            </mesh>
          </>
        )

      case "wrench":
        // Hexagonal button like a bolt head
        return (
          <>
            {/* Button base */}
            <mesh position={[0, -0.1, 0]}>
              <cylinderGeometry args={[0.9, 1, 0.2, 6]} />
              <meshStandardMaterial color="#666" metalness={0.7} roughness={0.2} />
            </mesh>

            {/* Button */}
            <mesh ref={buttonRef} position={[0, 0.1, 0]}>
              <cylinderGeometry args={[0.7, 0.7, 0.2, 6]} />
              <meshStandardMaterial color={productColor} metalness={0.8} roughness={0.1} />
            </mesh>

            {/* Button detail - hex pattern */}
            <mesh position={[0, 0.21, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.4, 0.4, 0.02, 6]} />
              <meshStandardMaterial color="#444" metalness={0.7} roughness={0.2} />
            </mesh>
          </>
        )

      case "screwdriver":
        // Button with cross/phillips head
        return (
          <>
            {/* Button base */}
            <mesh position={[0, -0.1, 0]}>
              <cylinderGeometry args={[0.8, 0.9, 0.2, 32]} />
              <meshStandardMaterial color="#555" metalness={0.5} roughness={0.3} />
            </mesh>

            {/* Button */}
            <mesh ref={buttonRef} position={[0, 0.1, 0]}>
              <cylinderGeometry args={[0.6, 0.6, 0.2, 32]} />
              <meshStandardMaterial color={productColor} metalness={0.5} roughness={0.4} />
            </mesh>

            {/* Button detail - phillips head */}
            <mesh position={[0, 0.21, 0]}>
              <boxGeometry args={[0.5, 0.02, 0.1]} />
              <meshStandardMaterial color="#222" metalness={0.6} roughness={0.2} />
            </mesh>
            <mesh position={[0, 0.21, 0]}>
              <boxGeometry args={[0.1, 0.02, 0.5]} />
              <meshStandardMaterial color="#222" metalness={0.6} roughness={0.2} />
            </mesh>
          </>
        )

      case "saw":
        // Serrated edge button
        return (
          <>
            {/* Button base */}
            <mesh position={[0, -0.1, 0]}>
              <boxGeometry args={[1.8, 0.2, 0.9]} />
              <meshStandardMaterial color="#444" metalness={0.6} roughness={0.2} />
            </mesh>

            {/* Button */}
            <mesh ref={buttonRef} position={[0, 0.1, 0]}>
              <boxGeometry args={[1.4, 0.2, 0.7]} />
              <meshStandardMaterial color={productColor} metalness={0.5} roughness={0.3} />
            </mesh>

            {/* Button detail - serrated edge */}
            {Array.from({ length: 7 }).map((_, i) => (
              <mesh key={i} position={[-0.6 + i * 0.2, 0.21, 0]}>
                <boxGeometry args={[0.1, 0.05, 0.5]} />
                <meshStandardMaterial color="#333" metalness={0.7} roughness={0.2} />
              </mesh>
            ))}
          </>
        )

      case "tape":
        // Circular button with measuring marks
        return (
          <>
            {/* Button base */}
            <mesh position={[0, -0.1, 0]}>
              <cylinderGeometry args={[0.9, 1, 0.2, 32]} />
              <meshStandardMaterial color="#555" metalness={0.5} roughness={0.3} />
            </mesh>

            {/* Button */}
            <mesh ref={buttonRef} position={[0, 0.1, 0]}>
              <cylinderGeometry args={[0.7, 0.7, 0.2, 32]} />
              <meshStandardMaterial color={productColor} metalness={0.4} roughness={0.4} />
            </mesh>

            {/* Button detail - measuring marks */}
            {Array.from({ length: 8 }).map((_, i) => {
              const angle = (i * Math.PI) / 4
              return (
                <mesh
                  key={i}
                  position={[Math.cos(angle) * 0.5, 0.21, Math.sin(angle) * 0.5]}
                  rotation={[Math.PI / 2, 0, angle]}
                >
                  <boxGeometry args={[0.2, 0.02, 0.05]} />
                  <meshStandardMaterial color="#222" metalness={0.6} roughness={0.2} />
                </mesh>
              )
            })}
          </>
        )

      case "goggles":
        // Button with eye protection symbol
        return (
          <>
            {/* Button base */}
            <mesh position={[0, -0.1, 0]}>
              <cylinderGeometry args={[0.9, 1, 0.2, 32]} />
              <meshStandardMaterial color="#444" metalness={0.6} roughness={0.2} />
            </mesh>

            {/* Button */}
            <mesh ref={buttonRef} position={[0, 0.1, 0]}>
              <cylinderGeometry args={[0.7, 0.7, 0.2, 32]} />
              <meshStandardMaterial color={productColor} metalness={0.5} roughness={0.3} />
            </mesh>

            {/* Button detail - eye symbol */}
            <mesh position={[0, 0.21, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.3, 0.05, 16, 32]} />
              <meshStandardMaterial color="#222" metalness={0.5} roughness={0.4} />
            </mesh>
            <mesh position={[0, 0.21, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <sphereGeometry args={[0.1, 16, 16]} />
              <meshStandardMaterial color="#222" metalness={0.5} roughness={0.4} />
            </mesh>
          </>
        )

      case "lamp":
        // Barrel Pilot Lamp
        return (
          <>
            {/* Lamp base/housing */}
            <mesh position={[0, -0.1, 0]}>
              <cylinderGeometry args={[0.8, 0.9, 0.4, 32]} />
              <meshStandardMaterial color="#333" metalness={0.8} roughness={0.2} />
            </mesh>

            {/* Lamp threaded section */}
            <mesh position={[0, 0.2, 0]}>
              <cylinderGeometry args={[0.7, 0.7, 0.2, 32]} />
              <meshStandardMaterial color="#555" metalness={0.9} roughness={0.1} />
            </mesh>

            {/* Lamp lens */}
            <mesh ref={buttonRef} position={[0, 0.4, 0]}>
              <cylinderGeometry args={[0.6, 0.6, 0.4, 32]} />
              <meshStandardMaterial
                color={productColor}
                emissive={clicked ? productColor : "#000"}
                emissiveIntensity={clicked ? 2 : 0}
                transparent={true}
                opacity={0.8}
                metalness={0.1}
                roughness={0.1}
              />
            </mesh>

            {/* Lamp reflector (inside) */}
            <mesh position={[0, 0.4, 0]} scale={[0.95, 0.95, 0.95]}>
              <cylinderGeometry args={[0.5, 0.3, 0.3, 32]} />
              <meshStandardMaterial color="#999" metalness={0.9} roughness={0.1} />
            </mesh>

            {/* Lamp rim */}
            <mesh position={[0, 0.6, 0]}>
              <torusGeometry args={[0.6, 0.05, 16, 32]} />
              <meshStandardMaterial color="#222" metalness={0.7} roughness={0.3} />
            </mesh>
          </>
        )

      default:
        // Default simple square button
        return (
          <>
            {/* Button base */}
            <mesh position={[0, -0.1, 0]}>
              <boxGeometry args={[1.5, 0.2, 1.5]} />
              <meshStandardMaterial color="#444" metalness={0.6} roughness={0.2} />
            </mesh>

            {/* Button */}
            <mesh ref={buttonRef} position={[0, 0.1, 0]}>
              <boxGeometry args={[1, 0.2, 1]} />
              <meshStandardMaterial color={productColor} metalness={0.4} roughness={0.3} />
            </mesh>
          </>
        )
    }
  }

  return (
    <group
      ref={groupRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => {
        setClicked(true)
        onClick()
      }}
    >
      {renderButtonModel()}
    </group>
  )
}

// Main 3D viewer component
export default function ProductViewer3D({
  productType,
  productColor,
}: {
  productType: string
  productColor: string
}) {
  const router = useRouter()
  const [clicked, setClicked] = useState(false)

  // Handle product click
  const handleProductClick = () => {
    setClicked(true)
    setTimeout(() => setClicked(false), 3000)
  }

  return (
    <div className="w-full h-full relative">
      {/* Instruction overlay */}
      <div className="absolute top-4 left-4 z-10 bg-black bg-opacity-50 px-3 py-2 rounded-lg text-sm text-white">
        Click on the button to see animation
      </div>

      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />

        <Suspense fallback={<Loader />}>
          <ButtonModel productType={productType} productColor={productColor} onClick={handleProductClick} />
          <Environment preset="studio" />
        </Suspense>

        <OrbitControls enablePan={false} minDistance={2} maxDistance={10} enableDamping dampingFactor={0.05} />
      </Canvas>
    </div>
  )
}

// Suspense component for client-side rendering
import { Suspense } from "react"
