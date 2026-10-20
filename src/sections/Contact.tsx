import { useState } from 'react'
import { ArrowUpRight, Check, Copy, Github, Linkedin, Mail } from 'lucide-react'
import { Reveal } from '../components/ui/Reveal'
import { profile } from '../data/profile'

export function Contact() {
  const [copied, setCopied] = useState(false)

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2500)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  return (
    <section
      className="contact-section"
      id="contact"
      aria-labelledby="contact-title"
    >
      <div className="page-container">
        <Reveal>
          <div className="contact-card">
            <div className="contact-orbit" aria-hidden="true" />
            <p className="eyebrow">
              <span className="eyebrow-line" />
              06 / CONTACT
            </p>
            <h2 id="contact-title">
              Let’s build something
              <br />
              <em>that matters.</em>
            </h2>
            <p className="contact-description">
              Whether you’re hiring a Software Engineer or Android Developer, or
              need an Android app, iOS mobile application, or website built, I’d
              be glad to hear from you.
            </p>
            <div className="contact-actions">
              <a
                className="button contact-email"
                href={`mailto:${profile.email}`}
              >
                <Mail size={19} /> {profile.email} <ArrowUpRight size={17} />
              </a>
              <button
                className="copy-button"
                type="button"
                onClick={copyEmail}
                aria-label={copied ? 'Email copied' : 'Copy email address'}
              >
                {copied ? <Check size={19} /> : <Copy size={19} />}
                <span>{copied ? 'Copied!' : 'Copy email'}</span>
              </button>
            </div>
            <div className="contact-socials">
              <a
                href={profile.socials[0].url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={17} /> GitHub <ArrowUpRight size={15} />
              </a>
              <a
                href={profile.socials[1].url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin size={17} /> LinkedIn <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
