'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations, useLocale } from 'next-intl'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { useLoginSchema, LoginSchemaType } from '../schemas/useLoginSchema'

import LoginIcon from '@/assets/icons/Login.svg'

interface LoginFormProps {
  onSubmit: (data: LoginSchemaType) => void
}

export const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const t = useTranslations('auth.login')
  const locale = useLocale()
  const loginSchema = useLoginSchema()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
    trigger,
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  })

  useEffect(() => {
    if (isSubmitted) trigger()
  }, [locale, trigger, isSubmitted])

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <label htmlFor="email">{t('emailLabel')}</label>
        <input type="email" {...register('email')} />
        {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <label htmlFor="password">{t('passwordLabel')}</label>
        <input type="password" {...register('password')} />
        {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
      </div>
      <button
        type="submit"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          justifyContent: 'center',
          width: 'fit-content',
        }}
      >
        <LoginIcon width={16} height={16} />
        {t('loginButton')}
      </button>
    </form>
  )
}
