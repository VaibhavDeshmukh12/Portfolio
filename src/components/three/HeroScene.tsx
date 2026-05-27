'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Sphere, Stars } from '@react-three/drei'
import * as THREE from 'three'

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock, mouse }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.1
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.15
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, mouse.x * 0.5, 0.05)
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, mouse.y * 0.3, 0.05)
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere ref={meshRef} args={[1.5, 128, 128]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#3b82f6"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
          opacity={0.8}
          transparent
        />
      </Sphere>
    </Float>
  )
}

function FloatingRings() {
  const ring1Ref = useRef<THREE.Mesh>(null)
  const ring2Ref = useRef<THREE.Mesh>(null)
  const ring3Ref = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.3
      ring1Ref.current.rotation.y = t * 0.2
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = t * 0.2 + 1
      ring2Ref.current.rotation.z = t * 0.3
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.y = t * 0.4
      ring3Ref.current.rotation.z = t * 0.1 + 2
    }
  })

  return (
    <>
      <mesh ref={ring1Ref}>
        <torusGeometry args={[2.2, 0.02, 16, 100]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.4} />
      </mesh>
      <mesh ref={ring2Ref}>
        <torusGeometry args={[2.8, 0.015, 16, 100]} />
        <meshBasicMaterial color="#8b5cf6" transparent opacity={0.3} />
      </mesh>
      <mesh ref={ring3Ref}>
        <torusGeometry args={[3.4, 0.01, 16, 100]} />
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.2} />
      </mesh>
    </>
  )
}

function ParticleCloud() {
  const count = 500
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)
      const r = 3 + Math.random() * 3
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)
    }
    return pos
  }, [])

  const pointsRef = useRef<THREE.Points>(null)

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.03
      pointsRef.current.rotation.x = clock.getElapsedTime() * 0.02
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#60a5fa" transparent opacity={0.6} sizeAttenuation />
    </points>
  )
}

export function HeroScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 75 }}
        style={{ background: 'transparent' }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#3b82f6" />
        <pointLight position={[-10, -10, -10]} intensity={0.4} color="#8b5cf6" />
        <pointLight position={[0, 10, -10]} intensity={0.3} color="#06b6d4" />

        <AnimatedSphere />
        <FloatingRings />
        <ParticleCloud />
        <Stars radius={50} depth={50} count={1000} factor={2} saturation={0} fade speed={0.5} />
      </Canvas>
    </div>
  )
}
