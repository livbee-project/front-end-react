import { describe, it, expect } from 'vitest';
import { extractErrorMessage, DEFAULT_ERROR_MESSAGE } from '../apiResponseHandler';

describe('extractErrorMessage', () => {
  it('통일된 형식: userMessage 최상위 사용', () => {
    const response = {
      ok: false,
      error: 'ROLE_MISMATCH',
      message: 'Role does not match',
      userMessage: '선택하신 역할과 계정 정보가 일치하지 않습니다.',
    };
    expect(extractErrorMessage(response)).toBe('선택하신 역할과 계정 정보가 일치하지 않습니다.');
  });

  it('통일된 형식: userMessage 없을 때 message 사용', () => {
    const response = { ok: false, error: 'INVALID_CREDENTIALS', message: 'Invalid credentials' };
    expect(extractErrorMessage(response)).toBe('Invalid credentials');
  });

  it('통일된 형식: message 없을 때 error 사용', () => {
    const response = { ok: false, error: 'NOT_FOUND' };
    expect(extractErrorMessage(response)).toBe('NOT_FOUND');
  });

  it('레거시: detail이 문자열인 경우', () => {
    const response = { detail: '잘못된 요청입니다.' };
    expect(extractErrorMessage(response)).toBe('잘못된 요청입니다.');
  });

  it('레거시: detail이 객체인 경우 userMessage 추출', () => {
    const response = {
      detail: {
        error: 'ROLE_MISMATCH',
        message: 'Role does not match',
        userMessage: '선택하신 역할과 계정 정보가 일치하지 않습니다.',
      },
    };
    expect(extractErrorMessage(response)).toBe('선택하신 역할과 계정 정보가 일치하지 않습니다.');
  });

  it('422: errors 배열 fallback (userMessage, message, error 없을 때)', () => {
    const response = {
      ok: false,
      errors: [
        { loc: ['body', 'email'], msg: 'value is not a valid email address', type: 'value_error.email' },
        { loc: ['body', 'password'], msg: 'ensure this value has at least 8 characters', type: 'value_error.any_str.min_length' },
      ],
    };
    expect(extractErrorMessage(response)).toBe('value is not a valid email address, ensure this value has at least 8 characters');
  });

  it('422: userMessage가 있으면 userMessage 우선 (errors 무시)', () => {
    const response = {
      ok: false,
      error: 'VALIDATION_FAILED',
      message: 'Validation failed',
      userMessage: '입력값이 올바르지 않습니다.',
      errors: [
        { loc: ['body', 'email'], msg: 'value is not a valid email address', type: 'value_error.email' },
      ],
    };
    expect(extractErrorMessage(response)).toBe('입력값이 올바르지 않습니다.');
  });

  it('추출 실패 시 기본 메시지 반환', () => {
    expect(extractErrorMessage({})).toBe(DEFAULT_ERROR_MESSAGE);
    expect(extractErrorMessage({ foo: 'bar' })).toBe(DEFAULT_ERROR_MESSAGE);
  });
});
