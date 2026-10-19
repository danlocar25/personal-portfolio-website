export interface SocialLink {
  label: string
  url: string
}

export interface Profile {
  name: string
  title: string
  email: string
  introduction: string
  summary: string
  socials: [SocialLink, SocialLink]
}

export interface SkillGroup {
  title: string
  description: string
  skills: string[]
}

export interface Experience {
  role: string
  company: string
  employmentType: string
  period: string
  duration: string
  location: string
  workMode: string
  logo?: string
  contributions: string[]
  technologies: string[]
}

export interface Project {
  name: string
  type: string
  period: string
  description: string
  features: string[]
  technologies: string[]
  image: string
  imageAlt: string
  repository?: string
}

export interface Certification {
  issuer: string
  title: string
}
