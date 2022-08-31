export interface AllUsersData {
  users?: Array<any>;
  pressedUser?: Array<any>;
  currentUser?: string;
}

export interface ChatProps {
  text?: string;
  from?: string;
  to?: string;
  time?: string;
}

export interface ChatUserDetails {
  _id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  isValidate?: string;
  phoneNumber?: number;
  password?: string;
}
