import { obfuscate } from '../helpers/server/obfuscate.ts'
import { links } from './common.tsx'
import { Translations } from './typing.ts'

export const en: Translations = {
  metadata: {
    title: "Renaud N'zaou",
    keywords: [
      'developer',
      'fullstack',
      'engineer',
      'react',
      'angular',
      'rust',
      'nodejs',
      'profile',
      'resume',
      'cv',
      'renaud',
      "n'zaou",
    ],
    description: 'Senior fullstack developer and penetration tester.',
  },
  contact: {
    heading: 'Contact information',
    phoneNumber: {
      label: 'Phone number',
      value: obfuscate('+33.6.49.93.91.51'),
    },
    email: {
      label: 'Email address',
      value: obfuscate('nzaou.renaud@gmail.com'),
    },
    location: {
      label: 'Location',
      value: 'Lyon, France',
    },
    showButton: 'Show hidden fields',
    hidden: 'Hidden',
  },
  header: {
    heading: 'Developer, Penetration tester',
    localeSelectors: {
      en: 'Translate to english',
      fr: 'Traduire en français',
    },
    introduction: (age) => <>{age} years old, from France, Lyon</>,
  },
  profile: {
    heading: 'Profile',
    points: {
      polyglotProgrammer: 'Polyglot programmer',
      securityOriented: 'Security oriented',
      wideRangeOfITSkills:
        'Wide range of IT skills (web, devops, system, networking)',
    },
  },
  skills: {
    heading: 'Skills',
    programming: {
      label: 'Programming',
      content:
        'Rust (Actix, Tauri), Typescript/Javascript (Express, Nest, Angular, React, Deno), HTMX, C/C++, Java (Spring Boot), Scala, Python, Android, PHP, Bash',
    },
    architecture: {
      label: 'Architecture',
      content:
        'Azure Cloud, AWS, Terraform, Docker w/k8s, Ansible, Microservices, Serverless, REST, gRPC, GraphQL',
    },
    cicd: {
      label: 'CI/CD',
      content: 'Github, Gitlab, Drone, Jenkins, Nx, Turborepo',
    },
    security: {
      label: 'Security',
      content:
        'Web application auditing and dynamic testing, Cryptography, Risk analysis, OAuth2/OIDC/SAML',
    },
    languages: {
      label: 'Languages',
      content: 'Native French, English (C1)',
    },
  },
  career: {
    heading: 'Career',
    companies: {
      vittascience: {
        position: <>Web developer at {links.vittascience}</>,
        tasks: {
          website: 'Website construction using PHP and MySQL.',
          arduinoIDE: 'Built a full Arduino web IDE for young people.',
          communityMap: 'Built an interative community map.',
        },
      },
      itnovem: {
        position: <>Pentester and developer at {links.itnovem}</>,
        tasks: {
          audits: 'Security audits, Black/white box, Code reviews.',
          analysis: 'Source code analysis with Checkmarx SAST.',
          training:
            'Web application security training sessions with developers.',
          aap:
            'Lead developer on an IoT event-driven application written in Nest.js.',
          webapps:
            'In charge of development and architecture for business applications written in Spring Boot/Angular.',
        },
      },
      sncf: {
        position: <>Senior lead developer at {links.sncf}</>,
        tasks: {
          teaching:
            'Teaches web programming to new developer trainees (Typescript, Spring Boot, web security and more).',
          communityManagement: 'Developers community manager and speaker.',
          leadDevsCommittee: 'Member of lead developers committee.',
          aws:
            'Lead developer on AWS Lambda based applications using Spring Cloud Function.',
          security:
            'Main referent on security architectures recommended in developments.',
        },
      },
    },
  },
  certifications: {
    heading: 'Certifications',
    ceh: 'CEH (Certified Ethical Hacker)',
    toeic: 'TOEIC (Test of English for International Communication)',
    ccna: 'CCNA 1-4 (Cisco Certified Network Associate)',
  },
  education: {
    heading: 'Educational background',
    bac: 'French Baccalauréat in 2013',
    lawSchool: 'Studied law for two years',
    esgi: (
      <>
        5 years &quot;Software Architecture&quot; curriculum at{' '}
        {links.esgi.website} ({links.esgi.certificate('Certificate')})
      </>
    ),
  },
  links: {
    heading: 'Links/projects',
    blaze: (
      <>
        I am the author of{' '}
        {links.blaze}, a monorepo-based build system written in Rust.
      </>
    ),
    github: <>My current {links.github.current('Github profile')}.</>,
    oldGithub: <>My old {links.github.old('student Github profile')}.</>,
  },
  aboutMe: {
    heading: 'About me',
    loveToLearn: 'I love to learn, but also to teach.',
    friendly: 'Friendly and easygoing.',
    musical: 'Very musical.',
  },
}
