import { Career } from './Career.tsx'
import { Header } from './Header.tsx'
import { List } from './List.tsx'
import { Main } from './Main.tsx'
import { Section } from './Section.tsx'
import { Table } from './Table.tsx'
import { Translations } from '../translations/typing.ts'
import { ContactInfo } from '../../islands/ContactInfo.tsx'
import { Head } from '$fresh/src/runtime/head.ts'
import { RenderMode } from '../helpers/server/render-mode.ts'

export type ResumeProps = Readonly<{
  translations: Translations
  mode: RenderMode
}>

export function Resume({ translations: t, mode }: ResumeProps) {
  return (
    <>
      <Head>
        <meta name='description' content={t.metadata.description} />
        <meta name='keywords' content={t.metadata.keywords.join(',')} />
        <title>{t.metadata.title}</title>
      </Head>
      <Main>
        <ContactInfo translations={t.contact} renderMode={mode} />
        <Header translations={t.header} renderMode={mode}/>
        <Section heading={t.profile.heading}>
          <List
            items={[
              t.profile.points.polyglotProgrammer,
              t.profile.points.securityOriented,
              t.profile.points.wideRangeOfITSkills,
            ]}
          />
        </Section>
        <Section heading={t.skills.heading}>
          <Table
            rows={([
              'programming',
              'architecture',
              'cicd',
              'security',
              'languages',
            ] as const).map((skill) => t.skills[skill])}
          />
        </Section>
        <Section heading={t.career.heading}>
          <Career
            companies={[
              {
                period: '2018',
                position: t.career.companies.vittascience.position,
                tasks: [
                  t.career.companies.vittascience.tasks.website,
                  t.career.companies.vittascience.tasks.arduinoIDE,
                  t.career.companies.vittascience.tasks.communityMap,
                ],
              },
              {
                period: '2019-2023',
                position: t.career.companies.itnovem.position,
                tasks: [
                  t.career.companies.itnovem.tasks.webapps,
                  t.career.companies.itnovem.tasks.aap,
                  t.career.companies.itnovem.tasks.audits,
                  t.career.companies.itnovem.tasks.training,
                  t.career.companies.itnovem.tasks.analysis,
                ],
              },
              {
                period: '2023-2024',
                position: t.career.companies.sncf.position,
                tasks: [
                  t.career.companies.sncf.tasks.communityManagement,
                  t.career.companies.sncf.tasks.teaching,
                  t.career.companies.sncf.tasks.leadDevsCommittee,
                  t.career.companies.sncf.tasks.aws,
                  t.career.companies.sncf.tasks.security,
                ],
              },
            ]}
          />
        </Section>
        <Section heading={t.certifications.heading}>
          <List
            items={[
              t.certifications.ceh,
              t.certifications.ccna,
              t.certifications.toeic,
            ]}
          />
        </Section>
        <Section heading={t.education.heading}>
          <List
            items={[
              t.education.bac,
              t.education.esgi,
            ]}
          />
        </Section>
        <Section heading={t.links.heading}>
          <List
            items={[
              t.links.blaze,
              t.links.github,
              t.links.oldGithub,
            ]}
          />
        </Section>
        <Section heading={t.aboutMe.heading}>
          <List
            items={[
              t.aboutMe.loveToLearn,
              t.aboutMe.friendly,
              t.aboutMe.musical,
            ]}
          />
        </Section>
      </Main>
    </>
  )
}
