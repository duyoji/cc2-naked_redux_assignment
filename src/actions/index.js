const ACTION_TYPES = {
  GO_CREATE_PAGE: 'GO_CREATE_PAGE',
  GO_EDIT_PAGE: 'GO_EDIT_PAGE',
  GO_LIST_PAGE: 'GO_LIST_PAGE',
  CREATE_USER: 'CREATE_USER',
  EDIT_USER: 'EDIT_USER',
  DELETE_USER: 'DELETE_USER',
};

const goCreatePage = () => {
  return {
    type: ACTION_TYPES.GO_CREATE_PAGE
  };
}

const goEditPage = (user) => {
  return {
    type: ACTION_TYPES.GO_EDIT_PAGE,
    user
  };
}

const goListPage = () => {
  return {
    type: ACTION_TYPES.GO_LIST_PAGE
  };
}

const createUser = (user) => {
  return {
    type: ACTION_TYPES.CREATE_USER,
    user
  }
}

const editUser = (user) => {
  return {
    type: ACTION_TYPES.EDIT_USER,
    user
  }
}

const deleteUser = (id) => {
  return {
    type: ACTION_TYPES.DELETE_USER,
    id
  }
}

export {
  ACTION_TYPES,
  goCreatePage,
  goEditPage,
  goListPage,
  createUser,
  editUser,
  deleteUser
};