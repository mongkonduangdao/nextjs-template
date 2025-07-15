export interface User {
  id: string
  email: string
  password: string
  name: string
  createdAt: Date
  updatedAt: Date
  accessToken?: string
  refreshToken?: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  password: string
  name: string
}

export interface AuthResponse {
  accessToken: string
  refreshToken: string
  user: Omit<User, 'password'>
}

export interface TokenPayload {
  userId: string
  email: string
}

// Mock database type
export type MockDatabase = User[]
