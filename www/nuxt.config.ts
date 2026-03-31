import legacy from '@vitejs/plugin-legacy'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'
import { defineNuxtConfig } from 'nuxt/config'
import type { CompilerOptions } from 'typescript'
import * as dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.local' })
dotenv.config()

const typescriptCompilerOptions: CompilerOptions = {
  experimentalDecorators: true,
  emitDecoratorMetadata: true,
  useDefineForClassFields: true,
  noImplicitAny: false,
  noImplicitOverride: false,
  strict: false,
  strictPropertyInitialization: false,
  verbatimModuleSyntax: false,
}

const baseURL = normalizeBaseURL(process.env.RAILS_RELATIVE_URL_ROOT || '/')
const nuxtPort = Number(process.env.PORT || 3100)
const nuxtDevOrigin = `http://${process.env.DEV_HOST}:${nuxtPort}`

export default defineNuxtConfig({
  app: {
    baseURL,
    head: {
      title: 'Testpoint',
    },
  },

  ssr: false,
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  telemetry: { enabled: false },

  alias: {
    '@': fileURLToPath(new URL('./app', import.meta.url)),
    '$vendor': fileURLToPath(new URL('./app/vendor', import.meta.url)),
    '$ui': fileURLToPath(new URL('./app/ui', import.meta.url)),
    '$presets': fileURLToPath(new URL('./app/presets', import.meta.url)),
    '#vendor': fileURLToPath(new URL('./vendor/javascript', import.meta.url)),
  },

  css: [
    '$presets/theme/main.css',
    '@vue-flow/core/dist/style.css',
    '@vue-flow/controls/dist/style.css',
    '@/assets/style.css',
    '#vendor/fontawesome-pro-web/css/all.css',
  ],

  modules: [['./modules/force_dev_cdn', { origin: nuxtDevOrigin }] ],

  pages: {
    pattern: [ '**/*.vue', '!**/[A-Z]*.vue' ],
  },

  typescript: {
    tsConfig: {
      compilerOptions: typescriptCompilerOptions,
    },
    sharedTsConfig: {
      compilerOptions: typescriptCompilerOptions,
    },
  },

  esbuild: {
    options: {
      keepNames: true,
      tsconfigRaw: JSON.stringify({ compilerOptions: typescriptCompilerOptions }),
    },
  },

  nitro: {
    moduleSideEffects: [ 'reflect-metadata', 'class-transformer' ],
    prerender: {
      failOnError: false,
      crawlLinks: false,
      routes: [ '/200.html' ],
    },
    typescript: {
      tsConfig: {
        compilerOptions: typescriptCompilerOptions,
      },
    },
    esbuild: {
      options: {
        tsconfigRaw: JSON.stringify({ compilerOptions: typescriptCompilerOptions }),
      },
    },
  },

  routeRules: {
    '/200.html': { prerender: true },
    '/**': { prerender: false },
  },

  vite: {
    plugins: [
      legacy(),
      tailwindcss(),
    ],
    resolve: {
      preserveSymlinks: true,
    },
    define: {
      'import.meta.env.RAILS_RELATIVE_URL_ROOT': JSON.stringify(baseURL),
      'import.meta.env.VITE_RUBY_BASE': JSON.stringify(baseURL),
    },
    server: {
      allowedHosts: true,
    },
  },

  devServer: {
    host: '0.0.0.0',
    port: nuxtPort,
  },
})

function normalizeBaseURL(value: string) {
  let result = value.trim() || '/'

  if (!result.startsWith('/')) {
    result = `/${result}`
  }

  if (!result.endsWith('/')) {
    result = `${result}/`
  }

  return result
}
