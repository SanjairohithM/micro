"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import gsap from "gsap"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Animate navbar on load
    gsap.from(".nav-item", {
      y: -20,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: "power2.out",
      delay: 0.5,
    })

    // Handle mobile menu animations
    if (isOpen) {
      gsap.to(".mobile-menu", {
        x: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power3.out",
      })

      gsap.from(".mobile-nav-item", {
        x: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.4,
        delay: 0.2,
      })
    } else {
      gsap.to(".mobile-menu", {
        x: "100%",
        opacity: 0,
        duration: 0.5,
        ease: "power3.in",
      })
    }
  }, [isOpen])

  return (
    <nav className="fixed top-5 left-5 w-full z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo - Absolutely positioned at top-left edge */}
        <Link href="/" className="absolute left-0 top-0 pl-0 ml-0">
          <img
            src="/image/micrologo.png"
            alt="MicroGroups Logo"
            className="h-5 w-auto"
          />
        </Link>

        {/* Desktop Navigation - Pushed to right */}
        <div className="hidden md:flex space-x-8 ml-auto">
          {["Home", "About", "Services", "Products", "Contact"].map((item, index) => (
            <Link
              key={index}
              href={`#${item.toLowerCase()}`}
              className="nav-item text-white hover:text-blue-300 transition-colors px-4 py-2"
            >
              {item}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white absolute right-0 top-0 p-4"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className="mobile-menu fixed inset-0 bg-black bg-opacity-95 z-50 flex flex-col justify-center items-center md:hidden transform translate-x-full opacity-0">
        {["Home", "About", "Services", "Products", "Contact"].map((item, index) => (
          <Link
            key={index}
            href={`#${item.toLowerCase()}`}
            className="mobile-nav-item text-white text-2xl my-4 hover:text-blue-300 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            {item}
          </Link>
        ))}
      </div>
    </nav>
  )
}