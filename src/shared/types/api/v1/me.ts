export interface MeResponse {
  user: {
    email: string
    firstName: string
    lastName: string
    role: string
  }
  permissions: string[]
}
