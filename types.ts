
export enum CreditStatus {
  OK = 'OK',
  NOT_OK = 'Not OK',
}

export interface UserData {
  email: string;
  name: string;
  creditStatus: CreditStatus;
  summary?: string;
  aiPicturePlatformSummary?: string;
}
