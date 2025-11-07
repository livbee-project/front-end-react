import React from 'react';
import CampaignDetailHeader from '@/presentation/components/CampaignDetailHeader';
import BulletList from '@/presentation/components/BulletList';
import InfoItem from '@/presentation/components/InfoItem';
import ProductCard from '@/presentation/components/ProductCard';
import '@/presentation/styles/global.css';

/**
 * 모집 공고 상세 페이지 컴포넌트입니다.
 * 이미지에 맞게 다음 섹션들을 포함합니다:
 * 1. 상단 헤더 (이미지 + 브랜드명 + D-DAY 태그 + 제목 + 내용)
 * 2. 브랜드 소개 섹션
 * 3. 모집부문 및 담당 업무 섹션
 * 4. 자격요건 섹션
 * 5. 우대사항 섹션
 * 6. 모집 상세 정보 필드 섹션
 * 7. 관련 상품 정보 섹션
 * 8. 하단 액션 버튼
 */
const CampaignDetailPage: React.FC = () => {
  /**
   * 페이지 컨테이너 스타일
   */
  const pageStyle: React.CSSProperties = {
    width: '100%',
    backgroundColor: 'var(--white)',
  };

  /**
   * 섹션 컨테이너 스타일
   */
  const sectionStyle: React.CSSProperties = {
    padding: '16px',
    borderBottom: '1px solid #F7F8FA',
  };

  /**
   * 섹션 제목 스타일
   */
  const sectionTitleStyle: React.CSSProperties = {
    fontSize: 'var(--h2)', // 18px
    fontWeight: 700,
    color: 'var(--black)',
    marginBottom: '16px',
  };

  /**
   * 하단 버튼 스타일
   */
  const buttonStyle: React.CSSProperties = {
    width: '100%',
    padding: '16px',
    backgroundColor: 'var(--primary)',
    color: 'var(--white)',
    fontSize: 'var(--h2)', // 18px
    fontWeight: 700,
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    margin: '16px',
    maxWidth: 'calc(100% - 32px)',
    boxSizing: 'border-box',
  };

  /**
   * 이미지 클릭 핸들러
   */
  const handleImageClick = () => {
    console.log('이미지 클릭');
    // TODO: 이미지 확대 또는 갤러리 열기 기능 구현
  };

  /**
   * 상품 카드 클릭 핸들러
   */
  const handleProductClick = () => {
    console.log('상품 카드 클릭');
    // TODO: 상품 상세 페이지로 이동
  };

  /**
   * 하단 버튼 클릭 핸들러
   */
  const handleButtonClick = () => {
    console.log('버튼 클릭');
    // TODO: 지원하기 또는 문의하기 기능 구현
  };

  return (
    <div style={pageStyle}>
      {/* 1. 상단 헤더 */}
      <CampaignDetailHeader
        brandName="브랜드명"
        deadlineDay="D-DAY"
        title="제목 EX 스니커즈 하우스"
        content="내용 EX 원피스 여행 피크닉 베스트 셀러 슈엘리엘에서 원피"
        onImageClick={handleImageClick}
      />

      {/* 2. 브랜드 소개 섹션 */}
      <div style={sectionStyle}>
        <h2 style={sectionTitleStyle}>■ 브랜드 소개</h2>
        <div style={{ marginBottom: '16px' }}>
          <p style={{ fontSize: 'var(--p2)', lineHeight: 1.6, marginBottom: '12px' }}>
            <strong>[BRAND NAME]</strong>는 "움직임이 스타일이 된다 (Move with Style)"를 슬로건으로 한 프리미엄 스니커즈 브랜드입니다.
          </p>
          <p style={{ fontSize: 'var(--p2)', lineHeight: 1.6, marginBottom: '12px' }}>
            우리는 단순히 신발을 판매하는 것이 아니라, 라이프스타일과 개성을 제안합니다.
          </p>
          <p style={{ fontSize: 'var(--p2)', lineHeight: 1.6, marginBottom: '16px' }}>
            편안한 착화감, 감각적인 디자인, 지속가능한 소재 사용을 통해 도시에서 자신만의 길을 걷는 사람들을 위한 스니커즈를 만듭니다.
          </p>
        </div>
        <BulletList
          items={[
            '설립연도: 2018년',
            '주요제품: 프리미엄 라이프스타일 스니커즈, 친환경 러닝화, 리미티드 협업 라인',
            '유통채널: 자사몰 / 무신사 / 네이버 브랜드스토어 / 오프라인 팝업스토어',
          ]}
        />
      </div>

      {/* 3. 모집부문 및 담당 업무 섹션 */}
      <div style={sectionStyle}>
        <h2 style={sectionTitleStyle}>■ 모집부문: 라이브커머스 쇼호스트 (Live Commerce Host)</h2>
        <BulletList
          items={[
            '브랜드 공식 라이브커머스(네이버쇼핑 LIVE, 자사몰 LIVE 등) 진행',
            '신제품 소개 및 스타일링 제안',
            '실시간 고객 소통 및 상품 문의 응대',
            '방송 전 리허설 및 제품 특성 파악',
            '방송 기획 및 콘텐츠 아이디어 제안',
          ]}
        />
      </div>

      {/* 4. 자격요건 섹션 */}
      <div style={sectionStyle}>
        <h2 style={sectionTitleStyle}>■ 자격요건</h2>
        <BulletList
          items={[
            '나이/학력 무관',
            '라이브커머스, 홈쇼핑, 유튜브, 인스타그램 등 영상 진행 경험자 우대',
            '패션 및 스니커즈 트렌드에 대한 이해가 높은 분',
            '밝고 명확한 톤으로 소통 능력이 뛰어난 분',
            '브랜드의 감성과 메시지를 진정성 있게 전달할 수 있는 분',
          ]}
        />
      </div>

      {/* 5. 우대사항 섹션 */}
      <div style={sectionStyle}>
        <h2 style={sectionTitleStyle}>■ 우대사항</h2>
        <BulletList
          items={[
            '패션 크리에이터, 인플루언서 경력 보유자',
            '영상 콘텐츠 기획 및 SNS 운영 경험자',
          ]}
        />
      </div>

      {/* 6. 모집 상세 정보 필드 섹션 */}
      <div>
        <InfoItem title="모집구분" />
        <InfoItem title="카테고리" />
        <InfoItem title="장소" />
        <InfoItem title="촬영일" />
        <InfoItem title="공고마감일" />
        <InfoItem title="시작시간" />
        <InfoItem title="종료시간" />
      </div>

      {/* 7. 관련 상품 정보 섹션 */}
      <div style={sectionStyle}>
        <ProductCard
          productName="스니커즈 (상품명)"
          onClick={handleProductClick}
        />
      </div>

      {/* 8. 하단 액션 버튼 */}
      <button style={buttonStyle} onClick={handleButtonClick}>
        BUTTON
      </button>
    </div>
  );
};

export default CampaignDetailPage;

