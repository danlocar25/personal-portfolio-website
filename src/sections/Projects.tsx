import { useState } from 'react'
import { ArrowUpRight, Github } from 'lucide-react'
import { Reveal } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'
import { projects } from '../data/projects'
import type { Project } from '../types/portfolio'

function ProjectMedia({ project }: { project: Project }) {
  const [imageAvailable, setImageAvailable] = useState(true)

  return (
    <div className="project-image-wrap">
      {imageAvailable ? (
        <img
          src={project.image}
          alt={project.imageAlt}
          loading="lazy"
          onError={() => setImageAvailable(false)}
        />
      ) : (
        <span className="project-image-fallback">
          {project.name}
          <small>Project preview unavailable</small>
        </span>
      )}
      <span className="project-image-label">ANDROID / CAPSTONE PROJECT</span>
    </div>
  )
}

export function Projects() {
  return (
    <section
      className="section projects-section"
      id="projects"
      aria-labelledby="projects-title"
    >
      <div className="page-container">
        <Reveal>
          <SectionHeading
            id="projects-title"
            eyebrow="04 / PROJECTS"
            title="Selected work."
            description="A public Android project alongside commercial mobile software work and cross-platform experience."
          />
        </Reveal>
        {projects.map((project) => (
          <Reveal key={project.name}>
            <article className="project-card">
              <ProjectMedia project={project} />
              <div className="project-content">
                <div className="project-meta">
                  <span className="meta-dot" />
                  {project.type}
                  <span className="meta-separator">/</span>
                  {project.period}
                </div>
                <h3>
                  {project.name}
                  <ArrowUpRight size={30} strokeWidth={1.5} />
                </h3>
                <p>{project.description}</p>
                <div className="project-detail-label">KEY FEATURES</div>
                <ul className="project-features">
                  {project.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                <div className="project-technologies">
                  {project.technologies.map((technology) => (
                    <span key={technology}>{technology}</span>
                  ))}
                </div>
                {project.repository && (
                  <a
                    className="project-link"
                    href={project.repository}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github size={18} /> View repository{' '}
                    <ArrowUpRight size={16} />
                  </a>
                )}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
