# Livbee Project

React + TypeScript + Vite 기반 프로젝트입니다.

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

브라우저에서 `http://localhost:5173`으로 접속하여 확인할 수 있습니다.

### 문제 해결

#### 버전이 맞지 않는 경우

`package.json`의 `engines` 필드에서 지정한 버전과 다를 경우 경고가 표시됩니다. NVM을 사용하여 올바른 버전으로 전환하세요.

#### npm install 실패 시

1. `node_modules` 폴더와 `package-lock.json` 파일 삭제
2. `npm cache clean --force` 실행
3. `npm install` 다시 실행

---

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
