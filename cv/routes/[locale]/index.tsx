import { Resume } from '../../src/components/Resume.tsx'
import {
  renderResume,
  RenderResumeData,
} from '../../src/handlers/render-resume.ts'
import { Handler, PageProps } from '../../src/requests/typing.ts'

export const handler: Handler<RenderResumeData> = (req, ctx) =>
  renderResume(req, ctx)

export default function LocaleSpecificResume(
  { data: { translations, mode } }: PageProps<RenderResumeData>,
) {
  return <Resume translations={translations} mode={mode} />
}
