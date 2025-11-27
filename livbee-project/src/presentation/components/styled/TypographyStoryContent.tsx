import React from 'react';
import styled from 'styled-components';
import {
  H1,
  H2,
  H3,
  P,
  PMuted,
  Small,
  Caption,
  CaptionMedium,
  ButtonText,
  Highlight,
} from './Typography';

const CONTAINER_DESCRIPTION = {
  heading: '제목 컴포넌트 (Headings)',
  body: '본문 컴포넌트 (Body Text)',
  caption: '캡션 컴포넌트 (Captions)',
  button: '버튼 텍스트 (Button Text)',
  highlight: '강조 컴포넌트 (Highlight)',
  usage: '실제 사용 예시',
};

export const HeadingsSection: React.FC = () => (
  <StoryContainer title={CONTAINER_DESCRIPTION.heading}>
    <ComponentItem
      label="<H1> - 페이지 타이틀"
      code="<H1>페이지 제목 (H1)</H1>"
      detail="스타일: 700 16px/1.4"
    >
      <H1>페이지 제목 (H1)</H1>
    </ComponentItem>
    <ComponentItem
      label="<H2> - 섹션 타이틀, 이름, 브랜드명"
      code="<H2>섹션 제목 (H2)</H2>"
      detail="스타일: 700 14px/1.4"
    >
      <H2>섹션 제목 (H2)</H2>
    </ComponentItem>
    <ComponentItem
      label="<H3> - 섹션 타이틀, 이름, 브랜드명"
      code="<H3>서브 제목 (H3)</H3>"
      detail="스타일: 700 14px/1.4"
    >
      <H3>서브 제목 (H3)</H3>
    </ComponentItem>
  </StoryContainer>
);

export const BodySection: React.FC = () => (
  <StoryContainer title={CONTAINER_DESCRIPTION.body}>
    <ComponentItem
      label="<P> - 본문 텍스트"
      code="<P>본문 텍스트 내용</P>"
      detail="스타일: 300 14px/1.6"
    >
      <P>
        이것은 본문 텍스트입니다. 일반적인 문단 내용에 사용되며, 14px 크기의 Light 폰트를 사용합니다. 여러 줄의 텍스트가 있을 때 가독성을 위해
        적절한 줄 간격을 제공합니다.
      </P>
    </ComponentItem>
    <ComponentItem
      label="<PMuted> - 본문 텍스트 (보조 색상)"
      code="<PMuted>보조 색상 본문 텍스트</PMuted>"
      detail="스타일: 300 14px/1.6, Muted 색상"
    >
      <PMuted>이것은 보조 색상의 본문 텍스트입니다. 덜 중요한 정보나 설명 텍스트에 사용됩니다.</PMuted>
    </ComponentItem>
    <ComponentItem
      label="<Small> - 작은 본문"
      code="<Small>작은 본문 텍스트</Small>"
      detail="스타일: 300 13px/1.6"
    >
      <Small>이것은 작은 본문 텍스트입니다. 13px 크기로 일반 본문보다 작게 표시됩니다.</Small>
    </ComponentItem>
  </StoryContainer>
);

export const CaptionSection: React.FC = () => (
  <StoryContainer title={CONTAINER_DESCRIPTION.caption}>
    <ComponentItem
      label="<Caption> - 캡션, 태그"
      code="<Caption>일반 캡션 텍스트</Caption>"
      detail="스타일: 300 12px/1.4"
    >
      <Caption>일반 캡션 텍스트</Caption>
    </ComponentItem>
    <ComponentItem
      label="<CaptionMedium> - 강조 캡션"
      code="<CaptionMedium>강조 캡션 텍스트</CaptionMedium>"
      detail="스타일: 500 12px/1.4"
    >
      <CaptionMedium>강조 캡션 텍스트</CaptionMedium>
    </ComponentItem>
  </StoryContainer>
);

export const ButtonTextSection: React.FC = () => (
  <StoryContainer title={CONTAINER_DESCRIPTION.button}>
    <ComponentItem
      label="<ButtonText> - 버튼 텍스트"
      code="<ButtonText>버튼 텍스트</ButtonText>"
      detail="스타일: 500 12px/1.4"
    >
      <ButtonText>버튼 텍스트</ButtonText>
    </ComponentItem>
  </StoryContainer>
);

export const HighlightSection: React.FC = () => (
  <StoryContainer title={CONTAINER_DESCRIPTION.highlight}>
    <ComponentItem
      label="<Highlight> - 강조 텍스트 (Primary 컬러)"
      code={`<P>
  일반 텍스트 <Highlight>강조 텍스트</Highlight>
</P>`}
      detail="Primary 색상으로 강조"
    >
      <P>
        이것은 일반 텍스트이고, <Highlight>이것은 강조된 텍스트</Highlight>입니다.
      </P>
    </ComponentItem>
  </StoryContainer>
);

export const UsageSection: React.FC = () => (
  <StoryContainer title={CONTAINER_DESCRIPTION.usage}>
    <ComponentItem>
      <H1>카드 제목</H1>
      <PMuted style={{ marginTop: '8px' }}>이것은 카드의 설명 텍스트입니다. 보조 정보를 제공합니다.</PMuted>
      <TagList>
        <Caption>태그1</Caption>
        <Caption>태그2</Caption>
        <Caption>태그3</Caption>
      </TagList>
    </ComponentItem>

    <ComponentItem>
      <H2>섹션 제목</H2>
      <P style={{ marginTop: '8px' }}>
        본문 내용이 여기에 표시됩니다. 여러 줄의 텍스트가 있을 수 있으며, 적절한 줄 간격으로 가독성을 유지합니다.
      </P>
      <Small style={{ marginTop: '12px' }}>작은 설명 텍스트</Small>
    </ComponentItem>

    <ComponentItem>
      <H3>브랜드명</H3>
      <P style={{ marginTop: '8px' }}>
        가격: <Highlight>29,000원</Highlight>
      </P>
      <ButtonText style={{ marginTop: '12px' }}>구매하기</ButtonText>
    </ComponentItem>
  </StoryContainer>
);

interface StoryContainerProps {
  title: string;
  children: React.ReactNode;
}

const StoryContainer: React.FC<StoryContainerProps> = ({ title, children }) => (
  <Container>
    <Section>
      <SectionTitle>{title}</SectionTitle>
      <ComponentGrid>{children}</ComponentGrid>
    </Section>
  </Container>
);

interface ComponentItemProps {
  label?: string;
  code?: string;
  detail?: string;
  children: React.ReactNode;
}

const ComponentItem: React.FC<ComponentItemProps> = ({ label, code, detail, children }) => (
  <ComponentWrapper>
    {label && <ComponentLabel>{label}</ComponentLabel>}
    {children}
    {code && <CodeBlock>{code}</CodeBlock>}
    {detail && <ComponentLabel>{detail}</ComponentLabel>}
  </ComponentWrapper>
);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
`;

const Section = styled.section`
  padding: ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
`;

const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.foreground};
`;

const ComponentGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const ComponentWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: ${({ theme }) => theme.radii.sm};
`;

const ComponentLabel = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.muted};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  font-family: monospace;
`;

const CodeBlock = styled.pre`
  background-color: ${({ theme }) => theme.colors.inputBackground};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.radii.sm};
  font-size: 12px;
  overflow-x: auto;
  margin: ${({ theme }) => theme.spacing.md} 0;
  color: ${({ theme }) => theme.colors.foreground};
`;

const TagList = styled.div`
  margin-top: ${({ theme }) => theme.spacing.sm};
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs};
  flex-wrap: wrap;
`;

