"use client"

import { useState, useEffect, useLayoutEffect } from "react"
import Hero from "@/components/hero"
import About from "@/components/about"
import Services from "@/components/services"
import Contact from "@/components/contact"
import TunnelAnimation from "@/components/tunnel-animation"
import { useGSAP } from "@gsap/react"
import gsap from "gsap/all"
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/navbar"
import Loader from "@/components/Loader"

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [tunnelComplete, setTunnelComplete] = useState(true)
  const [contentVisible, setContentVisible] = useState(true)

  // Initial loading
  useEffect(() => {
    // Simulate resource loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 4000)

    return () => clearTimeout(timer)
  }, [])

  const handleTunnelComplete = () => {
    console.log("Tunnel animation complete")
    setTunnelComplete(true)

    // Add a slight delay before showing content
    setTimeout(() => {
      setContentVisible(true)
    }, 500)
  }

  useLayoutEffect(() => {
    const smoother = ScrollSmoother.create({
      smooth: 4,
      effects: true,
      smoothTouch: 0.4,
    });

    return () => {
      smoother.kill();
    };
  }, []);


  return (
    <main className="relative min-h-screen">
      {/* Initial loading screen */}
      {/* {isLoading && (
        <>
        <Loader />
        </>
      )} */}

      {/* Tunnel animation - show after loading and until complete */}
      {/* {!isLoading && !tunnelComplete && (
        <div className="fixed inset-0 z-40">
          <TunnelAnimation onComplete={handleTunnelComplete} />
        </div>
      )} */}

      {/* Content sections - only show after tunnel is complete */}
      <div
        className="content-sections"
        style={{
          opacity: contentVisible ? 1 : 0,
          visibility: contentVisible ? "visible" : "hidden",
          transition: "opacity 1s ease-in-out, visibility 1s ease-in-out",
          position: "relative",
          zIndex: 30,
        }}
      >

        <div>
               <Navbar />
        </div>

        <Hero />
        <About />
        <Services />
        <Contact />
      </div>

      {/* Debug info */}
      {process.env.NODE_ENV === "development" && (
        <div className="fixed bottom-0 left-0 bg-black bg-opacity-70 text-white p-2 text-xs z-50">
          Loading: {isLoading ? "Yes" : "No"} | Tunnel Complete: {tunnelComplete ? "Yes" : "No"} | Content Visible:{" "}
          {contentVisible ? "Yes" : "No"}
        </div>
      )}
    </main>
  )
}
