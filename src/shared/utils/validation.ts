const URL_REGEX = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/[\w-.~:?#[\]@!$&'()*+,;=%]*)?$/i;
const TIME_REGEX = /^([01]\d|2[0-3]):([0-5]\d)$/;

export const isEmpty = (value?: string | null) => !value || value.trim().length === 0;

export const validateRequiredFields = (
  fields: Array<{ value: string | null | undefined; message: string }>,
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
  if (!TIME_REGEX.test(startTime) || !TIME_REGEX.test(endTime)) {
    onError?.('시간 형식이 올바르지 않습니다.');
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

export const isValidUrl = (value: string) => URL_REGEX.test(value.trim());

export const isValidPhoneNumber = (value: string) => {
  const digits = value.replace(/\D/g, '');
  return digits.length >= 9 && digits.length <= 11;
};

