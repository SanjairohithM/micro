// components/PushButton.tsx
import React, { useEffect, useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';

type PushButtonProps = React.ComponentProps<'group'>;

export default function PushButton(props: PushButtonProps) {
  const groupRef = useRef<Group>(null);
  const gltf = useGLTF('/models/button.gltf');
  const { actions, names } = useAnimations(gltf.animations, gltf.scene);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Gentle rotation
      groupRef.current.rotation.y += delta * 0.15;
      
      // Rotate to show top view facing the screen
      groupRef.current.rotation.x = -Math.PI / 2;
      
      // Larger base scale with subtle pulsing zoom effect
      const baseScale = 1.5; // Increase base size
      const pulse = baseScale + Math.sin(state.clock.elapsedTime * 2) * 0.08;
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