import messages from './messages/en.json'

import { formats } from '@/i18n/request'

declare module 'next-intl' {
  interface AppConfig {
    Locale: 'en' | 'th'
    Messages: typeof messages
    Formats: typeof formats
  }
}
