import { media } from '@/presentation/styles/breakpoints'
import styled from 'styled-components'
import { ModelCard } from '@/presentation/components/models/ModelCard'
import { Button } from '@/presentation/components/ui/Button'
import { Toast } from '@/presentation/components/ui/Toast'
import { StepNavigation } from '@/presentation/pages/models/create/components/StepNavigation'
import { StepProgress } from '@/presentation/pages/models/create/components/StepProgress'
import { useModelCreateWizard } from '@/presentation/pages/models/create/hooks/useModelCreateWizard'
import { Step1BasicInfo } from '@/presentation/pages/models/create/sections/Step1BasicInfo'
import { Step2Portfolio } from '@/presentation/pages/models/create/sections/Step2Portfolio'
import { Step3Contact } from '@/presentation/pages/models/create/sections/Step3Contact'
import { Step4Preview } from '@/presentation/pages/models/create/sections/Step4Preview'
import {
  FormColumn,
  Header,
  HeaderLeft,
  Layout,
  Page,
  PageTitle,
  PreviewCard,
  PreviewColumn,
  PreviewNote,
  PreviewTitle,
  SideNav,
  StickyFooter,
} from '@/presentation/pages/models/create/styles/modelCreate.styles'

/** 모델 프로필 등록 4단계 페이지 */
export function ModelCreatePage() {
  const wizard = useModelCreateWizard()
  const { step, values, errors, toast, submitting, updateValues, goNext, goPrev, saveDraft, submit, closeToast } =
    wizard

  /** 현재 단계에 맞는 폼 섹션 렌더 */
  const renderStep = () => {
    const props = { values, errors, onChange: updateValues }
    switch (step) {
      case 1:
        return <Step1BasicInfo {...props} />
      case 2:
        return <Step2Portfolio {...props} />
      case 3:
        return <Step3Contact {...props} />
      case 4:
        return <Step4Preview {...props} />
    }
  }

  return (
    <Page>
      <Header>
        <HeaderLeft>
          <Button type="button" variant="ghost" size="sm" onClick={goPrev}>
            ←
          </Button>
          <PageTitle>모델 프로필 등록</PageTitle>
        </HeaderLeft>
        <Button type="button" variant="ghost" size="sm" onClick={saveDraft} disabled={submitting}>
          임시저장
        </Button>
      </Header>

      <Layout>
        <SideNav>
          <StepNavigation currentStep={step} />
        </SideNav>

        <FormColumn>
          <MobileStepper>
            <StepProgress currentStep={step} />
          </MobileStepper>
          {renderStep()}

          <DesktopFooter>
            {step > 1 && (
              <Button type="button" variant="outline" onClick={goPrev}>
                이전
              </Button>
            )}
            {step < 4 ? (
              <Button type="button" fullWidth onClick={goNext}>
                다음 단계
              </Button>
            ) : (
              <>
                <Button type="button" variant="outline" onClick={saveDraft} disabled={submitting}>
                  임시저장
                </Button>
                <Button type="button" fullWidth onClick={submit} disabled={submitting}>
                  등록 완료
                </Button>
              </>
            )}
          </DesktopFooter>
        </FormColumn>

        <PreviewColumn>
          <PreviewCard>
            <PreviewTitle>ModelCard 미리보기</PreviewTitle>
            <ModelCard
              profileImage={values.profileImage}
              name={values.name}
              modelType={values.modelType}
              height={values.height}
            />
            <PreviewNote>평점·팔로워 정보는 사용하지 않습니다. 핵심 모델 정보만 표시됩니다.</PreviewNote>
          </PreviewCard>
        </PreviewColumn>
      </Layout>

      <StickyFooter>
        {step > 1 && (
          <Button type="button" variant="outline" onClick={goPrev}>
            이전
          </Button>
        )}
        {step < 4 ? (
          <Button type="button" fullWidth onClick={goNext}>
            다음 단계
          </Button>
        ) : (
          <Button type="button" fullWidth onClick={submit} disabled={submitting}>
            등록 완료
          </Button>
        )}
      </StickyFooter>

      <Toast message={toast ?? ''} visible={!!toast} onClose={closeToast} />
    </Page>
  )
}

const MobileStepper = styled.div`
  ${media.desktopUp} {
    display: none;
  }
`

const DesktopFooter = styled.div`
  display: none;
  gap: 10px;
  margin-top: 24px;

  ${media.desktopUp} {
    display: flex;
  }
`
