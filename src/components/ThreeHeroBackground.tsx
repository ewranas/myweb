import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const ThreeHeroBackground: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Scene with deep black fog
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.0016);

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
    camera.position.z = 28;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Subtle, elegant Apple-style developer geometric structure
    const icoGeometry = new THREE.IcosahedronGeometry(7.5, 1);
    const icoMaterial = new THREE.MeshBasicMaterial({
      color: 0x2997ff, // Apple electric blue
      wireframe: true,
      transparent: true,
      opacity: 0.16,
    });
    const icosahedron = new THREE.Mesh(icoGeometry, icoMaterial);
    icosahedron.position.set(13, 1, -4);
    mainGroup.add(icosahedron);

    // Inner subtle silver structure
    const octaGeometry = new THREE.OctahedronGeometry(4, 0);
    const octaMaterial = new THREE.MeshBasicMaterial({
      color: 0x86868b, // Apple subtle silver gray
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    });
    const octahedron = new THREE.Mesh(octaGeometry, octaMaterial);
    octahedron.position.set(13, 1, -4);
    mainGroup.add(octahedron);

    // Left floating subtle polyhedron
    const dodecaGeometry = new THREE.DodecahedronGeometry(4, 0);
    const dodecaMaterial = new THREE.MeshBasicMaterial({
      color: 0x2997ff,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    const dodecahedron = new THREE.Mesh(dodecaGeometry, dodecaMaterial);
    dodecahedron.position.set(-15, -3, -8);
    mainGroup.add(dodecahedron);

    // 2. Refined, quiet particle field
    const particleCount = 280;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const blueColor = new THREE.Color(0x2997ff);
    const silverColor = new THREE.Color(0x86868b);
    const whiteColor = new THREE.Color(0xf5f5f7);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 85;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 55;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 60;

      const chosenColor = i % 4 === 0 ? blueColor : i % 4 === 1 ? silverColor : whiteColor;
      colors[i * 3] = chosenColor.r;
      colors[i * 3 + 1] = chosenColor.g;
      colors[i * 3 + 2] = chosenColor.b;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 1.1,
      vertexColors: true,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // 3. Subtle connecting lines
    const lineCount = 20;
    const linePositions = new Float32Array(lineCount * 6);
    for (let i = 0; i < lineCount; i++) {
      const idx1 = Math.floor(Math.random() * particleCount);
      const idx2 = (idx1 + 1 + Math.floor(Math.random() * 4)) % particleCount;
      linePositions[i * 6] = positions[idx1 * 3];
      linePositions[i * 6 + 1] = positions[idx1 * 3 + 1];
      linePositions[i * 6 + 2] = positions[idx1 * 3 + 2];
      linePositions[i * 6 + 3] = positions[idx2 * 3];
      linePositions[i * 6 + 4] = positions[idx2 * 3 + 1];
      linePositions[i * 6 + 5] = positions[idx2 * 3 + 2];
    }
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x2997ff,
      transparent: true,
      opacity: 0.1,
    });
    const lineSegments = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineSegments);

    // Gentle mouse parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const windowHalfX = window.innerWidth / 2;
      const windowHalfY = window.innerHeight / 2;
      mouseX = (event.clientX - windowHalfX) * 0.0004;
      mouseY = (event.clientY - windowHalfY) * 0.0004;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!prefersReducedMotion) {
        const elapsedTime = clock.getElapsedTime();

        icosahedron.rotation.x = elapsedTime * 0.06;
        icosahedron.rotation.y = elapsedTime * 0.09;

        octahedron.rotation.x = -elapsedTime * 0.08;
        octahedron.rotation.z = elapsedTime * 0.05;

        dodecahedron.rotation.y = elapsedTime * 0.05;
        dodecahedron.rotation.z = -elapsedTime * 0.04;

        particles.rotation.y = elapsedTime * 0.01;
        lineSegments.rotation.y = elapsedTime * 0.01;

        targetX += (mouseX - targetX) * 0.03;
        targetY += (mouseY - targetY) * 0.03;

        mainGroup.rotation.y = targetX;
        mainGroup.rotation.x = -targetY;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      icoGeometry.dispose();
      icoMaterial.dispose();
      octaGeometry.dispose();
      octaMaterial.dispose();
      dodecaGeometry.dispose();
      dodecaMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-75"
      aria-hidden="true"
    />
  );
};
