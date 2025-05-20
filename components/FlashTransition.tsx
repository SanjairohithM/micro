"use client";
import { useEffect, useRef } from "react"
import { gsap } from "gsap"

interface FlashTransitionProps {
  isActive: boolean
  onComplete?: () => void
}

const FlashTransition = ({ isActive, onComplete }: FlashTransitionProps) => {
  const flashRef = useRef<HTMLDivElement>(null)
  const flashCoreRef = useRef<HTMLDivElement>(null)
  const hasTriggeredRef = useRef(false)
  
  useEffect(() => {
    // Only run animation if isActive is true and it hasn't been triggered yet
    if (isActive && flashRef.current && flashCoreRef.current && !hasTriggeredRef.current) {
      // Mark as triggered to prevent future runs
      hasTriggeredRef.current = true
      
      // Timeline for flash animation
      const tl = gsap.timeline({
        onComplete: () => {
          if (onComplete) onComplete()
        }
      })
      
      // More dramatic flash animation
      // First, create a bright core that expands from center
      tl.fromTo(
        flashCoreRef.current,
        { 
          opacity: 0, 
          scale: 0.1 
        },
        { 
          opacity: 1, 
          scale: 15, 
          duration: 0.6, 
          ease: "power3.in" 
        }
      )
      // Then make the whole screen flash white
      .fromTo(
        flashRef.current,
        { 
          opacity: 0 
        },
        { 
          opacity: 1, 
          duration: 0.3, 
          ease: "power2.in" 
        },
        "-=0.3" // Overlap with the core expansion
      )
      // Hold the white flash for a moment
      .to(
        flashRef.current,
        { 
          opacity: 1, 
          duration: 0.4 
        }
      )
      // Then fade out everything
      .to(
        [flashRef.current, flashCoreRef.current],
        { 
          opacity: 0, 
          duration: 0.8, 
          ease: "power2.out" 
        }
      )
    }
  }, [isActive, onComplete])

  return (
    <>
      <div
        ref={flashRef}
        className={`fixed inset-0 bg-white z-50 pointer-events-none opacity-0`}
        aria-hidden="true"
      />
      <div
        ref={flashCoreRef}
        className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-white z-51 pointer-events-none opacity-0 blur-md`}
        style={{ boxShadow: "0 0 80px 50px rgba(255,255,255,0.9)" }}
        aria-hidden="true"
      />
    </>
  )
}

export default FlashTransition