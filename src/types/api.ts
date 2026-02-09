export interface MessageResponse {
  message: string
  timestamp: string
  status: string
}

export interface HealthResponse {
  status: string
  timestamp: string
}

export interface ApiError {
  error: string
  details?: string
}
