export function deobfuscate(obfuscated: string): string {
  return new TextDecoder().decode(
    Uint8Array.from(atob(obfuscated), (m) => m.codePointAt(0)!),
  )
}
