import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  build: {
    // 1. Tối ưu hóa cho các thiết bị hiện đại (ESNext giúp code gọn và nhanh hơn)
    target: 'esnext',
    
    // 2. Chia nhỏ file (Chunking) để tránh file index.js quá nặng
    rollupOptions: {
      output: {
        manualChunks: {
          // Tách riêng core 3D để trình duyệt cache hiệu quả
          'three-core': ['three'],
          'three-extra': ['@react-three/fiber', '@react-three/drei'],
          // Các thư viện UI cơ bản
          'ui-vendor': ['react', 'react-dom', 'react-spring'],
        }
      }
    },

    // 3. Nén mạnh hơn để giảm dung lượng tải trang đầu
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Xóa sạch console.log khi build production
        drop_debugger: true,
      }
    },
    
    // 4. Tăng giới hạn cảnh báo dung lượng (phù hợp với dự án 3D)
    chunkSizeWarningLimit: 1500,
  },
  
  // 5. Tối ưu hóa việc nạp trước các thư viện nặng lúc phát triển (Dev Mode)
  optimizeDeps: {
    include: ['three', '@react-three/fiber', '@react-three/drei'],
  },

  // 6. Cấu hình xử lý tài nguyên tĩnh (Texture ảnh Panorama)
  assetsInclude: ['**/*.glb', '**/*.gltf', '**/*.hdr'],
})