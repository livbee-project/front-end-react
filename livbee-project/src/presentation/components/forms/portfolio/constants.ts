import { Youtube, Instagram, Video } from 'lucide-react';

export const SNS_ENTRIES = [
  {
    id: 0,
    label: '유튜브',
    placeholder: 'https://youtube.com/...',
    icon: Youtube,
  },
  {
    id: 1,
    label: '인스타그램',
    placeholder: 'https://instagram.com/...',
    icon: Instagram,
  },
  {
    id: 2,
    label: '틱톡',
    placeholder: 'https://tiktok.com/@...',
    icon: Video,
  },
] as const;

export const TAG_ENTRIES = [
  { id: 0, label: '키', placeholder: '165', unit: 'cm' },
  { id: 1, label: '몸무게', placeholder: '50', unit: 'kg' },
  { id: 2, label: '사이즈', placeholder: '55', unit: '' },
  { id: 3, label: '경력', placeholder: '5', unit: '년' },
  { id: 4, label: '나이', placeholder: '25', unit: '세' },
] as const;

