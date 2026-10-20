import type { Experience } from '../types/portfolio'

function formatDurationFrom(startYear: number, startMonth: number): string {
  const now = new Date()
  const totalMonths = Math.max(
    1,
    (now.getFullYear() - startYear) * 12 +
      (now.getMonth() + 1 - startMonth) +
      1,
  )
  const years = Math.floor(totalMonths / 12)
  const months = totalMonths % 12
  const parts: string[] = []

  if (years > 0) {
    parts.push(`${years} ${years === 1 ? 'yr' : 'yrs'}`)
  }
  if (months > 0) {
    parts.push(`${months} ${months === 1 ? 'mo' : 'mos'}`)
  }

  return parts.join(' ')
}

export const experiences: Experience[] = [
  {
    role: 'Android Developer',
    company: 'JIMAC Incorporated',
    logo: '/jimac-logo.jpeg',
    employmentType: 'Full-time',
    period: 'Oct 2024 — Present',
    duration: formatDurationFrom(2024, 10),
    location: 'Quezon City, National Capital Region, Philippines',
    workMode: 'On-site',
    contributions: [
      'Developed, maintained, and enhanced commercial Android POS systems and business applications using Java and Kotlin.',
      'Built Android applications following MVVM architecture and Android Jetpack components, applying modular and maintainable development practices.',
      'Connected Android POS applications with backend and third-party systems using REST APIs, RabbitMQ, Retrofit, OkHttp, and JSON.',
      'Engineered Android POS-to-system API integrations, including hotel online booking and reservation management platforms.',
      'Integrated Android POS systems with SM Virtual Reality’s online booking and reservation platform to support seamless booking and transaction processing.',
      'Implemented real-time API integrations that automatically transmitted live Android POS sales transaction data to mall management systems.',
      'Architected a POS installment and support management module to manage monthly payment plans, installment terms, and technical support coverage for POS deployments.',
      'Integrated Android POS applications with printers, barcode scanners, payment devices, and other POS hardware.',
      'Implemented local data persistence using Room Database and SQLite, including database operations, entity management, and data access through Android applications.',
      'Managed asynchronous operations and reactive data flows using Kotlin Coroutines and Flow.',
      'Worked with MySQL for remote data storage and backend-integrated data management.',
      'Developed and aligned Android POS software features to meet BIR accreditation requirements, tax calculations, government-mandated discounts, and official sales reports.',
      'Used Subversion (SVN) and Gitea for source code management, version control, collaboration, and maintaining application codebases.',
      'Troubleshot production issues, resolved bugs, optimized application performance, and improved code maintainability.',
      'Collaborated with backend developers and QA teams throughout the software development lifecycle.',
    ],
    technologies: [
      'Android',
      'Kotlin',
      'Java',
      'Android SDK',
      'Jetpack Compose',
      'XML Layouts',
      'MVVM',
      'Android Jetpack',
      'REST APIs',
      'Retrofit',
      'OkHttp',
      'RabbitMQ',
      'Room / SQLite',
      'Coroutines / Flow',
      'MySQL',
      'POS hardware',
      'Android Studio',
      'Gradle',
      'SVN',
      'GitLab / Gitea',
    ],
  },
  {
    role: 'Software Developer Intern',
    company: 'Open iT',
    logo: '/openit-logo.jpeg',
    employmentType: 'Internship',
    period: 'Apr 2024 — Aug 2024',
    duration: '5 mos',
    location: 'Lucena, Calabarzon, Philippines',
    workMode: 'Hybrid',
    contributions: [
      'Developed an internal web application using Python and Django to automate hotfix processes and release note generation.',
      'Built functionality to consolidate hotfix information, merge requests, and release details into a centralized workflow.',
      'Integrated REST APIs and Redmine to retrieve and process development and project-related information.',
      'Developed interactive frontend features using jQuery, JavaScript, and Bootstrap.',
      'Worked with PostgreSQL for data storage and used Git/GitLab for version control and collaborative development.',
      'Troubleshot issues, implemented enhancements, and collaborated with developers and team members following Agile development practices.',
    ],
    technologies: [
      'Python / Django',
      'REST APIs',
      'PostgreSQL',
      'jQuery',
      'JavaScript',
      'Bootstrap',
      'Redmine',
      'Git / GitLab',
    ],
  },
]
