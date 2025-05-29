import { ReactNode, forwardRef } from "react"

interface ParallaxSectionProps {
  background?: string
  children: ReactNode
  className?: string
}

const ParallaxSection = forwardRef<HTMLDivElement, ParallaxSectionProps>(
  ({ background = "bg-black", children, className = "" }, ref) => {
    return (
      <section 
        ref={ref}
        className={`parallax-section relative h-screen w-full overflow-hidden ${background} ${className}`}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </div>
      </section>
    )
  }
)

ParallaxSection.displayName = "ParallaxSection"

export default ParallaxSection
