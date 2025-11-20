export interface SectionHeaderProps {
  title: string;
  onMorePressed?: () => void;
}

export interface GalleryGridProps {
  images?: string[];
  columns?: number;
  onImageClick?: (index: number) => void;
}

