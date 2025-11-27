import React from 'react';
import { Video } from 'lucide-react';
import type { Clip } from '@/domain/entities/Clip';
import {
  ButtonRow,
  CardBody,
  ClipCardContainer,
  ClipDescription,
  ClipImage,
  ClipTitle,
  DeleteButton,
  EditButton,
  ImageContainer,
  VideoIcon,
} from '../styled/MyClipsPageStyles';

interface ClipCardProps {
  clip: Clip;
  onEdit: (clipId: string) => void;
  onDelete: (clipId: string) => void;
}

const ClipCard: React.FC<ClipCardProps> = ({ clip, onEdit, onDelete }) => {
  return (
    <ClipCardContainer>
      <ImageContainer>
        <ClipImage src={clip.imageUrl} alt={clip.title} />
        <VideoIcon>
          <Video size={14} />
        </VideoIcon>
      </ImageContainer>
      <CardBody>
        <ClipTitle>
          <Video size={14} />
          {clip.title}
        </ClipTitle>
        <ClipDescription>{clip.description}</ClipDescription>
        <ButtonRow>
          <EditButton variant="outline" onClick={() => onEdit(clip.id)}>
            편집
          </EditButton>
          <DeleteButton variant="primary" onClick={() => onDelete(clip.id)}>
            삭제
          </DeleteButton>
        </ButtonRow>
      </CardBody>
    </ClipCardContainer>
  );
};

export default ClipCard;

