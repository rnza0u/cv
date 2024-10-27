import { renderMode } from './config'

export type SensitiveValue = Readonly<{
    _protected: string 
}>

// server-side
export function obfuscate(clear: string): SensitiveValue {
    return {
        _protected: renderMode === 'web' 
            ? Buffer.from(clear, 'utf-8').toString('base64') 
            : clear
    }
}

// client-side
export function deobfuscate(value: SensitiveValue): string {
    return renderMode === 'web'
        ? new TextDecoder().decode(Uint8Array.from(atob(value._protected), m => m.codePointAt(0)!))
        : value._protected
}