/** 마감일 기준 D-day 라벨 계산 */
export function calcDday(deadline: string, baseDate = new Date()): string {
  if (!deadline) return ''
  const end = new Date(deadline)
  end.setHours(23, 59, 59, 999)
  const diff = Math.ceil((end.getTime() - baseDate.getTime()) / (1000 * 60 * 60 * 24))
  if (diff < 0) return '마감'
  if (diff === 0) return 'D-Day'
  return `D-${diff}`
}
