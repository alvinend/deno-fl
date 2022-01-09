import { Product } from '../types.ts'

let products: Product[] = [
  {
    id: '1',
    name: 'Product 1',
    desc: 'Desc 1',
    price: 1.00
  },
  {
    id: '2',
    name: 'Product 2',
    desc: 'Desc 2',
    price: 2.00
  },
  {
    id: '3',
    name: 'Product 3',
    desc: 'Desc 3',
    price: 3.00
  },
  {
    id: '4',
    name: 'Product 4',
    desc: 'Desc 4',
    price: 4.00
  },
  {
    id: '5',
    name: 'Product 5',
    desc: 'Desc 5',
    price: 5.00
  }
]

// @desc    Get all products
// @route   GET /api/v1/products
const getProducts = ({
  response
}: {
  response: any
}) => {
  response.body = {
    success: true,
    data: products
  }
}

// @desc    Get single products
// @route   GET /api/v1/products/:id
const getProduct = ({
  response,
  params
}: {
  response: any,
  params: { id: string }
}) => {
  const product = products.find(p => p.id === params.id)
  
  if (product) {
    response.status = 200
    response.body = {
      success: true,
      data: product
    }
  } else {
    response.status = 404
    response.body = {
      success: false,
      message: 'No product found'
    }
  }
}

// @desc    Add product
// @route   POST /api/v1/products
const addProduct = async ({
  request,
  response
}: {
  request: any
  response: any
}) => {
  const bodyParamsRaw = await request?.body({ type: 'text' }).value

  if (!bodyParamsRaw) {
    response.status = 400
    response.body = {
      success: false,
      message: 'No Data'
    }

    return
  }

  const bodyParams = JSON.parse(bodyParamsRaw)

  const product = {
    id: crypto.randomUUID(),
    ...bodyParams
  } as Product

  products.push(product)

  response.status = 201
  response.body = {
    success: true,
    data: product
  }
}

// @desc    Update product
// @route   PUT /api/v1/products/:id
const updateProduct = async ({
  params,
  request,
  response
}: {
  params: { id: string },
  request: any,
  response: any
}) => {
  const product = products.find(p => p.id === params.id)
  
  if (!product) {
    response.status = 404
    response.body = {
      success: false,
      message: 'No product found'
    } 
    
    return
  }

  const bodyParamsRaw = await request?.body({ type: 'text' }).value

  if (!bodyParamsRaw) {
    response.status = 400
    response.body = {
      success: false,
      message: 'No Data'
    }

    return
  }

  const bodyParams = JSON.parse(bodyParamsRaw) as Product

  products = products.map(p => p.id === params.id ? {
    ...p,
    ...bodyParams
  } : p)

  response.status = 200
  response.body = {
    success: true,
    data: products
  }
}

// @desc    Delete product
// @route   DELETE /api/v1/products/:id
const deleteProduct = ({
  params,
  response
}: {
  params: { id: string }
  response: any
}) => {
  products = products.filter(p => p.id !== params.id)

  response.status = 200
  response.body = {
    success: true,
    data: products
  }
}

export {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct
}
