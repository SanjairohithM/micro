"use client";

import React from "react";
import { CardBody, CardContainer, CardItem } from "@/components/3d-card-effect";
import { User } from "lucide-react";

const TestimonialsComponent = () => {
  const sections = [
    {
      header: "WHO WE ARE",
      text: "MICRO INSTRUMENT PRIVATE LIMITED, is a premier manufacturer in offering Innovative Electro Mechanical Products with excellent cost effective solutions since 1987. We are one of the leading push button switch & all industrial electro mech components manufacturer in India since 1987. Our enterprise follows ISO 9001: 2015 quality management system.",
    },
    {
      header: "WHAT WE OFFER",
      text: "We manufacture electro mechanical products like switches and sensors. Some of the products are Push button Switches, Limit switches, Load break switch, Pressure switch, Indication lamp, Micro switches, Isolators, Isolators with enclosures, Control signaling devices, Proximity switches, Relays and Relays with enclosures, pilot lamps.",
    },
    {
      header: "WHY TO CHOOSE US",
      text: "We are top-notch electro mech switch manufacturer in India at all times. It is our aim that each customer has their expectations exceeded so that we keep you coming back to us for all of your electric switch requirements. Our mission is to provide diligent, efficient and thorough after-sales support to our customers, For us it’s all about what adds value for you and your business.",
    },
  ];

  return (
    <div className="min-h-screen bg-black py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-8xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6 font-montserrat">
            About Us
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-montserrat">
            Discover who we are, what we offer, and why we're the trusted choice for 
            innovative electro-mechanical solutions.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sections.map((section, index) => (
            <CardContainer key={index} className="inter-var">
              <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full h-auto rounded-xl p-6 border min-h-[400px]">
                {/* Header with Icon */}
                <div className="flex flex-col items-center text-center mb-6">
                  <CardItem translateZ="60" className="mb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                      <User className="w-8 h-8 text-white" />
                    </div>
                  </CardItem>
                  <CardItem
                    translateZ="50"
                    className="text-xl  text-neutral-800 dark:text-white font-montserrat"
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsComponent;