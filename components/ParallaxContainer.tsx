
"use client"

import { useRef, useEffect, ReactNode } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface ParallaxContainerProps {
  children: ReactNode
}

export default function ParallaxContainer({ children }: ParallaxContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    // Create our parallax scrolling effect
    const initParallaxScrolling = () => {
      const sections = document.querySelectorAll('.parallax-section')
      
      sections.forEach((section, i) => {
        // Set initial position for all sections except first
        if (i > 0) {
          gsap.set(section, { y: "100%" })
        }
        
        // Create scroll trigger for each section
        ScrollTrigger.create({
          trigger: section,
          start: "top bottom",
          end: "+=100%",
          pin: true,
          pinSpacing: false,
        })
        
        // Animate the next section coming in
        if (i < sections.length - 1) {
          gsap.to(sections[i + 1], {
            y: "0%",
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          })
        }
      })
    }
    
    // Small delay to ensure DOM is fully rendered
    const timer = setTimeout(() => {
      initParallaxScrolling()
    }, 200)
    
    return () => {
      // Clean up
      clearTimeout(timer)
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <div ref={containerRef} className="parallax-container relative">
      {children}
    </div>
  )
}