## 채팅 흐름 점검 체크리스트

### 1. 채팅방 목록 (`MessagesPage`)
- **데이터 경로**: `useChatRooms` → `ChatRepository.getRooms` → `ChatApiSource.getRooms`.
- **확인 항목**
  - 첫 진입 시 로딩 스켈레톤 → 실제 리스트로 전환되는지.
  - API 실패 시 빈 상태 대신 에러 메시지(`메시지 목록을 불러오지 못했습니다.`)와 재시도 버튼이 노출되는지.
  - 채팅방 삭제(`chatApiSource.deleteRoom`) 후 WebSocket `room.deleted` 이벤트를 받으면 목록에서 제거되는지.
- **검증 절차**
  1. `/mypage/messages` 진입 → 네트워크 탭에서 `GET /chat/rooms` 요청 확인.
  2. 개발자 도구의 simulate offline 기능으로 오류 발생 → UI가 에러 메시지 + 재시도 버튼을 보여주는지 확인.
  3. 하나의 채팅방을 삭제하고 다른 계정/탭에서 동일 방 삭제 시 목록이 즉시 갱신되는지 확인.

### 2. 채팅방 상세 (`ChatRoomPage`)
- **데이터 경로**: `useChatRoomDetail` → `ChatRepository.getRoomDetail` & `sendMessage`/`markAsRead`.
- **확인 항목**
  - room detail 로딩/에러 상태가 `useDetailPageState` 없이 내부 처리로 정상인지 (`error` 메시지, 스켈레톤 등).
  - 메시지 전송 실패 시 토스트/에러 메시지가 사용자에게 전달되는지.
  - WebSocket 연결 (`useChatWebSocket`) 이 성공하면 `message.new`, `application.status.updated`, `room.deleted` 이벤트를 처리하는지.
  - `ALREADY_APPLIED` 에러 시 기존 채팅방 탐색 → 자동 이동 로직이 동작하는지 (`useCampaignApplyForm`에서 확인).
- **검증 절차**
  1. `/chat/:roomId` 진입 후 네트워크 탭에서 `GET /chat/rooms/:id` 응답 구조 확인.
  2. 다른 브라우저/계정에서 메시지를 보내 WebSocket 수신 → 메시지 리스트가 실시간 갱신되는지.
  3. 네트워크 요청 실패를 강제로 일으켜 `error` 상태가 UI에 노출되는지, 재시도 시 정상 복구되는지.

### 3. 지원하기 → 채팅방 이동 플로우
- **데이터 경로**: `CampaignApplyModal` + `useCampaignApplyForm` → `CampaignRepository.applyToCampaign` → `ChatRepository.getRooms`(ALREADY_APPLIED 시).
- **확인 항목**
  - 지원 성공 시 `chatRoomId`를 받아 즉시 해당 채팅방으로 이동하는지.
  - 이미 지원한 공고일 경우 기존 채팅방 검색 → 존재하면 이동, 없으면 메시지 목록으로 이동하는지.
  - 실패/기타 에러 메시지가 토스트로 제대로 노출되는지.
- **검증 절차**
  1. 캠페인 상세에서 `지원하기` 모달을 열고 실제 요청을 보내 채팅방 이동 확인.
  2. 동일 캠페인에 다시 지원 → 기존 채팅방 이동 토스트 노출 여부 확인.
  3. 채팅방을 삭제한 뒤 다시 지원 → 메시지 목록으로 이동하는지 확인.

### 4. 기타 주의 사항
- `useChatWebSocket`은 최대 5회 재연결만 시도하므로, 장시간 연결 장애 시 UI에 명시적인 안내(토스트 등)를 추가하는 것을 검토.
- Storybook에서는 WebSocket을 사용하지 않으므로 실제 플로우 검증은 로컬 dev 서버에서만 가능.

