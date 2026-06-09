import React from 'react';
import type {
  HomeCampaignItem,
  HomeClipItem,
  HomeLiveItem,
  HomeNewsItem,
  HomeProfileItem,
} from '@/presentation/pages/home/types/homeView';
import {
  BrandCardBody,
  CampaignInfoList,
  ClipCardBody,
  ClipCardLink,
  ClipMedia,
  HomeCardLink,
  LiveBadge,
  LiveCardBody,
  LiveProductLabel,
  LiveProductName,
  LiveProductRow,
  LiveProductThumb,
  MessageIcon,
  ModelRoleChip,
  NewsCardBody,
  NewsCardLink,
  NewsThumb,
  PaymentBadge,
  PlayButton,
  ProfileCardBody,
  ProfileMeta,
  ProfileTitleRow,
  RatioMedia,
} from '@/presentation/pages/home/styles/homeDesign.styles';

// 출연료 만원 단위 포맷
const formatWon = (value: number): string =>
  `${Math.round(value / 10000).toLocaleString('ko-KR')}만원`;

export const HomeLiveCard: React.FC<{ item: HomeLiveItem }> = ({ item }) => {
  const productName = item.productName ?? item.title;

  return (
    <HomeCardLink to={`/campaigns/${item.id}`}>
      <RatioMedia $ratio="1 / 1">
        <img src={item.liveThumbnail} alt="" loading="lazy" />
        <LiveBadge>LIVE</LiveBadge>
      </RatioMedia>
      <LiveCardBody>
        <strong>{item.title}</strong>
        <LiveProductRow>
          <LiveProductThumb>
            <img src={item.productImage ?? item.liveThumbnail} alt="" loading="lazy" />
          </LiveProductThumb>
          <div>
            <LiveProductLabel>대표 상품</LiveProductLabel>
            <LiveProductName>{productName}</LiveProductName>
          </div>
        </LiveProductRow>
        <small>{item.shootingDate} 방송</small>
      </LiveCardBody>
    </HomeCardLink>
  );
};

export const HomeCampaignCard: React.FC<{ item: HomeCampaignItem }> = ({ item }) => (
  <HomeCardLink to={`/campaigns/${item.id}`}>
    <RatioMedia $ratio="4 / 3">
      <img src={item.coverImage} alt="" loading="lazy" />
      <PaymentBadge>출연료 {formatWon(item.payment)}</PaymentBadge>
    </RatioMedia>
    <BrandCardBody>
      <strong>{item.brandName}</strong>
      <p>{item.title}</p>
      <CampaignInfoList>
        <div>
          <dt>촬영일</dt>
          <dd>{item.shootingDate}</dd>
        </div>
      </CampaignInfoList>
    </BrandCardBody>
  </HomeCardLink>
);

export const HomeProfileCard: React.FC<{ item: HomeProfileItem; type: 'host' | 'model' }> = ({
  item,
  type,
}) => {
  const href = type === 'host' ? `/portfolios/${item.id}` : `/models/${item.id}`;
  const primary = type === 'host' ? item.category : item.modelType;
  const meta =
    type === 'host'
      ? `경력 ${item.experienceYears ?? 1}년`
      : item.height
        ? `키 ${item.height}cm`
        : '프로필 확인';

  return (
    <HomeCardLink to={href}>
      <RatioMedia $ratio="3 / 4">
        <img src={item.profileImage} alt="" loading="lazy" />
      </RatioMedia>
      <ProfileCardBody>
        <ProfileTitleRow>
          <strong>{item.name}</strong>
          {type === 'model' && primary ? <ModelRoleChip>{primary}</ModelRoleChip> : null}
          <MessageIcon aria-hidden>M</MessageIcon>
        </ProfileTitleRow>
        <p>{item.summary ?? primary}</p>
        <ProfileMeta>
          {type === 'host' && primary ? <span>{primary}</span> : null}
          <span>{meta}</span>
        </ProfileMeta>
      </ProfileCardBody>
    </HomeCardLink>
  );
};

export const HomeClipCard: React.FC<{ item: HomeClipItem }> = ({ item }) => (
  <ClipCardLink to={`/clips/${item.id}`}>
    <ClipMedia $ratio="2 / 3">
      <img src={item.thumbnail} alt="" loading="lazy" />
      <PlayButton aria-hidden>▶</PlayButton>
    </ClipMedia>
    <ClipCardBody>
      <strong>{item.title}</strong>
      <p>{item.summary}</p>
    </ClipCardBody>
  </ClipCardLink>
);

export const HomeNewsCard: React.FC<{ item: HomeNewsItem }> = ({ item }) => (
  <NewsCardLink to={`/news/${item.id}`}>
    <NewsThumb>
      <img src={item.thumbnail} alt="" loading="lazy" />
      <span>{item.category}</span>
    </NewsThumb>
    <NewsCardBody>
      <strong>{item.title}</strong>
      <p>{item.createdAt}</p>
    </NewsCardBody>
  </NewsCardLink>
);
