import type { Project } from '../types/portfolio'

export const projects: Project[] = [
  {
    name: 'Coffeetect',
    type: 'Android capstone project',
    period: 'August 2023 — January 2024',
    description:
      'An Android application developed as a team capstone project to detect disease in Arabica coffee leaves and assess its severity using image processing and a convolutional neural network.',
    features: [
      'Coffee leaf disease detection',
      'Disease severity assessment',
      'Monthly and yearly visual reports',
    ],
    technologies: ['Java', 'Python', 'TensorFlow Lite', 'Firebase'],
    image: '/coffeetect.jpeg',
    imageAlt: 'Coffeetect logo with a coffee leaf inside a scanner frame',
    repository: 'https://github.com/danlocar25/Coffeetect.git',
  },
]
