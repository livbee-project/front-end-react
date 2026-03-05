import type { CommunityPostDetail } from '@/domain/entities/Community';

export const COMMUNITY_POSTS: CommunityPostDetail[] = [
  {
    id: '1',
    title: '쇼핑라이브 촬영 준비물 체크리스트를 공유합니다!',
    preview:
      '쇼핑라이브 소소스트로 활동하면서 정리한 준비물 체크리스트입니다. 조명, 카메라, 음향, 세팅 순서까지 한 번에 볼 수 있어요.',
    category: 'info',
    categoryLabel: '정보공유',
    topicTag: '필요노하우',
    isHot: true,
    authorId: 'user-1',
    authorName: '안정하실',
    authorRole: 'showhost',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1일 전
    viewCount: 342,
    commentCount: 18,
    likeCount: 25,
    content:
      '첫 쇼핑라이브를 준비하시는 분들을 위해 제가 사용하는 체크리스트를 공유합니다.\n\n1. 장비 체크\n- 카메라 배터리 및 메모리 카드\n- 조명 밝기 및 위치\n- 마이크 수음 상태\n\n2. 세트 구성\n- 브랜드 로고 노출 위치\n- 제품 진열 순서\n\n3. 진행 스크립트\n- 오프닝 멘트\n- 주요 포인트 3가지 정리\n\n이외에도 댓글로 여러분의 팁을 함께 공유해 주세요!',
    images: [],
  },
  {
    id: '2',
    title: '패션 브랜드와의 첫 계약, 주의사항이 있을까요?',
    preview:
      '첫 패션 브랜드와의 장기 계약 제안을 받았는데, 계약서에서 특히 어떤 부분을 확인해야 할지 고민됩니다.',
    category: 'question',
    categoryLabel: '질문',
    topicTag: '필요노하우',
    isHot: true,
    authorId: 'user-2',
    authorName: '이서연',
    authorRole: 'showhost',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5시간 전
    viewCount: 156,
    commentCount: 12,
    likeCount: 8,
    content:
      '안녕하세요, 최근에 패션 브랜드에서 6개월 단위 쇼핑라이브 진행을 제안받았습니다.\n\n계약서 초안을 받아보니 출연료, 라이브 횟수, 초과 시간 등에 대한 조항이 있는데\n혹시 선배님들께서 꼭 체크해야 한다고 생각하는 항목이 있을까요?\n\n- 초상권/콘텐츠 2차 활용 범위\n- 라이브 녹화본 유튜브 업로드 여부\n- 타 브랜드와의 중복 출연 제한\n\n이런 부분들이 특히 궁금합니다.',
    images: [],
  },
  {
    id: '3',
    title: '이번 주 쇼핑라이브 일정 공유합니다~',
    preview:
      '이번 주 진행 예정인 쇼핑라이브 일정 공유드려요. 패션, 뷰티, 리빙까지 다양한 브랜드가 준비되어 있어요.',
    category: 'free',
    categoryLabel: '자유게시판',
    topicTag: '공지',
    isHot: false,
    authorId: 'user-3',
    authorName: '스케줄캡틴',
    authorRole: 'brand',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(), // 3일 전
    viewCount: 421,
    commentCount: 5,
    likeCount: 28,
    content:
      '안녕하세요, 이번 주 라이브 일정 공유합니다.\n\n- 월요일 20:00 뷰티 신상품 라이브\n- 수요일 19:30 패션 아울렛 라이브\n- 금요일 21:00 리빙 브랜드 콜라보 라이브\n\n관심 있으신 분들은 댓글로 질문 남겨주시면 라이브에서 함께 다뤄볼게요!',
    images: [],
  },
  {
    id: '4',
    title: '쇼핑라이브 플랫폼별 장단점 비교',
    preview:
      '네이버 쇼핑라이브, 카카오 쇼핑하기, 그립 등 주요 플랫폼을 사용해본 경험을 간단히 정리해봤어요.',
    category: 'info',
    categoryLabel: '정보공유',
    topicTag: '정보공유',
    isHot: false,
    authorId: 'user-4',
    authorName: '최유리',
    authorRole: 'showhost',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4).toISOString(), // 4일 전
    viewCount: 367,
    commentCount: 9,
    likeCount: 19,
    content:
      '그동안 여러 플랫폼에서 쇼핑라이브를 진행하며 느낀 점을 간단히 정리했습니다.\n\n1. 네이버 쇼핑라이브\n- 장점: 검색 유입이 좋고, 재방문률이 높음\n- 단점: 입점/입점 심사 과정이 다소 까다로움\n\n2. 카카오 쇼핑하기\n- 장점: 카카오톡 채널과의 연계가 좋아 알림/재구매 유도에 유리\n- 단점: 시청자 수가 플랫폼에 따라 조금씩 편차가 있음\n\n3. 그립\n- 장점: 라이브 중심 UX라 진입장벽이 낮고 기능이 직관적\n- 단점: 브랜드 인지도에 따라 성과 편차가 큰 편\n\n자세한 내용은 댓글에서 질문 주시면 추가로 답변 드릴게요.',
    images: [],
  },
];

