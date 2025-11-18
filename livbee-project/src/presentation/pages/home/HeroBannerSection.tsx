import React from 'react';
import styled from 'styled-components';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useSlider } from '@/presentation/hooks/useSlider';
import banner01 from '@/presentation/assets/images/banner_01.jpg';
import banner02 from '@/presentation/assets/images/banner_02.jpg';

const banners = [
  { id: 1, title: '쇼핑라이브 출연 기회', description: '지금 바로 쇼호스트로 활동하세요!', image: banner01 },
  { id: 2, title: '브랜드와 함께하는 특별한 기회', description: '최고의 쇼호스트를 찾고 있어요', image: banner02 },
];

const HeroSection = styled.section`
  background: rgba(245, 246, 255, 0.3);
  border-radius: ${({ theme }) => theme.radii.lg};
  overflow: hidden;
  position: relative;
  margin-top: 1rem;
`;

const Slider = styled.div`
  width: 100%;
  position: relative;
  overflow: hidden;
  aspect-ratio: 16 / 9;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    aspect-ratio: 16 / 7;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    aspect-ratio: 21 / 8;
  }
`;

const SlideTrack = styled.div<{ $transform: string; $transition: string; $count: number }>`
  display: flex;
  width: ${({ $count }) => `${$count * 100}%`};
  transform: ${({ $transform }) => $transform};
  transition: ${({ $transition }) => $transition};
`;

const Slide = styled.div`
  width: 100%;
  position: relative;
  flex-shrink: 0;
`;

const SlideImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const SlideContent = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  padding: 1.25rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 2rem;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding: 3rem;
  }
`;

const GradientOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, rgba(0, 0, 0, 0.6) 0%, transparent 70%);
`;

const TextBlock = styled.div`
  position: relative;
  max-width: 36rem;
  color: #fff;
`;

const SlideTitle = styled.h2`
  margin: 0 0 0.5rem;
  font-size: 1rem;
  font-weight: 700;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 1.25rem;
  }
`;

const SlideDescription = styled.p`
  margin: 0;
  font-size: 1.125rem;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.9);

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 1.25rem;
  }
`;

const ControlButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background-color: rgba(255, 255, 255, 0.2);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
`;

const Indicators = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const Indicator = styled.button<{ $active: boolean }>`
  border: none;
  height: 0.5rem;
  width: ${({ $active }) => ($active ? '2rem' : '0.5rem')};
  border-radius: 999px;
  background-color: ${({ $active }) => ($active ? '#fff' : 'rgba(255,255,255,0.5)')};
  transition: width 0.2s ease, background-color 0.2s ease;
  cursor: pointer;
`;

const HeroBannerSection: React.FC = () => {
  const { currentPage, transform, transition, containerProps, goToPage, goToNext, goToPrev } = useSlider({
    itemCount: banners.length,
    autoPlay: true,
    interval: 5000,
  });

  return (
    <HeroSection>
      <Slider {...containerProps}>
        <SlideTrack $transform={transform} $transition={transition} $count={banners.length}>
          {banners.map((banner) => (
            <Slide key={banner.id}>
              <SlideImage src={banner.image} alt={banner.title} />
              <GradientOverlay />
              <SlideContent>
                <TextBlock>
                  <SlideTitle>{banner.title}</SlideTitle>
                  <SlideDescription>{banner.description}</SlideDescription>
                </TextBlock>
              </SlideContent>
            </Slide>
          ))}
        </SlideTrack>
        <ControlButton type="button" style={{ left: '1rem' }} aria-label="이전 배너" onClick={goToPrev}>
          <ChevronLeft size={20} />
        </ControlButton>
        <ControlButton type="button" style={{ right: '1rem' }} aria-label="다음 배너" onClick={goToNext}>
          <ChevronRight size={20} />
        </ControlButton>
        <Indicators>
          {banners.map((banner, index) => (
            <Indicator key={banner.id} $active={currentPage === index} onClick={() => goToPage(index)} />
          ))}
        </Indicators>
      </Slider>
    </HeroSection>
  );
};

export default HeroBannerSection;

