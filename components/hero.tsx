"use client"

import { Suspense, useEffect, useRef } from "react"
import { Canvas } from "@react-three/fiber"
import { Environment, OrbitControls, Text3D } from "@react-three/drei"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
// import Navbar from "./navbar"
import HeroModel from "./hero-model"
import PushButton from "./models/PushButton"
// import bgImage from "image/color.jpg"

export default function Hero() {

  const heroRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Safely select elements
    const heading = textRef.current?.querySelector("h1")
    const paragraph = textRef.current?.querySelector("p")
    const button = textRef.current?.querySelector("button")

    // Animate hero text elements
    const tl = gsap.timeline()

    if (heading) {
      tl.from(heading, {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
      })
    }

    if (paragraph) {
      tl.from(
        paragraph,
        {
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.6",
      )
    }

    if (button) {
      tl.from(
        button,
        {
          y: 30,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.4",
      )
    }

    // Create scroll animation
    if (heroRef.current) {
      gsap.to(heroRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        opacity: 0.5,
        y: 200,
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section ref={heroRef} className="relative h-screen w-full overflow-hidden">
 

      {/* 3D Background */}

    <div className="absolute inset-0 z-0 left-[500px]">
        <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
          <ambientLight intensity={0.1} />
          <directionalLight position={[100, 10, 5]} intensity={8} />
          <HeroModel />
          <Environment preset="city" />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={2} />
        </Canvas>
      </div>

      <div className="absolute inset-0 z-0 top-[300px]" >
        <Canvas camera={{ position: [0, 0, 6], fov: 75 }}>
      {/* Lights */}
      <ambientLight intensity={1} />
      <directionalLight position={[5, 5, 5]} color={'yellow'} />
      <pointLight position={[0, 5, 5]} intensity={5} />
      
      {/* Suspense for loading */}
      <Suspense >
        <Text3D font="/fonts/helvetiker_regular.typeface.json" size={1} height={0.1} position={[-10, 1, 1]}>
          Switches
        </Text3D>
      </Suspense>
    </Canvas>
      </div>

      {/* Hero Content */}
      {/* <div
        ref={textRef}
        className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 md:px-8"
      >
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-yellow-200 mb-6">Micro Groups</h1>
        <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mb-8">
          WE OFFERS A BEST BUTTONS,SWITCH,Barrel Pilot Lamps
        </p>
        <button className="bg-white text-black font-medium py-3 px-8 rounded-full hover:bg-opacity-90 transition-all">
          Explore Our Services
        </button>
      </div> */}
    </section>
  )
}
