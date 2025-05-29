// "use client";
// import React, { useMemo, useRef } from "react";
// import { Canvas, useFrame, useThree } from "@react-three/fiber";
// import * as THREE from "three";

// // Utility function for className merging
// const cn = (...classes) => classes.filter(Boolean).join(' ');

// // Main CanvasRevealEffect component from your code
// const CanvasRevealEffect = ({
//   animationSpeed = 0.4,
//   opacities = [0.3, 0.3, 0.3, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 1],
//   colors = [[0, 255, 255]],
//   containerClassName,
//   dotSize,
//   showGradient = true,
// }) => {
//   return (
//     <div className={cn("h-full relative bg-white w-full", containerClassName)}>
//       <div className="h-full w-full">
//         <DotMatrix
//           colors={colors ?? [[0, 255, 255]]}
//           dotSize={dotSize ?? 3}
//           opacities={
//             opacities ?? [0.3, 0.3, 0.3, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 1]
//           }
//           shader={`
//               float animation_speed_factor = ${animationSpeed.toFixed(1)};
//               float intro_offset = distance(u_resolution / 2.0 / u_total_size, st2) * 0.01 + (random(st2) * 0.15);
//               opacity *= step(intro_offset, u_time * animation_speed_factor);
//               opacity *= clamp((1.0 - step(intro_offset + 0.1, u_time * animation_speed_factor)) * 1.25, 1.0, 1.25);
//             `}
//           center={["x", "y"]}
//         />
//       </div>
//       {showGradient && (
//         <div className="absolute inset-0 bg-gradient-to-t from-gray-950 to-[84%]" />
//       )}
//     </div>
//   );
// };

// const DotMatrix = ({
//   colors = [[0, 0, 0]],
//   opacities = [0.04, 0.04, 0.04, 0.04, 0.04, 0.08, 0.08, 0.08, 0.08, 0.14],
//   totalSize = 4,
//   dotSize = 2,
//   shader = "",
//   center = ["x", "y"],
// }) => {
//   const uniforms = React.useMemo(() => {
//     let colorsArray = [
//       colors[0],
//       colors[0],
//       colors[0],
//       colors[0],
//       colors[0],
//       colors[0],
//     ];
//     if (colors.length === 2) {
//       colorsArray = [
//         colors[0],
//         colors[0],
//         colors[0],
//         colors[1],
//         colors[1],
//         colors[1],
//       ];
//     } else if (colors.length === 3) {
//       colorsArray = [
//         colors[0],
//         colors[0],
//         colors[1],
//         colors[1],
//         colors[2],
//         colors[2],
//       ];
//     }

//     return {
//       u_colors: {
//         value: colorsArray.map((color) => [
//           color[0] / 255,
//           color[1] / 255,
//           color[2] / 255,
//         ]),
//         type: "uniform3fv",
//       },
//       u_opacities: {
//         value: opacities,
//         type: "uniform1fv",
//       },
//       u_total_size: {
//         value: totalSize,
//         type: "uniform1f",
//       },
//       u_dot_size: {
//         value: dotSize,
//         type: "uniform1f",
//       },
//     };
//   }, [colors, opacities, totalSize, dotSize]);

//   return (
//     <Shader
//       source={`
//         precision mediump float;
//         in vec2 fragCoord;

//         uniform float u_time;
//         uniform float u_opacities[10];
//         uniform vec3 u_colors[6];
//         uniform float u_total_size;
//         uniform float u_dot_size;
//         uniform vec2 u_resolution;
//         out vec4 fragColor;
//         float PHI = 1.61803398874989484820459;
//         float random(vec2 xy) {
//             return fract(tan(distance(xy * PHI, xy) * 0.5) * xy.x);
//         }
//         float map(float value, float min1, float max1, float min2, float max2) {
//             return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
//         }
//         void main() {
//             vec2 st = fragCoord.xy;
//             ${
//               center.includes("x")
//                 ? "st.x -= abs(floor((mod(u_resolution.x, u_total_size) - u_dot_size) * 0.5));"
//                 : ""
//             }
//             ${
//               center.includes("y")
//                 ? "st.y -= abs(floor((mod(u_resolution.y, u_total_size) - u_dot_size) * 0.5));"
//                 : ""
//             }
//       float opacity = step(0.0, st.x);
//       opacity *= step(0.0, st.y);

//       vec2 st2 = vec2(int(st.x / u_total_size), int(st.y / u_total_size));

//       float frequency = 5.0;
//       float show_offset = random(st2);
//       float rand = random(st2 * floor((u_time / frequency) + show_offset + frequency) + 1.0);
//       opacity *= u_opacities[int(rand * 10.0)];
//       opacity *= 1.0 - step(u_dot_size / u_total_size, fract(st.x / u_total_size));
//       opacity *= 1.0 - step(u_dot_size / u_total_size, fract(st.y / u_total_size));

//       vec3 color = u_colors[int(show_offset * 6.0)];

//       ${shader}

//       fragColor = vec4(color, opacity);
//       fragColor.rgb *= fragColor.a;
//         }`}
//       uniforms={uniforms}
//       maxFps={60}
//     />
//   );
// };

// const ShaderMaterial = ({
//   source,
//   uniforms,
//   maxFps = 60,
// }) => {
//   const { size } = useThree();
//   const ref = useRef();
//   let lastFrameTime = 0;

//   useFrame(({ clock }) => {
//     if (!ref.current) return;
//     const timestamp = clock.getElapsedTime();
//     if (timestamp - lastFrameTime < 1 / maxFps) {
//       return;
//     }
//     lastFrameTime = timestamp;

//     const material = ref.current.material;
//     const timeLocation = material.uniforms.u_time;
//     timeLocation.value = timestamp;
//   });

//   const getUniforms = () => {
//     const preparedUniforms = {};

//     for (const uniformName in uniforms) {
//       const uniform = uniforms[uniformName];

//       switch (uniform.type) {
//         case "uniform1f":
//           preparedUniforms[uniformName] = { value: uniform.value, type: "1f" };
//           break;
//         case "uniform3f":
//           preparedUniforms[uniformName] = {
//             value: new THREE.Vector3().fromArray(uniform.value),
//             type: "3f",
//           };
//           break;
//         case "uniform1fv":
//           preparedUniforms[uniformName] = { value: uniform.value, type: "1fv" };
//           break;
//         case "uniform3fv":
//           preparedUniforms[uniformName] = {
//             value: uniform.value.map((v) =>
//               new THREE.Vector3().fromArray(v)
//             ),
//             type: "3fv",
//           };
//           break;
//         case "uniform2f":
//           preparedUniforms[uniformName] = {
//             value: new THREE.Vector2().fromArray(uniform.value),
//             type: "2f",
//           };
//           break;
//         default:
//           console.error(`Invalid uniform type for '${uniformName}'.`);
//           break;
//       }
//     }

//     preparedUniforms["u_time"] = { value: 0, type: "1f" };
//     preparedUniforms["u_resolution"] = {
//       value: new THREE.Vector2(size.width * 2, size.height * 2),
//     };
//     return preparedUniforms;
//   };

//   const material = useMemo(() => {
//     const materialObject = new THREE.ShaderMaterial({
//       vertexShader: `
//       precision mediump float;
//       in vec2 coordinates;
//       uniform vec2 u_resolution;
//       out vec2 fragCoord;
//       void main(){
//         float x = position.x;
//         float y = position.y;
//         gl_Position = vec4(x, y, 0.0, 1.0);
//         fragCoord = (position.xy + vec2(1.0)) * 0.5 * u_resolution;
//         fragCoord.y = u_resolution.y - fragCoord.y;
//       }
//       `,
//       fragmentShader: source,
//       uniforms: getUniforms(),
//       glslVersion: THREE.GLSL3,
//       blending: THREE.CustomBlending,
//       blendSrc: THREE.SrcAlphaFactor,
//       blendDst: THREE.OneFactor,
//     });

//     return materialObject;
//   }, [size.width, size.height, source]);

//   return (
//     <mesh ref={ref}>
//       <planeGeometry args={[2, 2]} />
//       <primitive object={material} attach="material" />
//     </mesh>
//   );
// };

// const Shader = ({ source, uniforms, maxFps = 60 }) => {
//   return (
//     <Canvas className="absolute inset-0 h-full w-full">
//       <ShaderMaterial source={source} uniforms={uniforms} maxFps={maxFps} />
//     </Canvas>
//   );
// };

// // Card component that uses the CanvasRevealEffect
// const Card = ({ title, description, colors, animationSpeed, className = "" }) => {
//   return (
//     <div className={cn(
//       "group relative h-80 w-full rounded-2xl border border-gray-200 bg-gray-50 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-105",
//       className
//     )}>
//       {/* Canvas Effect Background */}
//       <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
//         <CanvasRevealEffect
//           animationSpeed={animationSpeed}
//           colors={colors}
//           containerClassName="bg-transparent"
//           dotSize={2}
//           showGradient={true}
//         />
//       </div>
      
//       {/* Card Content */}
//       <div className="relative z-10 h-full flex flex-col justify-end p-8 text-black hover:text-white">
//         <div className="transform transition-transform duration-300 group-hover:translate-y-0 translate-y-4 text-black hover:text-white">
//           <h3 className="text-2xl font-bold  mb-3 transition-colors duration-300 text-black hover:text-white">
//             {title}
//           </h3>
//           <p className=" transition-colors duration-300 opacity-0 group-hover:opacity-100 text-black hover:text-white">
//             {description}
//           </p>
//         </div>
//       </div>
      
//       {/* Overlay for better text readability on hover */}
//       <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//     </div>
//   );
// };

// // Main component with 3 cards
// export default function CanvasRevealCards() {
//   const cards = [
//     {
//       title: "WHO WE ARE",
//       description: "MICRO INSTRUMENT PRIVATE LIMITED, is a premier manufacturer in offering Innovative Electro Mechanical Products with excellent cost effective solutions since 1987. We are one of the leading push button switch & all industrial electro mech components manufacturer in India since 1987. Our enterprise follows ISO 9001: 2015 quality management system.",
//       colors: [[0, 255, 255], [0, 150, 255]],
//       animationSpeed: 0.4,
//     },
//     {
//       title: "WHAT WE OFFER",
//       description: "We manufacture electro mechanical products like switches and sensors. some of the products are Push button Switches, Limit switches, Load break switch, Pressure switch, Indication lamp, Micro switches , Isolators, Isolators with enclosures, Control signaling devices, Proximity switches, Relays and Relays with enclosures, pilot lamps.",
//       colors: [[255, 0, 150], [255, 100, 0]],
//       animationSpeed: 0.6,
//     },
//     {
//       title: "WHY TO CHOOSE US",
//       description: "We are top-notch electro mech switch manufacturer in India at all times. It is our aim that each customer has their expectations exceeded so that we keep you coming back to us for all of your electric switch requirements. Our mission is to provide diligent, efficient and thorough after-sales support to our customers, For us it’s all about what adds value for you and your business.",
//       colors: [[100, 255, 100], [0, 255, 0]],
//       animationSpeed: 0.3,
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-8">
//       <div className="max-w-7xl mx-auto">
//         <div className="text-center mb-12">
//           <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
//             Testmonial
//           </h1>
          
//         </div>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {cards.map((card, index) => (
//             <Card
//               key={index}
//               title={card.title}
//               description={card.description}
//               colors={card.colors}
//               animationSpeed={card.animationSpeed}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }