import { transformMe } from './transformMe'

import { IMeResponse } from '@/shared/types/api/v1/me'

describe('transformMe', () => {
  it('should transform user data correctly with valid input', () => {
    const mockInput: IMeResponse = {
      user: {
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
        password: 'password123',
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
        accessToken: 'access-token',
        refreshToken: 'refresh-token',
      },
      permissions: ['read', 'write'],
    }

    const result = transformMe(mockInput)

    expect(result).toEqual({
      ...mockInput,
      displayName: 'Test User',
      displayEmail: 'test@example.com',
    })
  })

  it('should handle empty strings in user data gracefully', () => {
    const mockInput: IMeResponse = {
      user: {
        id: '1',
        email: '',
        name: '',
        password: 'password123',
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
        accessToken: 'access-token',
        refreshToken: 'refresh-token',
      },
      permissions: [],
    }

    const result = transformMe(mockInput)

    expect(result).toEqual({
      ...mockInput,
      displayName: '',
      displayEmail: '',
    })
  })

  it('should handle empty name with valid email', () => {
    const mockInput: IMeResponse = {
      user: {
        id: '1',
        email: 'test@example.com',
        name: '',
        password: 'password123',
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
        accessToken: 'access-token',
        refreshToken: 'refresh-token',
      },
      permissions: [],
    }

    const result = transformMe(mockInput)

    expect(result).toEqual({
      ...mockInput,
      displayName: '',
      displayEmail: 'test@example.com',
    })
  })

  it('should handle empty email with valid name', () => {
    const mockInput: IMeResponse = {
      user: {
        id: '1',
        email: '',
        name: 'Test User',
        password: 'password123',
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
        accessToken: 'access-token',
        refreshToken: 'refresh-token',
      },
      permissions: [],
    }

    const result = transformMe(mockInput)

    expect(result).toEqual({
      ...mockInput,
      displayName: 'Test User',
      displayEmail: '',
    })
  })
})
