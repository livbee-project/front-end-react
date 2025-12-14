# Livbee Project

React + TypeScript + Vite 기반의 모던 웹 애플리케이션입니다.

## 📋 목차

- [기술 스택](#기술-스택)
- [프로젝트 구조](#프로젝트-구조)
- [시작하기](#시작하기)
- [개발 가이드](#개발-가이드)
- [주요 기능](#주요-기능)
- [아키텍처](#아키텍처)

## 🛠 기술 스택

### 핵심 기술
- **React** 19.1.1 - UI 라이브러리
- **TypeScript** 5.9.3 - 타입 안정성
- **Vite** 7.1.7 - 빌드 도구 및 개발 서버
- **React Router** 7.9.5 - 라우팅
- **Styled Components** 6.1.8 - CSS-in-JS 스타일링

### 주요 라이브러리
- **Lucide React** - 아이콘
- **React Day Picker** - 날짜 선택
- **React Mobile Picker** - 모바일 피커
- **Vercel Speed Insights** - 성능 모니터링

### 개발 도구
- **Storybook** 10.0.8 - 컴포넌트 문서화 및 테스트
- **Vitest** 4.0.13 - 단위 테스트
- **ESLint** 9.36.0 - 코드 린팅
- **TypeScript ESLint** - TypeScript 린팅

## 📁 프로젝트 구조

```
src/
├── app/                    # 애플리케이션 설정
│   ├── Router.tsx         # 라우팅 설정
│   └── routes/            # 라우트 메타데이터
├── domain/                # 도메인 레이어 (비즈니스 로직)
│   ├── entities/          # 도메인 엔티티
│   └── usecases/          # 유스케이스
├── data/                  # 데이터 레이어 (API 통신)
│   ├── repositories/      # 리포지토리 패턴
│   ├── sources/           # API 소스
│   ├── mappers/           # 데이터 변환 매퍼
│   └── errorHandlers/     # 에러 핸들러
├── presentation/          # 프레젠테이션 레이어 (UI)
│   ├── components/        # React 컴포넌트
│   ├── pages/             # 페이지 컴포넌트
│   ├── hooks/             # 커스텀 훅
│   ├── layouts/           # 레이아웃 컴포넌트
│   ├── contexts/          # React 컨텍스트
│   └── styles/            # 스타일 정의
├── shared/                # 공유 유틸리티
│   ├── utils/             # 유틸리티 함수
│   ├── config/            # 설정 파일
│   └── constants/        # 상수 정의
└── types/                 # 타입 정의
    ├── commonProps.ts     # 공통 Props 타입
    ├── components.ts      # 컴포넌트 타입
    └── forms.ts           # 폼 타입
```

## 🚀 시작하기

### 필수 요구사항

이 프로젝트는 다음 버전의 Node.js와 npm에서 안정적으로 동작합니다:

- **Node.js**: v20.18.0 이상 (LTS 버전 권장)
- **npm**: v10.8.0 이상

### 환경 설정 가이드

다른 Windows 또는 Mac PC에서 Git 클론 후 작업하기 위한 설정 방법입니다.

#### 1. Node.js 및 npm 버전 확인

터미널에서 현재 버전을 확인합니다:

```bash
node --version
npm --version
```

#### 2. Node Version Manager (NVM) 설치 및 사용 (권장)

NVM을 사용하면 프로젝트에 맞는 Node.js 버전을 자동으로 사용할 수 있습니다.

##### Windows 사용자

1. [nvm-windows](https://github.com/coreybutler/nvm-windows/releases) 다운로드 및 설치
2. 설치 후 터미널을 재시작
3. 프로젝트 디렉토리에서 다음 명령어 실행:

```bash
nvm install 20.18.0
nvm use 20.18.0
```

##### macOS 사용자

1. 터미널에서 다음 명령어로 nvm 설치:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
```

2. 터미널을 재시작하거나 다음 명령어 실행:

```bash
source ~/.zshrc  # 또는 source ~/.bash_profile
```

3. 프로젝트 디렉토리에서 다음 명령어 실행:

```bash
nvm install 20.18.0
nvm use 20.18.0
```

**참고**: `.nvmrc` 파일이 있으면 프로젝트 디렉토리에서 `nvm use`만 실행해도 자동으로 올바른 버전이 적용됩니다.

#### 3. Node.js 직접 설치 (NVM 미사용 시)

1. [Node.js 공식 사이트](https://nodejs.org/ko/download)에서 **LTS 버전 (v20.18.0 이상)** 다운로드 및 설치
2. 설치 후 터미널을 재시작하고 버전 확인:

```bash
node --version  # v20.18.0 이상이어야 함
npm --version   # v10.8.0 이상이어야 함
```

#### 4. 프로젝트 의존성 설치

프로젝트 루트 디렉토리에서 다음 명령어를 실행합니다:

```bash
npm install
```

#### 5. 개발 서버 실행

```bash
npm run dev
```

개발 서버가 시작되면 브라우저에서 `http://localhost:5173`으로 접속할 수 있습니다.

## 💻 개발 가이드

### 사용 가능한 스크립트

```bash
# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview

# 코드 린팅
npm run lint

# 테스트 실행
npm run test

# Storybook 실행
npm run storybook

# Storybook 빌드
npm run build-storybook
```

### 절대 경로 사용

프로젝트는 `@/` 별칭을 사용하여 절대 경로로 import합니다:

```typescript
// ✅ 권장: 절대 경로 사용
import { Button } from '@/presentation/components/ui/Button';
import { useAuth } from '@/presentation/hooks/auth/useAuth';
import { logger } from '@/shared/utils/logger';

// ❌ 비권장: 상대 경로 사용
import { Button } from '../../../components/ui/Button';
```

### 코드 스타일

- **TypeScript**: 엄격한 타입 체크 사용
- **ESLint**: 코드 품질 검사
- **Prettier**: 코드 포맷팅 (설정 파일 참조)

## 🏗 아키텍처

이 프로젝트는 **Clean Architecture** 원칙을 따릅니다:

### 레이어 구조

1. **Domain Layer** (`src/domain/`)
   - 비즈니스 로직과 엔티티 정의
   - 프레임워크 독립적

2. **Data Layer** (`src/data/`)
   - API 통신 및 데이터 변환
   - Repository 패턴 구현
   - Mapper를 통한 데이터 변환

3. **Presentation Layer** (`src/presentation/`)
   - UI 컴포넌트 및 페이지
   - React 훅 및 컨텍스트
   - 사용자 인터랙션 처리

### 주요 패턴

#### Repository 패턴
```typescript
// BaseRepository를 상속하여 공통 에러 처리
export class CampaignRepository extends BaseRepository {
  async getCampaignList(query: CampaignListQuery): Promise<CampaignListResponse> {
    return this.handleError(
      () => this.apiSource.getCampaignList(query),
      'CampaignRepository',
      '모집 공고 목록 조회'
    );
  }
}
```

#### Mapper 패턴
```typescript
// API 응답을 도메인 엔티티로 변환
export const transformCampaignDetailResponse = (
  result: unknown,
  id: string
): CampaignDetail => {
  // snake_case → camelCase 변환
  // 타입 안전한 필드 추출
  // 기본값 제공
}
```

#### Strategy 패턴
```typescript
// 사용자 타입별 전략 구현
export class UserTypeStrategyFactory {
  static createStrategy(userType: UserType): UserTypeStrategy {
    switch (userType) {
      case 'brand': return new BrandStrategy();
      case 'showhost': return new ShowhostStrategy();
      case 'model': return new ModelStrategy();
    }
  }
}
```

## ✨ 주요 기능

### 공통 유틸리티

#### 로깅 시스템
```typescript
import { debug, info, warn, error, group, groupEnd } from '@/shared/utils/logger';

// 개발 환경에서만 동작하는 통합 로깅
debug('Component', '디버그 메시지', { data });
error('API', '에러 발생', error);
```

#### 유효성 검사
```typescript
import { validateRequired, validatePhoneNumber, validateUrl } from '@/shared/utils/formValidation';

// 공통 유효성 검사 함수 사용
const result = validateRequired(value, '필수 입력값입니다.');
const phoneResult = validatePhoneNumber(contact);
```

#### 타입 가드
```typescript
import { isObject, isArray, isString } from '@/shared/utils/typeGuards';

// 런타임 타입 검사로 타입 안정성 향상
if (isObject(data)) {
  // TypeScript가 data를 Record<string, unknown>으로 추론
}
```

### 공통 Props 패턴

```typescript
import type { BaseComponentProps, ModalProps, BaseInputProps } from '@/types/commonProps';

// 재사용 가능한 Props 타입 사용
interface MyComponentProps extends BaseComponentProps {
  // 추가 props
}
```

## 📝 주요 변경사항

### 최근 리팩토링 (2024.12)

- ✅ **로깅 통일**: `console.log/error`를 중앙화된 `logger` 유틸리티로 통합
- ✅ **타입 안정성 개선**: 타입 단언 제거 및 타입 가드 추가
- ✅ **타입 중복 정의 통합**: `UserType` 등 중복 타입 정의 통합
- ✅ **공통 Props 패턴 추출**: 재사용 가능한 Props 타입 정의 (`commonProps.ts`)
- ✅ **유효성 검사 로직 통합**: 중복된 검증 로직을 `formValidation.ts`로 통합
- ✅ **Repository 패턴 개선**: `BaseRepository`를 통한 공통 에러 처리
- ✅ **Mapper 유틸리티**: 반복되는 필드 매핑 로직을 `mapperUtils.ts`로 추출
- ✅ **절대 경로 사용**: 모든 import를 `@/` 절대 경로로 통일

## 🧪 테스트

### 단위 테스트
```bash
npm run test
```

### Storybook 테스트
```bash
npm run storybook
```

Storybook을 통해 컴포넌트를 독립적으로 개발하고 테스트할 수 있습니다.

## 📦 빌드 및 배포

### 프로덕션 빌드
```bash
npm run build
```

빌드 결과물은 `dist/` 디렉토리에 생성됩니다.

### 배포

프로젝트는 Vercel을 통해 자동 배포됩니다:
- `dev` 브랜치 푸시 시 자동 배포
- 빌드 전 TypeScript 타입 체크 수행

## 🤝 기여 가이드

1. 새로운 기능 개발 시 브랜치 생성
2. 코드 작성 후 린트 및 타입 체크 실행
3. 커밋 메시지 형식: `YYMMDD > front-end > react > 커밋 메시지`
4. Pull Request 생성 및 코드 리뷰 요청

## 📄 라이선스

이 프로젝트는 비공개 프로젝트입니다.
