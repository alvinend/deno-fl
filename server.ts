import {
  Application,
  Router
} from 'https://deno.land/x/oak@v10.1.0/mod.ts'

const app = new Application()

await app.listen({ port: 5000 })
