const REQUEST_URL = {
  v1: {
    auth: {
      login: '/v1/auth/login',
      register: '/v1/auth/register',
      logout: '/v1/auth/logout',
      refresh: '/v1/auth/refresh',
      me: '/v1/auth/me',
    },
  },
} as const

export default REQUEST_URL
