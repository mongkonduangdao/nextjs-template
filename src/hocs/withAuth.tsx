'use client'

import { useRouter } from 'next/navigation'
import { ComponentType } from 'react'

import PAGE_URL from '@/shared/constants/page-url'
import { useGetMe } from '@/shared/hooks/api/v1/me/useGetMe'

const withAuth = <TProps extends object>(Component: ComponentType<TProps>) => {
  const ComponentWithAuth: React.FC<TProps> = (props: TProps) => {
    const router = useRouter()
    const { data: meData, isLoading } = useGetMe()

    if (isLoading) return <p>Loading...</p>

    if (!meData) router.push(PAGE_URL.auth.login)

    return <Component {...props} />
  }

  return ComponentWithAuth
}

export default withAuth
