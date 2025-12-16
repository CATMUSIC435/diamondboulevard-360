import { useThree } from '@react-three/fiber'
import { useEffect } from 'react'

export function PanoramaZoom() {
  const { camera, gl } = useThree()

  useEffect(() => {
    const onWheel = (e) => {
      camera.fov += e.deltaY * 0.03
      camera.fov = Math.min(100, Math.max(30, camera.fov))
      camera.updateProjectionMatrix()
    }

    gl.domElement.addEventListener('wheel', onWheel)
    return () => gl.domElement.removeEventListener('wheel', onWheel)
  }, [camera, gl])

  return null
}
