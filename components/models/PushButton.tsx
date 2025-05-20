// components/PushButton.tsx
import React, { useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { JSX } from 'react';


type PushButtonProps = JSX.IntrinsicElements['group'];

export default function PushButton(props: PushButtonProps) {
  const gltf = useGLTF('/models/button.gltf');
  const { actions, names } = useAnimations(gltf.animations, gltf.scene);

  useEffect(() => {
    if (actions && names.length > 0) {
      actions[names[0]]?.reset().play();
    }
  }, [actions, names]);

  return <primitive object={gltf.scene} {...props} />;
}

// Optional: preload the GLTF model
useGLTF.preload('/models/button.gltf');
