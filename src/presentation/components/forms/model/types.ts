import type {
  ContactInfoFields,
  RegistrationInfoFields,
  TagEntry,
  ToggleGroupState,
  WebsiteEntry,
} from '@/types/forms';

export type ModelWebsiteEntry = WebsiteEntry;
export type ModelTagEntry = TagEntry;

export interface ModelFormData extends RegistrationInfoFields, ContactInfoFields {
  name: string;
  websites: ModelWebsiteEntry[];
  tags: ModelTagEntry[];
}

export type ModelToggleState = ToggleGroupState;

