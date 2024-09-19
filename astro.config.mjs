// Libraries
import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'
import vercel from '@astrojs/vercel/serverless'
import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'

// https://astro.build/config
export default defineConfig({
  output: 'server',
  integrations: [tailwind(), react(), sitemap(), mdx()],
  adapter: vercel(),
})
