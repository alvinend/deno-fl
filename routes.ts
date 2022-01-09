import {
  Router
} from 'https://deno.land/x/oak@v10.1.0/mod.ts'

const router = new Router()

// Define Route
router.get('/api/v1/products', ({ response }: { response: any}) => {
  response.body = 'Hello World'
})

export default router
