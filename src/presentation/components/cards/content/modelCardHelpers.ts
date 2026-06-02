import type { Model } from '@/domain/entities/Model';

export const buildModelSupplementary = (model: Pick<Model, 'concept' | 'categories' | 'oneLineIntro' | 'height'>): string => {
  const parts: string[] = [];
  if (model.concept) parts.push(model.concept);
  if (model.categories?.length) parts.push(model.categories.join('/'));
  if (model.height) parts.push(`${model.height}cm`);
  if (model.oneLineIntro) parts.push(model.oneLineIntro);
  return parts.join(' · ') || '소개 없음';
};
