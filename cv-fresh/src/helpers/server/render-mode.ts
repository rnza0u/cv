const renderModes = ['web', 'pdf'] as const

export type RenderMode = typeof renderModes[number]

export function getRenderMode(): RenderMode {
  const envValue = Deno.env.get('CV_RENDER_MODE')
  if (!envValue){
    return 'web'
  }
  const mode = renderModes.find(m => m === envValue)
  if (!mode){
    return 'web'
  }
  return mode
}