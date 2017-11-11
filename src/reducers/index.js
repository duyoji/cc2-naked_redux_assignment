import constants from '../constants';

const defaultState = {
  currentView: constants.VIEW_TYPES.LIST,
  users: [],
  selectedUser: undefined,
  firstName: undefined,
  lastName: undefined
};
let nextId = 1;

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case constants.ACTION_TYPES.GO_CREATE_PAGE:
      return {
        ...state,
        currentView: constants.VIEW_TYPES.CREATE
      };
    case constants.ACTION_TYPES.GO_EDIT_PAGE:
      return {
        ...state,
        currentView: constants.VIEW_TYPES.EDIT,
        selectedUser: action.user
      };
    case constants.ACTION_TYPES.GO_LIST_PAGE:
      return {
        ...state,
        currentView: constants.VIEW_TYPES.LIST,
        selectedUser: undefined
      };
    case constants.ACTION_TYPES.CREATE_USER:
      return {
        ...state,
        currentView: constants.VIEW_TYPES.LIST,
        users: [
          ...state.users,
          {
            firstName: action.user.firstName,
            lastName: action.user.lastName,
            id: nextId++
          }
        ],
        firstName: undefined,
        lastName: undefined
      };
    case constants.ACTION_TYPES.EDIT_USER:
      const copiedUsers = state.users.slice();
      copiedUsers.forEach((user) => {
        if(action.user.id === user.id) {
          user.firstName = action.user.firstName,
          user.lastName = action.user.lastName;
        }
      });

      return {
        ...state,
        currentView: constants.VIEW_TYPES.LIST,
        users: copiedUsers,
        selectedUser: undefined,
        firstName: undefined,
        lastName: undefined
      };
    case constants.ACTION_TYPES.DELETE_USER:
      const filteredUsers = state.users.filter(user => {
        return action.id !== user.id;
      });

      return {
        ...state,
        currentView: constants.VIEW_TYPES.LIST,
        users: [...filteredUsers],
        selectedUser: undefined
      };
    case constants.ACTION_TYPES.SET_USER_NAME:
      return {
        ...state,
        firstName: action.firstName,
        lastName: action.lastName
      };
    default:
      return state
  }
}

export default reducer;