import { flushSync } from 'react-dom'
import { useLayoutEffect, useState } from 'react'

export type Theme = 'light' | 'dark'

function getInitialTheme(): Theme {
  const currentTheme = document.documentElement.dataset.theme
  return currentTheme === 'dark' ? 'dark' : 'light'
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', theme === 'dark' ? '#101813' : '#f4f5f1')
    try {
      window.localStorage.setItem('portfolio-theme', theme)
    } catch {
      // The toggle still works when browser storage is unavailable.
    }
  }, [theme])

  const toggleTheme = (origin?: { x: number; y: number }) => {
    const nextTheme = theme === 'light' ? 'dark' : 'light'
    const updateTheme = () => flushSync(() => setTheme(nextTheme))
    const documentWithTransition = document as Document & {
      startViewTransition?: (callback: () => void) => {
        finished: Promise<void>
      }
    }

    if (
      !documentWithTransition.startViewTransition ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setTheme(nextTheme)
      return
    }

    const root = document.documentElement
    root.style.setProperty('--theme-origin-x', `${origin?.x ?? innerWidth / 2}px`)
    root.style.setProperty('--theme-origin-y', `${origin?.y ?? innerHeight / 2}px`)

    try {
      const transition = documentWithTransition.startViewTransition(updateTheme)
      transition.finished.then(
        () => {
          root.style.removeProperty('--theme-origin-x')
          root.style.removeProperty('--theme-origin-y')
        },
        () => {
          root.style.removeProperty('--theme-origin-x')
          root.style.removeProperty('--theme-origin-y')
        },
      )
    } catch {
      root.style.removeProperty('--theme-origin-x')
      root.style.removeProperty('--theme-origin-y')
      setTheme(nextTheme)
    }
  }

  return {
    theme,
    toggleTheme,
  }
}
