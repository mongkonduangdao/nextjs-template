'use client'

import Cookies from 'js-cookie'
import { useState } from 'react'

import { LoginForm } from '@/modules/auth/login/components/LoginForm'
import { LoginSchemaType } from '@/modules/auth/login/schemas/useLoginSchema'
import { usePostLogin } from '@/shared/hooks/api/v1/login/usePostLogin'
import { AuthResponse } from '@/shared/types/api/v1/auth'

export default function LoginPage() {
  const { mutate: postLogin } = usePostLogin()
  const [error, setError] = useState<Error | null>(null)

  const onSuccess = (data: AuthResponse) => {
    Cookies.set('accessToken', data.accessToken)
    Cookies.set('refreshToken', data.refreshToken)
    window.location.href = '/'
  }

  const onError = (error: Error) => {
    console.error(error)
    setError(error)
  }

  const onSubmit = (data: LoginSchemaType) => {
    postLogin(data, { onSuccess, onError })
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <LoginForm onSubmit={onSubmit} />
      {error && <p style={{ color: 'red' }}>{error.message}</p>}
    </div>
  )
}
