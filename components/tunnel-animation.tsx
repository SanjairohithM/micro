"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Import necessary Three.js extensions
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js"
import { RenderPass } from "three/addons/postprocessing/RenderPass.js"
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js"

// Math utilities
const Mathutils = {
  normalize: ($value: number, $min: number, $max: number) => ($value - $min) / ($max - $min),
  interpolate: ($normValue: number, $min: number, $max: number) => $min + ($max - $min) * $normValue,
  map: function ($value: number, $min1: number, $max1: number, $min2: number, $max2: number) {
    if ($value < $min1) {
      $value = $min1
    }
    if ($value > $max1) {
      $value = $max1
    }
    const res = this.interpolate(this.normalize($value, $min1, $max1), $min2, $max2)
    return res
  },
}

interface TunnelAnimationProps {
  onComplete: () => void
}

export default function TunnelAnimation({ onComplete }: TunnelAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const scrollTargetRef = useRef<HTMLDivElement>(null)
  const vignetteRef = useRef<HTMLDivElement>(null)
  const [animationProgress, setAnimationProgress] = useState(0)

  useEffect(() => {
    if (!canvasRef.current) return

    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger)

    // Setup
    const markers: THREE.Vector3[] = []
    let composer: EffectComposer

    // Get window size
    const ww = window.innerWidth
    const wh = window.innerHeight

    // Bloom parameters
    const params = {
      exposure: 1.3,
      bloomStrength: 0.9,
      bloomThreshold: 0,
      bloomRadius: 0,
    }

    // Create WebGL renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
    })
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.setSize(ww, wh)

    // Create scene
    const scene = new THREE.Scene()
    scene.fog = new THREE.Fog(0x194794, 0, 100)

    const clock = new THREE.Clock()

    // Create camera
    let cameraRotationProxyX = 3.14159
    let cameraRotationProxyY = 0

    const camera = new THREE.PerspectiveCamera(45, ww / wh, 0.001, 200)
    camera.rotation.y = cameraRotationProxyX
    camera.rotation.z = cameraRotationProxyY

    const c = new THREE.Group()
    c.position.z = 400
    c.add(camera)
    scene.add(c)

    // Set up render pass
    const renderScene = new RenderPass(scene, camera)
    const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85)
    bloomPass.threshold = params.bloomThreshold
    bloomPass.strength = params.bloomStrength
    bloomPass.radius = params.bloomRadius

    composer = new EffectComposer(renderer)
    composer.setSize(window.innerWidth, window.innerHeight)
    composer.addPass(renderScene)
    composer.addPass(bloomPass)

    // Array of points for the path
    const points = [
      [10, 89, 0],
      [50, 88, 10],
      [76, 139, 20],
      [126, 141, 12],
      [150, 112, 8],
      [157, 73, 0],
      [180, 44, 5],
      [207, 35, 10],
      [232, 36, 0],
    ].map((point) => new THREE.Vector3(point[0], point[2], point[1]))

    // Create path
    const path = new THREE.CatmullRomCurve3(points)
    path.tension = 0.5

    // Create tube geometry
    const tubeGeometry = new THREE.TubeGeometry(path, 300, 4, 32, false)

    // Load textures
    const textureLoader = new THREE.TextureLoader()

    const texture = textureLoader.load(
      "https://s3-us-west-2.amazonaws.com/s.cdpn.io/68819/3d_space_5.jpg",
      (texture) => {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping
        texture.offset.set(0, 0)
        texture.repeat.set(15, 2)
      },
    )

    const mapHeight = textureLoader.load(
      "https://s3-us-west-2.amazonaws.com/s.cdpn.io/68819/waveform-bump3.jpg",
      (texture) => {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping
        texture.offset.set(0, 0)
        texture.repeat.set(15, 2)
      },
    )

    // Create material
    const material = new THREE.MeshPhongMaterial({
      side: THREE.BackSide,
      map: texture,
      shininess: 20,
      bumpMap: mapHeight,
      bumpScale: -0.03,
      specular: 0x0b2349,
    })

    // Create mesh
    const tube = new THREE.Mesh(tubeGeometry, material)
    scene.add(tube)

    // Inner tube (wireframe)
    const innerGeometry = new THREE.TubeGeometry(path, 150, 3.4, 32, false)
    const edgesGeometry = new THREE.EdgesGeometry(innerGeometry)

    const wireframeMaterial = new THREE.LineBasicMaterial({
      linewidth: 2,
      opacity: 0.2,
      transparent: true,
    })

    const wireframe = new THREE.LineSegments(edgesGeometry, wireframeMaterial)
    scene.add(wireframe)

    // Create light
    const light = new THREE.PointLight(0xffffff, 0.35, 4, 0)
    light.castShadow = true
    scene.add(light)

    // Camera position update function
    let p1: THREE.Vector3, p2: THREE.Vector3

    function updateCameraPercentage(percentage: number) {
      p1 = path.getPointAt(percentage)
      p2 = path.getPointAt(percentage + 0.03)

      c.position.set(p1.x, p1.y, p1.z)
      c.lookAt(p2)
      light.position.set(p2.x, p2.y, p2.z)
    }

    let cameraTargetPercentage = 0
    let currentCameraPercentage = 0

    // GSAP animation
    gsap.defaults({ ease: "none" })

    const tubePerc = {
      percent: 0,
    }

    // Auto-animate through the tunnel instead of using scroll
    const tunnelTimeline = gsap.timeline({
      onUpdate: () => {
        setAnimationProgress(tubePerc.percent)

        // When animation reaches 100%, call onComplete
        if (tubePerc.percent >= 0.96) {
          onComplete()
        }
      },
    })

    tunnelTimeline.to(tubePerc, {
      percent: 0.96,
      ease: "power1.inOut",
      duration: 5, // 10 seconds to travel through the tunnel
      onUpdate: () => {
        cameraTargetPercentage = tubePerc.percent
      },
    })

    // Particle system - updated for modern Three.js
    const spikeyTexture = textureLoader.load("https://s3-us-west-2.amazonaws.com/s.cdpn.io/68819/spikey.png")

    const particleCount = 6800

    // Create particle systems using BufferGeometry
    function createParticleSystem(count: number, positionFunction: (index: number) => [number, number, number]) {
      const geometry = new THREE.BufferGeometry()
      const positions = new Float32Array(count * 3)

      for (let i = 0; i < count; i++) {
        const [x, y, z] = positionFunction(i)
        positions[i * 3] = x
        positions[i * 3 + 1] = y
        positions[i * 3 + 2] = z
      }

      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))

      const material = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.5,
        map: spikeyTexture,
        transparent: true,
        blending: THREE.AdditiveBlending,
      })

      return new THREE.Points(geometry, material)
    }

    // Create three different particle systems
    const particleSystem1 = createParticleSystem(particleCount, () => {
      const pX = Math.random() * 500 - 250
      const pY = Math.random() * 50 - 25
      const pZ = Math.random() * 500 - 250
      return [pX, pY, pZ]
    })

    const particleSystem2 = createParticleSystem(particleCount, () => {
      const pX = Math.random() * 500
      const pY = Math.random() * 10 - 5
      const pZ = Math.random() * 500
      return [pX, pY, pZ]
    })

    const particleSystem3 = createParticleSystem(particleCount, () => {
      const pX = Math.random() * 500
      const pY = Math.random() * 10 - 5
      const pZ = Math.random() * 500
      return [pX, pY, pZ]
    })

    scene.add(particleSystem1)
    scene.add(particleSystem2)
    scene.add(particleSystem3)

    // Mouse move event
    const handleMouseMove = (evt: MouseEvent) => {
      cameraRotationProxyX = Mathutils.map(evt.clientX, 0, window.innerWidth, 3.24, 3.04)
      cameraRotationProxyY = Mathutils.map(evt.clientY, 0, window.innerHeight, -0.1, 0.1)
    }

    document.addEventListener("mousemove", handleMouseMove)

    // Canvas click event
    const handleCanvasClick = () => {
      console.clear()
      if (p1) markers.push(p1)
      console.log(JSON.stringify(markers))
    }

    canvasRef.current.addEventListener("click", handleCanvasClick)

    // Resize event
    const handleResize = () => {
      const width = window.innerWidth
      const height = window.innerHeight

      camera.aspect = width / height
      camera.updateProjectionMatrix()

      renderer.setSize(width, height)
      composer.setSize(width, height)
    }

    window.addEventListener("resize", handleResize)

    // Animation loop
    function render() {
      currentCameraPercentage = cameraTargetPercentage

      camera.rotation.y += (cameraRotationProxyX - camera.rotation.y) / 15
      camera.rotation.x += (cameraRotationProxyY - camera.rotation.x) / 15

      updateCameraPercentage(currentCameraPercentage)

      // Animate particles
      particleSystem1.rotation.y += 0.00002
      particleSystem2.rotation.x += 0.00005
      particleSystem3.rotation.z += 0.00001

      // Render
      composer.render()
    }

    // Animation frame
    let animationFrameId: number

    function animate() {
      animationFrameId = requestAnimationFrame(animate)
      render()
    }

    animate()

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("resize", handleResize)
      document.removeEventListener("mousemove", handleMouseMove)
      if (canvasRef.current) {
        canvasRef.current.removeEventListener("click", handleCanvasClick)
      }

      // Kill GSAP animations
      tunnelTimeline.kill()

      // Dispose resources
      scene.remove(tube)
      scene.remove(wireframe)
      scene.remove(particleSystem1)
      scene.remove(particleSystem2)
      scene.remove(particleSystem3)

      tubeGeometry.dispose()
      material.dispose()
      innerGeometry.dispose()
      edgesGeometry.dispose()
      wireframeMaterial.dispose()

      // Dispose particle geometries and materials
      particleSystem1.geometry.dispose()
      particleSystem2.geometry.dispose()
      particleSystem3.geometry.dispose()

      if (particleSystem1.material instanceof THREE.Material) {
        particleSystem1.material.dispose()
      }
      if (particleSystem2.material instanceof THREE.Material) {
        particleSystem2.material.dispose()
      }
      if (particleSystem3.material instanceof THREE.Material) {
        particleSystem3.material.dispose()
      }
    }

  }, [onComplete])

  return (
    <>
      <canvas ref={canvasRef} className="experience"></canvas>
      <div ref={scrollTargetRef} className="scrollTarget"></div>
      <div ref={vignetteRef} className="vignette-radial"></div>

      {/* Progress indicator */}
      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${animationProgress * 100}%` }}></div>
      </div>

      <style jsx>{`
        .experience {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          z-index: 2;
        }
        
        .scrollTarget {
          position: absolute;
          height: 1000vh;
          width: 100px;
          top: 0;
          z-index: 0;
        }
        
        .vignette-radial {
          position: fixed;
          z-index: 11;
          top: 0;
          left: 0;
          height: 100vh;
          width: 100%;
          pointer-events: none;
        }
        
        .vignette-radial:after {
          pointer-events: none;
          content: ' ';
          position: absolute;
          top: 0; left: 0; bottom: 0; right: 0;
          background: radial-gradient(circle, transparent 60%, black 150%);
        }
        
        .progress-container {
          position: fixed;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          width: 200px;
          height: 4px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 2px;
          z-index: 20;
        }
        
        .progress-bar {
          height: 100%;
          background: #3b82f6;
          border-radius: 2px;
          transition: width 0.1s ease-out;
        }
      `}</style>
    </>
  )
}
