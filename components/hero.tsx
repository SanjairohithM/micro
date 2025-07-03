"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import { useGSAP } from "@gsap/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import PushButton from "./models/PushButton";
import ImageHoverButton from "./ImageHoverButton";
import Earth from "./models/Earth";
import Image from "next/image";

// Enhanced product data with product types for 3D generation
const products = [
  {
    id: 1,
    image: "https://static.grainger.com/rp/s/is/image/Grainger/22KT55_AS01",
    alt: "Power Drill",
    name: "Premium Power Drill",
    description: "High-performance power drill with adjustable speed settings",
    type: "drill",
    color: "#e63946",
  },
  {
    id: 2,
    image: "https://img.freepik.com/premium-photo/electrical-engineer-checking-operation-electrical-control-cabinet-maintenance-concept_539854-3143.jpg?w=1380",
    alt: "Wrench",
    name: "Heavy Duty Wrench",
    description: "Professional-grade adjustable wrench for tough jobs",
    type: "wrench",
    color: "#457b9d",
  },
  {
    id: 3,
    image: "https://img.freepik.com/premium-photo/abstract-cyberpunk-gaming-wallpaper-background[…]endering-metaverse-virtual-reality-game_42100-4780.jpg?w=1380",
    alt: "Screwdriver",
    name: "Precision Screwdriver",
    description: "Fine-tip screwdriver for detailed electronic work",
    type: "screwdriver",
    color: "#2a9d8f",
  },
  {
    id: 4,
    image: "https://static.grainger.com/rp/s/is/image/Grainger/39P790_AS01",
    alt: "Hammer",
    name: "Industrial Hammer",
    description: "Balanced hammer with shock-absorbing grip",
    type: "hammer",
    color: "#f4a261",
  },
  {
    id: 5,
    image: "https://cdn.pixabay.com/photo/2013/07/13/13/46/button-161502_1280.png",
    alt: "Saw",
    name: "Cordless Saw",
    description: "Battery-powered saw with precision cutting guide",
    type: "saw",
    color: "#e76f51",
  },
  {
    id: 6,
    image: "https://au.element14.com/productimages/large/en_US/62M5339-40.jpg",
    alt: "Measuring Tape",
    name: "Measuring Tape",
    description: "Retractable measuring tape with metric and imperial units",
    type: "tape",
    color: "#ffb703",
  },
  {
    id: 7,
    image: "https://static.grainger.com/rp/s/is/image/Grainger/22KT55_AS01",
    alt: "Safety Goggles",
    name: "Safety Goggles",
    description: "Impact-resistant safety goggles with anti-fog coating",
    type: "goggles",
    color: "#8ecae6",
  },
  {
    id: 8,
    image: "https://static.grainger.com/rp/s/is/image/Grainger/22KT55_AS01",
    alt: "Barrel Pilot Lamp",
    name: "Industrial Pilot Lamp",
    description: "High-visibility indicator lamp for control panels",
    type: "lamp",
    color: "#ff5722",
  },
];

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const ballRef = useRef<HTMLDivElement>(null);
  const textWrapperRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const pushButtonRef = useRef<HTMLDivElement>(null);

  // About section refs
  const aboutSectionRef = useRef<HTMLDivElement>(null);
  const aboutContainerRef = useRef<HTMLDivElement>(null);
  const aboutTextRef = useRef<HTMLDivElement>(null);
  const aboutImageRef = useRef<HTMLDivElement>(null);
  const aboutHeadingRef = useRef<HTMLHeadingElement>(null);
  const aboutParagraph1Ref = useRef<HTMLParagraphElement>(null);
  const aboutParagraph2Ref = useRef<HTMLParagraphElement>(null);
  const aboutButtonRef = useRef<HTMLButtonElement>(null);
  const aboutParticlesRef = useRef<HTMLDivElement>(null);

  // Services section refs
  const carouselRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const servicesSectionRef = useRef<HTMLDivElement>(null);
  const [carouselActiveIndex, setCarouselActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [visibleItems, setVisibleItems] = useState(4);
  const [itemWidth, setItemWidth] = useState(300);
  const [itemGap, setItemGap] = useState(20);

  const text = "Innovation In Motion";
  const letters = text.split("");
  const validPositions = letters
    .map((letter, index) => (letter.toLowerCase() === "o" ? index : null))
    .filter((pos) => pos !== null) as number[];

  const [activeIndex, setActiveIndex] = useState<number>(validPositions[0]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, TextPlugin);

    // Hero section animations
    const moveBallToLetter = (index: number) => {
      const letterEl = letterRefs.current[index];
      const ballEl = ballRef.current;
      const wrapperEl = textWrapperRef.current;

      if (letterEl && ballEl && wrapperEl) {
        const letterBox = letterEl.getBoundingClientRect();
        const wrapperBox = wrapperEl.getBoundingClientRect();

        const x = letterBox.left - wrapperBox.left + letterBox.width / 2 - 20;
        const y = letterBox.top - wrapperBox.top + letterBox.height / 2 - 20;

        gsap.to(ballEl, {
          x,
          y,
          duration: 0.6,
          ease: "power2.out",
        });
      }
    };

    const interval = setInterval(() => {
      const newIndex =
        validPositions[Math.floor(Math.random() * validPositions.length)];
      setActiveIndex(newIndex);
      moveBallToLetter(newIndex);
    }, 1500);

    // Initial ball position
    moveBallToLetter(activeIndex);

    // Advanced Logo Animation
    if (logoRef.current) {
      gsap.fromTo(logoRef.current, 
        {
          opacity: 0,
          scale: 0.8,
          rotation: -10,
          y: -30
        },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          y: 0,
          duration: 1.5,
          ease: "elastic.out(1, 0.8)",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    // Advanced Heading Animation - 3D Text Effect
    if (headingRef.current) {
      const headingText = headingRef.current.textContent || '';
      
      // Split text into individual characters for better control
      headingRef.current.innerHTML = headingText
        .split('')
        .map((char, index) => 
          char === ' ' ? '<span class="char-space">&nbsp;</span>' : 
          `<span class="char-3d" style="display: inline-block; transform-style: preserve-3d;">${char}</span>`
        )
        .join('');

      const charElements = headingRef.current.querySelectorAll('.char-3d') as NodeListOf<HTMLElement>;
      
      // Set initial state for characters - simple and reliable
      gsap.set(charElements, {
        opacity: 0,
        y: 100,
        rotationX: -90,
        scale: 0.3,
        transformOrigin: "center bottom",
      });

      // Create character animation timeline
      const headingTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Animate characters one by one - slower timing
      charElements.forEach((char, index) => {
        headingTimeline.to(char, {
          opacity: 1,
          y: 0,
          rotationX: 0,
          scale: 1,
          duration: 1.2, // Slower duration
          ease: "back.out(1.7)",
        }, index * 0.12); // Much slower stagger
      });

      // Add text shadow for depth - slower
      headingTimeline.to(charElements, {
        textShadow: "2px 2px 0px rgba(255,255,255,0.1), 4px 4px 0px rgba(255,255,255,0.05), 6px 6px 20px rgba(0,0,0,0.3)",
        duration: 1.0, // Slower shadow application
        stagger: 0.05, // Slower stagger for shadows
      }, "-=1.0");

      // Individual character hover effects
      charElements.forEach((char) => {
        char.addEventListener('mouseenter', () => {
          gsap.to(char, {
            scale: 1.2,
            rotationY: 15,
            y: -10,
            color: "#60a5fa",
            textShadow: "0 0 20px rgba(96, 165, 250, 0.6), 2px 2px 0px rgba(255,255,255,0.2)",
            duration: 0.5, // Slower hover animation
            ease: "back.out(1.7)",
          });
        });

        char.addEventListener('mouseleave', () => {
          gsap.to(char, {
            scale: 1,
            rotationY: 0,
            y: 0,
            color: "#ffffff",
            textShadow: "2px 2px 0px rgba(255,255,255,0.1), 4px 4px 0px rgba(255,255,255,0.05), 6px 6px 20px rgba(0,0,0,0.3)",
            duration: 0.5, // Slower hover out animation
            ease: "power2.out",
          });
        });
      });

      // Very slow continuous breathing animation
      gsap.to(headingRef.current, {
        rotationX: 1,
        duration: 6, // Much slower breathing (was 4, now 6)
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
        delay: 4, // Longer delay before breathing starts
      });
    }

    // Advanced Description Animation - Character by character reveal
    if (descriptionRef.current) {
      const descriptionText = descriptionRef.current.textContent || '';
      descriptionRef.current.innerHTML = descriptionText
        .split('')
        .map((char, index) => 
          char === ' ' ? ' ' : `<span class="char-span" style="display: inline-block;">${char}</span>`
        )
        .join('');

      const charSpans = descriptionRef.current.querySelectorAll('.char-span');

      gsap.fromTo(charSpans,
        {
          opacity: 0,
          y: 50,
          rotationY: 90,
          scale: 0.8
        },
        {
          opacity: 1,
          y: 0,
          rotationY: 0,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
          stagger: 0.02,
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Add glow effect on hover
      descriptionRef.current.addEventListener('mouseenter', () => {
        gsap.to(charSpans, {
          textShadow: "0 0 10px rgba(255,255,255,0.8)",
          duration: 0.3,
          stagger: 0.01
        });
      });

      descriptionRef.current.addEventListener('mouseleave', () => {
        gsap.to(charSpans, {
          textShadow: "0 0 0px rgba(255,255,255,0)",
          duration: 0.3,
          stagger: 0.01
        });
      });
    }

    // Enhanced Innovation text animation
    gsap.fromTo(textWrapperRef.current,
      {
        x: -100,
        opacity: 0,
        scale: 0.9,
        rotationY: 45
      },
      {
        x: 0,
        opacity: 1,
        scale: 1,
        rotationY: 0,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Parallax effect for background
    const bgElement = document.querySelector(".hero-bg") as HTMLElement;
    if (bgElement) {
      gsap.to(bgElement, {
        yPercent: -30,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
          invalidateOnRefresh: true
        }
      });
    }

    // Push Button scroll animation - move from hero to about to services
    if (pushButtonRef.current) {
            // Create timeline for smooth multi-stage animation
      const buttonTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "90% top", // Stop animation at 90% of the screen
          scrub: 1,
          invalidateOnRefresh: true
        }
      });

      // Stage 1: Move to about section right side
      buttonTimeline.to(pushButtonRef.current, {
        x: "60vw",
        y: "100vh",
        scale: 1,
        rotation: 0,
        duration: 0.5,
        ease: "power2.out"
      });

      // Stage 2: Move to services section - more to the right
      buttonTimeline.to(pushButtonRef.current, {
        x: "2vw", // Much more to the right near "View All Products" text
        y: "235vh", // Position at the bottom of services section near "View All Products"
        scale: 0.45, // Increased scale for more prominent appearance in services section
        rotation: 0,
        duration: 0.8, // Slower transition
        ease: "power1.inOut" // Smoother easing
      });
    }

    // About section animations
    // Set initial states - everything hidden
    gsap.set(aboutSectionRef.current, {
      opacity: 0,
      y: 100
    });

    gsap.set([aboutHeadingRef.current, aboutParagraph1Ref.current, aboutParagraph2Ref.current, aboutButtonRef.current], {
      opacity: 0,
      y: 80
    });

    gsap.set(aboutImageRef.current, {
      opacity: 0,
      x: 100,
      rotationY: 45,
      scale: 0.8
    });

    // Main section fade in
    gsap.to(aboutSectionRef.current, {
      opacity: 1,
      y: 0,
      duration: 1.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: aboutSectionRef.current,
        start: "top 90%",
        end: "top 20%",
        scrub: 1,
        toggleActions: "play none none reverse",
      }
    });

    // Heading animation with character split - delayed
    if (aboutHeadingRef.current) {
      const text = aboutHeadingRef.current.textContent || "";
      aboutHeadingRef.current.innerHTML = text.split('').map((char, i) => 
        `<span class="char inline-block">${char === ' ' ? '&nbsp;' : char}</span>`
      ).join('');

      const chars = aboutHeadingRef.current.querySelectorAll('.char');
      
      gsap.set(chars, {
        opacity: 0,
        y: 100,
        rotationX: -90,
        scale: 0.3
      });

      // Heading container fade in
      gsap.to(aboutHeadingRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: aboutSectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        }
      });

      // Individual character animations
      gsap.to(chars, {
        opacity: 1,
        y: 0,
        rotationX: 0,
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.7)",
        stagger: 0.08,
        delay: 0.3,
        scrollTrigger: {
          trigger: aboutSectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        }
      });
    }

    // First paragraph typewriter effect - more delayed
    if (aboutParagraph1Ref.current) {
      const text = aboutParagraph1Ref.current.textContent || "";
      aboutParagraph1Ref.current.innerHTML = text.split('').map((char, i) => 
        `<span class="char-type inline-block">${char === ' ' ? '&nbsp;' : char}</span>`
      ).join('');

      const chars = aboutParagraph1Ref.current.querySelectorAll('.char-type');
      
      gsap.set(chars, { opacity: 0 });

      gsap.to(aboutParagraph1Ref.current, {
        opacity: 1,
        y: 0,
        duration: 1.0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: aboutSectionRef.current,
          start: "top 60%",
          toggleActions: "play none none reverse",
        }
      });

      gsap.to(chars, {
        opacity: 1,
        duration: 0.04,
        stagger: 0.02,
        ease: "none",
        delay: 0.5,
        scrollTrigger: {
          trigger: aboutSectionRef.current,
          start: "top 55%",
          toggleActions: "play none none reverse",
        }
      });
    }

    // Second paragraph wave effect - even more delayed
    if (aboutParagraph2Ref.current) {
      const text = aboutParagraph2Ref.current.textContent || "";
      aboutParagraph2Ref.current.innerHTML = text.split(' ').map((word, i) => 
        `<span class="word-wave inline-block mr-1">${word}</span>`
      ).join(' ');

      const words = aboutParagraph2Ref.current.querySelectorAll('.word-wave');
      
      gsap.set(words, {
        opacity: 0,
        y: 40,
        rotationY: 45
      });

      gsap.to(aboutParagraph2Ref.current, {
        opacity: 1,
        y: 0,
        duration: 1.0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: aboutSectionRef.current,
          start: "top 50%",
          toggleActions: "play none none reverse",
        }
      });

      gsap.to(words, {
        opacity: 1,
        y: 0,
        rotationY: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
        stagger: 0.06,
        delay: 0.8,
        scrollTrigger: {
          trigger: aboutSectionRef.current,
          start: "top 45%",
          toggleActions: "play none none reverse",
        }
      });
    }

    // Button animation - final element
    gsap.to(aboutButtonRef.current, {
      opacity: 1,
      y: 0,
      duration: 1.0,
      ease: "back.out(1.7)",
      delay: 1.2,
      scrollTrigger: {
        trigger: aboutSectionRef.current,
        start: "top 40%",
        toggleActions: "play none none reverse",
      }
    });

    // Image holographic entrance - parallel with text
    gsap.to(aboutImageRef.current, {
      opacity: 1,
      x: 0,
      rotationY: 0,
      scale: 1,
      duration: 1.5,
      ease: "power3.out",
      scrollTrigger: {
        trigger: aboutSectionRef.current,
        start: "top 65%",
        toggleActions: "play none none reverse",
      }
    });

    // Continuous floating animation for image - starts after entrance
    gsap.to(aboutImageRef.current, {
      y: -10,
      rotationY: 2,
      duration: 4,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1,
      delay: 2
    });

    // Particles animation - subtle entrance
    if (aboutParticlesRef.current) {
      const particles = aboutParticlesRef.current.querySelectorAll('.particle');
      
      particles.forEach((particle, i) => {
        gsap.set(particle, {
          opacity: 0,
          scale: 0
        });

        gsap.to(particle, {
          opacity: 0.4,
          scale: 1,
          duration: 0.8,
          delay: i * 0.15 + 1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: aboutSectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          }
        });

        gsap.to(particle, {
          y: -20,
          rotation: 360,
          duration: 6 + Math.random() * 3,
          ease: "power1.inOut",
          yoyo: true,
          repeat: -1,
          delay: Math.random() * 3 + 2
        });
      });
    }

    // Parallax effect for background elements
    gsap.to(".neural-bg", {
      yPercent: -20,
      ease: "none",
      scrollTrigger: {
        trigger: aboutSectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      }
    });

    return () => {
      clearInterval(interval);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Services section dimension calculation
  useEffect(() => {
    const calculateDimensions = () => {
      const width = window.innerWidth

      if (width < 640) {
        setVisibleItems(1)
        setItemWidth(280)
        setItemGap(16)
      } else if (width < 768) {
        setVisibleItems(2)
        setItemWidth(280)
        setItemGap(20)
      } else if (width < 1024) {
        setVisibleItems(3)
        setItemWidth(280)
        setItemGap(24)
      } else {
        setVisibleItems(4)
        setItemWidth(300)
        setItemGap(30)
      }
    }

    calculateDimensions()
    window.addEventListener("resize", calculateDimensions)

    return () => {
      window.removeEventListener("resize", calculateDimensions)
    }
  }, [])

  // Services carousel animation
  useGSAP(() => {
    if (!trackRef.current || !servicesSectionRef.current) return

    const productItems = gsap.utils.toArray(".product-item") as HTMLElement[]

    // Set initial state - all items stacked on the right
    gsap.set(productItems, {
      x: (i) => (i < visibleItems ? window.innerWidth : 0),
      opacity: (i) => (i < visibleItems ? 0 : 1),
      rotation: (i) => (i < visibleItems ? 10 : 0),
    })

    // Create ScrollTrigger animations
    productItems.forEach((item, index) => {
      if (index >= visibleItems) return // Only animate initially hidden items

      gsap.to(item, {
        x: 0,
        opacity: 1,
        rotation: 0,
        duration: 0.8,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: servicesSectionRef.current,
          start: "top 80%",
          end: "top 50%",
          scrub: 1,
          toggleActions: "play none none none",
          markers: false,
          invalidateOnRefresh: true
        },
        delay: index * 0.1,
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, { dependencies: [visibleItems, itemWidth, itemGap], scope: servicesSectionRef })

  // Update carousel position when carouselActiveIndex changes
  useEffect(() => {
    if (!trackRef.current) return

    const moveToActive = () => {
      setIsAnimating(true)

      gsap.to(trackRef.current, {
        x: -carouselActiveIndex * (itemWidth + itemGap),
        duration: 0.8,
        ease: "power2.out",
        onComplete: () => setIsAnimating(false),
      })
    }

    moveToActive()
  }, [carouselActiveIndex, itemWidth, itemGap])

  // Navigation functions
  const goToPrev = () => {
    if (isAnimating) return
    setCarouselActiveIndex((prev) => Math.max(0, prev - 1))
  }

  const goToNext = () => {
    if (isAnimating) return
    setCarouselActiveIndex((prev) => Math.min(products.length - visibleItems, prev + 1))
  }

  return (
    <>
      <style jsx global>{`
        /* Enhanced Button Hover Effects */
        .btn-morph {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .btn-morph:hover {
          transform: scale(1.05) translateY(-2px);
          box-shadow: 0 20px 40px rgba(59, 130, 246, 0.4);
        }

        .btn-morph::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(45deg, #06b6d4, #3b82f6, #a855f7);
          opacity: 0;
          transition: opacity 0.4s ease;
          border-radius: inherit;
        }

        .btn-morph:hover::before {
          opacity: 1;
          animation: liquidFlow 1.5s ease-in-out infinite;
        }

        @keyframes liquidFlow {
          0%, 100% { transform: translateX(-100%) skewX(0deg); }
          50% { transform: translateX(100%) skewX(-10deg); }
        }

        /* Image Effects */
        .holographic-overlay {
          background: 
            linear-gradient(45deg, transparent 30%, rgba(6, 182, 212, 0.1) 50%, transparent 70%),
            linear-gradient(-45deg, transparent 30%, rgba(168, 85, 247, 0.1) 50%, transparent 70%);
          animation: holographicShift 4s ease-in-out infinite;
          pointer-events: none;
          mix-blend-mode: screen;
        }

        @keyframes holographicShift {
          0%, 100% { 
            opacity: 0.3; 
            transform: translateX(0) translateY(0);
          }
          50% { 
            opacity: 0.6; 
            transform: translateX(5px) translateY(-2px);
          }
        }

        .scan-line {
          animation: scanSweep 6s linear infinite;
          box-shadow: 0 0 20px rgba(6, 182, 212, 0.6);
          background: linear-gradient(90deg, 
            transparent 0%, 
            rgba(6, 182, 212, 0.8) 50%, 
            transparent 100%);
        }

        @keyframes scanSweep {
          0% { top: -4px; opacity: 1; }
          90% { top: 100%; opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }

        /* Background Effects */
        .neural-bg {
          background: radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                     radial-gradient(circle at 80% 20%, rgba(168, 85, 247, 0.1) 0%, transparent 50%);
        }

        .particle {
          width: 4px;
          height: 4px;
          background: linear-gradient(45deg, #3b82f6, #06b6d4);
          border-radius: 50%;
          opacity: 0.6;
        }

        /* Smooth fade transitions */
        .fade-section {
          will-change: transform, opacity;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .particle {
            width: 2px;
            height: 2px;
          }
        }
      `}</style>

            {/* Combined Hero, About and Services Section */}
      <section
        ref={heroRef}
        className="relative min-h-[300vh] w-full overflow-hidden bg-black"
      >
        {/* Earth Model Background - Extended */}
        <div className="absolute inset-0 z-0">
          <Canvas 
            camera={{ position: [0, 0, 8], fov: 60 }}
            style={{ width: '100%', height: '300vh' }}
            gl={{ antialias: true, alpha: true }}
          >
            <color attach="background" args={['#000011']} />
            <fog attach="fog" args={['#000011', 8, 20]} />
            <ambientLight intensity={0.3} />
            <directionalLight position={[10, 10, 8]} intensity={2} color="#ffffff" />
            <pointLight position={[0, 0, 12]} intensity={1} color="#4a90e2" />
            <Earth position={[2, 0, 0]} scale={[6, 6, 6]} />
            <Environment preset="night" />
          </Canvas>
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 z-10"></div>
        </div>

        {/* Hero Content Area */}
        <div className="relative h-screen w-full flex items-center px-12">
          {/* Left Side - 3D Model */}
          <div ref={pushButtonRef} className="w-1/2 h-full relative z-50 pt-20">
            <Canvas camera={{ position: [0, 0, 6], fov: 2 }}>
              <ambientLight intensity={0.1} />
              <directionalLight position={[100, 10, 5]} intensity={8} />
              <PushButton position={[0, 0, 0]} scale={[3.5, 3.5, 3.5]} />
              <Environment preset="city" />
            </Canvas>
          </div>

          {/* Right Side - Text */}
          <div className="w-1/2 pl-12 relative z-10">
            <h1 
              ref={headingRef}
              className="hero-heading text-5xl font-bold text-white mb-6 perspective-1000 font-montserrat"
              style={{ 
                perspective: '1000px',
                transformStyle: 'preserve-3d'
              }}
            >
              Premium Industrial Switches & Components
            </h1>
            <br />

            <p 
              ref={descriptionRef}
              className="hero-description text-xl text-gray-300 mb-10 max-w-lg leading-relaxed cursor-pointer font-montserrat"
            >
              Reliable. Certified. Engineered for Excellence.
              From push buttons to custom automation solutions – ISO 9001:2015 certified manufacturing trusted across power, mechanical, and traffic industries
            </p>

            {/* Animated Text with Ball */}
            <div
              ref={textWrapperRef}
              className="relative inline-block text-6xl font-bold tracking-wide text-white mb-12"
              style={{ perspective: '1000px' }}
            >
              {/* Ball that replaces the letter */}
              <div
                ref={ballRef}
                className="absolute w-10 h-10 z-10 pointer-events-none flex items-center justify-center"
                style={{
                  transform: "translate(0, 0)",
                  willChange: "transform",
                  filter: "drop-shadow(0 0 10px rgba(255,255,255,0.6)) drop-shadow(0 0 20px rgba(78, 205, 196, 0.4))"
                }}
              >
                <img 
                  src="https://cdn.pixabay.com/photo/2013/07/13/13/46/button-161502_1280.png"
                  alt="Push Button"
                  className="w-full h-full object-contain "
                  style={{
                    filter: "brightness(1.2) contrast(1.1)"
                  }}
                />
              </div>

              {/* Text Letters */}
              {letters.map((letter, index) => (
                <span
                  key={index}
                  ref={(el) => { 
                    letterRefs.current[index] = el;
                  }}              
                  className={`inline-block mx-0.5 transition-all duration-300 font-montserrat ${
                    index === activeIndex ? "opacity-0" : "opacity-100"
                  }`}
                  style={{
                    textShadow: "0 0 10px rgba(255,255,255,0.3)"
                  }}
                >
                  {letter === " " ? "\u00A0" : letter}
                </span>
              ))}
            </div>
          </div>

          {/* ImageHoverButton - Centered at bottom of hero section */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
            <ImageHoverButton />
          </div>
        </div>

        {/* About Content Area */}
        <div 
          ref={aboutSectionRef} 
          id="about" 
          className="fade-section relative py-28 md:py-36 text-white"
        >
          {/* Background matching hero section */}
          <div className="absolute inset-0 z-0">
            <div className="neural-bg absolute inset-0"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20"></div>
          </div>

          {/* Animated particles */}
          <div ref={aboutParticlesRef} className="absolute inset-0 pointer-events-none opacity-30">
            {[...Array(12)].map((_, i) => (
              <div 
                key={i} 
                className="particle absolute"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`
                }}
              />
            ))}
          </div>
          
          <div ref={aboutContainerRef} className="container mx-auto px-4 md:px-12 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div ref={aboutTextRef} className="space-y-8">
                {/* GSAP Animated Heading */}
                <h2 
                  ref={aboutHeadingRef}
                  className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-300 leading-tight font-montserrat"
                  style={{ perspective: '1000px' }}
                >
                  About Micro Products
                </h2>
                
                {/* GSAP Typewriter Effect */}
                <p 
                  ref={aboutParagraph1Ref}
                  className="text-lg md:text-xl leading-relaxed text-gray-200 max-w-full break-words font-montserrat"
                >
                  An emergency push button is a critical safety device designed for immediate response in hazardous situations.
                </p>
                
                {/* GSAP Wave Effect */}
                <p 
                  ref={aboutParagraph2Ref}
                  className="text-lg md:text-xl leading-relaxed text-gray-300 max-w-full break-words font-montserrat"
                >
                  Common in industrial plants, elevators, and public facilities, it enhances workplace safety by providing a quick shutdown mechanism during emergencies. Some models include key reset or break-glass options for authorized use. Compliant with safety standards (ISO 13850, IEC 60947), emergency push buttons are vital for accident prevention and safeguarding lives.
                </p>
                
                <div className="pt-2">
                  {/* GSAP Animated Button */}
                  <button 
                    ref={aboutButtonRef}
                    className="btn-morph bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold py-3 px-8 rounded-full hover:shadow-lg hover:shadow-blue-500/30 font-montserrat"
                  >
                    <span className="relative z-10">Learn More</span>
                  </button>
                </div>
              </div>

              {/* GSAP Holographic Image Container */}
              {/* <div 
                ref={aboutImageRef} 
                className="relative h-[450px] rounded-xl overflow-hidden border-2 border-white/10 shadow-2xl"
                style={{ perspective: '1000px' }}
              >
                <Image 
                  src="https://static.grainger.com/rp/s/is/image/Grainger/22KT55_AS01" 
                  alt="Emergency Push Button" 
                  fill 
                  className="object-cover object-center transition-transform duration-300 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
                <div className="holographic-overlay absolute inset-0"></div>
                <div className="scan-line absolute w-full h-1 bg-cyan-400 -top-0.5"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none"></div>
              </div> */}
            </div>
          </div>
        </div>

        {/* Services Section */}
        <section
          ref={servicesSectionRef}
          className="py-20 text-white relative z-10 services-section"
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2
                className="text-5xl font-bold font-montserrat mb-4"
              >
                FEATURED PRODUCTS
              </h2>
              <p className="text-gray-300 text-xl mx-auto font-montserrat">
                Explore our premium selection of high-quality products. Click on any product to view in 3D.
              </p>
            </div>

            <div className="relative mt-36">
              {/* Carousel container */}
              <div
                ref={carouselRef}
                className="relative overflow-hidden mx-auto"
                style={{
                  maxWidth: `${(itemWidth + itemGap) * visibleItems - itemGap}px`,
                }}
              >
                {/* Carousel track */}
                <div
                  ref={trackRef}
                  className="flex transition-transform"
                  style={{
                    gap: `${itemGap}px`,
                  }}
                >
                  {products.map((product, index) => (
                    <Link
                      key={`product-${index}`}
                      href={`/product/${product.id}`}
                      className="product-item flex-shrink-0 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 relative group"
                      style={{
                        width: `${itemWidth}px`,
                        height: `${itemWidth}px`,
                        boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                        border: "1px solid rgba(255,255,255,0.1)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-10px)"
                        e.currentTarget.style.boxShadow = "0 20px 40px rgba(59, 130, 246, 0.4)"
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)"
                        e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.5)"
                      }}
                    >
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.alt}
                        className="w-full h-full object-cover transition-transform duration-700"
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "scale(1.1)"
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "scale(1)"
                        }}
                      />

                      {/* View in 3D overlay */}
                      <div className="absolute inset-0 bg-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center p-4 text-center">
                        <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                        <p className="text-sm mb-4">{product.description}</p>
                        <span className="px-4 py-2 bg-blue-600 rounded-full text-sm font-medium">View Product in 3D</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Navigation buttons */}
              <button
                onClick={goToPrev}
                disabled={carouselActiveIndex === 0}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 p-4 rounded-full z-10 transition-all duration-300 hover:bg-blue-700"
                style={{
                  background: "rgba(37, 99, 235, 0.8)",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                  opacity: carouselActiveIndex === 0 ? 0.5 : 1,
                  cursor: carouselActiveIndex === 0 ? "not-allowed" : "pointer",
                }}
              >
                <ChevronLeft size={24} />
              </button>

              <button
                onClick={goToNext}
                disabled={carouselActiveIndex >= products.length - visibleItems}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 p-4 rounded-full z-10 transition-all duration-300 hover:bg-blue-700"
                style={{
                  background: "rgba(37, 99, 235, 0.8)",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                  opacity: carouselActiveIndex >= products.length - visibleItems ? 0.5 : 1,
                  cursor: carouselActiveIndex >= products.length - visibleItems ? "not-allowed" : "pointer",
                }}
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Pagination dots */}
            <div className="flex justify-center mt-8 gap-2">
              {Array.from({ length: products.length - visibleItems + 1 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (!isAnimating) {
                      setCarouselActiveIndex(index)
                    }
                  }}
                  className="w-2 h-2 rounded-full transition-all"
                  style={{
                    background: index === carouselActiveIndex ? "#3b82f6" : "#6b7280",
                    width: index === carouselActiveIndex ? "2rem" : "0.5rem",
                  }}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <h2
                className="text-5xl font-bold font-montserrat mb-4 text-center mt-12"
              >
                View All Products
              </h2>
          </div>
        </section>
      </section>
    </>
  );
}

// Export products for use in other components
export { products };