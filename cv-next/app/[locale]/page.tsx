import { Loader } from '../../src/components/Loader'
import { getLocaleFromParams, locales, LocalizedParams } from '../../src/translations/locales'
import { Metadata } from 'next'
import { getTranslations } from '../../src/translations'
import { ContactInfo } from '../../src/components/ContactInfo/ContactInfo'
import { Main } from '../../src/components/Main/Main'
import { Header } from '../../src/components/Header'
import { Section } from '../../src/components/Section/Section'
import { List } from '../../src/components/List'
import { Career } from '../../src/components/Career'
import { Table } from '../../src/components/Table'
import { renderMode } from '../../src/helpers/config'

type ResumeProps = Readonly<{
  params: Promise<LocalizedParams>
}>

export async function generateMetadata({ params }: ResumeProps): Promise<Metadata> {
  const locale = await getLocaleFromParams(await params)
  const translations = await getTranslations(locale)
  return {
    title: translations.metadata.title,
    description: translations.metadata.description,
    keywords: translations.metadata.keywords as string[]
  }
}

export async function generateStaticParams(): Promise<LocalizedParams[]> {
  return locales.map(locale => ({ locale }))
}

export default async function Resume({ params }: ResumeProps) {
  const locale = await getLocaleFromParams(await params)
  const t = await getTranslations(locale)
  return (
    <>
      {renderMode === 'web' && <Loader fadeOut />}
      <Main>
        <ContactInfo translations={t.contact} />
        <Header translations={t.header} />
        <Section heading={t.profile.heading}>
          <List items={[
            t.profile.points.polyglotProgrammer,
            t.profile.points.securityOriented,
            t.profile.points.wideRangeOfITSkills
          ]} />
        </Section>
        <Section heading={t.skills.heading}>
          <Table rows={([
            'programming',
            'architecture',
            'cicd',
            'security',
            'languages'
          ] as const).map(skill => t.skills[skill])} />
        </Section>
        <Section heading={t.career.heading}>
          <Career companies={[
            {
              period: '2018',
              position: t.career.companies.vittascience.position,
              tasks: [
                t.career.companies.vittascience.tasks.website,
                t.career.companies.vittascience.tasks.arduinoIDE,
                t.career.companies.vittascience.tasks.communityMap
              ]
            },
            {
              period: '2019-2023',
              position: t.career.companies.itnovem.position,
              tasks: [
                t.career.companies.itnovem.tasks.webapps,
                t.career.companies.itnovem.tasks.aap,
                t.career.companies.itnovem.tasks.audits,
                t.career.companies.itnovem.tasks.training,
                t.career.companies.itnovem.tasks.analysis
              ]
            },
            {
              period: '2023-2024',
              position: t.career.companies.sncf.position,
              tasks: [
                t.career.companies.sncf.tasks.communityManagement,
                t.career.companies.sncf.tasks.teaching,
                t.career.companies.sncf.tasks.leadDevsCommittee,
                t.career.companies.sncf.tasks.aws,
                t.career.companies.sncf.tasks.security
              ]
            }
          ]} />
        </Section>
        <Section heading={t.certifications.heading}>
          <List items={[
            t.certifications.ceh,
            t.certifications.ccna,
            t.certifications.toeic
          ]} />
        </Section>
        <Section heading={t.education.heading}>
          <List items={[
            t.education.bac,
            t.education.lawSchool,
            t.education.esgi
          ]} />
        </Section>
        <Section heading={t.links.heading}>
          <List items={[
            t.links.blaze,
            t.links.github,
            t.links.oldGithub
          ]} />
        </Section>
        <Section heading={t.aboutMe.heading}>
          <List items={[
            t.aboutMe.loveToLearn,
            t.aboutMe.friendly,
            t.aboutMe.musical
          ]} />
        </Section>
      </Main>
    </>
  )
}
