import { links } from './common'
import { Translations } from './typing'

export const en: Translations = {
    head: {
        description: 'Renaud N\'zaou, programmer and penetration tester'
    },
    contact: {
        heading: 'Contact information',
        phoneNumber: {
            label: 'Phone number',
            value: '+33.6.49.93.91.51'
        },
        email: 'Email address',
        location: 'Location',
        showButton: 'Show hidden fields',
        hidden: 'Hidden'
    },
    title: {
        heading: 'Developer, Penetration tester',
        introduction: age => <>{age} years old, from France, Lyon</>
    },
    profile: {
        heading: 'Profile',
        points: {
            polyglotProgrammer: 'Polyglot programmer',
            securityOriented: 'Security oriented',
            wideRangeOfITSkills: 'Wide range of IT skills (web, devops, system, networking)'
        }
    },
    skills: {
        heading: 'Skills',
        programming: {
            label: 'Programming',
            content: 'Rust (Actix, Tauri), Typescript/Javascript (Express, Nest, Angular, React), HTMX, C/C++, Java (Spring Boot), Scala, Python, Android, PHP, Bash'
        },
        architecture: {
            label: 'Architecture',
            content: 'Azure Cloud, AWS, Terraform, Docker w/k8s, Ansible, Microservices, Serverless, REST, gRPC, GraphQL'
        },
        cicd: {
            label: 'CI/CD',
            content: 'Github, Gitlab, Drone, Jenkins, Nx, Turborepo'
        },
        security: {
            label: 'Security',
            content: 'Web application auditing and dynamic testing, Cryptography, Risk analysis, OAuth2/OIDC/SAML'
        },
        languages: {
            label: 'Languages',
            content: 'Native French, English (C1)'
        }
    },
    career: {
        heading: 'Career',
        companies: {
            vittascience: {
                position: <>Web developer at {links.vittascience}</>,
                tasks: {
                    website: 'Website construction using PHP and MySQL.',
                    arduinoIDE: 'Built a full Arduino web IDE for young people.',
                    communityMap: 'Built an interative community map.'
                }
            },
            itnovem: {
                position: <>Pentester and developer at {links.itnovem}</>,
                tasks: {
                    audits: 'Security audits, Black/white box, Code reviews.',
                    analysis: 'Source code analysis with Checkmarx SAST.',
                    training: 'Web application security training sessions with developers.',
                    aap: 'Lead developer on an IoT event-driven application written in Nest.js.',
                    webapps: 'In charge of development and architecture for business applications written in Spring Boot/Angular.'
                }
            },
            sncf: {
                position: <>Senior lead developer at {links.sncf}</>,
                tasks: {
                    teaching: 'Teaches web programming to new developer trainees (Typescript, Spring Boot, web security and more).',
                    communityManagement: 'Developers community manager and speaker.',
                    leadDevsCommittee: 'Member of lead developers committee.',
                    aws: 'Lead developer on AWS Lambda based applications using Spring Cloud Function.',
                    security: 'Main referent on security architectures recommended in developments.'
                }
            }
        }
    },
    certifications: {
        heading: 'Certifications',
        ceh: 'CEH (Certified Ethical Hacker)',
        toeic: 'TOEIC (Test of English for International Communication)',
        ccna: 'CCNA 1-4 (Cisco Certified Network Associate)'
    },
    education: {
        heading: 'Educational background',
        bac: 'French Baccalauréat in 2013',
        lawSchool: 'Studied law for two years',
        esgi: <>5 years "Software Architecture" curriculum at {links.esgi.website} ({links.esgi.certificate('Certificate')})</>
    },
    links: {
        heading: 'Links/projects',
        blaze: <>I am the author of {links.blaze}, a monorepo-based build system written in Rust.</>,
        github: <>My current {links.github.current('Github profile')}.</>,
        oldGithub: <>My old {links.github.old('student Github profile')}.</>
    },
    aboutMe: {
        heading: 'About me',
        loveToLearn: 'I love to learn, but also to teach.',
        friendly: 'Friendly and easygoing.',
        musical: 'Very musical.'
    }
}