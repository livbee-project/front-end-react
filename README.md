# Livbee Front (Renewal)

React + Vite + TypeScript 기반 Livbee 프론트엔드 리뉴얼 프로젝트.

## 요구 환경

- **Node.js 24.x** (nvm 권장)
- npm 10+

## 로컬 세팅

```powershell
# nvm-windows
nvm install 24
nvm use 24
node -v   # v24.x 확인

npm install
npm run dev
```

`.nvmrc`에 `24`가 지정되어 있으므로, nvm이 지원하면 프로젝트 루트에서 `nvm use`로 동일 버전을 맞출 수 있다.

## 스크립트

| 명령 | 설명 |
|------|------|
| `npm run dev` | 개발 서버 |
| `npm run build` | TypeScript 검사 + 프로덕션 빌드 |
| `npm run lint` | ESLint |
| `npm run preview` | 빌드 결과 미리보기 |

## 환경 변수

루트 **`.env` 단일 파일**로 관리한다. (`.env.example` 등 분리 파일 없음)

앱 코드에서는 `src/shared/config/env.ts`만 통해 읽는다.

| 키 | 용도 |
|----|------|
| `VITE_API_URL` | API 베이스 URL |
| `VITE_KAKAO_*` | 카카오 로그인 |
| `VITE_APP_TITLE` | 앱 타이틀 |
| `VITE_DEBUG_LOG_*` | 디버그 로그 |
| `VITE_USE_COMMUNITY_MOCK` | 목 데이터 |

## Vercel 배포

### 환경 구분

| 환경 | 브랜치 | 도메인 |
|------|--------|--------|
| Production | `prod` | 추후 커스텀 |
| Preview | `dev` 등 | `*.vercel.app` 자동 |
| **renewal** (Custom) | `renewal` | **`*.vercel.app` 임시만** |
| Development | `vercel dev` | localhost |

### renewal 커스텀 환경 등록 (Pro+)

1. Vercel → Project → **Settings** → **Environments** → **Create Environment**
2. Name: `renewal`, Branch: `equals` → `renewal`
3. **커스텀 도메인 연결 안 함** — 배포 후 `프로젝트-git-renewal-팀.vercel.app` 사용
4. Environment Variables (**renewal** 스코프만):
   - `VITE_DEPLOY_TARGET=renewal`
   - `VITE_API_URL=https://dev-api.livbee.co.kr/api/v1`
   - `VITE_KAKAO_REDIRECT_URI=https://<vercel-app-url>/auth/kakao/callback`
   - 기타 `VITE_*` (`.env` 참고)
5. Production Branch는 **`prod` 유지**

### Hobby 플랜

Custom Environment 대신 Preview + **Git Branch `renewal`** 스코프로 동일 변수 등록.

상세: `.cursor/rules/frontend-vercel-deployment.mdc`

`vercel.json`에 SPA rewrite·빌드 설정 포함. Node **24.x** (`.nvmrc`).

## 아키텍처

`src/` 레이어: `presentation` → `domain` → `data` → `shared`

에이전트·커밋·env 규칙은 `.cursor/rules/` 참고.
