export interface IMeParams {
  isIgnoreError?: boolean
}

export interface IMeResponse {
  user: {
    accessToken: string
    createdAt: string
    email: string
    id: string
    name: string
    password: string
    refreshToken: string
    updatedAt: string
  }
  permissions: string[]
}
