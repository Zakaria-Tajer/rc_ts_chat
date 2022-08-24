export interface Switching {
  switchForm?: boolean;
}

export interface StackSwitching extends Switching {
  users?: boolean;
  VerificationScreen?: boolean;
  verificationCode?: number | string | null;
}
