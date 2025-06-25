"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import PushButton from "./models/PushButton";
import ImageHoverButton from "./ImageHoverButton";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const ballRef = useRef<HTMLDivElement>(null);
  const textWrapperRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);

  const text = "Innovation In Motion";
  const letters = text.split("");
  const validPositions = letters
    .map((letter, index) => (letter.toLowerCase() === "o" ? index : null))
    .filter((pos) => pos !== null) as number[];

  const [activeIndex, setActiveIndex] = useState<number>(validPositions[0]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, TextPlugin);

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
      
      // Split text into individual characters for more control
      headingRef.current.innerHTML = headingText
        .split('')
        .map((char, index) => 
          char === ' ' ? '<span class="char-space">&nbsp;</span>' : 
          `<span class="char-3d" data-char="${char}" style="display: inline-block; transform-style: preserve-3d;">${char}</span>`
        )
        .join('');

      const charElements = headingRef.current.querySelectorAll('.char-3d') as NodeListOf<HTMLElement>;
      
      // Set initial 3D positions - scattered in 3D space
      gsap.set(charElements, {
        opacity: 0,
        scale: 0,
        x: () => gsap.utils.random(-200, 200),
        y: () => gsap.utils.random(-100, 100),
        z: () => gsap.utils.random(-500, 500),
        rotationX: () => gsap.utils.random(-180, 180),
        rotationY: () => gsap.utils.random(-180, 180),
        rotationZ: () => gsap.utils.random(-180, 180),
        transformOrigin: "center center",
      });

      // Create advanced 3D timeline
      const headingTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Stage 1: Letters fly in from 3D space with rotation
      headingTimeline.to(charElements, {
        opacity: 1,
        scale: 1,
        x: 0,
        y: 0,
        z: 0,
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
        duration: 2,
        ease: "power3.out",
        stagger: {
          amount: 1.5,
          from: "random",
          grid: "auto",
        },
      });

      // Stage 2: Add depth layers effect
      headingTimeline.to(charElements, {
        textShadow: "2px 2px 0px rgba(255,255,255,0.1), 4px 4px 0px rgba(255,255,255,0.05), 6px 6px 20px rgba(0,0,0,0.3)",
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.02,
      }, "-=0.5");

      // Stage 3: Subtle 3D hover effect on individual letters
      charElements.forEach((char) => {
        char.addEventListener('mouseenter', () => {
          gsap.to(char, {
            scale: 1.2,
            rotationY: 15,
            rotationX: -10,
            z: 50,
            color: "#60a5fa",
            textShadow: "0 0 20px rgba(96, 165, 250, 0.6), 2px 2px 0px rgba(255,255,255,0.2)",
            duration: 0.4,
            ease: "back.out(1.7)",
          });
        });

        char.addEventListener('mouseleave', () => {
          gsap.to(char, {
            scale: 1,
            rotationY: 0,
            rotationX: 0,
            z: 0,
            color: "#ffffff",
            textShadow: "2px 2px 0px rgba(255,255,255,0.1), 4px 4px 0px rgba(255,255,255,0.05), 6px 6px 20px rgba(0,0,0,0.3)",
            duration: 0.4,
            ease: "power2.out",
          });
        });
      });

      // Stage 4: Continuous 3D breathing animation
      gsap.to(headingRef.current, {
        rotationX: 2,
        rotationY: 1,
        duration: 4,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
        delay: 3,
      });

      // Stage 5: Subtle parallax effect on individual characters
      charElements.forEach((char, index) => {
        gsap.to(char, {
          y: `+=${Math.sin(index * 0.5) * 3}`,
          duration: 3 + (index * 0.1),
          ease: "power1.inOut",
          yoyo: true,
          repeat: -1,
          delay: 3 + (index * 0.05),
        });
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

    return () => {
      clearInterval(interval);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative h-screen w-full overflow-hidden flex items-center px-12"
    >
      {/* Background Image with Dark Overlay and Parallax */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div
          className="hero-bg absolute inset-0 w-full h-[120%] will-change-transform"
          style={{
            backgroundImage: "url('/image/halfworld.png')",
            backgroundSize: "cover",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
            transform: "translate3d(0, 0, 0)" // Enable hardware acceleration
          }}
        />
        <div className="absolute inset-0 bg-black/50 z-10"></div>
      </div>



      {/* Left Side - 3D Model */}
      <div className="w-1/2 h-full relative z-10 pt-20">
        <Canvas camera={{ position: [0, 0, 6], fov: 2 }}>
          <ambientLight intensity={0.1} />
          <directionalLight position={[100, 10, 5]} intensity={8} />
          <PushButton position={[0, 0, 0]} scale={[1.5, 1.5, 1.5]} />
          <Environment preset="sunset" />
          {/* <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={2}
          /> */}
        </Canvas>
      </div>

      {/* Right Side - Text */}
      <div className="w-1/2 pl-12 pt-50 relative z-10">
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

        {/* Replace button with ImageHoverButton */}
        <div className="mt-8">
          <ImageHoverButton />
        </div>
      </div>
    </section>
  );
}