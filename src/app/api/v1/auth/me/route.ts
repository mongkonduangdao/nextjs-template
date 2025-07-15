import { NextResponse } from 'next/server'

import { USERS_MOCK as users } from '@/mocks/api/v1/auth/mock-database'

export async function GET(request: Request) {
  const accessToken = request.headers.get('Authorization')?.split(' ')[1]
  if (!accessToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const user = users.length > 0 ? users.find(user => user.accessToken === accessToken) : undefined
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  return NextResponse.json({
    user,
    permissions: ['read', 'write'],
  })
}
