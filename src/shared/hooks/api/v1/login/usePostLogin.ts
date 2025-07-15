import { useMutation } from '@tanstack/react-query'

import { postLogin } from '@/shared/services/api/v1/auth/login'
import { AuthResponse, LoginRequest } from '@/shared/types/api/v1/auth'

export const usePostLogin = () => useMutation<AuthResponse, Error, LoginRequest>({ mutationFn: postLogin })
