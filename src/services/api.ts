import axios, { type AxiosInstance, AxiosError } from 'axios'
import { type MessageResponse, type HealthResponse, type ApiError } from '../types/api'

// Create axios instance with base URL from environment variables
// In development, use proxy path. In production, use full API URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'
const isProduction = import.meta.env.PROD

const apiClient: AxiosInstance = axios.create({
  baseURL: isProduction ? API_BASE_URL : '/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Error handling wrapper
const handleError = (error: AxiosError): never => {
  const apiError: ApiError = {
    error: 'API Error',
    details: error.message,
  }

  if (error.response) {
    apiError.error = `Error ${error.response.status}`
    apiError.details = error.response.statusText
  }

  throw apiError
}

// API service functions
export const apiService = {
  /**
   * Fetch message from backend
   */
  async fetchMessage(): Promise<MessageResponse> {
    try {
      const response = await apiClient.get<MessageResponse>('/api/message')
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleError(error)
      }
      throw error
    }
  },

  /**
   * Check backend health status
   */
  async getHealthStatus(): Promise<HealthResponse> {
    try {
      const response = await apiClient.get<HealthResponse>('/api/health')
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleError(error)
      }
      throw error
    }
  },
}

export default apiService
