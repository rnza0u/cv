export const isProduction = process.env['NODE_ENV'] !== 'development'

const modes = ['web', 'pdf'] as const
type RenderMode = typeof modes[number]

export const renderMode: RenderMode = modes.find(m => m === process.env['RENDER_MODE']) ?? 'web'