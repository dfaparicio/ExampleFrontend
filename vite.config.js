import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'
import { fileURLToPath } from 'url' // Necesario para manejar rutas en proyectos modernos

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls }
    }),
    quasar({
      sassVariables: 'src/quasar-variables.sass'
    })
  ],
  resolve: {
    alias: {
      // Aquí le explicamos a Vite que 'src' equivale a la carpeta física src
      'src': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})