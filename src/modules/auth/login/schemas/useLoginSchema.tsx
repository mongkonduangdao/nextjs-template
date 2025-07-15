import { useTranslations } from 'next-intl'
import { DefaultValues } from 'react-hook-form'
import { z } from 'zod'

export const useLoginSchema = () => {
  const t = useTranslations('validation')

  return z.object({
    email: z.string().email({ message: t('email') }),
    password: z.string().min(1, { message: t('password') }),
  })
}

export type LoginSchemaType = z.infer<ReturnType<typeof useLoginSchema>>

export const loginSchemaDefaultValues: DefaultValues<LoginSchemaType> = {
  email: '',
  password: '',
}
