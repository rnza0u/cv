import { Resume } from '../src/components/Resume.tsx'
import {
  renderResume,
  RenderResumeData,
} from '../src/handlers/render-resume.ts'
import { Handler, PageProps } from '../src/requests/typing.ts'

export const handler: Handler<RenderResumeData> = renderResume

export default function DefaultResume(
  { data: { translations, mode } }: PageProps<RenderResumeData>,
) {
  return <Resume translations={translations} mode={mode} />
}
