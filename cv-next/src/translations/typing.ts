import { ReadonlyDeep } from 'type-fest'

export type Translations = ReadonlyDeep<{
    head: {
        description: string
    }
    contact: {
        heading: string
        phoneNumber: {
            label: string
            value: string
        }
        email: string
        location: string
        showButton: string
        hidden: string
    }
    title: {
        heading: string
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
        lawSchool: string
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