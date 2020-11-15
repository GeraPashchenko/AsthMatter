export const actionType = {
  SET_USER: '1',
  SET_LOCALIZATION: '2',
  SET_ATTACK_LIST: '3',
  DELETE_ATTACK: '4',
  UPDATE_ATTACK: '5',
  CREATE_ATTACK: '6',
  // SET_INHALER_ID : '7'
};

export const setUser = (user) => ({
  type: actionType.SET_USER,
  payload: {user}
});

export const setLocalization = (language) => ({
  type: actionType.SET_LOCALIZATION,
  payload: {language}
});

export const setAttackList = (attackList) => ({
  type: actionType.SET_ATTACK_LIST,
  payload: {attackList}
});

export const deleteAttack = (attackId) => ({
  type: actionType.DELETE_ATTACK,
  payload: {attackId}
});

export const updateAttack = (attackId, updatedAttack) => ({
  type: actionType.UPDATE_ATTACK,
  payload: {attackId, updatedAttack}
});

export const createAttack = (attackId, newAttack) => ({
  type: actionType.CREATE_ATTACK,
  payload: {newAttack}
});

// export const setInhalerId = (inhalerId) => ({
//   type: actionType.SET_INHALER_ID,
//   payload: {inhalerId}
// });