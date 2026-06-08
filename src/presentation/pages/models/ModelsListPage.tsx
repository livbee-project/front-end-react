import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Button } from '@/presentation/components/ui/Button'
import { theme } from '@/presentation/styles/theme'

/** 모델 목록 placeholder 페이지 */
export function ModelsListPage() {
  return (
    <Wrap>
      <h1>모델 목록</h1>
      <p>등록된 모델 프로필이 여기에 표시됩니다.</p>
      <Link to="/models/create">
        <Button>모델 프로필 등록</Button>
      </Link>
    </Wrap>
  )
}

const Wrap = styled.div`
  padding: 40px 20px;
  text-align: center;

  h1 { margin: 0 0 8px; font-size: 24px; }
  p { color: ${theme.colors.textSecondary}; margin: 0 0 24px; }
`
