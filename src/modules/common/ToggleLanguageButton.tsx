'use client'

import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'

export const ToggleLanguageButton = () => {
  const router = useRouter()

  const handleOnClick = () => {
    const currentLocale = Cookies.get('NEXT_LOCALE')
    const newLocale = currentLocale === 'en' ? 'th' : 'en'
    Cookies.set('NEXT_LOCALE', newLocale)
    router.refresh()
  }

  return <button onClick={handleOnClick}>Toggle language</button>
}
