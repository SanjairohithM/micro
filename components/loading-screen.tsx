"use client"

import type React from "react"

import { useState, useEffect } from "react"

interface LoadingScreenProps {
  children: React.ReactNode
}

export default function LoadingScreen({ children }: LoadingScreenProps) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time or wait for resources
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 border-4 border-t-blue-500 border-blue-200 rounded-full animate-spin mb-4"></div>
          <p className="text-blue-500 text-xl font-medium">Loading experience...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
