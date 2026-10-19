import { useEffect, useRef, useState } from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  Contact,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  Code2,
  Copy,
  Download,
  ExternalLink,
  Github,
  GraduationCap,
  Home,
  Layers3,
  Linkedin,
  Mail,
  MapPin,
  Moon,
  Search,
  Smartphone,
  Sparkles,
  Sun,
  Wifi,
  X,
} from 'lucide-react'
import { useTheme } from '../hooks/useTheme'
import { profile } from '../data/profile'
import { projects } from '../data/projects'
import { experiences } from '../data/experience'
import { skillGroups } from '../data/skills'
import { education, certifications } from '../data/education'
import { CommandPalette } from '../components/CommandPalette'
import { PlatformPlayground } from '../components/PlatformPlayground'
import { ArchitectureExplorer } from '../components/ArchitectureExplorer'

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
  const [visitorPath, setVisitorPath] = useState<
    'hiring' | 'builder' | 'curious'
  >('builder')
  const routes = {
    hiring: {
      title: 'Hiring someone for a mobile team?',
      description:
        'Start with my day-to-day work, then reach out if the fit looks right.',
      links: [
        { screen: 'work' as Screen, label: 'Review experience' },
        { screen: 'profile' as Screen, label: 'Get in touch' },
      ],
    },
    builder: {
      title: 'Building a mobile product yourself?',
      description:
        'Explore the tools I use and a project that puts them to work.',
      links: [
        { screen: 'stack' as Screen, label: 'Explore the toolkit' },
        { screen: 'projects' as Screen, label: 'See a project' },
      ],
    },
    curious: {
      title: 'Just curious about what I make?',
      description:
        'Take a quick tour through a project and the person behind it.',
      links: [
        { screen: 'projects' as Screen, label: 'Browse projects' },
        { screen: 'profile' as Screen, label: 'Meet Dan Carlo' },
      ],
    },
  }
  const activeRoute = routes[visitorPath]

  return (
    <div className="screen-content home-screen">
      <div className="home-intro">
        <div>
          <span className="welcome-label">
            <Sparkles size={15} /> WELCOME TO MY SPACE
          </span>
          <h1>
            Building for
            <br />
            <span>Android &amp; iOS.</span>
          </h1>
          <p>
            Hey, I’m Dan Carlo. I build reliable mobile software, from platform
            experiences to shared-code apps with Kotlin Multiplatform and
            React Native.
          </p>
          <div className="home-actions">
            <AppLink screen="projects" className="primary-action">
              Explore my work <ArrowUpRight size={18} />
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
          <img src="/profile.webp" alt="Dan Carlo Magpantay" />
          <span className="portrait-tag">
            <span className="online-dot" /> Open to opportunities
          </span>
        </div>
      </div>
      <section className="home-pathfinder" aria-labelledby="pathfinder-title">
        <div className="pathfinder-topline">
          <div>
            <span className="tiny-label">A QUICK WAY IN</span>
            <h2 id="pathfinder-title">What brings you here?</h2>
          </div>
          <div
            className="pathfinder-options"
            role="group"
            aria-label="Choose a portfolio route"
          >
            <button
              type="button"
              aria-pressed={visitorPath === 'hiring'}
              className={visitorPath === 'hiring' ? 'active' : ''}
              onClick={() => setVisitorPath('hiring')}
            >
              Hiring
            </button>
            <button
              type="button"
              aria-pressed={visitorPath === 'builder'}
              className={visitorPath === 'builder' ? 'active' : ''}
              onClick={() => setVisitorPath('builder')}
            >
              Building an app
            </button>
            <button
              type="button"
              aria-pressed={visitorPath === 'curious'}
              className={visitorPath === 'curious' ? 'active' : ''}
              onClick={() => setVisitorPath('curious')}
            >
              Just curious
            </button>
          </div>
        </div>
        <div className="pathfinder-route" aria-live="polite">
          <div>
            <h3>{activeRoute.title}</h3>
            <p>{activeRoute.description}</p>
          </div>
          <div className="pathfinder-links">
            {activeRoute.links.map((link) => (
              <AppLink key={link.screen} screen={link.screen}>
                {link.label} <ArrowUpRight size={15} />
              </AppLink>
            ))}
          </div>
        </div>
      </section>
      <div className="dashboard-grid">
        <AppLink screen="work" className="dashboard-card work-card">
          <div className="card-top">
            <span className="card-icon">
              <BriefcaseBusiness size={22} />
            </span>
            <ArrowUpRight size={20} />
          </div>
          <span className="card-kicker">WHAT I DO</span>
          <h2>
            Software for the
            <br />
            real world.
          </h2>
          <p>
            Mobile products for Android and iOS, with dependable business
            integrations and connected hardware.
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
          <span className="card-kicker">MY TOOLKIT</span>
          <h2>Built with purpose.</h2>
          <div className="stack-chips">
            <span>Kotlin Multiplatform</span>
            <span>React Native</span>
            <span>Android</span>
            <span>iOS</span>
          </div>
          <span className="card-footer">
            See the stack <ArrowRight size={17} />
          </span>
        </AppLink>
      </div>
      <div className="home-bottom">
        <span>
          <span className="online-dot" /> Android · iOS · Cross-platform
        </span>
        <AppLink screen="profile">
          Get to know me <ArrowUpRight size={16} />
        </AppLink>
      </div>
    </div>
  )
}

function WorkScreen() {
  const [expanded, setExpanded] = useState<string | null>(null)
  const [query, setQuery] = useState('')
  const searchTerm = query.trim().toLowerCase()
  const filteredExperiences = experiences
    .map((item, index) => ({
      item,
      index,
      contributions: searchTerm
        ? item.contributions.filter((contribution) =>
            contribution.toLowerCase().includes(searchTerm),
          )
        : expanded === item.company
          ? item.contributions
          : item.contributions.slice(0, 4),
    }))
    .filter(({ contributions }) => !searchTerm || contributions.length > 0)
  const timelineExperiences = [...filteredExperiences].reverse()

  function jumpToRole(company: string, index: number) {
    setExpanded(company)
    window.requestAnimationFrame(() => {
      const role = document.getElementById(`work-role-${index}`)
      if (!role) return
      role.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
          ? 'auto'
          : 'smooth',
        block: 'start',
      })
      role.focus({ preventScroll: true })
    })
  }

  return (
    <div className="screen-content">
      <ScreenHeading
        eyebrow="EXPERIENCE / 01"
        title="Work in the wild."
        description="Building dependable mobile software and integrations where the details matter."
      />
      <div className="experience-search">
        <Search size={18} aria-hidden="true" />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          aria-label="Search work contributions"
          placeholder="Find a contribution: APIs, POS, hardware…"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            aria-label="Clear search"
          >
            <X size={17} />
          </button>
        )}
        <span className="experience-search-count">
          {searchTerm
            ? `${filteredExperiences.length} ${filteredExperiences.length === 1 ? 'role' : 'roles'}`
            : 'Search all roles'}
        </span>
      </div>
      {timelineExperiences.length > 0 && (
        <section className="career-timeline" aria-label="Career timeline">
          <div className="career-timeline-heading">
            <span className="tiny-label">CAREER TIMELINE</span>
            <span>Choose a role to jump to its details</span>
          </div>
          <div className="career-timeline-track">
            {timelineExperiences.map(({ item, index }) => (
              <button
                className={`career-milestone ${index === 0 ? 'current' : ''}`}
                key={item.company}
                type="button"
                aria-label={`Jump to ${item.role} at ${item.company}`}
                onClick={() => jumpToRole(item.company, index)}
              >
                <span className="milestone-dot" />
                <span className="milestone-period">{item.period}</span>
                <strong>{item.role}</strong>
                <span className="milestone-company">{item.company}</span>
              </button>
            ))}
          </div>
        </section>
      )}
      <div className="work-list">
        {filteredExperiences.map(({ item, index, contributions }) => {
          const isExpanded = expanded === item.company
          return (
            <article
              className="work-panel"
              id={`work-role-${index}`}
              key={item.company}
              tabIndex={-1}
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
                <h3>What I worked on</h3>
                <ul id={`work-details-${index}`}>
                  {contributions.map((contribution) => (
                    <li key={contribution}>{contribution}</li>
                  ))}
                </ul>
                {!searchTerm && item.contributions.length > 4 && (
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
        {searchTerm && filteredExperiences.length === 0 && (
          <p className="experience-no-results">
            No contributions match “{query.trim()}”. Try a tool or task such as
            Kotlin, APIs, or printers.
          </p>
        )}
      </div>
    </div>
  )
}

function ProjectsScreen() {
  const [selectedFeature, setSelectedFeature] = useState(0)
  const featureDetails = [
    'Image processing and a convolutional neural network help identify disease in Arabica coffee leaf images.',
    'The app assesses disease severity alongside the leaf disease finding.',
    'Visual reports organize assessments into monthly and yearly views.',
  ]

  return (
    <div className="screen-content">
      <ScreenHeading
        eyebrow="PROJECTS / 02"
        title="Made to be useful."
        description="A closer look at my public work, alongside the commercial work in my experience."
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
            <span className="art-label">ANDROID APP / 001</span>
          </div>
          <div className="project-info">
            <span className="tiny-label">
              {project.type} · {project.period}
            </span>
            <h2>
              {project.name}
              <ArrowUpRight size={30} />
            </h2>
            <p>{project.description}</p>
            <h3>Explore a feature</h3>
            <div
              className="project-feature-options"
              role="group"
              aria-label={`${project.name} features`}
            >
              {project.features.map((feature, index) => (
                <button
                  className={selectedFeature === index ? 'selected' : ''}
                  key={feature}
                  type="button"
                  aria-pressed={selectedFeature === index}
                  onClick={() => setSelectedFeature(index)}
                >
                  <span className="project-feature-check">
                    <Check size={15} />
                  </span>
                  {feature}
                  <ArrowRight size={15} />
                </button>
              ))}
            </div>
            <div
              className="project-feature-detail"
              aria-live="polite"
              aria-atomic="true"
            >
              <span className="tiny-label">FEATURE 0{selectedFeature + 1}</span>
              <p>{featureDetails[selectedFeature]}</p>
            </div>
            <div className="tag-row">
              {project.technologies.map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>
            {project.repository && (
              <a
                className="primary-action repository-action"
                href={project.repository}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={18} /> View source code <ExternalLink size={17} />
              </a>
            )}
          </div>
        </article>
      ))}
    </div>
  )
}

function StackScreen() {
  const icons = [Smartphone, Layers3, Wifi, Code2]
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null)
  const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9]/g, '')
  const matchesSkill = (technologies: string[], skill: string) => {
    const selected = normalize(skill)
    return technologies.some((technology) => {
      const listedTerms = technology
        .toLowerCase()
        .split(/[^a-z0-9]+/)
        .filter(Boolean)
        .map(normalize)
      return normalize(technology) === selected || listedTerms.includes(selected)
    })
  }
  const relatedExperience = selectedSkill
    ? experiences.filter((item) =>
        matchesSkill(item.technologies, selectedSkill),
      )
    : []
  const relatedProjects = selectedSkill
    ? projects.filter((item) => matchesSkill(item.technologies, selectedSkill))
    : []

  return (
    <div className="screen-content">
      <ScreenHeading
        eyebrow="TOOLKIT / 03"
        title="The tools behind it."
        description="Technologies and workflows I use to build and maintain mobile products across Android and iOS."
      />
      <PlatformPlayground />
      <ArchitectureExplorer />
      <div className="skill-explorer-heading">
        <div>
          <span className="tiny-label">SKILL EXPLORER</span>
          <h2>See the tools in context.</h2>
        </div>
        <p>Select a skill to find the roles and projects where it appears.</p>
      </div>
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
                  <button
                    className={`skill-select-chip ${selectedSkill === skill ? 'selected' : ''}`}
                    key={skill}
                    type="button"
                    aria-pressed={selectedSkill === skill}
                    onClick={() =>
                      setSelectedSkill(selectedSkill === skill ? null : skill)
                    }
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </article>
          )
        })}
      </div>
      {selectedSkill && (
        <section className="skill-impact" aria-live="polite">
          <div className="skill-impact-heading">
            <div>
              <span className="tiny-label">SELECTED SKILL</span>
              <h3>{selectedSkill}</h3>
            </div>
            <button type="button" onClick={() => setSelectedSkill(null)}>
              Clear selection
            </button>
          </div>
          <div className="skill-impact-results">
            <div>
              <h4>Experience</h4>
              {relatedExperience.length ? (
                relatedExperience.map((item) => (
                  <a href="#work" key={item.company}>
                    <strong>{item.role}</strong><span>{item.company}</span>
                  </a>
                ))
              ) : (
                <p>No experience entry lists this skill yet.</p>
              )}
            </div>
            <div>
              <h4>Projects</h4>
              {relatedProjects.length ? (
                relatedProjects.map((item) => (
                  <a href="#projects" key={item.name}>
                    <strong>{item.name}</strong><span>{item.type}</span>
                  </a>
                ))
              ) : (
                <p>No project entry lists this skill yet.</p>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

function ProfileScreen() {
  const [copied, setCopied] = useState(false)
  const [contactSaved, setContactSaved] = useState(false)
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2500)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }
  function downloadContact() {
    const nameParts = profile.name.trim().split(/\s+/)
    const familyName = nameParts.pop() ?? ''
    const givenName = nameParts.shift() ?? ''
    const additionalNames = nameParts.join(' ')
    const escapeField = (value: string) =>
      value
        .replace(/\\/g, '\\\\')
        .replace(/\n/g, '\\n')
        .replace(/,/g, '\\,')
        .replace(/;/g, '\\;')
    const vCard = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `N:${escapeField(familyName)};${escapeField(givenName)};${escapeField(
        additionalNames,
      )};;`,
      `FN:${escapeField(profile.name)}`,
      `TITLE:${escapeField(profile.title)}`,
      `EMAIL;TYPE=INTERNET:${escapeField(profile.email)}`,
      `URL:${window.location.origin}`,
      `X-SOCIALPROFILE;TYPE=linkedin:${profile.socials[1].url}`,
      'END:VCARD',
    ].join('\r\n')
    const url = URL.createObjectURL(new Blob([vCard], { type: 'text/vcard' }))
    const link = document.createElement('a')
    link.href = url
    link.download = 'Dan-Carlo-Magpantay.vcf'
    link.click()
    window.setTimeout(() => URL.revokeObjectURL(url), 1000)
    setContactSaved(true)
    window.setTimeout(() => setContactSaved(false), 2500)
  }
  return (
    <div className="screen-content">
      <ScreenHeading
        eyebrow="PROFILE / 04"
        title="A little about me."
        description="Mobile software engineer, practical problem solver, and a believer in software that works beyond the demo."
      />
      <div className="profile-grid">
        <div className="profile-main">
          <article className="about-panel">
            <div className="about-avatar">
              <img src="/profile.webp" alt="Portrait of Dan Carlo Magpantay" />
            </div>
            <div>
              <span className="tiny-label">HELLO, I’M DAN CARLO</span>
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
            Have something
            <br />
            in mind?
          </h2>
          <p>
            Whether it’s a mobile opportunity or an engineering conversation,
            I’d love to hear from you.
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
          <button
            type="button"
            className="save-contact"
            onClick={downloadContact}
            aria-live="polite"
          >
            {contactSaved ? <Check size={17} /> : <Contact size={17} />}
            {contactSaved ? 'Contact card downloaded' : 'Save contact card'}
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
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false)
  const commandTriggerRef = useRef<HTMLButtonElement>(null)
  const { theme, toggleTheme } = useTheme()
  const closeCommandPalette = () => {
    setCommandPaletteOpen(false)
    window.requestAnimationFrame(() => commandTriggerRef.current?.focus())
  }
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
  useEffect(() => {
    const openCommandPalette = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setCommandPaletteOpen(true)
      }
    }
    window.addEventListener('keydown', openCommandPalette)
    return () => window.removeEventListener('keydown', openCommandPalette)
  }, [])
  return (
    <div className="app-shell">
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
            Dan Carlo<small>MOBILE SOFTWARE ENGINEER</small>
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
          <div className="rail-signature">
            Designed like an app.
            <br />
            Built for the web.
          </div>
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
              className="topbar-icon command-trigger"
              ref={commandTriggerRef}
              onClick={() => setCommandPaletteOpen(true)}
              aria-label="Open quick actions"
              aria-keyshortcuts="Meta+K Control+K"
              title="Quick actions · ⌘K / Ctrl K"
            >
              <Search size={19} />
            </button>
            <button
              type="button"
              className="topbar-icon"
              onClick={(event) =>
                toggleTheme({ x: event.clientX, y: event.clientY })
              }
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <Sun size={19} /> : <Moon size={19} />}
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
      <CommandPalette
        open={commandPaletteOpen}
        theme={theme}
        onClose={closeCommandPalette}
        onToggleTheme={() => toggleTheme()}
      />
    </div>
  )
}
