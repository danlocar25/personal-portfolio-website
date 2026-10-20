import { useEffect, useState } from 'react'
import { ArrowUpRight, Menu, Moon, Sun, X } from 'lucide-react'
import type { Theme } from '../../hooks/useTheme'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
]

interface HeaderProps {
  theme: Theme
  toggleTheme: () => void
}

export function Header({ theme, toggleTheme }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting)
        if (visible) setActiveSection(`#${visible.target.id}`)
      },
      { rootMargin: '-25% 0px -60% 0px' },
    )
    links.forEach(({ href }) => {
      const section = document.querySelector(href)
      if (section) observer.observe(section)
    })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [menuOpen])

  return (
    <header className="site-header">
      <div className="header-inner page-container">
        <a
          className="brand"
          href="#top"
          aria-label="Dan Carlo Magpantay, back to top"
        >
          <span className="brand-mark">
            D<span>.</span>
          </span>
          <span className="brand-name">
            Dan Carlo<span> / Software Engineer · Android Developer</span>
          </span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={activeSection === link.href ? 'is-active' : undefined}
              aria-current={
                activeSection === link.href ? 'location' : undefined
              }
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <button
            className="icon-button theme-button"
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <a className="header-contact" href="#contact">
            Let’s talk <ArrowUpRight size={15} />
          </a>
          <button
            className="icon-button mobile-menu-button"
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={
              menuOpen ? 'Close navigation menu' : 'Open navigation menu'
            }
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <nav
          className="mobile-nav"
          id="mobile-navigation"
          aria-label="Mobile navigation"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              aria-current={
                activeSection === link.href ? 'location' : undefined
              }
            >
              {link.label}
              <ArrowUpRight size={16} />
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}
