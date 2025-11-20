export interface PortfolioFormData {
  registrationType: string;
  name: string;
  oneLineIntro: string;
  detailedIntro: string;
  websites: string[];
  recentLiveLink: string;
  contact: string;
  openChat: string;
  tags: string[];
}

export interface PortfolioToggleState {
  websites: boolean[];
  contact: boolean;
  openChat: boolean;
  tags: boolean[];
}

