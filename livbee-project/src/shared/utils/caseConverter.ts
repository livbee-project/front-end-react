/**
 * snake_case와 camelCase 간 변환 유틸리티
 */

/**
 * snake_case 문자열을 camelCase로 변환
 */
export const snakeToCamel = (str: string): string => {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
};

/**
 * camelCase 문자열을 snake_case로 변환
 */
export const camelToSnake = (str: string): string => {
  // 첫 글자가 대문자일 때 앞에 언더스코어가 추가되지 않도록 처리
  return str
    .replace(/([a-z])([A-Z])/g, '$1_$2') // 소문자와 대문자 사이에 언더스코어 추가
    .replace(/([A-Z])([A-Z][a-z])/g, '$1_$2') // 연속된 대문자 처리
    .toLowerCase(); // 모두 소문자로 변환
};

/**
 * 객체의 모든 키를 snake_case에서 camelCase로 변환
 */
export const convertKeysToCamelCase = <T extends Record<string, unknown>>(obj: T): Record<string, unknown> => {
  if (obj === null || obj === undefined || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => convertKeysToCamelCase(item as Record<string, unknown>)) as unknown as Record<string, unknown>;
  }

  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj)) {
    const camelKey = snakeToCamel(key);
    
    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      result[camelKey] = convertKeysToCamelCase(value as Record<string, unknown>);
    } else if (Array.isArray(value)) {
      result[camelKey] = value.map((item) => 
        typeof item === 'object' && item !== null 
          ? convertKeysToCamelCase(item as Record<string, unknown>)
          : item
      );
    } else {
      result[camelKey] = value;
    }
  }
  
  return result;
};

/**
 * 객체의 모든 키를 camelCase에서 snake_case로 변환
 */
export const convertKeysToSnakeCase = <T extends Record<string, unknown>>(obj: T): Record<string, unknown> => {
  if (obj === null || obj === undefined || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => convertKeysToSnakeCase(item as Record<string, unknown>)) as unknown as Record<string, unknown>;
  }

  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj)) {
    const snakeKey = camelToSnake(key);
    
    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      result[snakeKey] = convertKeysToSnakeCase(value as Record<string, unknown>);
    } else if (Array.isArray(value)) {
      result[snakeKey] = value.map((item) => 
        typeof item === 'object' && item !== null 
          ? convertKeysToSnakeCase(item as Record<string, unknown>)
          : item
      );
    } else {
      result[snakeKey] = value;
    }
  }
  
  return result;
};

