import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  // server: {
  //   proxy: {
  //     '/menu': 'http://localhost:5002',
  //     '/uploads': 'http://localhost:5002',
  //   },
  // },
});
