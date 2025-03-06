import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import RubyPlugin from 'vite-plugin-ruby'
import Vue from '@vitejs/plugin-vue'
import VueRouter from 'unplugin-vue-router/vite'
import MetaLayouts from "vite-plugin-vue-meta-layouts"

export default defineConfig({
  plugins: [
    RubyPlugin(),
    VueRouter({
      routesFolder: fileURLToPath(new URL('./app/javascript/frontend/pages', import.meta.url)),
      exclude: [ "**/[A-Z]*.vue" ],
      dts: fileURLToPath(new URL('./app/javascript/typings/typed-router.d.ts', import.meta.url))
    }),
    Vue({
      script: {
        defineModel: true
      }
    }),
    MetaLayouts({
      target: "frontend/layouts"
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./app/javascript/frontend', import.meta.url)),
      '@vendor': fileURLToPath(new URL('./node_modules/@vendor', import.meta.url)),
      '$vendor': fileURLToPath(new URL('./app/javascript/vendor', import.meta.url)),
      '@bbb': fileURLToPath(new URL('./app/javascript/bbb', import.meta.url)),
    }
  },
  build: {
    minify: 'terser',
    terserOptions: {
      keep_classnames: true,
    }
  }
})
