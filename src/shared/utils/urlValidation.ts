/** http/https URL 형식인지 검사 */
export function isValidUrl(value: string): boolean {
  if (!value.trim()) return false
  try {
    const url = new URL(value)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}

/** 이메일 형식인지 검사 */
export function isValidEmail(value: string): boolean {
  if (!value.trim()) return false
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
}

/** 한국 휴대폰 번호 형식인지 검사 */
export function isValidPhone(value: string): boolean {
  if (!value.trim()) return false
  return /^01[0-9]-?\d{3,4}-?\d{4}$/.test(value.trim())
}
