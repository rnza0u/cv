import { ExternalLink } from '../components/ExternalLink'

export const links = {
    vittascience: ExternalLink({
        label: 'Vittascience', 
        url: 'https://vittascience.com'
    }),
    itnovem: ExternalLink({
        label: 'ITNOVEM', 
        url: 'https://www.itnovem.com/'
    }),
    sncf: ExternalLink({
        label: 'SNCF', 
        url: 'https://www.sncf.com/'
    }),
    esgi: {
        website: ExternalLink({
            label: 'ESGI', 
            url: 'https://www.esgi.fr/'
        }),
        certificate: (label: string) => ExternalLink({
            label,
            url: 'https://certificate.bcdiploma.com/check/AAB3111E594F219797217E3A9304E6A26EAA0F97CCC05E96CF5CB941E608BE8AUWp3Nnl0YXU4QW16cmtuSGtmOG8xbGZ5b3BTUUZ4S0RFSTN4SWxsVkdiUVhJRkwr'
        })
    },
    blaze: ExternalLink({
        label: 'Blaze', 
        url: 'https://blaze-monorepo.dev'
    }),
    github: {
        current: (label: string) => ExternalLink({
            label, 
            url: 'https://github.com/rnza0u/'
        }),
        old: (label: string) => ExternalLink({
            label, 
            url: 'https://github.com/nzaouesgi'
        })
    }
} as const