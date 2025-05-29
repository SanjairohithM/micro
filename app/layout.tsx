import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import CustomCursor from "@/components/Cursor"

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  fallback: ['system-ui', 'arial'] // Add fallback fonts
});
export const metadata: Metadata = {
  title: "Micro Groups - Innovative Technology Solutions",
  description: "Micro Groups provides cutting-edge technology solutions for businesses across various industries.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-black text-white`}>
         <CustomCursor />
        
        {children}</body>
    </html>
  )
}
