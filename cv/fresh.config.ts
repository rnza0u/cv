import { defineConfig } from '$fresh/server.ts'
import tailwind from '$fresh/plugins/tailwind.ts'

let port = 8000

const portEnvValue = Deno.env.get('CV_PORT')
if (portEnvValue){
  const parsed = parseInt(portEnvValue)
  if (!Number.isInteger(parsed) || parsed <= 0 || parsed > 65535){
    throw Error('invalid port value for CV_PORT')
  }
  port = parsed
}

export default defineConfig({
  server: {
    port
  },
  plugins: [tailwind()],
})
