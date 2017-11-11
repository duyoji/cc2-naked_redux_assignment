import constants from '../constants';

const goCreatePage = () => {
  return {
    type: constants.ACTION_TYPES.GO_CREATE_PAGE
  };
}

const goEditPage = (user) => {
  return {
    type: constants.ACTION_TYPES.GO_EDIT_PAGE,
    user
  };
}

const goListPage = () => {
  return {
    type: constants.ACTION_TYPES.GO_LIST_PAGE
  };
}

// user => {firstName, lastName}
const createUser = (user) => {
  return {
    type: constants.ACTION_TYPES.CREATE_USER,
    user
  }
}

// user => {firstName, lastName, id}
const editUser = (user) => {
  return {
    type: constants.ACTION_TYPES.EDIT_USER,
    user
  }
}

const deleteUser = (id) => {
  return {
    type: constants.ACTION_TYPES.DELETE_USER,
    id
  }
}

const setUserName = (firstName, lastName) => {
  return {
    type: constants.ACTION_TYPES.SET_USER_NAME,
    firstName,
    lastName
  }
}

export {
  goCreatePage,
  goEditPage,
  goListPage,
  createUser,
  editUser,
  deleteUser,
  setUserName
};