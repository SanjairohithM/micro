"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"

export default function About() {
    const sectionRef = useRef<HTMLElement>(null)
    const textRef = useRef<HTMLDivElement>(null)
    const imageRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger)

        // Safely get elements
        const textElements = textRef.current?.querySelectorAll(".animate-text")

        // Create scroll-triggered animations
        if (textElements && textElements.length > 0 && sectionRef.current) {
            gsap.from(textElements, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    end: "bottom 80%",
                    toggleActions: "play none none reverse",
                },
                y: 50,
                opacity: 0,
                stagger: 0.2,
                duration: 0.8,
                ease: "power3.out",
            })
        }

        if (imageRef.current && sectionRef.current) {
            gsap.from(imageRef.current, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    end: "bottom 80%",
                    toggleActions: "play none none reverse",
                },
                x: 100,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
            })
        }

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
        }
    }, [])

    return (
        <section ref={sectionRef} id="about" className="py-20 md:py-32 bg-gray-900 text-white">
            <div className="container mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div ref={textRef} className="space-y-6">
                        <h2 className="animate-text text-3xl md:text-4xl font-bold">About Micro products</h2>
                        <p className="animate-text text-lg text-gray-300">
                             An emergency push button is a critical safety device designed for immediate response in hazardous situations.
                        </p>
                        <p className="animate-text text-lg text-gray-300">
                            Common in industrial plants, elevators, and public facilities, it enhances workplace safety by providing a quick shutdown mechanism during emergencies. Some models include key reset or break-glass options for authorized use. Compliant with safety standards (ISO 13850, IEC 60947), emergency push buttons are vital for accident prevention and safeguarding lives.
                        </p>
                        <div className="animate-text pt-4">
                            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-full transition-colors">
                                Learn More
                            </button>
                        </div>
                    </div>

                    <div ref={imageRef} className="relative h-[400px] rounded-lg overflow-hidden">
                        <Image src="https://static.grainger.com/rp/s/is/image/Grainger/22KT55_AS01" alt="About Micro Groups" fill className="object-cover" />
                    </div>
                </div>
            </div>
        </section>
    )
}
