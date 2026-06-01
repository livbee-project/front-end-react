# livbee-front

## Node.js 버전 고정 안내

이 프로젝트는 Node.js의 안정적인 버전 관리를 위해 `.nvmrc` 파일을 사용합니다.

- 현재 고정 Node.js 버전: **24.16.0** (`.nvmrc`, `package.json`의 `engines.node: 24.x`와 함께 사용)
- nvm을 사용하는 경우 아래 명령어로 해당 버전 환경을 맞출 수 있습니다.

```bash
nvm use
```

> 만약 해당 버전이 설치되어 있지 않다면, 아래 명령어로 설치 후 사용하세요.

```bash
nvm install
nvm use
```

이 방법으로 협업 시 Node.js 환경의 버전 차이로 인한 문제를 최소화할 수 있습니다.

---

## 코드 스타일(Prettier) 안내

이 프로젝트는 Prettier를 사용해 다음과 같이 코드 스타일을 통일합니다.

- 한 줄 최대 글자 수: 100
- 들여쓰기: 스페이스 2칸
- 홑따옴표(') 사용
- 세미콜론(;) 붙임

### 코드 자동 정렬 실행 방법

아래 명령어로 코드 스타일을 자동 정렬할 수 있습니다.

```bash
npm run format
```

VSCode 등 IDE의 포맷 기능과 연동해 자동 정렬도 가능합니다.

---

## 테스트

| 명령어 | 설명 |
|--------|------|
| `npm test` | `src` 내 `*.test.ts` 유닛 테스트 (`vitest.config.ts`) |
| `npm run test:storybook` | Storybook 스토리 기반 브라우저 테스트 (`vitest.storybook.config.ts`) |

유닛·Storybook 테스트는 각각 전용 Vitest 설정 파일에서 관리하며, `vite.config.ts`는 앱 빌드·dev 전용입니다.

Storybook 브라우저 테스트를 처음 실행할 때는 Playwright Chromium 설치가 필요합니다.

```bash
npx playwright install chromium
```

---

## 품질 확인

```bash
npm run check      # lint + unit test + build
npm run check:ci   # lint + unit + storybook test + build (CI와 동일)
npm run format     # Prettier 포맷
```

CI(GitHub Actions)는 `check:ci`와 동일한 단계(`lint` → `test` → `test:storybook` → `build`)를 실행합니다.

---

## 폴더 구조 및 클린 아키텍처

```
src/
  ├── app/
  ├── assets/
  ├── data/
  ├── domain/
  ├── presentation/
  └── shared/
```

> 📚 **클린 아키텍처 구조 설명**
> - app: 환경설정, 진입점, 라우터 등 전체 앱 부트스트랩/구성 담당
> - assets: 이미지, 폰트 등의 정적 리소스
> - data: 외부 데이터 소스(API, DB 등)와 관련된 계층
> - domain: 핵심 비즈니스 로직, 엔티티, 유스케이스(순수함수 중심)
> - presentation: UI 컴포넌트, 페이지, 훅, 스타일 등 표현(뷰) 계층
> - shared: 공통 유틸, 타입, 상수 등 여러 계층에서 공유되는 코드

# React 프로젝트 작명 규칙 (Naming Conventions)

이 프로젝트는 React 및 TypeScript의 표준 작명 규칙을 따릅니다.

## 1. 컴포넌트 (Components)

- **규칙:** **파스칼 케이스 (PascalCase)**
- **설명:** 컴포넌트의 함수/클래스명과 파일명은 모두 대문자로 시작하는 파스칼 케이스를 사용합니다.
- **이유:** 일반 HTML 태그(`<div>`, `<span>`)와 React 컴포넌트(`<SectionContainer>`)를 시각적으로 명확하게 구분하기 위함입니다.
- **예시:**
  - `src/presentation/components/SectionContainer.tsx`
  - `src/presentation/components/PortraitCard.tsx`
  - `function PortraitCard() { ... }`
  - `const App: React.FC = () => { ... }`

## 2. 훅 (Hooks)

- **규칙:** `use` 접두사 + **카멜 케이스 (camelCase)**
- **설명:** React 내장 훅(`useState`) 또는 커스텀 훅(Custom Hook)의 함수명과 파일명은 `use`로 시작하는 카멜 케이스를 사용합니다.
- **이유:** React 린터(Linter)가 해당 함수를 훅으로 인식하고, "훅의 규칙"(Rules of Hooks)을 올바르게 검사하고 강제할 수 있도록 보장합니다.
- **예시:**
  - `src/presentation/hooks/useSlider.tsx`
  - `function useSlider() { ... }`
  - `const { ... } = useSlider();`

## 3. 기타 (변수, 함수, 폴더)

- **규칙:** **카멜 케이스 (camelCase)**
- **설명:** 컴포넌트와 훅을 제외한 모든 일반 변수, 함수, 폴더명에는 표준 JavaScript/TypeScript 관례인 카멜 케이스를 사용합니다.
- **예시:**
  - `const shoppingLiveItems = [ ... ];`
  - `function startTimer() { ... }`
  - `src/presentation/pages/home/`
  - `src/presentation/components/`
