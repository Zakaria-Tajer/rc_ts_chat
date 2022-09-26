const addUsers = (array, RoomId, UserId, userFullName) => {
  array.push({
    userId: UserId,
    roomId: RoomId,
    fullName: userFullName,
  });
};
const getAllRoomUsers = (array, roomId) => {
  return array.filter((user) => user.roomId == roomId);
};
const userDisconnect = (array, userId) => {
  return array.filter((user) => user.userId !== userId);
};

module.exports = { addUsers, getAllRoomUsers, userDisconnect };
