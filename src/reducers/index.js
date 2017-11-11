import { VIEW_TYPES } from '../components/App';
import { ACTION_TYPES } from '../actions/';

const defaultState = {
  currentView: VIEW_TYPES.LIST,
  users: [],
  selectedUser: undefined
};
let nextId = 1;

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case ACTION_TYPES.GO_CREATE_PAGE:
      return {
        ...state,
        currentView: VIEW_TYPES.CREATE
      };
    case ACTION_TYPES.GO_EDIT_PAGE:
      return {
        ...state,
        currentView: VIEW_TYPES.EDIT,
        selectedUser: action.user
      };
    case ACTION_TYPES.GO_LIST_PAGE:
      return {
        ...state,
        currentView: VIEW_TYPES.LIST,
        selectedUser: undefined
      };
    case ACTION_TYPES.CREATE_USER:
      return {
        ...state,
        currentView: VIEW_TYPES.LIST,
        users: [
          ...state.users,
          {
            firstName: action.user.firstName,
            lastName: action.user.lastName,
            id: nextId++
          }
        ]
      };
    case ACTION_TYPES.EDIT_USER:
      const copiedUsers = state.users.slice();
      copiedUsers.forEach((user) => {
        if(action.user.id === user.id) {
          user.firstName = action.user.firstName,
          user.lastName = action.user.lastName;
        }
      });

      return {
        ...state,
        currentView: VIEW_TYPES.LIST,
        users: copiedUsers,
        selectedUser: undefined
      };
    case ACTION_TYPES.DELETE_USER:
      const filteredUsers = state.users.filter(user => {
        return action.id !== user.id;
      });

      return {
        ...state,
        currentView: VIEW_TYPES.LIST,
        users: [...filteredUsers],
        selectedUser: undefined
      };
    default:
      return state
  }
}

export default reducer;