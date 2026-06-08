import styled from 'styled-components'
import { media } from '@/presentation/styles/breakpoints'
import { CampaignCard } from '@/presentation/components/campaign/CampaignCard'
import { LiveCard } from '@/presentation/components/campaign/LiveCard'
import { Button } from '@/presentation/components/ui/Button'
import { Toast } from '@/presentation/components/ui/Toast'
import { CampaignStepNavigation } from '@/presentation/pages/campaigns/create/components/CampaignStepNavigation'
import { CampaignStepProgress } from '@/presentation/pages/campaigns/create/components/CampaignStepProgress'
import { useCampaignCreateWizard } from '@/presentation/pages/campaigns/create/hooks/useCampaignCreateWizard'
import { CampaignStep1BasicInfo } from '@/presentation/pages/campaigns/create/sections/CampaignStep1BasicInfo'
import { CampaignStep2Recruit } from '@/presentation/pages/campaigns/create/sections/CampaignStep2Recruit'
import { CampaignStep3Schedule } from '@/presentation/pages/campaigns/create/sections/CampaignStep3Schedule'
import { CampaignStep4Preview } from '@/presentation/pages/campaigns/create/sections/CampaignStep4Preview'
import {
  FormColumn,
  Header,
  HeaderLeft,
  Layout,
  Page,
  PageTitle,
  PreviewCard,
  PreviewColumn,
  PreviewStack,
  PreviewTitle,
  SideNav,
  StickyFooter,
} from '@/presentation/pages/campaigns/create/styles/campaignCreate.styles'

/** 공고 등록 4단계 페이지 */
export function CampaignCreatePage() {
  const w = useCampaignCreateWizard()

  /** 현재 단계 폼 섹션 */
  const renderStep = () => {
    const props = { values: w.values, errors: w.errors, onChange: w.updateValues }
    switch (w.step) {
      case 1: return <CampaignStep1BasicInfo {...props} />
      case 2: return <CampaignStep2Recruit {...props} />
      case 3: return <CampaignStep3Schedule {...props} />
      case 4: return <CampaignStep4Preview values={w.values} errors={w.errors} />
    }
  }

  return (
    <Page>
      <Header>
        <HeaderLeft>
          <Button type="button" variant="ghost" size="sm" onClick={w.goPrev}>←</Button>
          <PageTitle>공고 등록</PageTitle>
        </HeaderLeft>
        <Button type="button" variant="ghost" size="sm" onClick={w.saveDraft} disabled={w.submitting}>
          임시저장
        </Button>
      </Header>

      <Layout>
        <SideNav><CampaignStepNavigation currentStep={w.step} /></SideNav>
        <FormColumn>
          <MobileOnly><CampaignStepProgress currentStep={w.step} /></MobileOnly>
          {renderStep()}
          <DesktopFooter>
            {w.step > 1 && <Button variant="outline" onClick={w.goPrev}>이전</Button>}
            {w.step < 4 ? (
              <Button fullWidth onClick={w.goNext}>다음 단계</Button>
            ) : (
              <>
                <Button variant="outline" onClick={w.saveDraft} disabled={w.submitting}>임시저장</Button>
                <Button fullWidth onClick={w.submit} disabled={w.submitting}>공고 등록</Button>
              </>
            )}
          </DesktopFooter>
        </FormColumn>
        <PreviewColumn>
          <PreviewStack>
            <PreviewCard>
              <PreviewTitle>LiveCard 미리보기</PreviewTitle>
              <LiveCard
                liveThumbnail={w.values.liveThumbnail}
                brandName={w.values.brandName}
                title={w.values.title}
                summary={w.values.summary}
              />
            </PreviewCard>
            <PreviewCard>
              <PreviewTitle>CampaignCard 미리보기</PreviewTitle>
              <CampaignCard
                coverImage={w.values.coverImage}
                brandName={w.values.brandName}
                title={w.values.title}
                payment={w.values.payment}
                applyDeadline={w.values.applyDeadline}
              />
            </PreviewCard>
          </PreviewStack>
        </PreviewColumn>
      </Layout>

      <StickyFooter>
        {w.step > 1 && <Button variant="outline" onClick={w.goPrev}>이전</Button>}
        {w.step < 4 ? (
          <Button fullWidth onClick={w.goNext}>다음 단계</Button>
        ) : (
          <Button fullWidth onClick={w.submit} disabled={w.submitting}>공고 등록</Button>
        )}
      </StickyFooter>
      <Toast message={w.toast ?? ''} visible={!!w.toast} onClose={w.closeToast} />
    </Page>
  )
}

const MobileOnly = styled.div`
  ${media.desktopUp} { display: none; }
`

const DesktopFooter = styled.div`
  display: none;
  gap: 10px;
  margin-top: 24px;
  ${media.desktopUp} { display: flex; }
`
