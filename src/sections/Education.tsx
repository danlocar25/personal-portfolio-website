import { Award, GraduationCap } from 'lucide-react'
import { Reveal } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'
import { certifications, education } from '../data/education'

export function Education() {
  return (
    <section
      className="section education-section"
      id="education"
      aria-labelledby="education-title"
    >
      <div className="page-container">
        <Reveal>
          <SectionHeading
            id="education-title"
            eyebrow="05 / EDUCATION"
            title="Always learning."
          />
        </Reveal>
        <div className="education-grid">
          <Reveal>
            <article className="education-card degree-card">
              <span className="education-icon">
                <GraduationCap size={23} />
              </span>
              <p className="education-overline">FORMAL EDUCATION</p>
              <h3>{education.degree}</h3>
              <p>{education.institution}</p>
              <div className="education-card-bottom">
                <span>{education.location}</span>
                <span>{education.period}</span>
              </div>
            </article>
          </Reveal>
          <Reveal>
            <div className="education-card certifications-card">
              <div className="cert-heading">
                <span className="education-icon">
                  <Award size={22} />
                </span>
                <div>
                  <p className="education-overline">CONTINUED LEARNING</p>
                  <h3>Certifications</h3>
                </div>
              </div>
              <ul>
                {certifications.map((certification) => (
                  <li key={certification.title}>
                    <span>{certification.title}</span>
                    <small>{certification.issuer}</small>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
