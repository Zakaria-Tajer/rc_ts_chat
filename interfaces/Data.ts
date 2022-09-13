export interface AllUsersData {
  users?: Array<any>;
  pressedUser?: Array<any>;
  currentUser?: string;
  pressedUserEmail?: string;
  currentUserId?: string;
  currentUserProfilePicture?: any;
  dataArrayPairs?: any
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

export interface ChatUsersDetailsFirestore {
  chatId?: any;
  chatUsers?: any[];
}

export interface ChatDetails extends ChatUsersDetailsFirestore {
  messagesArray?: any;
}

export interface listOfData extends AllUsersData {
  fileMimeType?: string;
  AudioId?: string;
}
