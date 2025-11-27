/**
 * WebSocket 이벤트 타입 정의
 */

import type { ChatMessage, ChatRoomApplication } from './Chat';

/**
 * WebSocket 이벤트 타입
 */
export type WebSocketEventType =
  | 'connection'
  | 'message.new'
  | 'message.read'
  | 'application.status.updated'
  | 'room.deleted'
  | 'ping'
  | 'pong';

/**
 * 메시지 새로 수신 이벤트 페이로드
 */
export interface MessageNewPayload {
  message: ChatMessage;
}

/**
 * 메시지 읽음 상태 업데이트 이벤트 페이로드
 */
export interface MessageReadPayload {
  userId: string;
  lastMessageId: string;
}

/**
 * 지원서 상태 업데이트 이벤트 페이로드
 */
export interface ApplicationStatusUpdatedPayload {
  application: ChatRoomApplication;
}

/**
 * 채팅방 삭제 이벤트 페이로드
 */
export interface RoomDeletedPayload {
  roomId: string;
}

/**
 * 연결 이벤트 페이로드
 */
export interface ConnectionPayload {
  roomId: string;
  userId: string;
}

/**
 * WebSocket 이벤트 페이로드 유니온 타입
 */
export type WebSocketEventPayload =
  | MessageNewPayload
  | MessageReadPayload
  | ApplicationStatusUpdatedPayload
  | RoomDeletedPayload
  | ConnectionPayload
  | Record<string, never>; // ping/pong 등 payload가 없는 경우

/**
 * WebSocket 이벤트
 */
export interface WebSocketEvent<T extends WebSocketEventType = WebSocketEventType> {
  type: T;
  payload?: WebSocketEventPayload;
}

/**
 * 타입 가드: MessageNewPayload인지 확인
 */
export function isMessageNewPayload(
  payload: unknown
): payload is MessageNewPayload {
  return (
    typeof payload === 'object' &&
    payload !== null &&
    'message' in payload &&
    typeof (payload as { message: unknown }).message === 'object'
  );
}

/**
 * 타입 가드: MessageReadPayload인지 확인
 */
export function isMessageReadPayload(
  payload: unknown
): payload is MessageReadPayload {
  return (
    typeof payload === 'object' &&
    payload !== null &&
    'userId' in payload &&
    'lastMessageId' in payload &&
    typeof (payload as { userId: unknown }).userId === 'string' &&
    typeof (payload as { lastMessageId: unknown }).lastMessageId === 'string'
  );
}

/**
 * 타입 가드: ApplicationStatusUpdatedPayload인지 확인
 */
export function isApplicationStatusUpdatedPayload(
  payload: unknown
): payload is ApplicationStatusUpdatedPayload {
  return (
    typeof payload === 'object' &&
    payload !== null &&
    'application' in payload &&
    typeof (payload as { application: unknown }).application === 'object'
  );
}

/**
 * 타입 가드: RoomDeletedPayload인지 확인
 */
export function isRoomDeletedPayload(
  payload: unknown
): payload is RoomDeletedPayload {
  return (
    typeof payload === 'object' &&
    payload !== null &&
    'roomId' in payload &&
    typeof (payload as { roomId: unknown }).roomId === 'string'
  );
}

/**
 * 타입 가드: ConnectionPayload인지 확인
 */
export function isConnectionPayload(
  payload: unknown
): payload is ConnectionPayload {
  return (
    typeof payload === 'object' &&
    payload !== null &&
    'roomId' in payload &&
    'userId' in payload &&
    typeof (payload as { roomId: unknown }).roomId === 'string' &&
    typeof (payload as { userId: unknown }).userId === 'string'
  );
}

