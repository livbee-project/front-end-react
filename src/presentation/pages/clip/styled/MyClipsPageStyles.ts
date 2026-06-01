import styled from 'styled-components';
import Button from '@/presentation/components/ui/Button';

export const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #ffffff;
  padding-bottom: 80px;
`;

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: transparent;
  border: none;
  color: #1f1f25;
  font-size: 0.95rem;
  cursor: pointer;
  font-weight: 500;
`;

export const HeaderSection = styled.div`
  padding: 20px 16px;
`;

export const PageTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f1f25;
  margin: 0 0 8px 0;
`;

export const PageSubtitle = styled.p`
  font-size: 0.875rem;
  color: #9297af;
  margin: 0 0 20px 0;
`;

export const ContentSection = styled.div`
  padding: 0 16px;
`;

export const ClipsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
`;

export const ClipCardContainer = styled.div`
  background: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

export const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 9 / 16;
  overflow: hidden;
  background: #f4f5fb;
`;

export const ClipImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const VideoIcon = styled.div`
  position: absolute;
  bottom: 8px;
  left: 8px;
  width: 24px;
  height: 24px;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
`;

export const CardBody = styled.div`
  padding: 12px;
`;

export const ClipTitle = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
  color: #1f1f25;
  margin-bottom: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const ClipDescription = styled.div`
  font-size: 0.75rem;
  color: #9297af;
  margin-bottom: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const ButtonRow = styled.div`
  display: flex;
  gap: 8px;
`;

export const EditButton = styled(Button)`
  flex: 1;
  padding: 8px;
  font-size: 0.875rem;
  border: 1px solid #5a64ff;
  background: #ffffff;
  color: #5a64ff;

  &:hover {
    background: #f4f5ff;
  }
`;

export const DeleteButton = styled(Button)`
  flex: 1;
  padding: 8px;
  font-size: 0.875rem;
  background: #5a64ff;
  color: #ffffff;

  &:hover {
    background: #4a54e8;
  }
`;

export const AddCard = styled.div`
  background: #f4f5fb;
  border-radius: 12px;
  border: 2px dashed #d1d5db;
  aspect-ratio: 9 / 16;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #eceff7;
    border-color: #5a64ff;
  }
`;

export const AddIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #5a64ff;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 300;
`;

export const FloatingActionButton = styled.button`
  position: fixed;
  bottom: 80px;
  right: 16px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #5a64ff;
  border: none;
  color: #ffffff;
  font-size: 24px;
  font-weight: 300;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(90, 100, 255, 0.4);
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 16px rgba(90, 100, 255, 0.5);
  }
`;

