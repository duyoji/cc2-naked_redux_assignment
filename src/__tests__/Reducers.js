import reducer from '../reducers/';
import { VIEW_TYPES } from '../components/App';
import * as actions from '../actions/';

describe('reducers', () => {
  let state = {
    currentView: VIEW_TYPES.LIST,
    users: [],
    selectedUser: undefined
  };

  it('should be default state if nothing is matched', () => {
    expect(reducer(state, {})).toEqual({
      ...state
    });
  });

  it('should update currentView to "CREATE" when action.type is GO_CREATE_PAGE', () => {
    expect(reducer(state, actions.goCreatePage())).toEqual({
      ...state,
      currentView: VIEW_TYPES.CREATE
    });
  });

  it('should update currentView to "EDIT" when action.type is GO_EDIT_PAGE', () => {
    state.currentView = VIEW_TYPES.EDIT;
    expect(reducer(state, {})).toEqual({
      ...state,
      currentView: VIEW_TYPES.EDIT
    });

    expect(reducer(state, actions.goListPage())).toEqual({
      ...state,
      currentView: VIEW_TYPES.LIST
    });
  });

  it('should update currentView to "ListView" and add user into state.users when calling actions.createUser', () => {
    state.currentView = VIEW_TYPES.CREATE;
    expect(reducer(state, {})).toEqual({
      ...state,
      currentView: VIEW_TYPES.CREATE
    });

    const user1 = createUser('dummy-f1', 'dummy-l1');
    state = reducer(state, actions.createUser(user1));
    expect(state).toEqual({
      ...state,
      currentView: VIEW_TYPES.LIST,
      users: [
        {...user1, id: 1}
      ]
    });

    // append new user
    state.currentView = VIEW_TYPES.CREATE;
    expect(reducer(state, {})).toEqual({
      ...state,
      currentView: VIEW_TYPES.CREATE
    });
    const user2 = createUser('dummy-f2', 'dummy-l2');
    state = reducer(state, actions.createUser(user2));
    expect(state).toEqual({
      ...state,
      currentView: VIEW_TYPES.LIST,
      users: [
        {...user1, id: 1},
        {...user2, id: 2}
      ]
    });
  });

  it('should update currentView to "ListView" and edit user into state.users when calling actions.editUser', () => {
    state.currentView = VIEW_TYPES.EDIT;
    expect(reducer(state, {})).toEqual({
      ...state,
      currentView: VIEW_TYPES.EDIT
    });

    const id = 1;
    const updatedUser = createUser(
      'updated-dummy-f1',
      'updated-dummy-f1',
      id
    );
    const user2 = createUser('dummy-f2', 'dummy-l2', 2);

    state = reducer(state, actions.editUser(updatedUser));
    expect(state).toEqual({
      ...state,
      currentView: VIEW_TYPES.LIST,
      users: [
        updatedUser,
        user2
      ]
    });
  });

  it('should update currentView to "ListView" and delete user when calling actions.deleteUser', () => {
    state.currentView = VIEW_TYPES.EDIT;
    expect(reducer(state, {})).toEqual({
      ...state,
      currentView: VIEW_TYPES.EDIT
    });

    const deleteUserId = 1;
    const id = 2;
    const user2 = createUser('dummy-f2', 'dummy-l2', id);
    state = reducer(state, actions.deleteUser(deleteUserId));
    expect(state).toEqual({
      ...state,
      currentView: VIEW_TYPES.LIST,
      users: [
        user2
      ]
    });
  });
});

function createUser(firstName, lastName, id = undefined) {
  return {firstName, lastName, id}
}