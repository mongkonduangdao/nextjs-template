import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'
import Cookies from 'js-cookie'

import PAGE_URL from '@/shared/constants/page-url'
import REQUEST_URL from '@/shared/services/requestUrl'

declare module 'axios' {
  export interface AxiosRequestConfig {
    requiredAuth?: boolean
    _retry?: boolean
  }
}

let isRefreshing = false
let failedQueue: Array<{
  resolve: (value?: unknown) => void
  reject: (reason?: unknown) => void
}> = []

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) prom.reject(error)
    else prom.resolve(token)
  })
  failedQueue = []
}

const handleQueuedRequest = async (originalRequest: AxiosRequestConfig, axiosInstance: AxiosInstance) => {
  return new Promise((resolve, reject) => {
    failedQueue.push({ resolve, reject })
  })
    .then(token => {
      if (originalRequest.headers) {
        originalRequest.headers.Authorization = `Bearer ${token}`
      }
      return axiosInstance(originalRequest)
    })
    .catch(err => {
      return Promise.reject(err instanceof Error ? err : new Error(String(err)))
    })
}

const refreshAccessToken = async () => {
  const refreshToken = Cookies.get('refreshToken')
  if (!refreshToken) {
    throw new Error('No refresh token available')
  }

  const response = await axios.post(REQUEST_URL.v1.auth.refresh, { refreshToken })
  return response.data
}

const updateTokens = (tokens: { accessToken: string; newRefreshToken: string }) => {
  Cookies.set('accessToken', tokens.accessToken, { secure: true, sameSite: 'strict' })
  Cookies.set('refreshToken', tokens.newRefreshToken, { secure: true, sameSite: 'strict' })
}

const handleRefreshError = () => {
  Cookies.remove('accessToken')
  Cookies.remove('refreshToken')
  window.location.href = PAGE_URL.auth.login
}

const handleError = (error: unknown): Promise<never> => {
  return Promise.reject(error instanceof Error ? error : new Error(String(error)))
}

const shouldRefreshToken = (error: AxiosError, request: AxiosRequestConfig): boolean => {
  return error.response?.status === 401 && !request._retry
}

export const setupAxiosInterceptors = (axiosInstance: AxiosInstance) => {
  // Request interceptor
  axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    if (config.requiredAuth === false) return config

    const token = Cookies.get('accessToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  }, handleError)

  // Response interceptor
  axiosInstance.interceptors.response.use(
    response => response,
    async (error: AxiosError) => {
      const originalRequest = error.config
      if (!originalRequest) {
        return handleError(error)
      }

      if (originalRequest.requiredAuth === false) {
        return handleError(error)
      }

      if (!shouldRefreshToken(error, originalRequest)) {
        return handleError(error)
      }

      if (isRefreshing) {
        return handleQueuedRequest(originalRequest, axiosInstance)
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        const tokens = await refreshAccessToken()
        updateTokens(tokens)

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${tokens.accessToken}`
        }

        processQueue(null, tokens.accessToken)
        return axiosInstance(originalRequest)
      } catch (refreshError) {
        processQueue(refreshError instanceof Error ? refreshError : new Error('Refresh token failed'), null)
        handleRefreshError()
        return handleError(refreshError)
      } finally {
        isRefreshing = false
      }
    },
  )

  return axiosInstance
}
