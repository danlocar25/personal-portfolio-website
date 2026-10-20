import { useEffect, useState } from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  Code2,
  Copy,
  Download,
  ExternalLink,
  Github,
  Globe,
  GraduationCap,
  Home,
  Layers3,
  Linkedin,
  Mail,
  MapPin,
  Moon,
  Smartphone,
  Sparkles,
  Sun,
  Wifi,
} from 'lucide-react'
import { useTheme } from '../hooks/useTheme'
import { profile } from '../data/profile'
import { projects } from '../data/projects'
import { experiences } from '../data/experience'
import { skillGroups } from '../data/skills'
import { education, certifications } from '../data/education'
import { MascotPet } from '../components/MascotPet'

const tabs = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'work', label: 'Work', icon: BriefcaseBusiness },
  { id: 'projects', label: 'Projects', icon: Layers3 },
  { id: 'stack', label: 'Stack', icon: Code2 },
  { id: 'profile', label: 'Profile', icon: Smartphone },
] as const
type Screen = (typeof tabs)[number]['id']
const screenTitles: Record<Screen, string> = {
  home: 'Overview',
  work: 'Experience',
  projects: 'Projects',
  stack: 'Toolkit',
  profile: 'About me',
}

function getScreen(): Screen {
  const hash = window.location.hash.slice(1)
  return tabs.some((tab) => tab.id === hash) ? (hash as Screen) : 'home'
}

function AppLink({
  screen,
  children,
  className = '',
}: {
  screen: Screen
  children: React.ReactNode
  className?: string
}) {
  return (
    <a className={className} href={`#${screen}`}>
      {children}
    </a>
  )
}

function Nav({ screen }: { screen: Screen }) {
  return (
    <nav className="app-nav" aria-label="Main navigation">
      {tabs.map(({ id, label, icon: Icon }) => (
        <AppLink
          key={id}
          screen={id}
          className={`nav-item ${screen === id ? 'active' : ''}`}
        >
          <span className="nav-icon">
            <Icon size={21} strokeWidth={screen === id ? 2.4 : 1.9} />
          </span>
          <span>{label}</span>
        </AppLink>
      ))}
    </nav>
  )
}

function ScreenHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description: string
}) {
  return (
    <div className="screen-heading">
      <div className="eyebrow">
        <span className="eyebrow-dot" /> {eyebrow}
      </div>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  )
}

function HomeScreen() {
  return (
    <div className="screen-content home-screen">
      <div className="home-intro">
        <div>
          <span className="welcome-label">
            <Sparkles size={15} /> SOFTWARE ENGINEER · ANDROID DEVELOPER
          </span>
          <h1>
            Software Engineer for
            <br />
            <span>Android, iOS &amp; Web.</span>
          </h1>
          <p>
            Hey, I’m Dan Carlo—a Software Engineer with{' '}
            <strong>Android development</strong> as my primary specialization
            and current full-time professional experience. Alongside commercial
            Android systems, I also build <strong>iOS mobile apps</strong> and{' '}
            <strong>websites</strong>.
          </p>
          <div className="hero-glass-pills" aria-label="Core platforms">
            <span>Android</span>
            <span>Kotlin &amp; Java</span>
            <span>iOS Mobile Apps</span>
            <span>Websites &amp; Web Apps</span>
          </div>
          <div className="home-actions">
            <AppLink screen="work" className="primary-action">
              View experience <ArrowUpRight size={18} />
            </AppLink>
            <a
              className="text-action"
              href="/resume.pdf"
              download="Dan-Carlo-Magpantay-Resume.pdf"
            >
              Download résumé <Download size={17} />
            </a>
          </div>
        </div>
        <div className="home-portrait">
          <div className="portrait-orbit" />
          <div className="portrait-glass-halo" />
          <img src="/profile.webp" alt="Dan Carlo Magpantay" />
          <span
            className="portrait-floating-chip chip-top-left"
            aria-hidden="true"
          >
            <Smartphone size={13} /> Android · iOS · Web
          </span>
          <span className="portrait-tag">
            <span className="online-dot" /> Open to opportunities
          </span>
        </div>
      </div>
      <div className="dashboard-grid">
        <AppLink screen="work" className="dashboard-card work-card">
          <div className="card-top">
            <span className="card-icon">
              <BriefcaseBusiness size={22} />
            </span>
            <ArrowUpRight size={20} />
          </div>
          <span className="card-kicker">EXPERIENCE</span>
          <h2>
            Android at the core.
            <br />
            Mobile &amp; web ready.
          </h2>
          <p>
            Full-time Android Developer building commercial POS systems and
            integrations, with experience in web and cross-platform apps.
          </p>
          <span className="card-footer">
            Explore experience <ArrowRight size={17} />
          </span>
        </AppLink>
        <AppLink screen="projects" className="dashboard-card project-preview">
          <div className="card-top">
            <span className="card-icon">
              <Layers3 size={22} />
            </span>
            <ArrowUpRight size={20} />
          </div>
          <span className="card-kicker">FEATURED PROJECT</span>
          <h2>Coffeetect</h2>
          <p>
            Machine learning meets Android to help identify coffee leaf
            diseases.
          </p>
          <span className="project-mini-image">
            <img src="/coffeetect.jpeg" alt="" />
          </span>
          <span className="card-footer">
            View project <ArrowRight size={17} />
          </span>
        </AppLink>
        <AppLink screen="stack" className="dashboard-card stack-preview">
          <div className="card-top">
            <span className="card-icon">
              <Code2 size={22} />
            </span>
            <ArrowUpRight size={20} />
          </div>
          <span className="card-kicker">TECH STACK</span>
          <h2>Android, iOS &amp; Web.</h2>
          <div className="stack-chips">
            <span>Kotlin &amp; Java</span>
            <span>Android SDK</span>
            <span>iOS</span>
            <span>React &amp; Web</span>
          </div>
          <span className="card-footer">
            See the stack <ArrowRight size={17} />
          </span>
        </AppLink>
      </div>
    </div>
  )
}

function WorkScreen() {
  const [expanded, setExpanded] = useState<string | null>(null)

  return (
    <div className="screen-content">
      <ScreenHeading
        eyebrow="EXPERIENCE / 01"
        title="Work experience."
        description="Currently working full-time as an Android Developer engineering commercial POS systems and integrations, alongside prior experience building web software."
      />
      <div className="work-list">
        {experiences.map((item, index) => {
          const isExpanded = expanded === item.company
          const contributions = isExpanded
            ? item.contributions
            : item.contributions.slice(0, 5)
          return (
            <article
              className="work-panel"
              id={`work-role-${index}`}
              key={item.company}
            >
              <div className="work-panel-head">
                <div className="company-icon">
                  {item.logo ? (
                    <img src={item.logo} alt="" />
                  ) : (
                    <BriefcaseBusiness size={22} />
                  )}
                </div>
                <div className="work-title">
                  <span className="tiny-label">
                    {index === 0 ? 'CURRENT ROLE' : 'PREVIOUS ROLE'}
                  </span>
                  <h2>{item.role}</h2>
                  <p>
                    {item.company} <span>· {item.employmentType}</span>
                  </p>
                </div>
                <span className="work-period">{item.period}</span>
              </div>
              <div className="work-meta">
                <span>
                  <MapPin size={15} /> {item.location} · {item.workMode}
                </span>
                <span>{item.duration}</span>
              </div>
              <div className="work-body">
                <h3>Key contributions</h3>
                <ul id={`work-details-${index}`}>
                  {contributions.map((contribution) => (
                    <li key={contribution}>{contribution}</li>
                  ))}
                </ul>
                {item.contributions.length > 5 && (
                  <button
                    className="show-more"
                    type="button"
                    aria-expanded={isExpanded}
                    aria-controls={`work-details-${index}`}
                    onClick={() =>
                      setExpanded(isExpanded ? null : item.company)
                    }
                  >
                    {isExpanded
                      ? 'Show less'
                      : `Show all ${item.contributions.length} contributions`}{' '}
                    <ChevronDown size={17} />
                  </button>
                )}
              </div>
              <div className="tag-row">
                {item.technologies.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}

function ProjectsScreen() {
  return (
    <div className="screen-content">
      <ScreenHeading
        eyebrow="PROJECTS / 02"
        title="Featured project."
        description="A closer look at my public Android project, alongside the commercial Android systems, iOS mobile apps, and websites I build."
      />
      {projects.map((project) => (
        <article className="project-feature" key={project.name}>
          <div className="project-art">
            <div className="project-art-glow" />
            <div className="project-device">
              <div className="device-camera" />
              <div className="device-image">
                <img src={project.image} alt={project.imageAlt} />
              </div>
              <div className="device-bottom" />
            </div>
            <span className="art-label">ANDROID APP</span>
          </div>
          <div className="project-info">
            <span className="tiny-label">
              {project.type} · {project.period}
            </span>
            <h2>{project.name}</h2>
            <p>{project.description}</p>
            <h3>Key features</h3>
            <div className="project-feature-options">
              {project.features.map((feature) => (
                <div className="project-feature-item" key={feature}>
                  <span className="project-feature-check">
                    <Check size={15} />
                  </span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            <div className="tag-row">
              {project.technologies.map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>
            {project.repository && (
              <div className="project-source-actions">
                <a
                  className="primary-action repository-action"
                  href={project.repository}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github size={18} /> View source code{' '}
                  <ExternalLink size={17} />
                </a>
              </div>
            )}
          </div>
        </article>
      ))}
    </div>
  )
}

function StackScreen() {
  const icons = [Smartphone, Layers3, Globe, Wifi]

  return (
    <div className="screen-content">
      <ScreenHeading
        eyebrow="STACK / 03"
        title="Tech stack & tools."
        description="The languages, frameworks, and tools I use across Android development, iOS mobile applications, websites, and integrations."
      />
      <div className="stack-grid">
        {skillGroups.map((group, index) => {
          const Icon = icons[index] ?? Code2
          return (
            <article className="stack-panel" key={group.title}>
              <div className="stack-panel-top">
                <span className="stack-number">0{index + 1}</span>
                <Icon size={26} strokeWidth={1.7} />
              </div>
              <h2>{group.title}</h2>
              <p>{group.description}</p>
              <div className="tag-row">
                {group.skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}

function ProfileScreen() {
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
    <div className="screen-content">
      <ScreenHeading
        eyebrow="PROFILE / 04"
        title="About & contact."
        description="Android Developer by primary specialization and current full-time experience—also building iOS mobile applications and websites."
      />
      <div className="profile-grid">
        <div className="profile-main">
          <article className="about-panel">
            <div className="about-avatar">
              <img src="/profile.webp" alt="Portrait of Dan Carlo Magpantay" />
            </div>
            <div>
              <span className="tiny-label">
                SOFTWARE ENGINEER · ANDROID DEVELOPER
              </span>
              <h2>{profile.name}</h2>
              <p>{profile.summary}</p>
            </div>
          </article>
          <article className="education-panel">
            <div className="panel-title">
              <GraduationCap size={22} />
              <h2>Education</h2>
            </div>
            <h3>{education.degree}</h3>
            <p>{education.institution}</p>
            <div className="education-meta">
              <span>{education.location}</span>
              <span>{education.period}</span>
            </div>
          </article>
          <article className="education-panel">
            <div className="panel-title">
              <Award size={22} />
              <h2>Certifications</h2>
            </div>
            <div className="cert-list">
              {certifications.map((cert) => (
                <div key={cert.title}>
                  <span>{cert.title}</span>
                  <small>{cert.issuer}</small>
                </div>
              ))}
            </div>
          </article>
        </div>
        <aside className="contact-panel">
          <span className="contact-symbol">
            <Mail size={25} />
          </span>
          <span className="tiny-label">LET’S CONNECT</span>
          <h2>
            Get in
            <br />
            touch.
          </h2>
          <p>
            Whether you’re hiring an Android developer or software engineer, or
            need an Android app, iOS mobile application, or website built, I’d
            love to hear from you.
          </p>
          <a className="contact-mail" href={`mailto:${profile.email}`}>
            Send an email <ArrowUpRight size={18} />
          </a>
          <button
            type="button"
            className="copy-email"
            onClick={copyEmail}
            aria-label={copied ? 'Email copied' : 'Copy email address'}
          >
            <span>{profile.email}</span>
            {copied ? <Check size={17} /> : <Copy size={17} />}
          </button>
          <div className="social-links">
            <a
              href={profile.socials[0].url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github size={18} /> GitHub <ArrowUpRight size={15} />
            </a>
            <a
              href={profile.socials[1].url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin size={18} /> LinkedIn <ArrowUpRight size={15} />
            </a>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default function App() {
  const [screen, setScreen] = useState<Screen>(getScreen)
  const { theme, toggleTheme } = useTheme()
  useEffect(() => {
    const update = () => {
      setScreen(getScreen())
      document.querySelector('.app-main')?.scrollTo(0, 0)
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', update)
    return () => window.removeEventListener('hashchange', update)
  }, [])
  useEffect(() => {
    document.title = `${screenTitles[screen]} · Dan Carlo Magpantay`
  }, [screen])
  return (
    <div className="app-shell">
      <div className="ambient-canvas" aria-hidden="true">
        <div className="ambient-orb orb-1" />
        <div className="ambient-orb orb-2" />
        <div className="ambient-orb orb-3" />
        <div className="ambient-orb orb-4" />
        <div className="ambient-grid" />
      </div>
      <button
        className="skip-link"
        type="button"
        onClick={() => document.getElementById('main-content')?.focus()}
      >
        Skip to content
      </button>
      <aside className="side-rail">
        <AppLink screen="home" className="app-brand">
          <span className="brand-glyph">
            D<span>.</span>
          </span>
          <span className="brand-copy">
            Dan Carlo<small>SOFTWARE ENGINEER · ANDROID</small>
          </span>
        </AppLink>
        <p className="rail-label">EXPLORE</p>
        <Nav screen={screen} />
        <div className="rail-bottom">
          <span className="rail-available">
            <span className="online-dot" /> Available for opportunities
          </span>
          <a href="/resume.pdf" download="Dan-Carlo-Magpantay-Resume.pdf">
            <Download size={18} /> Résumé <ArrowUpRight size={15} />
          </a>
        </div>
      </aside>
      <div className="app-area">
        <header className="app-topbar">
          <div className="mobile-brand">
            <span className="brand-glyph">
              D<span>.</span>
            </span>
            <span>Dan Carlo</span>
          </div>
          <div className="breadcrumb">
            <span>PORTFOLIO</span>
            <span className="breadcrumb-slash">/</span>
            <strong>{screenTitles[screen]}</strong>
          </div>
          <div className="topbar-actions">
            <span className="topbar-status">
              <span className="online-dot" /> Open to work
            </span>
            <button
              type="button"
              className="topbar-icon"
              onClick={(event) =>
                toggleTheme({ x: event.clientX, y: event.clientY })
              }
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <AppLink screen="profile" className="topbar-avatar">
              <img src="/profile.webp" alt="Profile" />
            </AppLink>
          </div>
        </header>
        <main className="app-main" id="main-content" tabIndex={-1}>
          {screen === 'home' && <HomeScreen />}
          {screen === 'work' && <WorkScreen />}
          {screen === 'projects' && <ProjectsScreen />}
          {screen === 'stack' && <StackScreen />}
          {screen === 'profile' && <ProfileScreen />}
        </main>
      </div>
      <div className="bottom-nav">
        <Nav screen={screen} />
      </div>
      <MascotPet />
    </div>
  )
}
