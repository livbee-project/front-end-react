/**
 * 객체 유틸리티 함수
 * 객체 조작 및 정리를 위한 공통 함수 제공
 */

import { isObject } from '@/shared/utils/typeGuards';

/**
 * 객체에서 undefined 필드를 제거합니다.
 * 
 * @param obj - 정리할 객체
 * @returns undefined 필드가 제거된 새 객체
 */
export function removeUndefinedFields<T extends Record<string, unknown>>(
  obj: T
): Partial<T> {
  if (!isObject(obj)) {
    return obj;
  }

  const result: Partial<T> = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value !== undefined) {
      result[key as keyof T] = value as T[keyof T];
    }
  }
  return result;
}

/**
 * 객체에서 null과 undefined 필드를 제거합니다.
 * 
 * @param obj - 정리할 객체
 * @returns null과 undefined 필드가 제거된 새 객체
 */
export function removeNullishFields<T extends Record<string, unknown>>(
  obj: T
): Partial<T> {
  if (!isObject(obj)) {
    return obj;
  }

  const result: Partial<T> = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value !== null && value !== undefined) {
      result[key as keyof T] = value as T[keyof T];
    }
  }
  return result;
}

/**
 * 객체에서 빈 문자열 필드를 제거합니다.
 * 
 * @param obj - 정리할 객체
 * @returns 빈 문자열 필드가 제거된 새 객체
 */
export function removeEmptyStringFields<T extends Record<string, unknown>>(
  obj: T
): Partial<T> {
  if (!isObject(obj)) {
    return obj;
  }

  const result: Partial<T> = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value !== '' && value !== undefined && value !== null) {
      result[key as keyof T] = value as T[keyof T];
    }
  }
  return result;
}

/**
 * 객체에서 특정 조건에 맞는 필드를 제거합니다.
 * 
 * @param obj - 정리할 객체
 * @param predicate - 필드를 제거할지 결정하는 함수
 * @returns 조건에 맞는 필드가 제거된 새 객체
 */
export function removeFieldsByCondition<T extends Record<string, unknown>>(
  obj: T,
  predicate: (value: unknown, key: string) => boolean
): Partial<T> {
  if (!isObject(obj)) {
    return obj;
  }

  const result: Partial<T> = {};
  for (const [key, value] of Object.entries(obj)) {
    if (!predicate(value, key)) {
      result[key as keyof T] = value as T[keyof T];
    }
  }
  return result;
}

/**
 * 객체를 깊은 복사합니다.
 * 
 * @param obj - 복사할 객체
 * @returns 깊은 복사된 새 객체
 * 
 * @note 제네릭 타입의 한계로 인해 Date와 Array의 경우 타입 단언이 필요합니다.
 * 런타임에서는 올바른 타입이 보장됩니다.
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (obj instanceof Date) {
    // Date 인스턴스를 T로 변환 (타입 시스템의 한계)
    return new Date(obj.getTime()) as T;
  }

  if (Array.isArray(obj)) {
    // 배열을 T로 변환 (타입 시스템의 한계)
    return obj.map((item) => deepClone(item)) as T;
  }

  if (isObject(obj)) {
    const cloned = {} as Record<string, unknown>;
    for (const [key, value] of Object.entries(obj)) {
      cloned[key] = deepClone(value);
    }
    return cloned as T;
  }

  return obj;
}

/**
 * 두 객체를 병합합니다. (첫 번째 객체를 기준으로)
 * 
 * @param target - 대상 객체
 * @param source - 소스 객체
 * @returns 병합된 새 객체
 */
export function mergeObjects<T extends Record<string, unknown>>(
  target: T,
  source: Partial<T>
): T {
  return { ...target, ...source };
}

