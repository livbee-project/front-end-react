/** 숫자 문자열을 원화 표시 문자열로 변환 */
export function formatPayment(value: string | number): string {
  const num = typeof value === 'string' ? parseInt(value.replace(/\D/g, ''), 10) : value
  if (!num || Number.isNaN(num)) return ''
  return `${num.toLocaleString('ko-KR')}원`
}

/** 입력값에서 숫자만 추출 */
export function parsePaymentInput(raw: string): string {
  return raw.replace(/\D/g, '')
}
