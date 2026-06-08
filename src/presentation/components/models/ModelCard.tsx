import styled from 'styled-components'
import { theme } from '@/presentation/styles/theme'

interface ModelCardProps {
  profileImage: string | null
  name: string
  modelType: string
  height: string
}

/** 목록·추천용 모델 카드 (4필드만 노출) */
export function ModelCard({ profileImage, name, modelType, height }: ModelCardProps) {
  return (
    <Card>
      <ImageWrap>
        {profileImage ? (
          <img src={profileImage} alt={name || '프로필'} />
        ) : (
          <Placeholder>3:4</Placeholder>
        )}
      </ImageWrap>
      <Info>
        <Name>{name || '이름'}</Name>
        <Meta>
          {modelType && <span>{modelType}</span>}
          {height && <span>{height}cm</span>}
        </Meta>
      </Info>
    </Card>
  )
}

const Card = styled.article`
  background: ${theme.colors.white};
  border-radius: ${theme.radius.lg};
  overflow: hidden;
  border: 1px solid ${theme.colors.border};
  box-shadow: ${theme.shadow.sm};
  width: 100%;
  max-width: 220px;
`

const ImageWrap = styled.div`
  aspect-ratio: 3 / 4;
  background: ${theme.colors.backgroundSubtle};
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const Placeholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.textMuted};
  font-size: 13px;
`

const Info = styled.div`
  padding: 12px 14px;
  text-align: left;
`

const Name = styled.h3`
  margin: 0 0 4px;
  font-size: 15px;
  font-weight: 600;
`

const Meta = styled.div`
  display: flex;
  gap: 8px;
  font-size: 13px;
  color: ${theme.colors.textSecondary};

  span + span::before {
    content: '·';
    margin-right: 8px;
  }
`
