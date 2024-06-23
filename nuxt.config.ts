// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  nitro: {
    plugins: ['~/server/database.ts']
  },

  runtimeConfig: {
    apiSecret: {
      MONGO_URL: process.env.MONGO_URL
    }
  },
  modules: ["@nuxt/ui"]
})
