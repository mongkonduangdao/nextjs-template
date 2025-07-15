import { NextResponse } from 'next/server'

import { USERS_MOCK as users } from '@/mocks/api/v1/auth/mock-database'
import { RegisterRequest, AuthResponse } from '@/shared/types/api/v1/auth'

export async function POST(request: Request) {
  try {
    const body: RegisterRequest = await request.json()
    const { email } = body

    // Check if user already exists
    if (users.find(user => user.email === email)) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 })
    }

    const user = users[0]

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
    console.error('Registration error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
