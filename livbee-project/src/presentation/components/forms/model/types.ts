export interface ModelWebsiteEntry {
  related: string;
  content: string;
}

export interface ModelTagEntry {
  label: string;
  value: string;
}

export interface ModelFormData {
  name: string;
  registrationType: string;
  oneLineIntro: string;
  detailedIntro: string;
  websites: ModelWebsiteEntry[];
  contact: string;
  openChat: string;
  tags: ModelTagEntry[];
}

export interface ModelToggleState {
  websites: boolean[];
  contact: boolean;
  openChat: boolean;
  tags: boolean[];
}

