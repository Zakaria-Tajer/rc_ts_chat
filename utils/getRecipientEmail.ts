const getRecipientEmail = (users: any, userLoggedInEmail: any) =>
  users?.filter((userToFilter: any) => userToFilter !== userLoggedInEmail)[0];

export default getRecipientEmail;
