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

