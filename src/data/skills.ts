import type { SkillGroup } from '../types/portfolio'

export const skillGroups: SkillGroup[] = [
  {
    title: 'Mobile platforms',
    description:
      'Building mobile experiences for Android and iOS, including shared-code apps.',
    skills: [
      'Android',
      'iOS',
      'Kotlin Multiplatform',
      'React Native',
      'Java',
      'Kotlin',
      'TypeScript',
      'Python',
      'JavaScript',
      'Android SDK',
      'Jetpack Compose',
      'XML Layouts',
    ],
  },
  {
    title: 'Architecture & data',
    description: 'Patterns and persistence for software that lasts.',
    skills: [
      'MVVM',
      'Modular development',
      'Room',
      'SQLite',
      'MySQL',
      'Kotlin Coroutines',
      'Kotlin Flow',
    ],
  },
  {
    title: 'Integrations & POS',
    description: 'Connecting apps to services and devices.',
    skills: [
      'REST APIs',
      'Retrofit',
      'OkHttp',
      'RabbitMQ',
      'JSON / Gson',
      'Payment devices',
      'Printers & scanners',
    ],
  },
  {
    title: 'Workflow & tools',
    description: 'Everyday development, debugging, and collaboration.',
    skills: [
      'Android Studio',
      'Gradle',
      'Git / GitHub',
      'GitLab / Gitea',
      'SVN',
      'Postman',
      'Firebase Crashlytics',
      'Android Profiler',
    ],
  },
]
