import { obfuscate } from '../helpers/obfuscation'
import { links } from './common'
import { Translations } from './typing'

export const fr: Translations = {
    metadata: {
        title: 'Renaud N\'zaou',
        keywords: ['développeur', 'fullstack', 'ingénieur', 'react', 'angular', 'rust', 'nodejs', 'profil', 'cv', 'renaud', 'n\'zaou'],
        description: 'Développeur fullstack senior et pentester'
    },
    contact: {
        heading: 'Informations de contact',
        phoneNumber: {
            label: 'Téléphone',
            value: obfuscate('06.49.93.91.51')
        },
        email: { 
            label: 'Adresse email',
            value: obfuscate('nzaou.renaud@gmail.com')
        },
        location: {
            label: 'Localisation',
            value: 'Lyon, France'
        },
        showButton: 'Afficher les champs masqués',
        hidden: 'Masqué'
    },
    header: {
        heading: 'Développeur, Pentester',
        localeSelectors: {
            en: 'English',
            fr: 'Français'
        },
        introduction: age => <>{age} ans, de Lyon, France</>
    },
    profile: {
        heading: 'Profil',
        points: {
            polyglotProgrammer: 'Programmeur polyglotte',
            securityOriented: 'Orienté sécurité',
            wideRangeOfITSkills: 'Large panel de compétences IT (web, devops, système, réseau)'
        }
    },
    skills: {
        heading: 'Compétences',
        programming: {
            label: 'Programmation',
            content: 'Rust (Actix, Tauri), Typescript/Javascript (Express, Nest.js, Angular, React), HTMX, C/C++, Java (Spring Boot), Scala, Python, Android, PHP, Bash'
        },
        architecture: {
            label: 'Architecture',
            content: 'Azure Cloud, AWS, Terraform, Docker avec Kubernetes, Ansible, Microservices, Serverless, REST, gRPC, GraphQL'
        },
        cicd: {
            label: 'CI/CD',
            content: 'Github, Gitlab, Drone, Jenkins, Nx, Turborepo'
        },
        security: {
            label: 'Security',
            content: 'Audits complets d\'applications, Cryptographie, Analyses de risques, OAuth2/OIDC/SAML'
        },
        languages: {
            label: 'Langages',
            content: 'Français natif, Anglais (C1)'
        }
    },
    career: {
        heading: 'Carrière',
        companies: {
            vittascience: {
                position: <>Développeur web à {links.vittascience}</>,
                tasks: {
                    website: 'Construction du site web avec PHP et MySQL.',
                    arduinoIDE: 'Implémentation d\'un IDE Arduino complet en version web pour les jeunes.',
                    communityMap: 'Construction d\'une carte d\'expériences interactive.'
                }
            },
            itnovem: {
                position: <>Pentester et développeur à {links.itnovem}</>,
                tasks: {
                    audits: 'Audits de sécurité, Black/white box, audits de code source.',
                    analysis: 'Analyse de code source avec Checkmarx SAST.',
                    training: 'Formations à la sécurité des développeurs.',
                    aap: 'Lead développeur sur une application IoT event-driven en Nest.js.',
                    webapps: 'En charge du développement et de l\'architecture d\'applications métier en Spring Boot/Angular.'
                }
            },
            sncf: {
                position: <>Lead développeur senior à {links.sncf}</>,
                tasks: {
                    teaching: 'Formation de plusieurs promotions de développeurs juniors (Typescript, Spring Boot, sécurité du web).',
                    communityManagement: 'Management de la communauté de développeurs et conférencier en interne.',
                    leadDevsCommittee: 'Membre du comité des lead développeurs.',
                    aws: 'Lead développeur sur des projets d\'APIs serverless basées sur AWS avec Spring Cloud Function.',
                    security: 'Référent principal sur les architectures de sécurité préconisées dans les développements.'
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
        heading: 'Scolarité',
        bac: 'Baccalauréat en 2013',
        lawSchool: 'Étudiant en droit pendant deux ans',
        esgi: <>Cursus &quot;Architecture logicielle&quot; à {links.esgi.website} ({links.esgi.certificate('Certificat')})</>
    },
    links: {
        heading: 'Liens/projets',
        blaze: <>Je suis l&apos;auteur de {links.blaze}, un système de build pour les monorepos écrit en Rust.</>,
        github: <>Mon {links.github.current('profil Github')} actuel.</>,
        oldGithub: <>Mon ancien {links.github.old('profil Github')} d&apos;étudiant.</>
    },
    aboutMe: {
        heading: 'À propos de moi',
        loveToLearn: 'J\'aime beaucoup apprendre, mais aussi enseigner.',
        friendly: 'Amical et facile à vivre.',
        musical: 'Très musical.'
    }
}