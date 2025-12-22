import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  build: {
    target: 'esnext',
    
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      }
    },
    
    chunkSizeWarningLimit: 1500,
  },
  optimizeDeps: {
    include: ['three', '@react-three/fiber', '@react-three/drei','@mediapipe/hands',
      '@mediapipe/camera_utils',
      '@mediapipe/drawing_utils'],
  },
  server: {
    headers: {
      "Cross-Origin-Embedder-Policy": "require-corp",
      "Cross-Origin-Opener-Policy": "same-origin",
    },
  },

  assetsInclude: ['**/*.glb', '**/*.gltf', '**/*.hdr', '**/*.png', , '**/*.jpg', '**/**/*.png', '**/**/*.jpg' ],
})