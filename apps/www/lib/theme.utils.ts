'use client'

import { useEffect } from 'react'
import { useTheme } from 'next-themes'

export function useForceDeepDark() {
  const { resolvedTheme, theme } = useTheme()

  const isDarkTheme = resolvedTheme?.includes('dark')

  useEffect(() => {
    const handleDocumentLoad = () => {
      const theme = isDarkTheme ? 'dark' : 'light'

      document.documentElement.setAttribute('data-theme', theme)
      document.documentElement.style.colorScheme = theme

      setTimeout(() => {
        document.documentElement.setAttribute('data-theme', theme)
        document.documentElement.style.colorScheme = theme
      }, 200)

      window.removeEventListener('load', handleDocumentLoad)
    }

    if (document.readyState === 'complete') {
      handleDocumentLoad()
    } else {
      window.addEventListener('load', handleDocumentLoad)
    }

    return () => {
      window.removeEventListener('load', handleDocumentLoad)
    }
  }, [resolvedTheme, theme, isDarkTheme])
}
