"use client"

import { useRef, useEffect } from "react"
import Image from "next/image"

export default function About() {
    const sectionRef = useRef<HTMLElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const textRef = useRef<HTMLDivElement>(null)
    const imageRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        // Type-safe element selections
        const heading = textRef.current?.querySelector("h2") as HTMLHeadingElement | null
        const paragraphs = textRef.current?.querySelectorAll("p") as NodeListOf<HTMLParagraphElement>
        const button = textRef.current?.querySelector("button") as HTMLButtonElement | null

        // Initialize heading animation - split into characters
        if (heading) {
            const text = heading.textContent || ""
            heading.innerHTML = text.split('').map((char, i) => 
                `<span class="char inline-block opacity-0" style="animation-delay: ${i * 50}ms">${char === ' ' ? '&nbsp;' : char}</span>`
            ).join('')
        }

        // Initialize first paragraph typewriter
        if (paragraphs && paragraphs[0]) {
            const text = paragraphs[0].textContent || ""
            paragraphs[0].innerHTML = text.split('').map((char, i) => 
                `<span class="char-typewriter opacity-0" style="animation-delay: ${i * 30 + 800}ms">${char === ' ' ? '&nbsp;' : char}</span>`
            ).join('')
        }

        // Initialize second paragraph wave effect
        if (paragraphs && paragraphs[1]) {
            const text = paragraphs[1].textContent || ""
            paragraphs[1].innerHTML = text.split(' ').map((word, i) => 
                `<span class="word-float inline-block opacity-0" style="animation-delay: ${i * 100 + 1500}ms">${word}</span>`
            ).join(' ')
        }

        // Intersection Observer for triggering animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate')
                }
            })
        }, { threshold: 0.1 })

        if (sectionRef.current) {
            observer.observe(sectionRef.current)
        }

        return () => observer.disconnect()
    }, [])

    return (
        <>
            <style jsx global>{`
                /* Magnetic Heading Animation */
                .animate .char {
                    animation: magneticReveal 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
                    transform: translateY(100px) rotateX(90deg);
                }

                .animate .heading-magnetic:hover .char {
                    animation: magneticHover 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
                }

                @keyframes magneticReveal {
                    0% {
                        transform: translateY(100px) rotateX(90deg) scale(0.5);
                        opacity: 0;
                        filter: blur(10px);
                    }
                    60% {
                        transform: translateY(-10px) rotateX(0deg) scale(1.1);
                        opacity: 0.8;
                        filter: blur(2px);
                    }
                    100% {
                        transform: translateY(0) rotateX(0deg) scale(1);
                        opacity: 1;
                        filter: blur(0px);
                    }
                }

                @keyframes magneticHover {
                    0% { transform: translateY(0) scale(1); }
                    50% { transform: translateY(-8px) scale(1.15); }
                    100% { transform: translateY(0) scale(1); }
                }

                /* Typewriter with Glitch */
                .animate .char-typewriter {
                    animation: typewriterGlitch 2s ease forwards;
                    display: inline;
                    white-space: pre;
                }

                .paragraph-typewriter {
                    overflow: hidden;
                    word-wrap: break-word;
                    hyphens: auto;
                }

                @keyframes typewriterGlitch {
                    0% { 
                        opacity: 0; 
                        transform: translateX(0);
                    }
                    10% { 
                        opacity: 1; 
                        transform: translateX(1px);
                        color: #ef4444;
                        text-shadow: 1px 0 #00ffff, -1px 0 #ff00ff;
                        filter: blur(0.5px);
                    }
                    20% { 
                        transform: translateX(0);
                        color: inherit;
                        text-shadow: none;
                        filter: blur(0);
                    }
                    100% { 
                        opacity: 1; 
                        transform: translateX(0);
                    }
                }

                /* Floating Wave Words */
                .animate .word-float {
                    animation: waveFloat 2.5s ease-in-out forwards;
                    transform: translateY(50px);
                }

                @keyframes waveFloat {
                    0% {
                        opacity: 0;
                        transform: translateY(50px) rotateY(90deg);
                    }
                    60% {
                        opacity: 1;
                        transform: translateY(-5px) rotateY(0deg);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0) rotateY(0deg);
                    }
                }

                /* Button Animations */
                .btn-morph {
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    position: relative;
                    overflow: hidden;
                }

                .btn-morph:hover {
                    transform: scale(1.05) rotateX(5deg);
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

                /* Image Holographic Effect */
                .animate .image-holographic {
                    animation: holographicEntrance 2s ease-out forwards;
                    opacity: 0;
                    transform: perspective(1000px) rotateY(45deg) scale(0.8);
                }

                .image-holographic {
                    animation: continuousRotate 20s linear infinite;
                    transform-style: preserve-3d;
                }

                .image-holographic img {
                    transition: transform 0.3s ease;
                }

                .image-holographic:hover img {
                    transform: scale(1.05) rotateZ(2deg);
                }

                @keyframes holographicEntrance {
                    0% {
                        opacity: 0;
                        transform: perspective(1000px) rotateY(45deg) scale(0.8);
                        filter: hue-rotate(0deg) brightness(1.5);
                    }
                    100% {
                        opacity: 1;
                        transform: perspective(1000px) rotateY(0deg) scale(1);
                        filter: hue-rotate(0deg) brightness(1);
                    }
                }

                @keyframes continuousRotate {
                    0% { 
                        transform: perspective(1000px) rotateY(0deg) rotateX(0deg);
                        filter: hue-rotate(0deg);
                    }
                    25% { 
                        transform: perspective(1000px) rotateY(2deg) rotateX(1deg);
                        filter: hue-rotate(90deg);
                    }
                    50% { 
                        transform: perspective(1000px) rotateY(0deg) rotateX(2deg);
                        filter: hue-rotate(180deg);
                    }
                    75% { 
                        transform: perspective(1000px) rotateY(-2deg) rotateX(1deg);
                        filter: hue-rotate(270deg);
                    }
                    100% { 
                        transform: perspective(1000px) rotateY(0deg) rotateX(0deg);
                        filter: hue-rotate(360deg);
                    }
                }

                .holographic-overlay {
                    background: 
                        linear-gradient(45deg, transparent 30%, rgba(6, 182, 212, 0.2) 50%, transparent 70%),
                        linear-gradient(-45deg, transparent 30%, rgba(168, 85, 247, 0.2) 50%, transparent 70%),
                        linear-gradient(0deg, transparent 40%, rgba(34, 197, 94, 0.1) 50%, transparent 60%);
                    animation: holographicShift 3s ease-in-out infinite;
                    pointer-events: none;
                    mix-blend-mode: screen;
                }

                @keyframes holographicShift {
                    0%, 100% { 
                        opacity: 0.4; 
                        transform: translateX(0) translateY(0) rotate(0deg);
                        background-position: 0% 0%, 100% 100%, 50% 50%;
                    }
                    33% { 
                        opacity: 0.8; 
                        transform: translateX(10px) translateY(-5px) rotate(1deg);
                        background-position: 100% 0%, 0% 100%, 0% 50%;
                    }
                    66% { 
                        opacity: 0.6; 
                        transform: translateX(-5px) translateY(10px) rotate(-1deg);
                        background-position: 0% 100%, 100% 0%, 100% 50%;
                    }
                }

                .scan-line {
                    animation: scanSweep 4s linear infinite;
                    box-shadow: 
                        0 0 20px rgba(6, 182, 212, 0.8),
                        0 0 40px rgba(6, 182, 212, 0.4),
                        0 0 80px rgba(6, 182, 212, 0.2);
                    background: linear-gradient(90deg, 
                        transparent 0%, 
                        rgba(6, 182, 212, 0.8) 50%, 
                        transparent 100%);
                }

                .scan-line::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 2px;
                    background: linear-gradient(90deg, 
                        transparent 0%, 
                        rgba(34, 197, 94, 0.9) 30%,
                        rgba(6, 182, 212, 1) 50%,
                        rgba(168, 85, 247, 0.9) 70%,
                        transparent 100%);
                    animation: laserPulse 2s ease-in-out infinite;
                }

                @keyframes laserPulse {
                    0%, 100% { opacity: 0.6; transform: scaleX(1); }
                    50% { opacity: 1; transform: scaleX(1.2); }
                }

                @keyframes scanSweep {
                    0% { 
                        top: -4px; 
                        opacity: 1;
                        filter: brightness(1.5);
                    }
                    85% { 
                        top: 100%; 
                        opacity: 1;
                        filter: brightness(1.2);
                    }
                    90% { 
                        top: 100%; 
                        opacity: 0.5;
                        filter: brightness(1);
                    }
                    100% { 
                        top: 100%; 
                        opacity: 0;
                        filter: brightness(0.8);
                    }
                }

                /* Background Effects */
                .neural-network {
                    background: radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
                               radial-gradient(circle at 80% 20%, rgba(168, 85, 247, 0.15) 0%, transparent 50%),
                               radial-gradient(circle at 40% 40%, rgba(6, 182, 212, 0.1) 0%, transparent 50%);
                    animation: neuralPulse 8s ease-in-out infinite;
                }

                @keyframes neuralPulse {
                    0%, 100% { opacity: 0.3; transform: scale(1); }
                    50% { opacity: 0.6; transform: scale(1.05); }
                }

                .particle {
                    width: 4px;
                    height: 4px;
                    background: linear-gradient(45deg, #3b82f6, #06b6d4);
                    border-radius: 50%;
                    animation: floatParticle 6s ease-in-out infinite;
                    opacity: 0.6;
                }

                @keyframes floatParticle {
                    0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.6; }
                    50% { transform: translateY(-20px) rotate(180deg); opacity: 1; }
                }

                /* Mobile Responsive */
                @media (max-width: 768px) {
                    .char, .char-typewriter, .word-float {
                        animation-duration: 1s;
                    }
                    
                    .particle {
                        width: 2px;
                        height: 2px;
                    }
                }
            `}</style>

            <section 
                ref={sectionRef} 
                id="about" 
                className="relative py-28 md:py-36 bg-gray-900 text-white overflow-hidden"
            >
                {/* Advanced Animated Background */}
                <div className="absolute inset-0 overflow-hidden opacity-20">
                    <div className="neural-network absolute inset-0"></div>
                    <div className="absolute inset-0 pointer-events-none">
                        {[...Array(20)].map((_, i) => (
                            <div 
                                key={i} 
                                className="particle absolute"
                                style={{
                                    animationDelay: `${i * 0.5}s`,
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`
                                }}
                            />
                        ))}
                    </div>
                </div>
                
                <div ref={containerRef} className="container mx-auto px-4 md:px-8 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div ref={textRef} className="space-y-8">
                            {/* Magnetic Hover Heading */}
                            <h2 className="heading-magnetic text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-300 leading-tight">
                                About Micro Products
                            </h2>
                            
                            {/* Typewriter with Glitch Effect */}
                            <p className="paragraph-typewriter text-lg md:text-xl leading-relaxed text-gray-200 max-w-full break-words">
                                An emergency push button is a critical safety device designed for immediate response in hazardous situations.
                            </p>
                            
                            {/* Floating Words with Wave Effect */}
                            <p className="paragraph-wave text-lg md:text-xl leading-relaxed text-gray-300 max-w-full break-words">
                                Common in industrial plants, elevators, and public facilities, it enhances workplace safety by providing a quick shutdown mechanism during emergencies. Some models include key reset or break-glass options for authorized use. Compliant with safety standards (ISO 13850, IEC 60947), emergency push buttons are vital for accident prevention and safeguarding lives.
                            </p>
                            
                            <div className="pt-2">
                                {/* Morphing Button */}
                                <button className="btn-morph bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold py-3 px-8 rounded-full hover:shadow-lg hover:shadow-blue-500/30">
                                    <span className="relative z-10">Learn More</span>
                                </button>
                            </div>
                        </div>

                        {/* Holographic Image Container */}
                        <div ref={imageRef} className="image-holographic relative h-[450px] rounded-xl overflow-hidden border-2 border-white/10 shadow-2xl">
                            <Image 
                                src="https://static.grainger.com/rp/s/is/image/Grainger/22KT55_AS01" 
                                alt="Emergency Push Button" 
                                fill 
                                className="object-cover object-center"
                                sizes="(max-width: 768px) 100vw, 50vw"
                                priority
                            />
                            <div className="holographic-overlay absolute inset-0"></div>
                            <div className="scan-line absolute w-full h-1 bg-cyan-400 -top-0.5"></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-gray-900/20 pointer-events-none"></div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}