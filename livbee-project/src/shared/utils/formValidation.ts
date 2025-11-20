export const isEmpty = (value?: string | null) => !value || value.trim().length === 0;

export const validateRequiredFields = (
  fields: Array<{ value: string; message: string }>,
  onError?: (message: string) => void
) => {
  for (const field of fields) {
    if (isEmpty(field.value)) {
      onError?.(field.message);
      return false;
    }
  }
  return true;
};

export const validateTimeRange = (
  startTime: string,
  endTime: string,
  onError?: (message: string) => void
) => {
  if (!startTime || !endTime) {
    return false;
  }

  const [startHour, startMinute] = startTime.split(':').map(Number);
  const [endHour, endMinute] = endTime.split(':').map(Number);
  const startMinutes = startHour * 60 + startMinute;
  const endMinutes = endHour * 60 + endMinute;

  if (endMinutes - startMinutes <= 0) {
    onError?.('종료시간은 시작시간보다 늦어야 합니다.');
    return false;
  }

  return true;
};

