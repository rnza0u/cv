import { getRenderMode, RenderMode } from '../helpers/server/render-mode.ts'
import { Handler } from '../requests/typing.ts'
import { getTranslations } from '../translations/index.ts'
import { Translations } from '../translations/typing.ts'

export type RenderResumeData = Readonly<{
  translations: Translations,
  mode: RenderMode
}>

export const renderResume: Handler<RenderResumeData> = async (_req, ctx) =>
  ctx.render({
    translations: await getTranslations(ctx.state.locale!),
    mode: getRenderMode()
  })
