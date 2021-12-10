/**
 * Copy text to user clipboard
 *
 * @param content string value to be copy to clipboard
 */
export function CopyToClipboard (content: string): void {
  navigator.clipboard.writeText(content)
}

/**
 * Convert content into JSON and return it back
 *
 * @param content any javascript object
 */
export function AnyToJson (content: any): string {
  try {
    return JSON.stringify(content)
  } catch {
    console.log('Faild to convert it to JSON', content)
    return '{}'
  }
}
