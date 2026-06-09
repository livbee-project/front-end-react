import React from 'react';
import { homeContent } from '@/presentation/pages/home/config/homeContent';
import { HomeJoinCta, HomeJoinCtaButton } from '@/presentation/pages/home/styles/homeDesign.styles';

const HomeJoinCtaSection: React.FC = () => (
  <HomeJoinCta>
    <div>
      <strong>
        지금 <em>Livbee</em>와 함께 시작해볼까요?
      </strong>
      <p>{homeContent.joinCta.description}</p>
    </div>
    <HomeJoinCtaButton to="/login">{homeContent.joinCta.button} →</HomeJoinCtaButton>
  </HomeJoinCta>
);

export default HomeJoinCtaSection;
