import { Code2, Database, GitBranch, PlugZap } from 'lucide-react'
import { Reveal } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'
import { skillGroups } from '../data/skills'

const icons = [Code2, Database, PlugZap, GitBranch]

export function Skills() {
  return (
    <section
      className="section skills-section"
      id="skills"
      aria-labelledby="skills-title"
    >
      <div className="page-container">
        <Reveal>
          <SectionHeading
            id="skills-title"
            eyebrow="02 / SKILLS"
            title="A practical toolkit."
            description="Technologies and workflows I use with Android development as my primary specialization, alongside iOS mobile applications and websites."
          />
        </Reveal>
        <div className="skills-grid">
          {skillGroups.map((group, index) => {
            const Icon = icons[index] ?? Code2
            return (
              <Reveal key={group.title}>
                <article className="skill-card">
                  <div className="skill-card-top">
                    <span className="skill-icon">
                      <Icon size={22} strokeWidth={1.7} />
                    </span>
                    <span className="skill-index">0{index + 1} / 04</span>
                  </div>
                  <h3>{group.title}</h3>
                  <p>{group.description}</p>
                  <div className="skill-tags">
                    {group.skills.map((skill) => (
                      <span key={skill}>{skill}</span>
                    ))}
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
