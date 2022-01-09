import {
  Application,
  Router
} from 'https://deno.land/x/oak@v10.1.0/mod.ts'
import router from './routes.ts'


const port = 5000

const app = new Application()

// Setting up Router Middleware

app.use(router.routes())
app.use(router.allowedMethods())

console.log(`Server running on port ${port}`)

await app.listen({ port })
