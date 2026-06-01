/**
 * 필드 매핑 유틸리티
 * 반복적인 필드 매핑 로직을 더 추상화하여 중복 코드를 제거합니다.
 */

import {
  getStringField,
  getNumberField,
  getBooleanField,
  getNullableField,
  getArrayField,
  getObjectField,
} from '@/data/mappers/mapperUtils';

/**
 * 필드 매핑 타입 정의
 */
export type FieldMappingType = 'string' | 'number' | 'boolean' | 'nullable' | 'array' | 'object';

export interface FieldMappingConfig {
  type: FieldMappingType;
  camelKey: string;
  snakeKey?: string;
  defaultValue?: unknown;
  arrayItemType?: FieldMappingType;
}

/**
 * 필드 매핑 설정을 기반으로 객체를 매핑합니다.
 * 
 * @param payload - 변환할 객체
 * @param mappings - 필드 매핑 설정 배열
 * @param baseObject - 기본 객체 (기본값으로 사용)
 * @returns 매핑된 객체
 */
export function mapFields<T extends Record<string, unknown>>(
  payload: Record<string, unknown>,
  mappings: FieldMappingConfig[],
  baseObject: T
): T {
  const result = { ...baseObject };

  for (const mapping of mappings) {
    const { type, camelKey, snakeKey, defaultValue } = mapping;

    switch (type) {
      case 'string':
        (result as Record<string, unknown>)[camelKey] = getStringField(
          payload,
          camelKey,
          (defaultValue as string) ?? '',
          snakeKey
        );
        break;
      case 'number':
        (result as Record<string, unknown>)[camelKey] = getNumberField(
          payload,
          camelKey,
          (defaultValue as number) ?? 0,
          snakeKey
        );
        break;
      case 'boolean':
        (result as Record<string, unknown>)[camelKey] = getBooleanField(
          payload,
          camelKey,
          (defaultValue as boolean) ?? false,
          snakeKey
        );
        break;
      case 'nullable':
        (result as Record<string, unknown>)[camelKey] = getNullableField(
          payload,
          camelKey,
          snakeKey
        );
        break;
      case 'array':
        (result as Record<string, unknown>)[camelKey] = getArrayField(
          payload,
          camelKey,
          (defaultValue as unknown[]) ?? [],
          snakeKey
        );
        break;
      case 'object':
        (result as Record<string, unknown>)[camelKey] = getObjectField(
          payload,
          camelKey,
          (defaultValue as Record<string, unknown>) ?? {},
          snakeKey
        );
        break;
    }
  }

  return result;
}

/**
 * 중첩된 객체 필드를 매핑합니다.
 * 
 * @param payload - 변환할 객체
 * @param objectKey - 객체 필드 키
 * @param nestedMappings - 중첩된 필드 매핑 설정
 * @param baseNestedObject - 기본 중첩 객체
 * @param snakeKey - snake_case 키 (선택적)
 * @returns 매핑된 중첩 객체
 */
export function mapNestedFields<T extends Record<string, unknown>>(
  payload: Record<string, unknown>,
  objectKey: string,
  nestedMappings: FieldMappingConfig[],
  baseNestedObject: T,
  snakeKey?: string
): T {
  const nestedPayload = getObjectField<Record<string, unknown>>(
    payload,
    objectKey,
    {},
    snakeKey
  );

  return mapFields(nestedPayload, nestedMappings, baseNestedObject);
}

