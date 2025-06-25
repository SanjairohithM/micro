import React, { useEffect, useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';

type EarthProps = React.ComponentProps<'group'>;

export default function Earth(props: EarthProps) {
  const groupRef = useRef<Group>(null);
  
  // Add error handling for GLTF loading
  let gltf;
  try {
    gltf = useGLTF('/models/earth.glb');
    console.log('Earth GLTF loaded successfully:', gltf);
  } catch (error) {
    console.error('Error loading Earth GLTF:', error);
    return null;
  }
  
  const { actions, names } = useAnimations(gltf.animations, gltf.scene);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Realistic Earth rotation (slower than push button)
      groupRef.current.rotation.y += delta * 0.05;
      
      // Subtle floating animation
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.1;
      
      // Optional: slight tilt like real Earth (23.5 degrees)
      groupRef.current.rotation.z = Math.PI * 0.13; // roughly 23.5 degrees
      
      // Base scale with very subtle breathing effect
      const baseScale = 1.0;
      const breathe = baseScale + Math.sin(state.clock.elapsedTime * 1.2) * 0.02;
      groupRef.current.scale.set(breathe, breathe, breathe);
    }
  });

  useEffect(() => {
    if (actions && names.length > 0) {
      actions[names[0]]?.reset().play();
    }
  }, [actions, names]);

  return <primitive object={gltf.scene} ref={groupRef} {...props} />;
}

useGLTF.preload('/models/earth.glb'); 