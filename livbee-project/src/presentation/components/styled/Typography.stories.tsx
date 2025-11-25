import type { Meta, StoryObj } from '@storybook/react';
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
import styled from 'styled-components';
import React from 'react';

const meta: Meta = {
  title: 'Design System/Typography',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Livbee 프로젝트의 타이포그래피 컴포넌트 시스템입니다. 일관된 텍스트 스타일을 제공합니다.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

// ===== 스타일링 =====
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
`;

const Section = styled.div`
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

const ComponentItem = styled.div`
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

// ===== 제목 컴포넌트 =====
export const Headings: Story = {
  render: () => (
    <Container>
      <Section>
        <SectionTitle>제목 컴포넌트 (Headings)</SectionTitle>
        <ComponentGrid>
          <ComponentItem>
            <ComponentLabel>&lt;H1&gt; - 페이지 타이틀</ComponentLabel>
            <H1>페이지 제목 (H1)</H1>
            <CodeBlock>{`<H1>페이지 제목 (H1)</H1>`}</CodeBlock>
            <ComponentLabel>스타일: 700 16px/1.4</ComponentLabel>
          </ComponentItem>

          <ComponentItem>
            <ComponentLabel>&lt;H2&gt; - 섹션 타이틀, 이름, 브랜드명</ComponentLabel>
            <H2>섹션 제목 (H2)</H2>
            <CodeBlock>{`<H2>섹션 제목 (H2)</H2>`}</CodeBlock>
            <ComponentLabel>스타일: 700 14px/1.4</ComponentLabel>
          </ComponentItem>

          <ComponentItem>
            <ComponentLabel>&lt;H3&gt; - 섹션 타이틀, 이름, 브랜드명</ComponentLabel>
            <H3>서브 제목 (H3)</H3>
            <CodeBlock>{`<H3>서브 제목 (H3)</H3>`}</CodeBlock>
            <ComponentLabel>스타일: 700 14px/1.4</ComponentLabel>
          </ComponentItem>
        </ComponentGrid>
      </Section>
    </Container>
  ),
};

// ===== 본문 컴포넌트 =====
export const BodyText: Story = {
  render: () => (
    <Container>
      <Section>
        <SectionTitle>본문 컴포넌트 (Body Text)</SectionTitle>
        <ComponentGrid>
          <ComponentItem>
            <ComponentLabel>&lt;P&gt; - 본문 텍스트</ComponentLabel>
            <P>
              이것은 본문 텍스트입니다. 일반적인 문단 내용에 사용되며, 14px 크기의 Light 폰트를 사용합니다.
              여러 줄의 텍스트가 있을 때 가독성을 위해 적절한 줄 간격을 제공합니다.
            </P>
            <CodeBlock>{`<P>본문 텍스트 내용</P>`}</CodeBlock>
            <ComponentLabel>스타일: 300 14px/1.6</ComponentLabel>
          </ComponentItem>

          <ComponentItem>
            <ComponentLabel>&lt;PMuted&gt; - 본문 텍스트 (보조 색상)</ComponentLabel>
            <PMuted>
              이것은 보조 색상의 본문 텍스트입니다. 덜 중요한 정보나 설명 텍스트에 사용됩니다.
              Muted 색상으로 시각적 계층을 표현합니다.
            </PMuted>
            <CodeBlock>{`<PMuted>보조 색상 본문 텍스트</PMuted>`}</CodeBlock>
            <ComponentLabel>스타일: 300 14px/1.6, Muted 색상</ComponentLabel>
          </ComponentItem>

          <ComponentItem>
            <ComponentLabel>&lt;Small&gt; - 작은 본문</ComponentLabel>
            <Small>
              이것은 작은 본문 텍스트입니다. 13px 크기로 일반 본문보다 작게 표시됩니다.
            </Small>
            <CodeBlock>{`<Small>작은 본문 텍스트</Small>`}</CodeBlock>
            <ComponentLabel>스타일: 300 13px/1.6</ComponentLabel>
          </ComponentItem>
        </ComponentGrid>
      </Section>
    </Container>
  ),
};

// ===== 캡션 컴포넌트 =====
export const Captions: Story = {
  render: () => (
    <Container>
      <Section>
        <SectionTitle>캡션 컴포넌트 (Captions)</SectionTitle>
        <ComponentGrid>
          <ComponentItem>
            <ComponentLabel>&lt;Caption&gt; - 캡션, 태그</ComponentLabel>
            <div>
              <Caption>일반 캡션 텍스트</Caption>
            </div>
            <CodeBlock>{`<Caption>일반 캡션 텍스트</Caption>`}</CodeBlock>
            <ComponentLabel>스타일: 300 12px/1.4</ComponentLabel>
          </ComponentItem>

          <ComponentItem>
            <ComponentLabel>&lt;CaptionMedium&gt; - 강조 캡션</ComponentLabel>
            <div>
              <CaptionMedium>강조 캡션 텍스트</CaptionMedium>
            </div>
            <CodeBlock>{`<CaptionMedium>강조 캡션 텍스트</CaptionMedium>`}</CodeBlock>
            <ComponentLabel>스타일: 500 12px/1.4</ComponentLabel>
          </ComponentItem>
        </ComponentGrid>
      </Section>
    </Container>
  ),
};

// ===== 버튼 텍스트 =====
export const ButtonTextComponent: Story = {
  render: () => (
    <Container>
      <Section>
        <SectionTitle>버튼 텍스트 (Button Text)</SectionTitle>
        <ComponentGrid>
          <ComponentItem>
            <ComponentLabel>&lt;ButtonText&gt; - 버튼 텍스트</ComponentLabel>
            <div>
              <ButtonText>버튼 텍스트</ButtonText>
            </div>
            <CodeBlock>{`<ButtonText>버튼 텍스트</ButtonText>`}</CodeBlock>
            <ComponentLabel>스타일: 500 12px/1.4</ComponentLabel>
          </ComponentItem>
        </ComponentGrid>
      </Section>
    </Container>
  ),
};

// ===== 강조 컴포넌트 =====
export const HighlightComponent: Story = {
  render: () => (
    <Container>
      <Section>
        <SectionTitle>강조 컴포넌트 (Highlight)</SectionTitle>
        <ComponentGrid>
          <ComponentItem>
            <ComponentLabel>&lt;Highlight&gt; - 강조 텍스트 (Primary 컬러)</ComponentLabel>
            <P>
              이것은 일반 텍스트이고, <Highlight>이것은 강조된 텍스트</Highlight>입니다.
              Primary 색상으로 강조됩니다.
            </P>
            <CodeBlock>{`<P>
  일반 텍스트 <Highlight>강조 텍스트</Highlight>
</P>`}</CodeBlock>
            <ComponentLabel>Primary 색상으로 강조</ComponentLabel>
          </ComponentItem>
        </ComponentGrid>
      </Section>
    </Container>
  ),
};

// ===== 사용 예시 =====
export const UsageExamples: Story = {
  render: () => (
    <Container>
      <Section>
        <SectionTitle>실제 사용 예시</SectionTitle>
        <ComponentGrid>
          <ComponentItem>
            <H1>카드 제목</H1>
            <PMuted style={{ marginTop: '8px' }}>
              이것은 카드의 설명 텍스트입니다. 보조 정보를 제공합니다.
            </PMuted>
            <div style={{ marginTop: '12px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <Caption>태그1</Caption>
              <Caption>태그2</Caption>
              <Caption>태그3</Caption>
            </div>
          </ComponentItem>

          <ComponentItem>
            <H2>섹션 제목</H2>
            <P style={{ marginTop: '8px' }}>
              본문 내용이 여기에 표시됩니다. 여러 줄의 텍스트가 있을 수 있으며,
              적절한 줄 간격으로 가독성을 유지합니다.
            </P>
            <div style={{ marginTop: '12px' }}>
              <Small>작은 설명 텍스트</Small>
            </div>
          </ComponentItem>

          <ComponentItem>
            <H3>브랜드명</H3>
            <P style={{ marginTop: '8px' }}>
              가격: <Highlight>29,000원</Highlight>
            </P>
            <div style={{ marginTop: '12px' }}>
              <ButtonText>구매하기</ButtonText>
            </div>
          </ComponentItem>
        </ComponentGrid>
      </Section>
    </Container>
  ),
};

