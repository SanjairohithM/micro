// components/ImageHoverButton.tsx
"use client"

import { useRef, useEffect } from "react";
import gsap from "gsap";

const ImageHoverButton = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const animationRef = useRef<gsap.core.Timeline | null>(null);

  // Image paths based on your public folder structure
  const imagePaths = [
    "/image/image1.png",
    "/image/image2.png",
    "/image/image3.png",
    "/image/image.png"
  ];

  useEffect(() => {
    animationRef.current = gsap.timeline({ paused: true });
    
    // Set initial state (fully hidden)
    gsap.set(imagesRef.current, {
      scale: 0,
      opacity: 0,
      x: 0,
      y: 0,
      rotation: () => gsap.utils.random(-15, 15)
    });

    // Create positions for each image in the top area
    const positions = [
      { x: -60, y: -100 },  // top left
      { x: 60, y: -100 },   // top right
      { x: -30, y: -150 },  // upper left
      { x: 30, y: -150 }    // upper right
    ];

    // Create animation where images appear in different positions above the button
    imagesRef.current.forEach((img, index) => {
      if (!img) return;
      
      animationRef.current?.to(img, {
        scale: 1,
        opacity: 1,
        x: positions[index].x,
        y: positions[index].y,
        rotation: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.5)",
      }, index * 0.08);
    });

    // Add a slight wobble effect to the button on hover
    animationRef.current.to(buttonRef.current, {
      y: -5,
      duration: 0.2,
      ease: "sine.inOut"
    }, 0);

    return () => {
      animationRef.current?.kill();
    };
  }, []);

  const handleMouseEnter = () => {
    animationRef.current?.play();
  };

  const handleMouseLeave = () => {
    animationRef.current?.reverse();
  };

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
      {/* Map through the imagePaths array */}
      {imagePaths.map((path, index) => (
        <img
          key={index}
          ref={el => {
            if (el) imagesRef.current[index] = el;
          }}
          src={path}
          alt={`Product ${index + 1}`}
          className="absolute w-16 h-16 object-contain pointer-events-none filter drop-shadow-lg"
          style={{ 
            transformOrigin: "center center",
            willChange: "transform, opacity",
            left: "50%",
            marginLeft: "-32px" // Half of width to center
          }}
        />
      ))}

      {/* Centered Button */}
      <button
        ref={buttonRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-300 relative z-10 hover:shadow-xl"
      >
        View Products
      </button>
    </div>
  );
};

export default ImageHoverButton;