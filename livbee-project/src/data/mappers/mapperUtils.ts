/**
 * Mapper 공통 유틸리티
 * 반복적인 필드 매핑 로직을 추상화하여 중복 코드를 제거합니다.
 */

/**
 * snake_case와 camelCase 필드를 모두 확인하여 값을 반환합니다.
 * 
 * @param payload - 변환할 객체
 * @param camelKey - camelCase 키
 * @param snakeKey - snake_case 키 (선택적, camelKey에서 자동 생성)
 * @returns 필드 값 또는 undefined
 */
export function getFieldValue<T>(
  payload: Record<string, unknown>,
  camelKey: string,
  snakeKey?: string
): T | undefined {
  const snake = snakeKey || camelToSnake(camelKey);
  return (payload[camelKey] as T) ?? (payload[snake] as T);
}

/**
 * snake_case와 camelCase 필드를 모두 확인하여 값을 반환하고, 없으면 기본값을 반환합니다.
 * 
 * @param payload - 변환할 객체
 * @param camelKey - camelCase 키
 * @param defaultValue - 기본값
 * @param snakeKey - snake_case 키 (선택적)
 * @returns 필드 값 또는 기본값
 */
export function getFieldValueOrDefault<T>(
  payload: Record<string, unknown>,
  camelKey: string,
  defaultValue: T,
  snakeKey?: string
): T {
  const value = getFieldValue<T>(payload, camelKey, snakeKey);
  return value !== undefined ? value : defaultValue;
}

/**
 * 문자열 필드를 안전하게 추출합니다.
 * 
 * @param payload - 변환할 객체
 * @param camelKey - camelCase 키
 * @param defaultValue - 기본값 (기본: '')
 * @param snakeKey - snake_case 키 (선택적)
 * @returns 문자열 값
 */
export function getStringField(
  payload: Record<string, unknown>,
  camelKey: string,
  defaultValue: string = '',
  snakeKey?: string
): string {
  const value = getFieldValue<string>(payload, camelKey, snakeKey);
  return typeof value === 'string' ? value : defaultValue;
}

/**
 * 숫자 필드를 안전하게 추출합니다.
 * 
 * @param payload - 변환할 객체
 * @param camelKey - camelCase 키
 * @param defaultValue - 기본값 (기본: 0)
 * @param snakeKey - snake_case 키 (선택적)
 * @returns 숫자 값
 */
export function getNumberField(
  payload: Record<string, unknown>,
  camelKey: string,
  defaultValue: number = 0,
  snakeKey?: string
): number {
  const value = getFieldValue<number>(payload, camelKey, snakeKey);
  return typeof value === 'number' ? value : defaultValue;
}

/**
 * 불리언 필드를 안전하게 추출합니다.
 * 
 * @param payload - 변환할 객체
 * @param camelKey - camelCase 키
 * @param defaultValue - 기본값 (기본: false)
 * @param snakeKey - snake_case 키 (선택적)
 * @returns 불리언 값
 */
export function getBooleanField(
  payload: Record<string, unknown>,
  camelKey: string,
  defaultValue: boolean = false,
  snakeKey?: string
): boolean {
  const value = getFieldValue<boolean>(payload, camelKey, snakeKey);
  return typeof value === 'boolean' ? value : defaultValue;
}

/**
 * null을 허용하는 필드를 안전하게 추출합니다.
 * 
 * @param payload - 변환할 객체
 * @param camelKey - camelCase 키
 * @param snakeKey - snake_case 키 (선택적)
 * @returns 필드 값 또는 null
 */
export function getNullableField<T>(
  payload: Record<string, unknown>,
  camelKey: string,
  snakeKey?: string
): T | null {
  const value = getFieldValue<T>(payload, camelKey, snakeKey);
  return value !== undefined ? value : null;
}

/**
 * 배열 필드를 안전하게 추출합니다.
 * 
 * @param payload - 변환할 객체
 * @param camelKey - camelCase 키
 * @param defaultValue - 기본값 (기본: [])
 * @param snakeKey - snake_case 키 (선택적)
 * @returns 배열 값
 */
export function getArrayField<T>(
  payload: Record<string, unknown>,
  camelKey: string,
  defaultValue: T[] = [],
  snakeKey?: string
): T[] {
  const value = getFieldValue<T[]>(payload, camelKey, snakeKey);
  return Array.isArray(value) ? value : defaultValue;
}

/**
 * 객체 필드를 안전하게 추출합니다.
 * 
 * @param payload - 변환할 객체
 * @param camelKey - camelCase 키
 * @param defaultValue - 기본값
 * @param snakeKey - snake_case 키 (선택적)
 * @returns 객체 값
 */
export function getObjectField<T extends Record<string, unknown>>(
  payload: Record<string, unknown>,
  camelKey: string,
  defaultValue: T,
  snakeKey?: string
): T {
  const value = getFieldValue<T>(payload, camelKey, snakeKey);
  return value && typeof value === 'object' && !Array.isArray(value) ? value : defaultValue;
}

/**
 * camelCase를 snake_case로 변환하는 헬퍼 함수
 */
function camelToSnake(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1_$2')
    .toLowerCase();
}

