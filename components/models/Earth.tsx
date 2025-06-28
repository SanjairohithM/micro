"use client"

import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Group, Mesh } from 'three';

type EarthProps = React.ComponentProps<'group'>;

export default function Earth(props: EarthProps) {
  const group = useRef<Group>(null);
  const { nodes, materials } = useGLTF('/models/earth.glb');

  // Add slow rotation animation
  useFrame((state, delta) => {
    if (group.current) {
      // Very slow Earth rotation
      group.current.rotation.y += delta * 0.1;
      
      // Optional: Add subtle floating animation
      group.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.1;
      
      // Optional: Earth tilt (23.5 degrees)
      group.current.rotation.z = Math.PI * 0.13;
      
      // Optional: Very subtle breathing effect
      const baseScale = 1.0;
      const breathe = baseScale + Math.sin(state.clock.elapsedTime * 1.2) * 0.02;
      group.current.scale.set(breathe, breathe, breathe);
    }
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="RootNode">
          <group name="Earth" rotation={[-Math.PI / 5, 0, 0]}>
            <mesh
              name="Earth_Material_#50_0"
              castShadow
              receiveShadow
              geometry={(nodes['Earth_Material_#50_0'] as Mesh).geometry}
              material={materials.Material_50}
            />
          </group>
          <group name="EarthClouds" rotation={[-Math.PI / 2, -Math.PI / 9, 0]} scale={1.01}>
            <mesh
              name="EarthClouds_Material_#62_0"
              castShadow
              receiveShadow
              geometry={(nodes['EarthClouds_Material_#62_0'] as Mesh).geometry}
              material={materials.Material_62}
            />
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('/models/earth.glb');
