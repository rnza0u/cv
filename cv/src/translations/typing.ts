import { ReadonlyDeep } from 'type-fest'
import { Locale } from './locales.ts'
import { JSX } from 'preact/jsx-runtime'

export type Translations = ReadonlyDeep<{
  metadata: {
    title: string
    description: string
    keywords: readonly string[]
  }
  contact: {
    heading: string
    phoneNumber: {
      label: string
      value: string
    }
    email: {
      label: string
      value: string
    }
    location: {
      label: string
      value: string
    }
    showButton: string
    hidden: string
  }
  header: {
    heading: string
    localeSelectors: {
      [Key in Locale]: string
    }
    introduction: (age: number) => JSX.Element
  }
  profile: {
    heading: string
    points: {
      polyglotProgrammer: string
      securityOriented: string
      wideRangeOfITSkills: string
    }
  }
  skills: {
    heading: string
    programming: {
      label: string
      content: string
    }
    architecture: {
      label: string
      content: string
    }
    cicd: {
      label: string
      content: string
    }
    security: {
      label: string
      content: string
    }
    languages: {
      label: string
      content: string
    }
  }
  career: {
    heading: string
    companies: {
      vittascience: {
        position: JSX.Element
        tasks: {
          website: string
          arduinoIDE: string
          communityMap: string
        }
      }
      itnovem: {
        position: JSX.Element
        tasks: {
          audits: string
          analysis: string
          training: string
          aap: string
          webapps: string
        }
      }
      sncf: {
        position: JSX.Element
        tasks: {
          teaching: string
          communityManagement: string
          leadDevsCommittee: string
          aws: string
          security: string
        }
      }
    }
  }
  certifications: {
    heading: string
    ceh: string
    toeic: string
    ccna: string
  }
  education: {
    heading: string
    bac: string
    esgi: JSX.Element
  }
  links: {
    heading: string
    blaze: JSX.Element
    github: JSX.Element
    oldGithub: JSX.Element
  }
  aboutMe: {
    heading: string
    loveToLearn: string
    friendly: string
    musical: string
  }
}>
