import { fileURLToPath, URL } from 'node:url'
import VueRouter from 'unplugin-vue-router/vite'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Layouts from "vite-plugin-vue-meta-layouts"
import path from 'node:path'
import config from './config/vite.json'
import tailwindcss from "@tailwindcss/vite"
import legacy from '@vitejs/plugin-legacy'
import RubyPlugin from 'vite-plugin-ruby'

const sourceDir = config.all.sourceCodeDir

export default defineConfig({
  plugins: [
    RubyPlugin(),
    VueRouter({
      routesFolder: [ { src: path.join(sourceDir, 'frontend', 'pages'), path: '' } ],
      exclude: [ "**/[A-Z]*.vue" ],
      dts: path.join(sourceDir, 'typings/typed-router.d.ts'),
    }),
    Layouts({ target: "frontend/layouts" }),
    Vue(),
    tailwindcss(),
    legacy(),
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./app/javascript/frontend', import.meta.url)),
      '$vendor': fileURLToPath(new URL('./app/javascript/vendor', import.meta.url)),

      '$ui': fileURLToPath(new URL('./app/javascript/ui', import.meta.url)),
      '$presets': fileURLToPath(new URL('./app/javascript/presets', import.meta.url)),

      '#vendor': fileURLToPath(new URL('./vendor/javascript', import.meta.url)),
    },
  },
  build: {
    minify: 'terser',
    terserOptions: {
      keep_classnames: true,
    },
  },
  esbuild: {
    tsconfigRaw: {
      compilerOptions: {
        strict: true,
        useDefineForClassFields: true,
        experimentalDecorators: true,
      }
    }
  },
  server: {
    allowedHosts: true
  },
})
