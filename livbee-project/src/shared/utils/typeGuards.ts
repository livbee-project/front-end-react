/**
 * 타입 가드 유틸리티
 * 런타임 타입 검사를 통해 타입 안정성을 향상시킵니다.
 */

/**
 * 값이 객체인지 확인합니다.
 */
export function isObject(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

/**
 * 값이 배열인지 확인합니다.
 */
export function isArray<T = unknown>(value: unknown): value is T[] {
  return Array.isArray(value);
}

/**
 * 값이 문자열인지 확인합니다.
 */
export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

/**
 * 값이 숫자인지 확인합니다.
 */
export function isNumber(value: unknown): value is number {
  return typeof value === 'number' && !Number.isNaN(value);
}

/**
 * 값이 불리언인지 확인합니다.
 */
export function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean';
}

/**
 * 값이 null 또는 undefined인지 확인합니다.
 */
export function isNullOrUndefined(value: unknown): value is null | undefined {
  return value === null || value === undefined;
}

/**
 * 값이 정의되어 있는지 확인합니다 (null과 undefined가 아님).
 */
export function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

/**
 * 객체가 특정 키를 가지고 있는지 확인합니다.
 */
export function hasKey<K extends string>(
  obj: unknown,
  key: K
): obj is Record<K, unknown> {
  return isObject(obj) && key in obj;
}

/**
 * 객체가 여러 키를 모두 가지고 있는지 확인합니다.
 */
export function hasKeys<K extends string>(
  obj: unknown,
  keys: readonly K[]
): obj is Record<K, unknown> {
  if (!isObject(obj)) {
    return false;
  }
  return keys.every((key) => key in obj);
}

/**
 * 값이 Promise인지 확인합니다.
 */
export function isPromise<T = unknown>(value: unknown): value is Promise<T> {
  return (
    value !== null &&
    typeof value === 'object' &&
    'then' in value &&
    typeof (value as { then: unknown }).then === 'function'
  );
}

/**
 * 값이 특정 타입의 배열인지 확인합니다.
 * 타입 가드 함수를 사용하여 각 요소를 검증합니다.
 */
export function isArrayOf<T>(
  value: unknown,
  guard: (item: unknown) => item is T
): value is T[] {
  if (!Array.isArray(value)) {
    return false;
  }
  return value.every(guard);
}

/**
 * 값이 React의 ChangeEvent인지 확인합니다.
 */
export function isChangeEvent<T = HTMLElement>(
  value: unknown
): value is React.ChangeEvent<T> {
  return (
    isObject(value) &&
    'target' in value &&
    isObject(value.target)
  );
}

/**
 * 값이 특정 인터페이스를 만족하는지 확인합니다.
 * 키 목록을 받아 해당 키들이 모두 존재하는지 확인합니다.
 */
export function hasInterface<T extends Record<string, unknown>>(
  value: unknown,
  requiredKeys: (keyof T)[]
): value is T {
  if (!isObject(value)) {
    return false;
  }
  return requiredKeys.every((key) => key in value);
}

