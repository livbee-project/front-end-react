/**
 * 검증 에러 파싱 유틸리티
 * 백엔드 Pydantic/FastAPI 스타일 errors 배열을 필드별 메시지 맵으로 변환합니다.
 */

interface ValidationErrorPayload {
  errors?: Array<{ loc?: string[]; msg?: string }>;
}

/**
 * payload의 errors 배열을 Record<필드키, 메시지>로 파싱
 * - loc의 마지막 요소를 필드 키로, msg를 값으로 매핑
 * - 같은 필드에 여러 에러면 msg를 "; "로 join
 * - loc가 없으면 "general"로 fallback
 */
export const parseValidationErrors = (payload: unknown): Record<string, string> => {
  const result: Record<string, string[]> = {};

  const data = payload as ValidationErrorPayload;
  if (!data?.errors || !Array.isArray(data.errors)) {
    return {};
  }

  for (const item of data.errors) {
    const msg = typeof item?.msg === 'string' ? item.msg : '';
    if (!msg) continue;

    const key =
      Array.isArray(item.loc) && item.loc.length > 0
        ? item.loc[item.loc.length - 1]
        : 'general';

    if (!result[key]) {
      result[key] = [];
    }
    result[key].push(msg);
  }

  const output: Record<string, string> = {};
  for (const [key, messages] of Object.entries(result)) {
    output[key] = messages.join('; ');
  }
  return output;
};
