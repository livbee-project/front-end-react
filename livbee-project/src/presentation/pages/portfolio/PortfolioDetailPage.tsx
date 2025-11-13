import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProfileSection from '@/presentation/components/detail/ProfileSection';
import SectionHeader from '@/presentation/components/section/SectionHeader';
import GalleryGrid from '@/presentation/components/detail/GalleryGrid';
import InfoItem from '@/presentation/components/detail/InfoItem';
import Button from '@/presentation/components/ui/Button';
import DetailPageLayout from '@/presentation/layouts/DetailPageLayout';
import DetailSection from '@/presentation/layouts/DetailSection';
import DetailContent from '@/presentation/layouts/DetailContent';
import { PortfolioRepository } from '@/data/repositories/PortfolioRepository';
import type { PortfolioDetail } from '@/domain/entities/Portfolio';
import '@/presentation/styles/global.css';

/**
 * 포트폴리오 상세 페이지 컴포넌트입니다.
 * 이미지에 맞게 다음 섹션들을 포함합니다:
 * 1. 포트폴리오 프로필 섹션 (이름, 설명, 프로필 이미지)
 * 2. 상세소개 섹션
 * 3. 갤러리 섹션 (3x3 그리드)
 * 4. 정보 및 태그 섹션
 * 5. 하단 버튼
 */
const PortfolioDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [portfolio, setPortfolio] = useState<PortfolioDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // portfolioRepository를 useRef로 관리하여 매 렌더링마다 재생성되지 않도록 함
  const portfolioRepositoryRef = useRef<PortfolioRepository | null>(null);
  if (!portfolioRepositoryRef.current) {
    portfolioRepositoryRef.current = new PortfolioRepository();
  }
  const portfolioRepository = portfolioRepositoryRef.current;

  /**
   * 포트폴리오 상세 정보 로드
   */
  useEffect(() => {
    const abortController = new AbortController();
    let isCancelled = false;

    const loadPortfolio = async () => {
      if (!id) {
        if (!isCancelled) {
          setError('포트폴리오 ID가 없습니다.');
          setIsLoading(false);
        }
        return;
      }

      try {
        if (!isCancelled) {
          setIsLoading(true);
          setError(null);
        }
        const data = await portfolioRepository.getPortfolioById(id, abortController.signal);
        if (!isCancelled && !abortController.signal.aborted) {
          setPortfolio(data);
        }
      } catch (err) {
        // AbortError는 무시 (요청이 취소된 경우)
        if (err instanceof Error && err.name === 'AbortError') {
          return;
        }
        if (!isCancelled && !abortController.signal.aborted) {
          const errorMessage = err instanceof Error ? err.message : '포트폴리오를 불러오는데 실패했습니다.';
          setError(errorMessage);
          console.error('포트폴리오 상세 조회 실패:', err);
        }
      } finally {
        if (!isCancelled && !abortController.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    loadPortfolio();

    // cleanup 함수: 컴포넌트가 언마운트되거나 id가 변경되면 이전 요청을 취소
    return () => {
      isCancelled = true;
      abortController.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]); // portfolioRepository는 ref로 관리되므로 의존성 배열에서 제외

  /**
   * 프로필 이미지 클릭 핸들러
   */
  const handleProfileImageClick = () => {
    console.log('프로필 이미지 클릭');
    // TODO: 이미지 확대 또는 갤러리 열기 기능 구현
  };

  /**
   * 갤러리 이미지 클릭 핸들러
   */
  const handleGalleryImageClick = (index: number) => {
    console.log(`갤러리 이미지 ${index + 1} 클릭`);
    // TODO: 이미지 확대 또는 갤러리 뷰어 열기 기능 구현
  };

  /**
   * 하단 버튼 클릭 핸들러
   */
  const handleButtonClick = () => {
    if (portfolio?.isReceivingOffers) {
      console.log('제안하기');
      // TODO: 제안하기 기능 구현
    } else {
      console.log('문의하기');
      // TODO: 문의하기 기능 구현
    }
  };

  // 로딩 중
  if (isLoading) {
    return (
      <DetailPageLayout>
        <div style={{ padding: '16px', textAlign: 'center' }}>
          <p>로딩 중...</p>
        </div>
      </DetailPageLayout>
    );
  }

  // 에러 발생
  if (error || !portfolio) {
    return (
      <DetailPageLayout>
        <div style={{ padding: '16px', textAlign: 'center' }}>
          <p style={{ color: 'var(--error)', marginBottom: '16px' }}>
            {error || '포트폴리오를 찾을 수 없습니다.'}
          </p>
          <Button variant="primary" onClick={() => navigate('/portfolios')}>
            목록으로 돌아가기
          </Button>
        </div>
      </DetailPageLayout>
    );
  }

  // SNS 링크 배열 생성
  const snsLinks = [
    portfolio.websiteUrl && { label: '웹사이트', url: portfolio.websiteUrl },
    portfolio.instagramUrl && { label: '인스타그램', url: portfolio.instagramUrl },
    portfolio.youtubeUrl && { label: '유튜브', url: portfolio.youtubeUrl },
    portfolio.tiktokUrl && { label: '틱톡', url: portfolio.tiktokUrl },
  ].filter(Boolean) as Array<{ label: string; url: string }>;

  return (
    <DetailPageLayout>
      {/* 1. 포트폴리오 프로필 섹션 */}
      <ProfileSection
        name={portfolio.nickname || '이름 없음'}
        description={portfolio.oneLineIntro || '소개 없음'}
        profileImageUrl={portfolio.mainThumbnailUrl || undefined}
        onImageClick={handleProfileImageClick}
      />

      {/* 2. 상세소개 섹션 */}
      {portfolio.detailedIntro && (
        <DetailSection showDivider>
          <div style={{ paddingBottom: '16px' }}>
            <SectionHeader title="상세소개" />
          </div>
          <DetailContent>
            <div
              style={{ fontSize: 'var(--p2)', lineHeight: 1.6 }}
              dangerouslySetInnerHTML={{ __html: portfolio.detailedIntro }}
            />
          </DetailContent>
        </DetailSection>
      )}

      {/* 3. 갤러리 섹션 */}
      {portfolio.subThumbnailUrls && portfolio.subThumbnailUrls.length > 0 && (
        <DetailSection>
          <SectionHeader title="갤러리" />
          <div style={{ marginTop: '16px' }}>
            <GalleryGrid
              images={portfolio.subThumbnailUrls}
              columns={3}
              onImageClick={handleGalleryImageClick}
            />
          </div>
        </DetailSection>
      )}

      {/* 4. 정보 및 태그 섹션 */}
      <div>
        {portfolio.experienceYears !== null && (
          <InfoItem
            title="경력"
            content={`${portfolio.experienceYears}년`}
          />
        )}
        {portfolio.isAgePublic && portfolio.age !== null && (
          <InfoItem
            title="나이"
            content={`${portfolio.age}세`}
          />
        )}
        {portfolio.detailedRegion && (
          <InfoItem
            title="지역"
            content={portfolio.detailedRegion}
          />
        )}
        {portfolio.gender && (
          <InfoItem
            title="성별"
            content={portfolio.gender === 'male' ? '남성' : portfolio.gender === 'female' ? '여성' : portfolio.gender}
          />
        )}
        {portfolio.isSizingPublic && (
          <>
            {portfolio.height !== null && (
              <InfoItem
                title="키"
                content={`${portfolio.height}cm`}
              />
            )}
            {portfolio.weight !== null && (
              <InfoItem
                title="몸무게"
                content={`${portfolio.weight}kg`}
              />
            )}
            {portfolio.topSize && (
              <InfoItem
                title="상의 사이즈"
                content={portfolio.topSize}
              />
            )}
            {portfolio.bottomSize && (
              <InfoItem
                title="하의 사이즈"
                content={portfolio.bottomSize}
              />
            )}
            {portfolio.shoeSize !== null && (
              <InfoItem
                title="신발 사이즈"
                content={`${portfolio.shoeSize}mm`}
              />
            )}
          </>
        )}
        
        {/* SNS 링크 */}
        {snsLinks.length > 0 && (
          <InfoItem title="SNS">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {snsLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: 'var(--primary)',
                    textDecoration: 'none',
                    fontSize: 'var(--p2)',
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </InfoItem>
        )}
      </div>

      {/* 5. 하단 버튼 */}
      <div style={{ padding: '16px' }}>
        <Button
          variant="primary"
          size="large"
          fullWidth
          onClick={handleButtonClick}
          disabled={!portfolio.isReceivingOffers}
        >
          {portfolio.isReceivingOffers ? '제안하기' : '제안 받지 않음'}
        </Button>
      </div>
    </DetailPageLayout>
  );
};

export default PortfolioDetailPage;

