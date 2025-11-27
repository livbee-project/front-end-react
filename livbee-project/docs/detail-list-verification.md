## 상세 · 목록 페이지 데이터 검증 메모

새 `fetchApi`/Repository 구조에 맞춰 주요 페이지가 어느 경로로 데이터를 불러오는지와,
수동 검증 시 체크해야 할 항목을 정리했습니다. 로컬에서 `npm run dev` 로 서버를 띄운 뒤
아래 시나리오대로 확인하면 됩니다.

### 1. 상세 페이지
| 페이지 | Repository/Hook | 확인 포인트 |
| --- | --- | --- |
| `CampaignDetailPage` | `CampaignRepository.getCampaignById` → `useDetailFetcher` → `useDetailPageState` | - 실패 시 `공고를 불러오는데 실패했습니다.` 메시지가 노출되는지<br>- `isApplied` 상태가 `CampaignApplyModal` 제출 후 `handleApplySuccess`로 갱신되는지 |
| `ModelDetailPage` | `ModelRepository.getModelById` → `useDetailFetcher` | - API 값이 없을 때 mock 데이터로 대체되는 영역(소개/태그)이 정상 렌더링되는지<br>- 뒤로가기/제안하기 버튼 동작 |
| `PortfolioDetailPage` | `PortfolioRepository.getPortfolioById` → `useDetailFetcher` → `useImageGallery` | - 서브 썸네일이 없는 경우 갤러리 섹션이 숨겨지는지<br>- `ActionSection` 의 `isReceivingOffers` 플래그가 API 값을 따라가는지 |

#### 테스트 절차
1. 각 상세 페이지 URL(`campaigns/:id`, `models/:id`, `portfolios/:id`)로 직접 진입.
2. 존재하지 않는 ID로 접근하여 404/에러 메시지와 목록으로 이동 버튼이 정상인지 확인.
3. 네트워크 탭에서 `GET` 응답이 `{ ok:true, data:{...} }` 형식인지 확인하고,
   필수 필드가 비어있을 때 mock fallback 이 적용되는지 UI로 확인.

### 2. 목록 페이지
| 페이지 | 데이터 경로 | 확인 포인트 |
| --- | --- | --- |
| `CampaignsPage` | `CampaignRepository.getCampaignList` → `useListData` | - 검색어/필터 변경 시 `currentPage` 리셋 및 재조회<br>- 에러 발생 시 `CampaignListContent`의 재시도 버튼이 `handleRetry`로 검색값 초기화 |
| `ModelsPage` / `PortfoliosPage` | (각 Repository) + `useListFetcher`/`useListPageState` | - 공통 `ListStatePlaceholder`가 로딩/빈/에러 상태를 보여주는지<br>- 페이지네이션 변경 시 `useListData`의 `setCurrentPage` 반영 |

#### 테스트 절차
1. 기본 목록 진입 → 로딩 스켈레톤 → 실제 카드가 순서대로 렌더링되는지 확인.
2. 필터/검색 입력 후 `useListSearch`가 `searchQuery`를 생성하고, API 요청 파라미터에 반영됐는지 네트워크 탭 확인.
3. 개발자 도구의 네트워크 throttling 또는 dev proxy를 이용해 오류 응답을 강제로 만들어 에러 메시지와 재시도 동작을 확인.

### 3. 참고 사항
- `useDetailFetcher`/`useListFetcher`는 모두 `AbortController`를 사용하므로 빠른 전환 시에도 이전 요청 취소가 보장됩니다.
- 스토리북에서는 `CampaignDetailPage` 등 실데이터 의존 컴포넌트를 아직 mock 처리하지 않았으므로, 실 검증은 로컬 dev 서버에서 진행해야 합니다.
- 상기 검증 시나리오 결과/이슈는 `docs/testing-report.md` 등에 누적 기록하면 추후 회귀 테스트에 도움이 됩니다.

