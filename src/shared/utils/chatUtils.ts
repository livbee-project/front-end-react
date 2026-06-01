/**
 * 채팅 관련 유틸리티 함수
 */

import type { ChatMessage } from '@/domain/entities/Chat';

/**
 * 지원서 카드 데이터 타입
 */
export interface ApplicationCardData {
  applicationId?: string;
  campaignTitle?: string;
  portfolioTitle?: string;
  availableDate?: string;
  availableTime?: string;
  message?: string;
  status?: string;
}

/**
 * 시간 포맷팅 (오후/오전 형식)
 */
export const formatTimestamp = (iso?: string): string => {
  if (!iso) return '';
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';
  // 시간만 표시 (오후/오전 형식)
  return new Intl.DateTimeFormat('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).format(date);
};

/**
 * 날짜 포맷팅 (YYYY.MM.DD 형식)
 */
export const formatApplicationDate = (value?: string): string => {
  if (!value) return '-';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
};

/**
 * 시간 포맷팅 (오후/오전 형식)
 */
export const formatApplicationTime = (value?: string): string => {
  if (!value) return '-';
  const fakeDate = `1970-01-01T${value}`;
  const date = new Date(fakeDate);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).format(date);
};

/**
 * 날짜 라벨 포맷팅 (월 일 요일 형식)
 */
export const formatDateLabel = (iso: string): string => {
  const date = new Date(iso);
  return new Intl.DateTimeFormat('ko-KR', {
    month: 'long',
    day: 'numeric',
    weekday: 'short',
  }).format(date);
};

/**
 * 메시지 페이로드에서 지원서 데이터 정규화
 */
const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const getString = (obj: Record<string, unknown>, key: string): string | undefined => {
  const value = obj[key];
  return typeof value === 'string' ? value : undefined;
};

const getNestedRecord = (obj: Record<string, unknown>, key: string): Record<string, unknown> | undefined => {
  const value = obj[key];
  return isRecord(value) ? (value as Record<string, unknown>) : undefined;
};

export const normalizeApplicationPayload = (
  payload: Record<string, unknown> | null | undefined
): ApplicationCardData | null => {
  if (!payload || !isRecord(payload)) {
    return null;
  }

  const sourceRecord = getNestedRecord(payload, 'application') ?? payload;
  const type =
    getString(payload, 'type') ?? getString(sourceRecord, 'type') ?? getString(payload, 'kind') ?? getString(sourceRecord, 'kind');
  
  // 결제 요청 메시지는 지원서 카드로 처리하지 않음
  if (type === 'payment_request') {
    return null;
  }
  
  const allowedTypes = ['application', 'campaign_application', 'support_form'];

  const hasExplicitType = type ? allowedTypes.includes(type) : false;
  const hasEssentialField =
    Boolean(
      getString(sourceRecord, 'campaignTitle') ||
        getString(sourceRecord, 'portfolioTitle') ||
        getString(sourceRecord, 'availableDate') ||
        getString(sourceRecord, 'availableTime') ||
        getString(sourceRecord, 'message')
    );

  if (!hasExplicitType && !hasEssentialField) {
    return null;
  }

  return {
    applicationId: getString(sourceRecord, 'applicationId') || getString(sourceRecord, 'id'),
    campaignTitle:
      getString(sourceRecord, 'campaignTitle') ||
      getString(getNestedRecord(sourceRecord, 'campaign') ?? {}, 'title') ||
      getString(sourceRecord, 'campaignName'),
    portfolioTitle:
      getString(sourceRecord, 'portfolioTitle') ||
      getString(getNestedRecord(sourceRecord, 'portfolio') ?? {}, 'title') ||
      getString(sourceRecord, 'portfolioName'),
    availableDate: getString(sourceRecord, 'availableDate') || getString(sourceRecord, 'available_date'),
    availableTime: getString(sourceRecord, 'availableTime') || getString(sourceRecord, 'available_time'),
    message: getString(sourceRecord, 'message') || getString(sourceRecord, 'comment'),
    status: getString(sourceRecord, 'status'),
  };
};

/**
 * 채팅 메시지에서 지원서 데이터 추출
 */
export const extractApplicationData = (
  message: ChatMessage,
  normalizeFn: (payload: Record<string, unknown> | null | undefined) => ApplicationCardData | null
): ApplicationCardData | null => {
  const candidates: Array<Record<string, unknown>> = [];

  if (isRecord(message.metadata)) {
    candidates.push(message.metadata);
    const metaApplication = getNestedRecord(message.metadata, 'application');
    if (metaApplication) {
      candidates.push(metaApplication);
    }
  }

  if (message.messageType === 'system' && typeof message.content === 'string') {
    const trimmed = message.content.trim();
    if (trimmed.startsWith('{')) {
      try {
        const parsed = JSON.parse(trimmed);
        if (isRecord(parsed)) {
          candidates.push(parsed);
        }
      } catch {
        // ignore invalid JSON
      }
    }
  }

  for (const candidate of candidates) {
    const data = normalizeFn(candidate);
    if (data) {
      return data;
    }
  }

  return null;
};

