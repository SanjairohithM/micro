import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const Loader: React.FC = () => {
  const charRefs = useRef<Array<HTMLDivElement | null>>([]);

  const logoText = ["M", "I", "C", "R", "O"];

  // Fade effect
  useEffect(() => {
    gsap.set(".box", { backgroundColor: "transparent" });

    gsap.to(".box", {
      backgroundColor: "#000",
      duration: 1.5,
      ease: "power2.out",
    });

    gsap.delayedCall(3.5, () => {
      gsap.to(".box", {
        backgroundColor: "transparent",
        duration: 1.2,
        ease: "power2.inOut",
      });
    });
  }, []);

  // Blink text
  useEffect(() => {
    if (!charRefs.current.length) return;

    gsap.set(charRefs.current, {
      color: "white",
      scale: 1,
    });

    gsap.from(charRefs.current, {
      color: "red",
      scale: 10,
      duration: 0.4,
      stagger: {
        each: 3 / logoText.length,
      },
      ease: "power2.out",
      delay: 1,
    });

    gsap.to(charRefs.current, {
      color: "white",
      scale: 1,
    });
  }, []);

  return (
    <div className="box" style={{ fontFamily: "Squada, sans-serif" }}>
      <div className="flex flex-row justify-center items-center h-screen w-full">
        {logoText.map((char, index) => (
          <div
            key={index}
            ref={(el: HTMLDivElement | null) => {
              charRefs.current[index] = el;
            }}
            style={{
              fontSize: "30px",
              margin: "0 60px",
              transformOrigin: "center",
              color: "black",
            }}
          >
            {char}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loader;
