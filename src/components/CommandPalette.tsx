import { useEffect, useMemo, useRef, useState } from 'react'
import {
  ArrowRight,
  BriefcaseBusiness,
  Code2,
  Download,
  House,
  Layers3,
  Mail,
  Moon,
  Search,
  Smartphone,
  Sun,
} from 'lucide-react'
import type { Theme } from '../hooks/useTheme'
import { profile } from '../data/profile'

const destinations = [
  { id: 'home', label: 'Home', icon: House, keywords: 'overview start' },
  {
    id: 'work',
    label: 'Experience',
    icon: BriefcaseBusiness,
    keywords: 'career jobs history',
  },
  {
    id: 'projects',
    label: 'Projects',
    icon: Layers3,
    keywords: 'portfolio code apps',
  },
  {
    id: 'stack',
    label: 'Toolkit',
    icon: Code2,
    keywords: 'skills technology tools',
  },
  {
    id: 'profile',
    label: 'Profile & contact',
    icon: Smartphone,
    keywords: 'about email connect',
  },
] as const

interface CommandPaletteProps {
  open: boolean
  theme: Theme
  onClose: () => void
  onToggleTheme: () => void
}

export function CommandPalette({
  open,
  theme,
  onClose,
  onToggleTheme,
}: CommandPaletteProps) {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const commands = useMemo(
    () => [
      ...destinations.map((destination) => ({
        id: destination.id,
        label: `Go to ${destination.label}`,
        detail: destination.keywords,
        icon: destination.icon,
        run: () => {
          window.location.hash = destination.id
          onClose()
        },
      })),
      {
        id: 'theme',
        label: `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`,
        detail: 'appearance color display',
        icon: theme === 'dark' ? Sun : Moon,
        run: () => {
          onToggleTheme()
          onClose()
        },
      },
      {
        id: 'resume',
        label: 'Download résumé',
        detail: 'cv pdf experience work',
        icon: Download,
        run: () => {
          const link = document.createElement('a')
          link.href = '/resume.pdf'
          link.download = 'Dan-Carlo-Magpantay-Resume.pdf'
          link.click()
          onClose()
        },
      },
      {
        id: 'email',
        label: 'Send an email',
        detail: 'contact message hire',
        icon: Mail,
        run: () => {
          window.location.href = `mailto:${profile.email}`
          onClose()
        },
      },
    ],
    [onClose, onToggleTheme, theme],
  )

  const filteredCommands = commands.filter((command) =>
    `${command.label} ${command.detail}`
      .toLowerCase()
      .includes(query.trim().toLowerCase()),
  )

  useEffect(() => {
    if (!open) return
    setQuery('')
    setSelected(0)
    inputRef.current?.focus()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [open])

  useEffect(() => {
    setSelected(0)
  }, [query])

  if (!open) return null

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setSelected((current) =>
        filteredCommands.length ? (current + 1) % filteredCommands.length : 0,
      )
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setSelected((current) =>
        filteredCommands.length
          ? (current - 1 + filteredCommands.length) % filteredCommands.length
          : 0,
      )
    } else if (event.key === 'Enter') {
      event.preventDefault()
      filteredCommands[selected]?.run()
    } else if (event.key === 'Escape') {
      onClose()
    } else if (event.key === 'Tab') {
      const focusable = event.currentTarget.querySelectorAll<HTMLElement>(
        'input, button:not(:disabled)',
      )
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last?.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first?.focus()
      }
    }
  }

  return (
    <div
      className="command-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
      onKeyDown={handleKeyDown}
    >
      <section
        className="command-palette"
        role="dialog"
        aria-modal="true"
        aria-labelledby="command-title"
      >
        <h2 className="visually-hidden" id="command-title">
          Quick actions
        </h2>
        <div className="command-search">
          <Search size={19} aria-hidden="true" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Where would you like to go?"
            aria-label="Search pages and actions"
            aria-controls="command-results"
            aria-activedescendant={
              filteredCommands[selected]
                ? `command-${filteredCommands[selected].id}`
                : undefined
            }
          />
          <kbd>ESC</kbd>
        </div>
        <p className="command-hint">JUMP TO A SECTION OR RUN AN ACTION</p>
        <div className="command-results" id="command-results" role="listbox">
          {filteredCommands.length ? (
            filteredCommands.map((command, index) => {
              const Icon = command.icon
              return (
                <button
                  className={`command-option ${selected === index ? 'selected' : ''}`}
                  id={`command-${command.id}`}
                  key={command.id}
                  type="button"
                  role="option"
                  aria-selected={selected === index}
                  onMouseEnter={() => setSelected(index)}
                  onClick={command.run}
                >
                  <span className="command-option-icon">
                    <Icon size={18} />
                  </span>
                  <span>{command.label}</span>
                  {selected === index ? <ArrowRight size={16} /> : null}
                </button>
              )
            })
          ) : (
            <p className="command-empty">No matching pages or actions.</p>
          )}
        </div>
        <footer className="command-footer">
          <span>
            <kbd>↑</kbd> <kbd>↓</kbd> to navigate
          </span>
          <span>
            <kbd>↵</kbd> to select
          </span>
          <span className="command-brand">
            D<span>.</span>
          </span>
        </footer>
      </section>
    </div>
  )
}
