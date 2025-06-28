"use client"

import { useRef, useEffect } from "react"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export default function About() {
    const sectionRef = useRef<HTMLElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const textRef = useRef<HTMLDivElement>(null)
    const imageRef = useRef<HTMLDivElement>(null)
    const headingRef = useRef<HTMLHeadingElement>(null)
    const paragraph1Ref = useRef<HTMLParagraphElement>(null)
    const paragraph2Ref = useRef<HTMLParagraphElement>(null)
    const buttonRef = useRef<HTMLButtonElement>(null)
    const particlesRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger)

        // Set initial states - everything hidden
        gsap.set(sectionRef.current, {
            opacity: 0,
            y: 100
        })

        gsap.set([headingRef.current, paragraph1Ref.current, paragraph2Ref.current, buttonRef.current], {
            opacity: 0,
            y: 80
        })

        gsap.set(imageRef.current, {
            opacity: 0,
            x: 100,
            rotationY: 45,
            scale: 0.8
        })

        // Main section fade in
        gsap.to(sectionRef.current, {
            opacity: 1,
            y: 0,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 90%",
                end: "top 20%",
                scrub: 1,
                toggleActions: "play none none reverse",
            }
        })

        // Heading animation with character split - delayed
        if (headingRef.current) {
            const text = headingRef.current.textContent || ""
            headingRef.current.innerHTML = text.split('').map((char, i) => 
                `<span class="char inline-block">${char === ' ' ? '&nbsp;' : char}</span>`
            ).join('')

            const chars = headingRef.current.querySelectorAll('.char')
            
            gsap.set(chars, {
                opacity: 0,
                y: 100,
                rotationX: -90,
                scale: 0.3
            })

            // Heading container fade in
            gsap.to(headingRef.current, {
                opacity: 1,
                y: 0,
                duration: 1.2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                    toggleActions: "play none none reverse",
                }
            })

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
                    trigger: sectionRef.current,
                    start: "top 70%",
                    toggleActions: "play none none reverse",
                }
            })
        }

        // First paragraph typewriter effect - more delayed
        if (paragraph1Ref.current) {
            const text = paragraph1Ref.current.textContent || ""
            paragraph1Ref.current.innerHTML = text.split('').map((char, i) => 
                `<span class="char-type inline-block">${char === ' ' ? '&nbsp;' : char}</span>`
            ).join('')

            const chars = paragraph1Ref.current.querySelectorAll('.char-type')
            
            gsap.set(chars, { opacity: 0 })

            gsap.to(paragraph1Ref.current, {
                opacity: 1,
                y: 0,
                duration: 1.0,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 60%",
                    toggleActions: "play none none reverse",
                }
            })

            gsap.to(chars, {
                opacity: 1,
                duration: 0.04,
                stagger: 0.02,
                ease: "none",
                delay: 0.5,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 55%",
                    toggleActions: "play none none reverse",
                }
            })
        }

        // Second paragraph wave effect - even more delayed
        if (paragraph2Ref.current) {
            const text = paragraph2Ref.current.textContent || ""
            paragraph2Ref.current.innerHTML = text.split(' ').map((word, i) => 
                `<span class="word-wave inline-block mr-1">${word}</span>`
            ).join(' ')

            const words = paragraph2Ref.current.querySelectorAll('.word-wave')
            
            gsap.set(words, {
                opacity: 0,
                y: 40,
                rotationY: 45
            })

            gsap.to(paragraph2Ref.current, {
                opacity: 1,
                y: 0,
                duration: 1.0,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 50%",
                    toggleActions: "play none none reverse",
                }
            })

            gsap.to(words, {
                opacity: 1,
                y: 0,
                rotationY: 0,
                duration: 0.8,
                ease: "back.out(1.7)",
                stagger: 0.06,
                delay: 0.8,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 45%",
                    toggleActions: "play none none reverse",
                }
            })
        }

        // Button animation - final element
        gsap.to(buttonRef.current, {
            opacity: 1,
            y: 0,
            duration: 1.0,
            ease: "back.out(1.7)",
            delay: 1.2,
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 40%",
                toggleActions: "play none none reverse",
            }
        })

        // Image holographic entrance - parallel with text
        gsap.to(imageRef.current, {
            opacity: 1,
            x: 0,
            rotationY: 0,
            scale: 1,
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 65%",
                toggleActions: "play none none reverse",
            }
        })

        // Continuous floating animation for image - starts after entrance
        gsap.to(imageRef.current, {
            y: -10,
            rotationY: 2,
            duration: 4,
            ease: "power1.inOut",
            yoyo: true,
            repeat: -1,
            delay: 2
        })

        // Particles animation - subtle entrance
        if (particlesRef.current) {
            const particles = particlesRef.current.querySelectorAll('.particle')
            
            particles.forEach((particle, i) => {
                gsap.set(particle, {
                    opacity: 0,
                    scale: 0
                })

                gsap.to(particle, {
                    opacity: 0.4,
                    scale: 1,
                    duration: 0.8,
                    delay: i * 0.15 + 1,
                    ease: "back.out(1.7)",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 70%",
                        toggleActions: "play none none reverse",
                    }
                })

                gsap.to(particle, {
                    y: -20,
                    rotation: 360,
                    duration: 6 + Math.random() * 3,
                    ease: "power1.inOut",
                    yoyo: true,
                    repeat: -1,
                    delay: Math.random() * 3 + 2
                })
            })
        }

        // Parallax effect for background elements
        gsap.to(".neural-bg", {
            yPercent: -20,
            ease: "none",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
            }
        })

        // Optional: Fade out hero section as about section fades in
        gsap.to("section:first-child", {
            opacity: 0.3,
            scale: 0.95,
            ease: "none",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
                end: "top 20%",
                scrub: 1,
            }
        })

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill())
        }
    }, [])

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

            <section 
                ref={sectionRef} 
                id="about" 
                className="fade-section relative py-28 md:py-36 bg-black text-white overflow-hidden"
            >
                {/* Background matching hero section */}
                <div className="absolute inset-0 z-0">
                    <div className="neural-bg absolute inset-0"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20"></div>
                </div>

                {/* Animated particles */}
                <div ref={particlesRef} className="absolute inset-0 pointer-events-none opacity-30">
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
                
                <div ref={containerRef} className="container mx-auto px-4 md:px-12 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div ref={textRef} className="space-y-8">
                            {/* GSAP Animated Heading */}
                            <h2 
                                ref={headingRef}
                                className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-300 leading-tight font-montserrat"
                                style={{ perspective: '1000px' }}
                            >
                                About Micro Products
                            </h2>
                            
                            {/* GSAP Typewriter Effect */}
                            <p 
                                ref={paragraph1Ref}
                                className="text-lg md:text-xl leading-relaxed text-gray-200 max-w-full break-words font-montserrat"
                            >
                                An emergency push button is a critical safety device designed for immediate response in hazardous situations.
                            </p>
                            
                            {/* GSAP Wave Effect */}
                            <p 
                                ref={paragraph2Ref}
                                className="text-lg md:text-xl leading-relaxed text-gray-300 max-w-full break-words font-montserrat"
                            >
                                Common in industrial plants, elevators, and public facilities, it enhances workplace safety by providing a quick shutdown mechanism during emergencies. Some models include key reset or break-glass options for authorized use. Compliant with safety standards (ISO 13850, IEC 60947), emergency push buttons are vital for accident prevention and safeguarding lives.
                            </p>
                            
                            <div className="pt-2">
                                {/* GSAP Animated Button */}
                                <button 
                                    ref={buttonRef}
                                    className="btn-morph bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold py-3 px-8 rounded-full hover:shadow-lg hover:shadow-blue-500/30 font-montserrat"
                                >
                                    <span className="relative z-10">Learn More</span>
                                </button>
                            </div>
                        </div>

                        {/* GSAP Holographic Image Container */}
                        <div 
                            ref={imageRef} 
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
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}