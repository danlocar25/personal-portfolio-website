import { useState } from 'react'
import { BriefcaseBusiness, ChevronDown, MapPin } from 'lucide-react'
import { Reveal } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'
import { experiences } from '../data/experience'
import type { Experience as ExperienceData } from '../types/portfolio'

const previewCount = 6

function ExperienceItem({
  experience,
  index,
}: {
  experience: ExperienceData
  index: number
}) {
  const [expanded, setExpanded] = useState(false)
  const hasMore = experience.contributions.length > previewCount
  const contributions = expanded
    ? experience.contributions
    : experience.contributions.slice(0, previewCount)
  const contributionsId = `experience-contributions-${index}`

  return (
    <article className="experience-item">
      <div className="experience-side">
        <span className="experience-index">0{index + 1}</span>
        <span className="experience-period">{experience.period}</span>
        <span className="experience-duration">{experience.duration}</span>
      </div>
      <div className="experience-main">
        <div className="experience-company-line">
          <span
            className={`experience-company-mark${experience.logo ? ' has-logo' : ''}`}
          >
            {experience.logo ? (
              <img src={experience.logo} alt="" loading="lazy" />
            ) : (
              <BriefcaseBusiness size={21} aria-hidden="true" />
            )}
          </span>
          <div className="experience-employer">
            <span className="experience-company">{experience.company}</span>
            <span className="experience-employment">
              {' '}
              · {experience.employmentType}
            </span>
          </div>
        </div>
        <h3>{experience.role}</h3>
        <p className="experience-location">
          <MapPin size={15} aria-hidden="true" />
          {experience.location} · {experience.workMode}
        </p>
        <p className="experience-kicker">Contributions</p>
        <ul id={contributionsId}>
          {contributions.map((contribution) => (
            <li key={contribution}>{contribution}</li>
          ))}
        </ul>
        {hasMore && (
          <button
            className="experience-expand"
            type="button"
            aria-expanded={expanded}
            aria-controls={contributionsId}
            onClick={() => setExpanded((previous) => !previous)}
          >
            {expanded
              ? 'Show fewer contributions'
              : `Show all ${experience.contributions.length} contributions`}
            <ChevronDown size={16} aria-hidden="true" />
          </button>
        )}
        <div className="experience-tags">
          {experience.technologies.map((technology) => (
            <span key={technology}>{technology}</span>
          ))}
        </div>
      </div>
    </article>
  )
}

export function Experience() {
  return (
    <section
      className="section experience-section"
      id="experience"
      aria-labelledby="experience-title"
    >
      <div className="page-container">
        <Reveal>
          <SectionHeading
            id="experience-title"
            eyebrow="03 / EXPERIENCE"
            title="Work that goes beyond the screen."
            description="Building, integrating, and supporting software in real business environments."
          />
        </Reveal>
        <div className="experience-list">
          {experiences.map((experience, index) => (
            <Reveal key={experience.company}>
              <ExperienceItem experience={experience} index={index} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
