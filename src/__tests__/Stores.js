import { getInstance } from '../stores/';
import * as actions from '../actions/';
import constants from '../constants';

describe('stores', () => {
  it('should return same instance', () => {
    const store1 = getInstance();
    const store2 = getInstance();
    expect(store1 === store2).toBeTruthy();
  });

  it('should return default state when dispatch has never called.', () => {
    const store = getInstance();
    expect(store.getState()).toEqual({
      currentView: constants.VIEW_TYPES.LIST,
      users: [],
      selectedUser: undefined
    });
  });

  it('should make currentView to be CreateView', () => {
    const store = getInstance();
    store.dispatch(actions.goCreatePage());
    expect(store.getState()).toEqual({
      currentView: constants.VIEW_TYPES.CREATE,
      users: [],
      selectedUser: undefined
    });
  });

  it('should make currentView to be ListView', () => {
    const store = getInstance();
    store.dispatch(actions.goListPage());
    expect(store.getState()).toEqual({
      currentView: constants.VIEW_TYPES.LIST,
      users: [],
      selectedUser: undefined
    });
  });

  it('should add new user to state.users', () => {
    const store = getInstance();
    store.dispatch(actions.goCreatePage());
    expect(store.getState()).toEqual({
      currentView: constants.VIEW_TYPES.CREATE,
      users: [],
      selectedUser: undefined
    });

    const user1 = createUser('first-N', 'last-N');
    const user2 = createUser('first-N2', 'last-N2');
    store.dispatch(actions.createUser(user1));
    store.dispatch(actions.createUser(user2));
    expect(store.getState()).toEqual({
      currentView: constants.VIEW_TYPES.LIST,
      users: [
        {...user1, id: 1},
        {...user2, id: 2}
      ],
      selectedUser: undefined
    });
  });

  it('should edit user.', () => {
    const store = getInstance();
    const state = store.getState();
    const copiedTargetUser = {...state.users[0]};
    copiedTargetUser.firstName = 'update-first-N';
    copiedTargetUser.lastName = 'update-last-N';

    store.dispatch(actions.editUser(copiedTargetUser));
    expect(store.getState()).toEqual({
      currentView: constants.VIEW_TYPES.LIST,
      users: [
        copiedTargetUser,
        state.users[1]
      ],
      selectedUser: undefined
    });
  });

  it('should make currentView to be EditView', () => {
    const store = getInstance();
    const state = store.getState();
    const user = state.users[0];
    store.dispatch(actions.goEditPage(user));
    expect(store.getState()).toEqual({
      ...state,
      currentView: constants.VIEW_TYPES.EDIT,
      selectedUser: user
    });
  });

  it('should delete user.', () => {
    const store = getInstance();
    const state = store.getState();
    const deleteUserId = state.users[0].id;

    store.dispatch(actions.deleteUser(deleteUserId));
    expect(store.getState()).toEqual({
      currentView: constants.VIEW_TYPES.LIST,
      users: [
        state.users[1]
      ],
      selectedUser: undefined
    });
  });
});

function createUser(firstName, lastName, id = undefined) {
  return {firstName, lastName, id};
}