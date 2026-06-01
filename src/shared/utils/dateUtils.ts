export const calculateDDay = (closeAt: string): string => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const deadline = new Date(closeAt);
  if (Number.isNaN(deadline.getTime())) {
    return '';
  }
  deadline.setHours(23, 59, 59, 999);

  const diffTime = deadline.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return '마감';
  }
  if (diffDays === 0) {
    return 'D-DAY';
  }
  return `D-${diffDays}`;
};

export const formatDate = (dateString?: string | null): string => {
  if (!dateString) return '-';
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return '-';
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const formatDateTime = (
  dateString?: string | null,
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }
): string => {
  if (!dateString) return '-';
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return '-';
  return new Intl.DateTimeFormat('ko-KR', options).format(date);
};

export const formatRelativeTime = (dateInput?: string | Date | null): string => {
  if (!dateInput) return '-';
  const targetDate = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  if (Number.isNaN(targetDate.getTime())) return '-';

  const now = new Date();
  const diffMs = targetDate.getTime() - now.getTime();
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return '오늘';
  }
  if (diffDays > 0) {
    return `${diffDays}일 후`;
  }
  return `${Math.abs(diffDays)}일 전`;
};

