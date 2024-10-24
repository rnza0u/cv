// server-side
export function obfuscate(clear: string): string {
    return Buffer.from(clear, 'utf-8').toString('base64')
}

// client-side
export function deobfuscate(obfuscated: string): string {
    return new TextDecoder().decode(Uint8Array.from(atob(obfuscated), m => m.codePointAt(0)!))
}