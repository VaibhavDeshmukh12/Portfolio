'use client'

import { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const PARTICLE_COUNT = 300
const CONNECTION_DISTANCE = 2.5
const MOUSE_INFLUENCE_RADIUS = 3
const MOUSE_REPEL_STRENGTH = 0.08

function NeuralParticles() {
  const pointsRef = useRef<THREE.Points>(null)
  const linesRef = useRef<THREE.LineSegments>(null)
  const mousePos = useRef(new THREE.Vector2(0, 0))
  const mouse3D = useRef(new THREE.Vector3(0, 0, 0))
  const scrollProgress = useRef(0)
  const { viewport } = useThree()

  // Generate initial positions in a wide spread
  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3)
    const vel = new Float32Array(PARTICLE_COUNT * 3)
    const spreadX = 18
    const spreadY = 50 // tall to cover scroll
    const spreadZ = 8

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * spreadX
      pos[i * 3 + 1] = (Math.random() - 0.5) * spreadY
      pos[i * 3 + 2] = (Math.random() - 0.5) * spreadZ - 2
      vel[i * 3] = (Math.random() - 0.5) * 0.005
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.005
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.003
    }
    return { positions: pos, velocities: vel }
  }, [])

  // Line geometry for connections
  const linePositions = useMemo(() => {
    // Max possible connections
    return new Float32Array(PARTICLE_COUNT * PARTICLE_COUNT * 0.1 * 6)
  }, [])

  const lineColors = useMemo(() => {
    return new Float32Array(PARTICLE_COUNT * PARTICLE_COUNT * 0.1 * 6)
  }, [])

  // Track mouse in normalized coordinates
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mousePos.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }

    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      scrollProgress.current = maxScroll > 0 ? window.scrollY / maxScroll : 0
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useFrame(({ clock }) => {
    if (!pointsRef.current || !linesRef.current) return
    const t = clock.getElapsedTime()
    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute
    const posArray = posAttr.array as Float32Array

    // Convert mouse to 3D world space
    mouse3D.current.set(
      mousePos.current.x * viewport.width * 0.5,
      mousePos.current.y * viewport.height * 0.5,
      0
    )

    // Color shift based on scroll
    const scroll = scrollProgress.current
    const colorR = 0.23 + scroll * 0.35  // blue → purple → pink
    const colorG = 0.51 - scroll * 0.25
    const colorB = 0.96 - scroll * 0.2

    // Update particles
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const ix = i * 3
      const iy = i * 3 + 1
      const iz = i * 3 + 2

      // Apply velocity with organic noise
      posArray[ix] += velocities[ix] + Math.sin(t * 0.3 + i * 0.1) * 0.002
      posArray[iy] += velocities[iy] + Math.cos(t * 0.2 + i * 0.15) * 0.002
      posArray[iz] += velocities[iz] + Math.sin(t * 0.1 + i * 0.2) * 0.001

      // Mouse repulsion
      const dx = posArray[ix] - mouse3D.current.x
      const dy = posArray[iy] - mouse3D.current.y
      const dz = posArray[iz] - mouse3D.current.z
      const distToMouse = Math.sqrt(dx * dx + dy * dy + dz * dz)

      if (distToMouse < MOUSE_INFLUENCE_RADIUS && distToMouse > 0.01) {
        const force = (MOUSE_INFLUENCE_RADIUS - distToMouse) / MOUSE_INFLUENCE_RADIUS * MOUSE_REPEL_STRENGTH
        posArray[ix] += (dx / distToMouse) * force
        posArray[iy] += (dy / distToMouse) * force
        posArray[iz] += (dz / distToMouse) * force * 0.5
      }

      // Boundary wrapping
      if (posArray[ix] > 9) posArray[ix] = -9
      if (posArray[ix] < -9) posArray[ix] = 9
      if (posArray[iy] > 25) posArray[iy] = -25
      if (posArray[iy] < -25) posArray[iy] = 25
      if (posArray[iz] > 4) posArray[iz] = -6
      if (posArray[iz] < -6) posArray[iz] = 4
    }

    posAttr.needsUpdate = true

    // Build connections between nearby particles
    const lineGeom = linesRef.current.geometry
    const linePosAttr = lineGeom.attributes.position as THREE.BufferAttribute
    const lineColAttr = lineGeom.attributes.color as THREE.BufferAttribute
    const linePosArr = linePosAttr.array as Float32Array
    const lineColArr = lineColAttr.array as Float32Array

    let lineIndex = 0
    const maxLines = Math.floor(linePosArr.length / 6)

    for (let i = 0; i < PARTICLE_COUNT && lineIndex < maxLines; i++) {
      for (let j = i + 1; j < PARTICLE_COUNT && lineIndex < maxLines; j++) {
        const ix = i * 3, jx = j * 3
        const ddx = posArray[ix] - posArray[jx]
        const ddy = posArray[ix + 1] - posArray[jx + 1]
        const ddz = posArray[ix + 2] - posArray[jx + 2]
        const dist = Math.sqrt(ddx * ddx + ddy * ddy + ddz * ddz)

        if (dist < CONNECTION_DISTANCE) {
          const alpha = 1 - dist / CONNECTION_DISTANCE
          const li = lineIndex * 6

          linePosArr[li] = posArray[ix]
          linePosArr[li + 1] = posArray[ix + 1]
          linePosArr[li + 2] = posArray[ix + 2]
          linePosArr[li + 3] = posArray[jx]
          linePosArr[li + 4] = posArray[jx + 1]
          linePosArr[li + 5] = posArray[jx + 2]

          // Color with alpha fade
          lineColArr[li] = colorR
          lineColArr[li + 1] = colorG
          lineColArr[li + 2] = colorB * alpha
          lineColArr[li + 3] = colorR
          lineColArr[li + 4] = colorG
          lineColArr[li + 5] = colorB * alpha

          lineIndex++
        }
      }
    }

    // Zero out unused line segments
    for (let i = lineIndex * 6; i < linePosArr.length; i++) {
      linePosArr[i] = 0
      lineColArr[i] = 0
    }

    linePosAttr.needsUpdate = true
    lineColAttr.needsUpdate = true
    lineGeom.setDrawRange(0, lineIndex * 2)

    // Update point material color based on scroll
    const mat = pointsRef.current.material as THREE.PointsMaterial
    mat.color.setRGB(colorR, colorG, colorB)
  })

  return (
    <>
      {/* Particles */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={PARTICLE_COUNT}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.04}
          color="#3b82f6"
          transparent
          opacity={0.8}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Connection lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={linePositions.length / 3}
            array={linePositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={lineColors.length / 3}
            array={lineColors}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </>
  )
}

// Floating energy orbs that pulse
function EnergyOrbs() {
  const orbsRef = useRef<THREE.Group>(null)

  const orbs = useMemo(() => {
    return Array.from({ length: 6 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 30,
        -3 - Math.random() * 3,
      ] as [number, number, number],
      scale: 0.3 + Math.random() * 0.5,
      speed: 0.5 + Math.random() * 0.5,
      color: ['#3b82f6', '#8b5cf6', '#06b6d4', '#ec4899', '#60a5fa', '#a78bfa'][i],
    }))
  }, [])

  useFrame(({ clock }) => {
    if (!orbsRef.current) return
    const t = clock.getElapsedTime()
    orbsRef.current.children.forEach((orb, i) => {
      const mesh = orb as THREE.Mesh
      mesh.position.y += Math.sin(t * orbs[i].speed + i) * 0.003
      mesh.position.x += Math.cos(t * orbs[i].speed * 0.7 + i) * 0.002
      const s = orbs[i].scale * (1 + Math.sin(t * 2 + i) * 0.2)
      mesh.scale.setScalar(s)
    })
  })

  return (
    <group ref={orbsRef}>
      {orbs.map((orb, i) => (
        <mesh key={i} position={orb.position}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial
            color={orb.color}
            transparent
            opacity={0.08}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  )
}

// Morphing wireframe geometry that slowly rotates
function MorphingGeometry() {
  const meshRef = useRef<THREE.Mesh>(null)
  const scrollRef = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      scrollRef.current = maxScroll > 0 ? window.scrollY / maxScroll : 0
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const t = clock.getElapsedTime()
    meshRef.current.rotation.x = t * 0.05
    meshRef.current.rotation.y = t * 0.08
    meshRef.current.rotation.z = t * 0.03

    // Scale based on scroll
    const s = 2 + scrollRef.current * 1.5
    meshRef.current.scale.setScalar(s)

    // Shift position with scroll
    meshRef.current.position.y = -scrollRef.current * 10
  })

  return (
    <mesh ref={meshRef} position={[5, 0, -5]}>
      <icosahedronGeometry args={[1, 1]} />
      <meshBasicMaterial
        color="#8b5cf6"
        wireframe
        transparent
        opacity={0.06}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  )
}

// Second morphing shape on the other side
function MorphingGeometry2() {
  const meshRef = useRef<THREE.Mesh>(null)
  const scrollRef = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      scrollRef.current = maxScroll > 0 ? window.scrollY / maxScroll : 0
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const t = clock.getElapsedTime()
    meshRef.current.rotation.x = -t * 0.04
    meshRef.current.rotation.y = -t * 0.06
    meshRef.current.rotation.z = t * 0.02

    const s = 1.5 + (1 - scrollRef.current) * 1
    meshRef.current.scale.setScalar(s)
    meshRef.current.position.y = -(1 - scrollRef.current) * 8
  })

  return (
    <mesh ref={meshRef} position={[-6, -5, -4]}>
      <octahedronGeometry args={[1, 1]} />
      <meshBasicMaterial
        color="#06b6d4"
        wireframe
        transparent
        opacity={0.05}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  )
}

export function InteractiveBackground() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      {/* The canvas captures pointer events for mouse tracking, but passes clicks through */}
      <div className="absolute inset-0 pointer-events-auto" style={{ zIndex: 0 }}>
        <Canvas
          camera={{ position: [0, 0, 8], fov: 60 }}
          style={{ background: 'transparent', position: 'absolute', inset: 0 }}
          dpr={[1, 1.5]}
          gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
          eventSource={typeof document !== 'undefined' ? document.documentElement : undefined}
          eventPrefix="client"
        >
          <NeuralParticles />
          <EnergyOrbs />
          <MorphingGeometry />
          <MorphingGeometry2 />
        </Canvas>
      </div>
    </div>
  )
}
