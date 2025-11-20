/**
 * 이미지 크롭 관련 타입 및 상수 정의
 */

/**
 * 크롭 비율 타입
 */
export type CropRatio = 'original' | '1:1' | '1:2' | '2:3' | '4:3';

/**
 * 크롭 비율 옵션
 */
export const CROP_RATIOS: { value: CropRatio; label: string }[] = [
  { value: 'original', label: '원본' },
  { value: '1:1', label: '1:1' },
  { value: '1:2', label: '1:2' },
  { value: '2:3', label: '2:3' },
  { value: '4:3', label: '4:3' },
];

/**
 * 크롭 영역 정보
 */
export interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * 이미지 크기 정보
 */
export interface ImageSize {
  width: number;
  height: number;
}

