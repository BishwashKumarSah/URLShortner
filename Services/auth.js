const SessionIdToUserMap = new Map();

function setUser(id, user) {
  SessionIdToUserMap.set(id, user);
}

function getUser(id) {
  return SessionIdToUserMap.get(id);
}

module.exports = {
  setUser,
  getUser,
};
