/**
 * Creates a SHA-256 password hash for a given password string.
 * @param password The password to be hashed
 * @returns A Promise containing the SHA-256 hash
 */
export async function createPasswordHash(password: string): Promise<string> {
   const data = new TextEncoder().encode(password)
   const hashArrayBuffer = await crypto.subtle.digest('SHA-256', data)
   return arrayBufferToHexString(hashArrayBuffer)
}

/**
 * Generates a random hex string with a length of 24.
 * @returns A random hex string
 */
export function generateAccessTokenHash(): string {
   const uintArray = crypto.getRandomValues(new Uint8Array(24))
   return uIntArrayToHexString(uintArray)
}

/**
 * Creates a hex string for given ArrayBuffer.
 * @param buffer The ArrayBuffer to create a hex string from
 * @returns A hex string
 */
export function arrayBufferToHexString(buffer: ArrayBuffer): string {
   return uIntArrayToHexString(new Uint8Array(buffer))
}

/**
 * Creates a hex string for given Uint8Array.
 * @param uIntEightArray The Uint8Array to create a hex string from
 * @returns A hex string
 */
export function uIntArrayToHexString(uIntEightArray: Uint8Array): string {
   const hashArray = Array.from(uIntEightArray)
   const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join(
      '',
   )
   return hashHex
}

/**
 * Checks if a given cleartext password matches with a given hashed password.
 * The cleartext password will be hashed then compared to the hashed password.
 * @param cleartextPassword The cleartext password (e.g. from login)
 * @param hashedPassword The hashed password (e.g. from database)
 * @returns A boolean Promise: True if passwords match, false otherwise
 */
export async function verifyPassword(
   cleartextPassword: string,
   hashedPassword: string,
): Promise<boolean> {
   const hashedPasswordFromInput = await createPasswordHash(cleartextPassword)
   return hashedPassword === hashedPasswordFromInput
}
