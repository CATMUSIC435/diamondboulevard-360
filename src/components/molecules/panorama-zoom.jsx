import { useThree, useFrame } from '@react-three/fiber'
import { useEffect, useRef } from 'react'

export function PanoramaZoom() {
  const { camera, gl } = useThree()
  const targetFov = useRef(camera.fov)

  useEffect(() => {
    const onWheel = (e) => {
      e.preventDefault()
      targetFov.current += e.deltaY * 0.05
      targetFov.current = Math.min(100, Math.max(30, targetFov.current))
    }

    const el = gl.domElement
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [camera, gl])

  useFrame(() => {
    if (Math.abs(camera.fov - targetFov.current) > 0.1) {
      camera.fov = THREE.MathUtils.lerp(camera.fov, targetFov.current, 0.1)
      camera.updateProjectionMatrix()
    }
  })

  return null
}