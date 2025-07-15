import { NextResponse } from 'next/server'

import { USERS_MOCK as users } from '@/mocks/api/v1/auth/mock-database'
import { LoginRequest, AuthResponse } from '@/shared/types/api/v1/auth'

export async function POST(request: Request) {
  try {
    const body: LoginRequest = await request.json()
    const { email, password } = body

    // Find user
    const user = users.length > 0 ? users.find(user => user.email === email) : undefined
    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    // Verify password
    const isValidPassword = password === user.password
    if (!isValidPassword) {
      return NextResponse.json({ error: 'User credentials are incorrect' }, { status: 401 })
    }

    // Generate tokens
    const accessToken = user.accessToken
    const refreshToken = user.refreshToken

    const response: AuthResponse = {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
