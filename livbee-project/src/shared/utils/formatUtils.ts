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

