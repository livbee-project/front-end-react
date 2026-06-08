import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'
import type { ModelProfile } from '@/domain/entities/modelProfile'
import { getModelProfileById } from '@/data/repositories/modelProfileRepository'
import { ModelCard } from '@/presentation/components/models/ModelCard'
import { ModelDetailPreview } from '@/presentation/components/models/ModelDetailPreview'
import { Button } from '@/presentation/components/ui/Button'
import { theme } from '@/presentation/styles/theme'

/** 모델 상세 placeholder 페이지 (등록 완료 후 이동) */
export function ModelDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [profile, setProfile] = useState<ModelProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    getModelProfileById(id).then((p) => {
      setProfile(p)
      setLoading(false)
    })
  }, [id])

  if (loading) return <Wrap>불러오는 중...</Wrap>
  if (!profile) return <Wrap>프로필을 찾을 수 없습니다.</Wrap>

  return (
    <Wrap>
      <Header>
        <h1>모델 상세</h1>
        <Link to="/models">
          <Button variant="outline" size="sm">목록으로</Button>
        </Link>
      </Header>
      <CardRow>
        <ModelCard
          profileImage={profile.profileImage}
          name={profile.name}
          modelType={profile.modelType}
          height={profile.height}
        />
      </CardRow>
      <DetailSection>
        <ModelDetailPreview values={profile} />
      </DetailSection>
    </Wrap>
  )
}

const Wrap = styled.div`
  max-width: 720px;
  margin: 0 auto;
  padding: 32px 20px;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;

  h1 { margin: 0; font-size: 22px; }
`

const CardRow = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 32px;
`

const DetailSection = styled.div`
  background: ${theme.colors.white};
  border: 1px solid ${theme.colors.border};
  border-radius: 12px;
  padding: 24px;
`
