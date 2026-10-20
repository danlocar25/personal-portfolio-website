import { ArrowUpRight, Blocks, Cable, Smartphone } from 'lucide-react'
import { Reveal } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'
import { profile } from '../data/profile'

const focuses = [
  {
    icon: Smartphone,
    title: 'Android Development',
    detail:
      'Commercial Android POS systems, business apps, Java, Kotlin, MVVM, and Jetpack.',
  },
  {
    icon: Cable,
    title: 'iOS Apps & Websites',
    detail:
      'iOS mobile applications (KMP, React Native) and full-stack websites with React, TypeScript, and Django.',
  },
  {
    icon: Blocks,
    title: 'Connected Systems',
    detail:
      'REST APIs, POS hardware, payment gateways, and maintainable software architecture.',
  },
]

export function About() {
  return (
    <section
      className="section about-section"
      id="about"
      aria-labelledby="about-title"
    >
      <div className="page-container">
        <Reveal>
          <SectionHeading
            id="about-title"
            eyebrow="01 / ABOUT"
            title="The person behind the pixels."
          />
        </Reveal>
        <div className="about-grid">
          <Reveal className="about-lead">
            <p className="large-copy">
              I care about the details that make software{' '}
              <span>useful in the real world.</span>
            </p>
            <div className="about-rule" />
            <p>{profile.summary}</p>
            <a className="text-link" href="#experience">
              Explore my experience <ArrowUpRight size={17} />
            </a>
          </Reveal>
          <div className="focus-list">
            {focuses.map(({ icon: Icon, title, detail }, index) => (
              <Reveal key={title}>
                <div className="focus-item">
                  <span className="focus-number">0{index + 1}</span>
                  <span className="focus-icon">
                    <Icon size={22} strokeWidth={1.7} />
                  </span>
                  <div>
                    <h3>{title}</h3>
                    <p>{detail}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
