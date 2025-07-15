import { NextResponse } from 'next/server'

import { USERS_MOCK as users } from '@/mocks/api/v1/auth/mock-database'
import { AuthResponse } from '@/shared/types/api/v1/auth'

export async function POST(request: Request) {
  try {
    const { refreshToken } = await request.json()

    if (!refreshToken) {
      return NextResponse.json({ error: 'Refresh token is required' }, { status: 400 })
    }

    try {
      // Find user
      const user = users.length > 0 ? users.find(user => user.accessToken === refreshToken) : undefined
      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 })
      }

      // Generate new tokens
      const newAccessToken = user.accessToken
      const newRefreshToken = user.refreshToken

      const response: AuthResponse = {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      }

      return NextResponse.json(response)
    } catch {
      return NextResponse.json({ error: 'Invalid refresh token' }, { status: 401 })
    }
  } catch (error) {
    console.error('Refresh token error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
