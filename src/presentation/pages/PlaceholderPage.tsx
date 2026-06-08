import styled from 'styled-components'
import { theme } from '@/presentation/styles/theme'

interface PlaceholderPageProps {
  title: string
}

/** 미구현 페이지 placeholder */
export function PlaceholderPage({ title }: PlaceholderPageProps) {
  return (
    <Wrap>
      <h1>{title}</h1>
      <p>준비 중입니다.</p>
    </Wrap>
  )
}

const Wrap = styled.div`
  padding: 48px 20px;
  text-align: center;
  h1 { margin: 0 0 8px; }
  p { color: ${theme.colors.textMuted}; }
`
