import { describe, it, expect } from 'vitest';
import { handleShowhostEntityError } from '@/data/errorHandlers/showhostEntityErrorHandler';

describe('handleShowhostEntityError', () => {
  it('returns auth message for 401 status', () => {
    const error = handleShowhostEntityError({ status: 401 }, {}, '기본 메시지');
    expect(error.message).toBe('인증이 필요합니다.');
  });

  it('returns permission message for 403 status', () => {
    const error = handleShowhostEntityError({ status: 403 }, {}, '기본 메시지');
    expect(error.message).toBe('권한이 없습니다. 쇼호스트 역할만 등록 가능합니다.');
  });

  it('falls back to extractErrorMessage', () => {
    const errorPayload = { detail: '잘못된 요청입니다.' };
    const error = handleShowhostEntityError({ status: 400 }, errorPayload, '기본 메시지');
    expect(error.message).toBe('잘못된 요청입니다.');
  });

  it('uses status-specific message for 500 when no error payload provided', () => {
    const error = handleShowhostEntityError({ status: 500 }, {}, '기본 메시지');
    expect(error.message).toBe('서버 오류가 발생했습니다.');
  });
});

