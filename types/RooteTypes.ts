export type RouteParams = {
  AuthScreen: undefined;
  HomeScreen: undefined;
  EmailVerificationScreen: undefined;
  CodeScreen: undefined;
  ChatScreen: {
    imageProfileUrl: undefined;
  };
  usersProfile: {
    contactUserId: string;
    imageProfileUrl: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  currentUserProfile: undefined;
  ReunionCreation: undefined;
  CallScreen: undefined;
};
