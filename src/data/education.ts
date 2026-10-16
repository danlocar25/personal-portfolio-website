import type { Certification } from '../types/portfolio'

export const education = {
  degree: 'Bachelor of Science in Information Technology',
  institution: 'College of Sciences, Technology and Communications Inc.',
  location: 'Sariaya, Quezon Province',
  period: '2020 — 2024',
}

export const certifications: Certification[] = [
  { issuer: 'Microsoft', title: 'Career Essentials in Software Development' },
  { issuer: 'DICT', title: 'Basic Level of Software Engineering' },
  { issuer: 'freeCodeCamp', title: 'Machine Learning with Python' },
  { issuer: 'freeCodeCamp', title: 'Foundational C# with Microsoft' },
  {
    issuer: 'freeCodeCamp',
    title: 'JavaScript Algorithms and Data Structures',
  },
]
