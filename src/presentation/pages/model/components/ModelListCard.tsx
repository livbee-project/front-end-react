import React from 'react';
import type { ModelListItemView } from '@/presentation/pages/model/types/modelView';
import {
  ModelCardBody,
  ModelCardImage,
  ModelCardMeta,
  ModelCardSummary,
  ModelCardTitleRow,
  ModelInlineChip,
  ModelListCardLink,
  ModelMessageIcon,
} from '@/presentation/pages/model/styles/modelList.styles';

interface ModelListCardProps {
  item: ModelListItemView;
}

// test_codex ModelListPage 카드 1건 렌더
const ModelListCard: React.FC<ModelListCardProps> = ({ item }) => (
  <ModelListCardLink to={`/models/${item.id}`}>
    <ModelCardImage>
      <img src={item.profileImage} alt="" loading="lazy" />
    </ModelCardImage>
    <ModelCardBody>
      <ModelCardTitleRow>
        <strong>{item.name}</strong>
        {item.modelType ? <ModelInlineChip>{item.modelType}</ModelInlineChip> : null}
        <ModelMessageIcon>M</ModelMessageIcon>
      </ModelCardTitleRow>
      <ModelCardSummary>{item.summary}</ModelCardSummary>
      <ModelCardMeta>
        {item.height ? <span>키 {item.height}cm</span> : null}
        {item.location ? <span>{item.location}</span> : null}
      </ModelCardMeta>
    </ModelCardBody>
  </ModelListCardLink>
);

export default ModelListCard;
