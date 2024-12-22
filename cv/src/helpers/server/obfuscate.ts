import { encodeBase64 } from '@std/encoding'

export function obfuscate(clear: string): string {
  return encodeBase64(new TextEncoder().encode(clear))
}
