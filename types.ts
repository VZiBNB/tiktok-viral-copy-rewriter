export interface RewrittenScript {
  variantName: string;
  content: string;
  structureAnalysis: string;
}

export interface GenerateResponse {
  scripts: RewrittenScript[];
}

export enum AppStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}