import type { CampaignFormErrors, CampaignFormValues } from '@/domain/entities/campaign'
import { isCampaignFormComplete } from '@/domain/usecases/campaign/validateCampaignForm'
import { CampaignCard } from '@/presentation/components/campaign/CampaignCard'
import { LiveCard } from '@/presentation/components/campaign/LiveCard'
import { formatPayment } from '@/shared/utils/formatPayment'
import {
  Checklist,
  DetailTable,
  FormStack,
  SectionDesc,
  SectionHeading,
  SectionTitle,
} from '@/presentation/pages/campaigns/create/styles/campaignCreate.styles'

interface Props {
  values: CampaignFormValues
  errors: CampaignFormErrors
}

/** STEP 4 — LiveCard·CampaignCard·상세 미리보기 */
export function CampaignStep4Preview({ values }: Props) {
  const complete = isCampaignFormComplete(values)

  return (
    <>
      <SectionHeading>
        <SectionTitle>미리보기</SectionTitle>
        <SectionDesc>메인·목록에 노출될 카드를 최종 확인합니다.</SectionDesc>
      </SectionHeading>
      <FormStack>
        <div>
          <SectionDesc style={{ fontWeight: 600, color: 'inherit', marginBottom: 12 }}>
            지금 뜨는 쇼핑라이브 (LiveCard)
          </SectionDesc>
          <LiveCard
            liveThumbnail={values.liveThumbnail}
            brandName={values.brandName}
            title={values.title}
            summary={values.summary}
            isLive
          />
        </div>
        <div>
          <SectionDesc style={{ fontWeight: 600, color: 'inherit', marginBottom: 12 }}>
            브랜드 PICK (CampaignCard)
          </SectionDesc>
          <CampaignCard
            coverImage={values.coverImage}
            brandName={values.brandName}
            title={values.title}
            payment={values.payment}
            applyDeadline={values.applyDeadline}
          />
        </div>
        <div>
          <SectionDesc style={{ fontWeight: 600, color: 'inherit', marginBottom: 12 }}>
            공고 상세 노출 정보
          </SectionDesc>
          <DetailTable>
            <dt>모집 구분</dt><dd>{values.recruitType || '-'}</dd>
            <dt>카테고리</dt><dd>{values.category || '-'}</dd>
            <dt>모집 인원</dt><dd>{values.recruitCount ? `${values.recruitCount}명` : '-'}</dd>
            <dt>출연료</dt><dd>{values.payment ? formatPayment(values.payment) : '-'}</dd>
            <dt>장소</dt><dd>{values.location || '-'}</dd>
            <dt>촬영일</dt><dd>{values.shootingDate || '-'}</dd>
            <dt>시간</dt><dd>{values.startTime && values.endTime ? `${values.startTime} ~ ${values.endTime}` : '-'}</dd>
            <dt>마감일</dt><dd>{values.applyDeadline || '-'}</dd>
          </DetailTable>
        </div>
        <Checklist>
          <li>라이브 썸네일 1:1 · 대표 이미지 4:3</li>
          <li>필수 입력값 완료 {complete ? '' : '(미완료)'}</li>
          <li>출연료 원 단위 포맷</li>
          <li>종료시간 &gt; 시작시간</li>
        </Checklist>
      </FormStack>
    </>
  )
}
