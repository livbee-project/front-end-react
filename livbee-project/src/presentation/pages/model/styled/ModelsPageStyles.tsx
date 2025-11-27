import styled from 'styled-components';

export const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #f4f5fb;
  padding-bottom: 80px;

  @media (max-width: 600px) {
    padding-bottom: calc(120px + env(safe-area-inset-bottom));
  }
`;

export const HeaderSection = styled.div`
  padding: 20px 16px;
  background: #ffffff;
`;

export const HeaderTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f1f25;
  margin: 0 0 8px 0;
  
  span {
    color: #5a64ff;
  }
`;

export const HeaderSubtitle = styled.p`
  font-size: 0.875rem;
  color: #9297af;
  margin: 0 0 20px 0;
`;

export const SearchBar = styled.div`
  position: relative;
  margin-bottom: 20px;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 12px 16px 12px 44px;
  border: 1px solid #eceff7;
  border-radius: 12px;
  font-size: 0.95rem;
  background: #ffffff;
  color: #1f1f25;
  
  &::placeholder {
    color: #a0a4b7;
  }
  
  &:focus {
    outline: none;
    border-color: #5a64ff;
  }
`;

export const SearchIcon = styled.div`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #9297af;
`;

export const FilterSection = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 4px;
  
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const FilterButton = styled.button<{ $active: boolean }>`
  padding: 8px 16px;
  border-radius: 20px;
  border: none;
  font-size: 0.875rem;
  font-weight: 600;
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.2s;
  
  background: ${({ $active }) => ($active ? '#5a64ff' : '#ffffff')};
  color: ${({ $active }) => ($active ? '#ffffff' : '#1f1f25')};
  border: ${({ $active }) => ($active ? 'none' : '1px solid #eceff7')};
  
  &:hover {
    background: ${({ $active }) => ($active ? '#4a54e8' : '#f4f5fb')};
  }
`;

export const ContentSection = styled.div`
  padding: 20px 16px;
`;

export const ModelsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
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

  @media (max-width: 600px) {
    right: 12px;
    bottom: calc(96px + env(safe-area-inset-bottom));
  }
`;

