import 'server-only'

import { cookies } from 'next/headers'
import { Theme } from '@/themes/enum'

export const getPreferredTheme = async () => {
  const cookieStore = await cookies()
  const preferredThemeCookies = (cookieStore.get('preferred_theme')?.value ?? Theme.Auto) as Theme

  if (!Object.values(Theme).includes(preferredThemeCookies)) {
    return Theme.Auto
  }
  console.log(getPreferredTheme)
  return preferredThemeCookies
}

export default async function getTheme() {
  const cookieStore = await cookies()
  const themeCookies = (cookieStore.get('theme')?.value ?? Theme.Light) as Theme

  if (themeCookies !== Theme.Light && themeCookies !== Theme.Dark) {
    return Theme.Light
  }

  return themeCookies
}
