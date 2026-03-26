const ENCRYPTED_PREFIX = 'enc:'

export function encrypt(str: string, shift = 3): string {
  const encoded = str
    .split('')
    .map((char) => String.fromCharCode(char.charCodeAt(0) + shift))
    .join('')
  return `${ENCRYPTED_PREFIX}${encoded}`
}

export function decrypt(str: string, shift = 3): string {
  if (!str.startsWith(ENCRYPTED_PREFIX)) return str

  const encoded = str.slice(ENCRYPTED_PREFIX.length)
  return encoded
    .split('')
    .map((char) => String.fromCharCode(char.charCodeAt(0) - shift))
    .join('')
}

export function isEncrypted(str: string): boolean {
  return str.startsWith(ENCRYPTED_PREFIX)
}
