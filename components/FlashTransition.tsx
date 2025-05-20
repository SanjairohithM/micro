"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface FlashTransitionProps {
  isActive: boolean;
  onComplete?: () => void;
}

const FlashTransition = ({ isActive, onComplete }: FlashTransitionProps) => {
  const flashRef = useRef<HTMLDivElement>(null);
  const flashCoreRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.Context | null>(null);
  const hasRunRef = useRef<boolean>(false);
  
  useEffect(() => {
    // Only run the animation once and only when isActive is true
    if (isActive && !hasRunRef.current && flashRef.current && flashCoreRef.current) {
      hasRunRef.current = true; // Mark as run to prevent repeat animations
      
      // Clear any existing animations
      if (animationRef.current) {
        animationRef.current.revert();
      }
      
      // Create a new GSAP context to manage animations
      animationRef.current = gsap.context(() => {
        // Reset initial state - ensure core is perfectly centered
        gsap.set(flashCoreRef.current, {
          scale: 0,
          opacity: 1,
          xPercent: -50,
          yPercent: -50,
          transformOrigin: "center center"
        });
        
        gsap.set(flashRef.current, {
          opacity: 0
        });
        
        // Timeline for the flash animation with high performance settings
        const tl = gsap.timeline({
          onComplete: () => {
            if (onComplete) {
              onComplete();
            }
          },
          defaults: {
            ease: "power3.out",
            overwrite: "auto",
            force3D: true // Force GPU acceleration
          }
        });
        
        // Single unified animation sequence with precise timing
        tl
          // First expand the core rapidly
          .to(flashCoreRef.current, {
            scale: 50, // Make it large enough to guarantee screen coverage
            duration: 0.25
          })
          // Bring in the full screen white overlay as core reaches max size
          .to(flashRef.current, {
            opacity: 1,
            duration: 0.15
          }, "-=0.1") // Slight overlap
          // Hold the white flash briefly
          .to(flashRef.current, {
            opacity: 1,
            duration: 0.2
          })
          // Fade everything out
          .to([flashRef.current, flashCoreRef.current], {
            opacity: 0,
            duration: 0.3
          });
      });
    }
    
    // Cleanup function
    return () => {
      if (animationRef.current) {
        animationRef.current.revert();
        animationRef.current = null;
      }
    };
  }, [isActive, onComplete]);

  return (
    <>
      {/* Full screen white overlay layer */}
      <div
        ref={flashRef}
        className="fixed inset-0 bg-white z-50 pointer-events-none opacity-0"
        aria-hidden="true"
      />
      {/* Center core flash element */}
      <div
        ref={flashCoreRef}
        className="fixed top-1/2 left-1/2 w-8 h-8 rounded-full bg-white z-50 pointer-events-none opacity-0"
        style={{ 
          boxShadow: "0 0 150px 100px rgba(255,255,255,0.9)",
        }}
        aria-hidden="true"
      />
    </>
  );
};

export default FlashTransition;