"use client";

import React, { useRef, useLayoutEffect } from "react";
import { CardBody, CardContainer, CardItem } from "@/components/3d-card-effect";
import { Building, Settings, Award } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const TestimonialsComponent = () => {
  // Radar animation refs
  const sectionRef = useRef(null);
  const circleRef = useRef(null);
  const circle2Ref = useRef(null);
  const circle3Ref = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        circleRef.current,
        { scale: 0.05 },
        {
          scale: 1.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
          transformOrigin: "50% 50%",
          ease: "power1.inOut",
        }
      );
      gsap.fromTo(
        circle2Ref.current,
        { scale: 0.08 },
        {
          scale: 1.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
          transformOrigin: "50% 50%",
          ease: "power1.inOut",
        }
      );
      gsap.fromTo(
        circle3Ref.current,
        { scale: 0.12 },
        {
          scale: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
          transformOrigin: "50% 50%",
          ease: "power1.inOut",
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const sections = [
    {
      header: "WHO WE ARE",
      text: "MICRO INSTRUMENT PRIVATE LIMITED, is a premier manufacturer in offering Innovative Electro Mechanical Products with excellent cost effective solutions since 1987. We are one of the leading push button switch & all industrial electro mech components manufacturer in India since 1987. Our enterprise follows ISO 9001: 2015 quality management system.",
      icon: Building,
    },
    {
      header: "WHAT WE OFFER",
      text: "We manufacture electro mechanical products like switches and sensors. Some of the products are Push button Switches, Limit switches, Load break switch, Pressure switch, Indication lamp, Micro switches, Isolators, Isolators with enclosures, Control signaling devices, Proximity switches, Relays and Relays with enclosures, pilot lamps.",
      icon: Settings,
    },
    {
      header: "WHY TO CHOOSE US",
      text: "We are top-notch electro mech switch manufacturer in India at all times. It is our aim that each customer has their expectations exceeded so that we keep you coming back to us for all of your electric switch requirements. Our mission is to provide diligent, efficient and thorough after-sales support to our customers, For us it's all about what adds value for you and your business.",
      icon: Award,
    },
  ];

  return (
    <div ref={sectionRef} className="min-h-screen bg-white py-20 relative overflow-hidden">
      {/* Radar Circles Animation Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <div
          ref={circle3Ref}
          className="absolute rounded-full bg-gradient-to-r from-black to-gray-800 opacity-70"
          style={{
            width: "300vw",
            height: "300vw",
            filter: "blur(8px)",
          }}
        />
        <div
          ref={circleRef}
          className="absolute rounded-full bg-gradient-to-r from-black to-gray-700 opacity-80"
          style={{
            width: "220vw",
            height: "220vw",
            filter: "blur(4px)",
          }}
        />
        <div
          ref={circle2Ref}
          className="absolute rounded-full bg-gradient-to-r from-black to-gray-600 opacity-100"
          style={{
            width: "160vw",
            height: "160vw",
            filter: "blur(0px)",
          }}
        />
      </div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-8xl font-bold text-white bg-clip-text mb-6 font-montserrat">
            ABOUT US
          </h1>
          <p className="text-xl text-white max-w-3xl mx-auto leading-relaxed font-montserrat">
            Discover who we are, what we offer, and why we're the trusted choice for 
            innovative electro-mechanical solutions.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sections.map((section, index) => {
            const IconComponent = section.icon;
            return (
              <CardContainer key={index} className="inter-var">
                <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full h-auto rounded-xl p-6 border min-h-[400px]">
                  {/* Header with Icon */}
                  <div className="flex flex-col items-center text-center mb-6">
                    <CardItem translateZ="60" className="mb-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-black to-gray-700 rounded-full flex items-center justify-center shadow-lg">
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                    </CardItem>
                    <CardItem
                      translateZ="50"
                      className="text-xl text-neutral-800 dark:text-white font-montserrat"
                    >
                      {section.header}
                    </CardItem>
                  </div>

                  {/* Content Text */}
                  <CardItem
                    as="p"
                    translateZ="40"
                    className="text-neutral-600 text-sm dark:text-neutral-300 leading-relaxed text-justify font-montserrat"
                  >
                    {section.text}
                  </CardItem>
                </CardBody>
              </CardContainer>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsComponent;