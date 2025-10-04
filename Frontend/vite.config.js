import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'






// export default defineConfig({
//   base: './',   // 👈 Add this line
//   build: {
//     outDir: 'dist'
//   }
// })

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './'
})
