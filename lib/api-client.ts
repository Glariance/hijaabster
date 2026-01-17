import axios, { AxiosInstance, AxiosError } from 'axios'

// Get API URL from environment variable or default to localhost
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'

// Create axios instance with default configuration
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds timeout
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: false, // Set to true if you need to send cookies
})

// Request interceptor (optional - for adding auth tokens, etc.)
apiClient.interceptors.request.use(
  (config) => {
    // You can add auth tokens here if needed
    // const token = localStorage.getItem('token')
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`
    // }
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error: AxiosError) => {
    // Handle common errors
    if (error.response) {
      // Server responded with error status
      console.error('API Error Response:', error.response.data)
      console.error('Status:', error.response.status)
    } else if (error.request) {
      // Request was made but no response received
      console.error('API Error Request:', error.request)
    } else {
      // Error in setting up the request
      console.error('API Error:', error.message)
    }
    return Promise.reject(error)
  }
)

// API service functions
export const apiService = {
  // Home page data
  getHomePage: async (slug: string = 'home') => {
    const response = await apiClient.get('/home', {
      params: { slug },
      // Disable caching for dynamic CMS content
      headers: {
        'Cache-Control': 'no-cache',
      },
    })
    return response.data
  },

  // Contact page data
  getContactPage: async (slug: string = 'contact') => {
    const response = await apiClient.get('/contact/page', {
      params: { slug },
    })
    return response.data
  },

  // Submit contact form
  submitContact: async (data: {
    name: string
    email: string
    phone?: string
    subject: string
    message: string
    topic?: string | null
  }) => {
    const payload = {
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      topic: data.topic || null,
      message: data.message,
      subject: data.subject,
    }
    const response = await apiClient.post('/contact', payload)
    return response.data
  },

  // Get featured products
  getFeaturedProducts: async (limit: number = 6) => {
    const response = await apiClient.get('/products/featured', {
      params: { limit },
    })
    return response.data
  },

  // Get all categories
  getCategories: async () => {
    const response = await apiClient.get('/categories')
    return response.data
  },

  // Get all products with optional filters
  getProducts: async (params?: {
    category?: string
    search?: string
    featured?: boolean
    new?: boolean
    top?: boolean
    has_coupon?: boolean
  }) => {
    const response = await apiClient.get('/products', { params })
    return response.data
  },

  // Promotions page data
  getPromotionsPage: async (slug: string = 'promotions') => {
    const response = await apiClient.get('/promotions', {
      params: { slug },
      // Disable caching for dynamic CMS content
      headers: {
        'Cache-Control': 'no-cache',
      },
    })
    return response.data
  },

  // Category page data
  getCategoryPage: async (slug: string = 'category') => {
    const response = await apiClient.get('/category', {
      params: { slug },
      // Disable caching for dynamic CMS content
      headers: {
        'Cache-Control': 'no-cache',
      },
    })
    return response.data
  },

  // Shop page data
  getShopPage: async (slug: string = 'shop') => {
    const response = await apiClient.get('/shop', {
      params: { slug },
      // Disable caching for dynamic CMS content
      headers: {
        'Cache-Control': 'no-cache',
      },
    })
    return response.data
  },

  // Get active bundles
  getBundles: async () => {
    const response = await apiClient.get('/bundles')
    return response.data
  },
}

export default apiClient

