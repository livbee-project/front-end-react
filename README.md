# front-end-react

## Node.js 버전 고정 안내

이 프로젝트는 Node.js의 안정적인 버전 관리를 위해 `.nvmrc` 파일을 사용합니다.

- 현재 권장 Node.js 버전: **v24.11.0**
- nvm을 사용하는 경우 아래 명령어로 해당 버전 환경을 맞출 수 있습니다.

```bash
nvm use
```

> 만약 해당 버전이 설치되어 있지 않다면, 아래 명령어로 설치 후 사용하세요.

```bash
nvm install v24.11.0
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

```
npx prettier --write .
```

VSCode 등 IDE의 포맷 기능과 연동해 자동 정렬도 가능합니다.

---

## 폴더 구조 및 클린 아키텍처(2025-10-30 기준)

```
livbee-project/
  └── src/
      ├── app/
      ├── assets/
      │    └── react.svg
      ├── data/
      │    ├── mappers/
      │    ├── repositories/
      │    └── sources/
      ├── domain/
      │    ├── entities/
      │    └── usecases/
      ├── presentation/
      │    ├── components/
      │    │    └── Home.tsx
      │    ├── hooks/
      │    ├── pages/
      │    └── styles/
      │         └── Home.css
      ├── shared/
      ├── App.css
      ├── App.tsx
      ├── index.css
      └── main.tsx
```

> 📚 **클린 아키텍처 구조 설명**
> - app: 환경설정, 진입점, 라우터 등 전체 앱 부트스트랩/구성 담당
> - assets: 이미지, 폰트 등의 정적 리소스
> - data: 외부 데이터 소스(API, DB 등)와 관련된 계층
> - domain: 핵심 비즈니스 로직, 엔티티, 유스케이스(순수함수 중심)
> - presentation: UI 컴포넌트, 페이지, 훅, 스타일 등 표현(뷰) 계층
> - shared: 공통 유틸, 타입, 상수 등 여러 계층에서 공유되는 코드
