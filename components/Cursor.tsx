"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorInnerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const isTouchDevice =
      typeof window !== "undefined" &&
      ("ontouchstart" in window || navigator.maxTouchPoints > 0)

    if (isTouchDevice) return // Skip on touch for now or customize

    gsap.set(cursorRef.current, { xPercent: -50, yPercent: -50 })
    gsap.set(cursorInnerRef.current, { xPercent: -50, yPercent: -50 })

    const moveCursor = (x: number, y: number) => {
      gsap.to(cursorRef.current, {
        x,
        y,
        duration: 0.2,
        ease: "expo.out"
      })
      gsap.to(cursorInnerRef.current, {
        x,
        y,
        duration: 0.05
      })
    }

    const createParticle = (x: number, y: number) => {
      const particle = document.createElement("div")
      const size = Math.random() * 10 + 5
      const colors = ["#ff3366", "#33ffcc", "#3366ff", "#ffcc33", "#cc33ff"]
      const color = colors[Math.floor(Math.random() * colors.length)]

      particle.className = "fixed pointer-events-none z-[9998]"
      Object.assign(particle.style, {
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: color,
        borderRadius: "50%",
        top: 0,
        left: 0
      })
      document.body.appendChild(particle)

      gsap.set(particle, { x, y })
      gsap.to(particle, {
        x: x + (Math.random() - 0.5) * 100,
        y: y + (Math.random() - 0.5) * 100,
        scale: 0,
        opacity: 0,
        duration: Math.random() * 0.5 + 0.5,
        onComplete: () => particle.remove()
      })
    }

    const onMove = (e: MouseEvent) => {
      moveCursor(e.clientX, e.clientY)
      createParticle(e.clientX, e.clientY)
    }

    const onClick = () => {
      gsap.to(cursorRef.current, {
        scale: 1.5,
        duration: 0.2,
        yoyo: true,
        repeat: 1
      })
    }

    const onHover = () => {
      gsap.to(cursorRef.current, { scale: 2, duration: 0.3 })
      gsap.to(cursorInnerRef.current, { scale: 0.5, duration: 0.3 })
    }

    const onUnhover = () => {
      gsap.to(cursorRef.current, { scale: 1, duration: 0.3 })
      gsap.to(cursorInnerRef.current, { scale: 1, duration: 0.3 })
    }

    const hoverEls = document.querySelectorAll("a, button, [data-cursor-hover]")
    hoverEls.forEach(el => {
      el.addEventListener("mouseenter", onHover)
      el.addEventListener("mouseleave", onUnhover)
      el.addEventListener("click", onClick)
    })

    window.addEventListener("mousemove", onMove)
    window.addEventListener("mousedown", onClick)

    return () => {
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mousedown", onClick)
      hoverEls.forEach(el => {
        el.removeEventListener("mouseenter", onHover)
        el.removeEventListener("mouseleave", onUnhover)
        el.removeEventListener("click", onClick)
      })
    }
  }, [])

  return (
    <>
      {/* Outer Ring with Gradient Glow */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed z-[9999] w-14 h-14 rounded-full mix-blend-difference"
        style={{
          background: "radial-gradient(circle at center, rgba(255,255,255,0.5) 0%, transparent 60%)",
          boxShadow: "0 0 20px 5px rgba(255, 255, 255, 0.3)"
        }}
      />

      {/* Inner Dot */}
      <div
        ref={cursorInnerRef}
        className="pointer-events-none fixed z-[9999] w-3 h-3 rounded-full bg-white"
      />
    </>
  )
}
