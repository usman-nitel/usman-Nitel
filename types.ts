
export enum AppView {
  DASHBOARD = 'DASHBOARD',
  MARKET_RESEARCH = 'MARKET_RESEARCH',
  CONTENT_GEN = 'CONTENT_GEN',
  STRATEGY = 'STRATEGY'
}

export interface BusinessMetric {
  label: string;
  value: number;
}

export interface GroundingSource {
  title: string;
  uri: string;
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  images?: string[];
  sources?: GroundingSource[];
  isThinking?: boolean;
}
