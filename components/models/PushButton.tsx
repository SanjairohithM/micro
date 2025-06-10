// components/PushButton.tsx
import React, { useEffect, useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';

type PushButtonProps = JSX.IntrinsicElements['group'];

export default function PushButton(props: PushButtonProps) {
  const groupRef = useRef<Group>(null);
  const gltf = useGLTF('/models/button.gltf');
  const { actions, names } = useAnimations(gltf.animations, gltf.scene);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Gentle rotation
      groupRef.current.rotation.y += delta * 0.15;
      
      // Fixed tilt
      groupRef.current.rotation.x = 0.2;
      
      // Subtle pulsing zoom effect
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
      groupRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  useEffect(() => {
    if (actions && names.length > 0) {
      actions[names[0]]?.reset().play();
    }
  }, [actions, names]);

  return <primitive object={gltf.scene} ref={groupRef} {...props} />;
}

useGLTF.preload('/models/button.gltf');