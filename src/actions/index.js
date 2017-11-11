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

const createUser = (user) => {
  return {
    type: constants.ACTION_TYPES.CREATE_USER,
    user
  }
}

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

export {
  goCreatePage,
  goEditPage,
  goListPage,
  createUser,
  editUser,
  deleteUser
};