export interface RegistrationInfoFields {
  registrationType: string;
  oneLineIntro: string;
  detailedIntro: string;
}

export interface ContactInfoFields {
  contact: string;
  openChat: string;
}

export interface WebsiteEntry {
  related: string;
  content: string;
}

export interface TagEntry {
  label: string;
  value: string;
}

export interface ToggleGroupState {
  websites: boolean[];
  contact: boolean;
  openChat: boolean;
  tags: boolean[];
}

