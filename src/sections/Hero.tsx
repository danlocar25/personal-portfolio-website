import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Bot,
  Download,
  Github,
  Linkedin,
} from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { profile } from '../data/profile'

export function Hero() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-noise" aria-hidden="true" />
      <div className="page-container hero-grid">
        <div className="hero-copy">
          <motion.div
            className="availability"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="availability-dot" /> SOFTWARE ENGINEER · ANDROID
            SPECIALIST · iOS &amp; WEB
          </motion.div>
          <motion.h1
            id="hero-title"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
          >
            Software Engineer for
            <br />
            <em>Android, iOS &amp; Web.</em>
          </motion.h1>
          <motion.p
            className="hero-intro"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.16 }}
          >
            Hi, I’m <strong>{profile.name}</strong>. {profile.introduction}
          </motion.p>
          <motion.div
            className="hero-actions"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.24 }}
          >
            <a className="button button-primary" href="#projects">
              View projects <ArrowUpRight size={17} />
            </a>
            <a
              className="button button-secondary"
              href="/resume.pdf"
              download="Dan-Carlo-Magpantay-Resume.pdf"
            >
              Download résumé <Download size={17} />
            </a>
          </motion.div>
          <motion.div
            className="hero-bottom"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <a className="hero-contact-link" href="#contact">
              Contact me <ArrowRight size={17} />
            </a>
            <div className="hero-socials" aria-label="Social profiles">
              <a
                href={profile.socials[0].url}
                aria-label="GitHub"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={19} />
              </a>
              <a
                href={profile.socials[1].url}
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin size={19} />
              </a>
            </div>
          </motion.div>
        </div>
        <motion.div
          className="hero-visual"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.13 }}
        >
          <div className="visual-ring ring-one" aria-hidden="true" />
          <div className="visual-ring ring-two" aria-hidden="true" />
          <div className="portrait-frame">
            <img
              src="/profile.webp"
              width="900"
              height="900"
              alt="Portrait of Dan Carlo Magpantay"
              fetchPriority="high"
            />
          </div>
          <div className="hero-visual-label">
            <span className="label-icon" aria-hidden="true">
              <Bot size={23} strokeWidth={1.8} />
              <span className="label-orbit" />
            </span>
            <span>
              ANDROID SPECIALIST
              <br />
              <strong>ANDROID · iOS · WEBSITES</strong>
            </span>
          </div>
          <div className="floating-cross cross-one" aria-hidden="true">
            +
          </div>
          <div className="floating-cross cross-two" aria-hidden="true">
            +
          </div>
        </motion.div>
      </div>
      <a className="scroll-cue" href="#about">
        SCROLL TO EXPLORE <ArrowDown size={14} />
      </a>
    </section>
  )
}
