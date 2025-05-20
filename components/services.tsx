"use client"

import { useRef, useEffect, useState } from "react"
import gsap from "gsap"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

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
    image: "https://static.grainger.com/rp/s/is/image/Grainger/22KT55_AS01",
    alt: "Wrench",
    name: "Heavy Duty Wrench",
    description: "Professional-grade adjustable wrench for tough jobs",
    type: "wrench",
    color: "#457b9d",
  },
  {
    id: 3,
    image: "https://static.grainger.com/rp/s/is/image/Grainger/22KT55_AS01",
    alt: "Screwdriver",
    name: "Precision Screwdriver",
    description: "Fine-tip screwdriver for detailed electronic work",
    type: "screwdriver",
    color: "#2a9d8f",
  },
  {
    id: 4,
    image: "https://static.grainger.com/rp/s/is/image/Grainger/22KT55_AS01",
    alt: "Hammer",
    name: "Industrial Hammer",
    description: "Balanced hammer with shock-absorbing grip",
    type: "hammer",
    color: "#f4a261",
  },
  {
    id: 5,
    image: "https://static.grainger.com/rp/s/is/image/Grainger/22KT55_AS01",
    alt: "Saw",
    name: "Cordless Saw",
    description: "Battery-powered saw with precision cutting guide",
    type: "saw",
    color: "#e76f51",
  },
  {
    id: 6,
    image: "https://static.grainger.com/rp/s/is/image/Grainger/22KT55_AS01",
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
]

export default function HorizontalProductCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [visibleItems, setVisibleItems] = useState(4)
  const [itemWidth, setItemWidth] = useState(300)
  const [itemGap, setItemGap] = useState(20)

  // Calculate dimensions based on screen size
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

  // Update carousel position when activeIndex changes
  useEffect(() => {
    if (!trackRef.current) return

    const moveToActive = () => {
      setIsAnimating(true)

      gsap.to(trackRef.current, {
        x: -activeIndex * (itemWidth + itemGap),
        duration: 0.8,
        ease: "power2.out",
        onComplete: () => setIsAnimating(false),
      })
    }

    moveToActive()
  }, [activeIndex, itemWidth, itemGap])

  // Navigation functions
  const goToPrev = () => {
    if (isAnimating) return
    setActiveIndex((prev) => Math.max(0, prev - 1))
  }

  const goToNext = () => {
    if (isAnimating) return
    setActiveIndex((prev) => Math.min(products.length - visibleItems, prev + 1))
  }

  return (
    <section className="py-20 text-white" style={{ background: "linear-gradient(to bottom, #111, #000)" }}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2
            className="text-4xl font-bold mb-4"
            style={{
              background: "linear-gradient(to right, #3b82f6, #8b5cf6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Featured Products
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Explore our premium selection of high-quality products. Click on any product to view in 3D.
          </p>
        </div>

        <div className="relative">
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
                  className="flex-shrink-0 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 relative group"
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
                  <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center p-4 text-center">
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
            disabled={activeIndex === 0}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 p-4 rounded-full z-10 transition-all duration-300"
            style={{
              background: "rgba(37, 99, 235, 0.8)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
              opacity: activeIndex === 0 ? 0.5 : 1,
              cursor: activeIndex === 0 ? "not-allowed" : "pointer",
            }}
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={goToNext}
            disabled={activeIndex >= products.length - visibleItems}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 p-4 rounded-full z-10 transition-all duration-300"
            style={{
              background: "rgba(37, 99, 235, 0.8)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
              opacity: activeIndex >= products.length - visibleItems ? 0.5 : 1,
              cursor: activeIndex >= products.length - visibleItems ? "not-allowed" : "pointer",
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
                  setActiveIndex(index)
                }
              }}
              className="w-2 h-2 rounded-full transition-all"
              style={{
                background: index === activeIndex ? "#3b82f6" : "#6b7280",
                width: index === activeIndex ? "2rem" : "0.5rem",
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

// Export products for use in other components
export { products }
