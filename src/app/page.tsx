'use client'

import { useTranslations } from 'next-intl'

import withAuth from '@/hocs/withAuth'
import { transformMe } from '@/modules/index/transforms/transformMe'
import { ITransformMe } from '@/modules/index/types/transforms/transformMe'
import { useGetMe } from '@/shared/hooks/api/v1/me/useGetMe'

const HomePage = () => {
  const t = useTranslations('index')
  const { data: meData, isLoading } = useGetMe<ITransformMe>({ select: transformMe })
  const { displayEmail, displayName } = meData ?? {}

  if (isLoading) return <p>Loading...</p>
  if (!meData) return null

  return (
    <div>
      <p>
        {t('emailLabel')}: {displayEmail}
      </p>
      <p>
        {t('nameLabel')}: {displayName}
      </p>
    </div>
  )
}

export default withAuth(HomePage)
