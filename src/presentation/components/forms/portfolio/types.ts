import type { ContactInfoFields, RegistrationInfoFields, ToggleGroupState } from '@/types/forms';

export interface PortfolioFormData extends RegistrationInfoFields, ContactInfoFields {
  name: string;
  websites: string[];
  recentLiveLink: string;
  tags: string[];
}

export type PortfolioToggleState = ToggleGroupState;

