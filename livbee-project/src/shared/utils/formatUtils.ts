export const formatCurrency = (value?: number | null, suffix = '원') => {
  if (value == null) {
    return '가격 미정';
  }
  const formatted = value.toLocaleString();
  return suffix ? `${formatted}${suffix}` : formatted;
};

export const truncateText = (text: string, limit: number) => {
  if (text.length <= limit) {
    return text;
  }
  return `${text.slice(0, limit)}...`;
};

export const formatNumberCompact = (value: number, fractionDigits = 1) => {
  return new Intl.NumberFormat('ko-KR', {
    notation: 'compact',
    maximumFractionDigits: fractionDigits,
  }).format(value);
};

export const maskPhoneNumber = (value: string) => {
  const digits = value.replace(/\D/g, '');
  if (digits.length < 7) {
    return value;
  }
  if (digits.length === 11) {
    return digits.replace(/(\d{3})(\d{4})(\d{4})/, '$1-****-$3');
  }
  if (digits.length === 10) {
    return digits.replace(/(\d{3})(\d{3})(\d{4})/, '$1-***-$3');
  }
  return digits.replace(/(\d{2,3})(\d{3,4})(\d{4})/, '$1-***-$3');
};

/**
 * 수수료를 포맷팅합니다.
 * @param fee - 수수료 (원 단위)
 * @returns 포맷팅된 수수료 문자열
 */
export const formatFee = (fee?: number | null): string => {
  if (fee == null) {
    return '협의';
  }

  if (fee >= 10000) {
    const millionWon = Math.round(fee / 10000);
    return `${millionWon.toLocaleString('ko-KR')}만원`;
  }

  return formatCurrency(fee);
};

/**
 * 마감일 라벨을 생성합니다.
 * @param deadline - 마감일 문자열
 * @param calculateDDay - D-Day 계산 함수
 * @param formatRelativeTime - 상대 시간 포맷 함수
 * @returns 마감일 라벨 문자열
 */
export const getDeadlineLabel = (
  deadline?: string | null,
  calculateDDay?: (date: string) => string,
  formatRelativeTime?: (date: string) => string
): string => {
  if (!deadline) return '상시';
  
  if (!calculateDDay || !formatRelativeTime) {
    return deadline;
  }

  const dday = calculateDDay(deadline);
  const relative = formatRelativeTime(deadline);
  if (!dday) {
    return relative;
  }
  return relative ? `${dday} · ${relative}` : dday;
};

