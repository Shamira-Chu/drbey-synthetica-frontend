'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const FluidGlossyBackground: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene
    const scene = new THREE.Scene();

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 10);

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 4. Lighting for Glossy Fluid Mesh
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const cyanLight = new THREE.PointLight(0x00f0ff, 5, 25);
    cyanLight.position.set(-6, 4, 5);
    scene.add(cyanLight);

    const magentaLight = new THREE.PointLight(0xff2e97, 6, 25);
    magentaLight.position.set(6, -4, 5);
    scene.add(magentaLight);

    const violetLight = new THREE.PointLight(0xa855f7, 4, 25);
    violetLight.position.set(0, 6, -2);
    scene.add(violetLight);

    // 5. Fluid Wavy Glossy Ribbon Mesh (TorusKnot / Deformed Plane)
    const geometry = new THREE.TorusKnotGeometry(3.2, 0.9, 128, 32, 2, 3);
    const material = new THREE.MeshPhysicalMaterial({
      color: 0x121536,
      transmission: 0.85, // Glass transparency
      opacity: 0.8,
      transparent: true,
      roughness: 0.1,
      metalness: 0.2,
      ior: 1.5, // Refraction
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      reflectivity: 0.9,
      specularIntensity: 1.0,
      specularColor: new THREE.Color(0x00f0ff),
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(2, -0.5, -2);
    scene.add(mesh);

    // 6. Animation
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Fluid gentle rotation
      mesh.rotation.x = Math.sin(elapsedTime * 0.25) * 0.3;
      mesh.rotation.y = elapsedTime * 0.15;
      mesh.position.y = -0.5 + Math.sin(elapsedTime * 0.5) * 0.25;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-80"
    />
  );
};
