export type ExternalLinkProps = Readonly<{
    label: string
    url: string
}>

export function ExternalLink({ label, url }: ExternalLinkProps){
    return (
        <a target="_blank" href={url}>
            {label}
        </a>
    )
}