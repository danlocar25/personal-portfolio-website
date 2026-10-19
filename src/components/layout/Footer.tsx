import { ArrowUpRight } from 'lucide-react'
import { profile } from '../../data/profile'

export function Footer() {
  return (
    <footer className="footer">
      <div className="page-container footer-inner">
        <div>
          <a className="footer-brand" href="#top">
            Dan Carlo Magpantay<span className="accent-dot">.</span>
          </a>
          <p>Mobile Software Engineer</p>
        </div>
        <div className="footer-right">
          <div className="footer-links">
            {profile.socials.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
                <ArrowUpRight size={14} />
              </a>
            ))}
            <a href={`mailto:${profile.email}`}>
              Email
              <ArrowUpRight size={14} />
            </a>
          </div>
          <p>© {new Date().getFullYear()} Dan Carlo Magpantay</p>
        </div>
      </div>
    </footer>
  )
}
