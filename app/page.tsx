"use client"

import { useState, useEffect, useRef } from "react"
import Hero from "@/components/hero"
import About from "@/components/about"
import Services from "@/components/services"
import Contact from "@/components/contact"
import TunnelAnimation from "@/components/tunnel-animation"
import FlashTransition from "@/components/FlashTransition"
import gsap from "gsap"
import { ScrollSmoother } from "gsap/ScrollSmoother"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Navbar from "@/components/navbar"
import Loader from "@/components/Loader"

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother)
}

export default function Home() {
  // State management - keep state minimal to reduce re-renders
  const [appState, setAppState] = useState({
    isLoading: true,
    tunnelComplete: false,
    showFlash: false,
    contentVisible: false
  })
  
  // Refs for DOM elements and animations
  const mainRef = useRef<HTMLDivElement>(null)
  const smootherRef = useRef<any>(null)
  const hasInitializedRef = useRef(false)

  // Initial loading
  useEffect(() => {
    if (hasInitializedRef.current) return;
    hasInitializedRef.current = true;
    
    // Simulate resource loading
    const timer = setTimeout(() => {
      setAppState(prev => ({ ...prev, isLoading: false }))
    }, 4000)

    return () => clearTimeout(timer)
  }, [])

  // Tunnel animation completion handler
  const handleTunnelComplete = () => {
    console.log("Tunnel animation complete")
    
    // Trigger flash immediately after tunnel completes
    setAppState(prev => ({ 
      ...prev, 
      tunnelComplete: true,
      showFlash: true 
    }))
  }

  // Flash transition completion handler
  const handleFlashComplete = () => {
    console.log("Flash transition complete")
    
    // Show content immediately after flash finishes
    setAppState(prev => ({ ...prev, contentVisible: true }))
    
    // Initialize scroll smoother after content is visible
    initScrollSmoother()
  }

  // Initialize ScrollSmoother
  const initScrollSmoother = () => {
    if (!mainRef.current || smootherRef.current) return
    
    // Small delay to ensure DOM is ready
    setTimeout(() => {
      if (typeof window !== 'undefined') {
        smootherRef.current = ScrollSmoother.create({
          smooth: 4,
          effects: true,
          smoothTouch: 0.4,
          normalizeScroll: true,
          ignoreMobileResize: true,
        })
      }
    }, 100)
  }

  // Clean up ScrollSmoother on unmount
  useEffect(() => {
    return () => {
      if (smootherRef.current) {
        smootherRef.current.kill()
        smootherRef.current = null
      }
    }
  }, [])

  const { isLoading, tunnelComplete, showFlash, contentVisible } = appState

  return (
    <main ref={mainRef} className="relative min-h-screen bg-black">
      {/* Initial loading screen */}
      {isLoading && <Loader />}

      {/* Tunnel animation - show after loading and until complete */}
      {!isLoading && !tunnelComplete && (
        <div className="fixed inset-0 z-40">
          <TunnelAnimation onComplete={handleTunnelComplete} />
        </div>
      )}
      
      {/* Flash transition effect - only triggers once */}
      <FlashTransition isActive={showFlash} onComplete={handleFlashComplete} />

      {/* Content sections - only show after transitions are complete */}
      <div 
        id="smooth-wrapper"
        className="content-sections"
        style={{
          opacity: contentVisible ? 1 : 0,
          visibility: contentVisible ? "visible" : "hidden",
          transition: "opacity 0.5s ease-out",
          position: "relative",
          zIndex: 30,
        }}
      >
        <div id="smooth-content">
          <Navbar />
          <Hero />
          <About />
          <Services />
          <Contact />
        </div>
      </div>

      {/* Debug info */}
      {process.env.NODE_ENV === "development" && (
        <div className="fixed bottom-0 left-0 bg-black bg-opacity-70 text-white p-2 text-xs z-50">
          Loading: {isLoading ? "Yes" : "No"} | 
          Tunnel Complete: {tunnelComplete ? "Yes" : "No"} | 
          Flash: {showFlash ? "Yes" : "No"} | 
          Content Visible: {contentVisible ? "Yes" : "No"}
        </div>
      )}
    </main>
  )
}