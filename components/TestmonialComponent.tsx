"use client";
import React, { useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Text, Float, Sphere, MeshDistortMaterial, Environment } from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// Floating particles component
const FloatingParticles = ({ count = 50 }) => {
  const mesh = useRef();
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10,
        ],
        scale: Math.random() * 0.5 + 0.5,
        speed: Math.random() * 0.02 + 0.01,
      });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    particles.forEach((particle, i) => {
      const t = state.clock.getElapsedTime() * particle.speed;
      particle.position[1] = Math.sin(t + i) * 2;
      particle.position[0] += Math.sin(t * 0.5) * 0.01;
    });
  });

  return (
    <group ref={mesh}>
      {particles.map((particle, i) => (
        <Float key={i} speed={2} rotationIntensity={1} floatIntensity={2}>
          <Sphere position={particle.position} scale={particle.scale * 0.1}>
            <meshStandardMaterial color="#60a5fa" transparent opacity={0.6} />
          </Sphere>
        </Float>
      ))}
    </group>
  );
};

// 3D Background Scene
const Background3D = ({ variant = "default" }) => {
  const groupRef = useRef();
  
  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.1;
    }
  });

  const colors = {
    default: "#3b82f6",
    success: "#10b981",
    warning: "#f59e0b",
    danger: "#ef4444",
  };

  return (
    <>
      <Environment preset="city" />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <spotLight position={[-10, -10, -10]} angle={0.15} penumbra={1} intensity={0.5} />
      
      <group ref={groupRef}>
        <Float speed={4} rotationIntensity={1} floatIntensity={2}>
          <Sphere args={[1, 64, 64]} position={[2, 0, 0]}>
            <MeshDistortMaterial
              color={colors[variant]}
              attach="material"
              distort={0.4}
              speed={2}
              roughness={0.1}
            />
          </Sphere>
        </Float>
        
        <Float speed={2} rotationIntensity={2} floatIntensity={1}>
          <Sphere args={[0.7, 32, 32]} position={[-2, 1, 0]}>
            <MeshDistortMaterial
              color={colors[variant]}
              attach="material"
              distort={0.6}
              speed={3}
              roughness={0.2}
              transparent
              opacity={0.8}
            />
          </Sphere>
        </Float>
      </group>
      
      <FloatingParticles count={30} />
    </>
  );
};

// Advanced Card Component
const AdvancedCard = ({ 
  testimonial, 
  index, 
  isActive, 
  onClick,
  variant = "default" 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50, 
      scale: 0.9,
      rotateX: -10,
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
    hover: {
      scale: 1.05,
      y: -10,
      rotateX: 5,
      rotateY: 5,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.2,
      },
    },
  };

  const backgroundGradients = {
    default: "from-blue-500/20 via-purple-500/10 to-pink-500/20",
    success: "from-green-500/20 via-emerald-500/10 to-teal-500/20",
    warning: "from-yellow-500/20 via-orange-500/10 to-red-500/20",
    danger: "from-red-500/20 via-pink-500/10 to-purple-500/20",
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      className={cn(
        "relative group cursor-pointer perspective-1000",
        isActive ? "z-20" : "z-10"
      )}
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      <div className={cn(
        "relative h-96 w-full rounded-3xl overflow-hidden backdrop-blur-xl border border-white/20",
        "bg-gradient-to-br",
        backgroundGradients[variant],
        "shadow-2xl shadow-black/25",
        isActive && "ring-2 ring-white/50",
        "transition-all duration-500"
      )}>
        {/* 3D Background Canvas */}
        <div className="absolute inset-0 opacity-30">
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
            <Background3D variant={variant} />
          </Canvas>
        </div>

        {/* Animated Background Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-white/10" />
        
        {/* Floating Orbs */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
            >
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ 
                    x: Math.random() * 100 + "%", 
                    y: Math.random() * 100 + "%",
                    scale: 0 
                  }}
                  animate={{ 
                    scale: [0, 1, 0],
                    x: Math.random() * 100 + "%",
                    y: Math.random() * 100 + "%",
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut"
                  }}
                  className="absolute w-2 h-2 bg-white/40 rounded-full"
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Card Content */}
        <motion.div 
          variants={contentVariants}
          className="relative z-10 h-full flex flex-col justify-between p-8 text-white"
        >
          {/* Header */}
          <div className="space-y-4">
            <motion.div 
              className="flex items-center space-x-4"
              whileHover={{ scale: 1.05 }}
            >
              <div className="relative">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full border-2 border-white/30 shadow-lg"
                />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-2 border-white shadow-md" />
              </div>
              <div>
                <h3 className="text-xl font-bold">{testimonial.name}</h3>
                <p className="text-white/80 text-sm">{testimonial.position}</p>
                <p className="text-white/60 text-xs">{testimonial.company}</p>
              </div>
            </motion.div>

            {/* Rating */}
            <motion.div 
              className="flex space-x-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              {[...Array(5)].map((_, i) => (
                <motion.svg
                  key={i}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="w-5 h-5 text-yellow-400 fill-current"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </motion.svg>
              ))}
            </motion.div>
          </div>

          {/* Testimonial Text */}
          <motion.div 
            className="flex-1 flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <blockquote className="text-lg leading-relaxed font-medium">
              "{testimonial.text}"
            </blockquote>
          </motion.div>

          {/* Footer */}
          <motion.div 
            className="flex justify-between items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <span className="text-sm text-white/60">{testimonial.date}</span>
            <div className="flex space-x-2">
              {testimonial.tags?.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-white/20 rounded-full text-xs backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Hover Effect Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
};

// Main Advanced Testimonials Component
const AdvancedTestimonials = () => {
  const [activeCard, setActiveCard] = useState(0);
  const [variant, setVariant] = useState("default");

  const testimonials = [
    {
      name: "Sarah Johnson",
      position: "CTO",
      company: "TechCorp Inc",
      avatar: "/placeholder.svg",
      text: "The electro-mechanical solutions provided have revolutionized our manufacturing process. The quality and reliability are unmatched in the industry.",
      date: "March 2024",
      tags: ["Innovation", "Quality"],
    },
    {
      name: "Michael Chen",
      position: "Engineering Manager",
      company: "Industrial Solutions Ltd",
      avatar: "/placeholder.svg",
      text: "Outstanding customer service and technical support. The switches and sensors have performed flawlessly in our harsh industrial environment.",
      date: "February 2024",
      tags: ["Reliability", "Support"],
    },
    {
      name: "Emily Rodriguez",
      position: "Plant Director",
      company: "Manufacturing Plus",
      avatar: "/placeholder.svg",
      text: "ISO 9001:2015 certified quality is evident in every product. Our production efficiency has increased by 30% since implementation.",
      date: "January 2024",
      tags: ["Efficiency", "Certified"],
    },
  ];

  const variants = ["default", "success", "warning", "danger"];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent)]" />
        <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,rgba(59,130,246,0.1),transparent,rgba(139,92,246,0.1))]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Testimonials
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Hear from our valued clients about their experiences with our innovative 
            electro-mechanical solutions and exceptional service quality.
          </motion.p>

          {/* Variant Selector */}
          <motion.div 
            className="flex justify-center space-x-4 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {variants.map((v) => (
              <button
                key={v}
                onClick={() => setVariant(v)}
                className={cn(
                  "px-4 py-2 rounded-full transition-all duration-300",
                  variant === v 
                    ? "bg-white/20 text-white shadow-lg" 
                    : "bg-white/5 text-gray-400 hover:bg-white/10"
                )}
              >
                {v.charAt(0).toUpperCase() + v.slice(1)}
              </button>
            ))}
          </motion.div>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <AdvancedCard
              key={index}
              testimonial={testimonial}
              index={index}
              isActive={activeCard === index}
              onClick={() => setActiveCard(index)}
              variant={variant}
            />
          ))}
        </div>

        {/* Navigation Dots */}
        <motion.div 
          className="flex justify-center space-x-3 mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveCard(index)}
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-300",
                activeCard === index 
                  ? "bg-white scale-125" 
                  : "bg-white/30 hover:bg-white/50"
              )}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default AdvancedTestimonials;