jest.unmock('redux-mock-store');

import configureMockStore from 'redux-mock-store';
import * as actions from '../actions/';
import { VIEW_TYPES } from '../components/App';

const middlewares = [];
const mockStore = configureMockStore(middlewares);

describe('actions', () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      currentView: VIEW_TYPES.LIST,
      users: [],
      selectedUser: undefined
    });
  });

  it('should return an object that has type as a key and "GO_CREATE_PAGE" as a value', () => {
    store.dispatch(actions.goCreatePage());
    expect(store.getActions()[0]).toEqual({
      type: actions.ACTION_TYPES.GO_CREATE_PAGE
    });
  });

  it('should return an object that has type as a key and "GO_EDIT_PAGE" as a value', () => {
    store.dispatch(actions.goEditPage());
    expect(store.getActions()[0]).toEqual({
      type: actions.ACTION_TYPES.GO_EDIT_PAGE
    });
  });

  it('should return an object that has type as a key and "goListPage" as a value', () => {
    store.dispatch(actions.goListPage());
    expect(store.getActions()[0]).toEqual({
      type: actions.ACTION_TYPES.GO_LIST_PAGE
    });
  });

  it('should return an object that has type as a key and "CREATE_USER" as a value', () => {
    const dummyUser = createUser('dummy-f', 'dummy-l');

    store.dispatch(actions.createUser(dummyUser));
    expect(store.getActions()[0]).toEqual({
      type: actions.ACTION_TYPES.CREATE_USER,
      user: {
        firstName: 'dummy-f',
        lastName: 'dummy-l',
        id: undefined
      }
    });
  });

  it('should return an object that has type as a key and "EDIT_USER" as a value', () => {
    const id = 2;
    const dummyUser = createUser('dummy-f2', 'dummy-l2', id);

    store.dispatch(actions.editUser(dummyUser));
    expect(store.getActions()[0]).toEqual({
      type: actions.ACTION_TYPES.EDIT_USER,
      user: {
        firstName: 'dummy-f2',
        lastName: 'dummy-l2',
        id
      }
    });
  });

  it('should return an object that has type as a key and "DELETE_USER" as a value', () => {
    const id = 3;
    store.dispatch(actions.deleteUser(id));
    expect(store.getActions()[0]).toEqual({
      type: actions.ACTION_TYPES.DELETE_USER,
      id
    });
  });

  it('should return string value that is same as key.', () => {

    expect(Object.keys(actions.ACTION_TYPES).length).toEqual(6);
    for(let key in actions.ACTION_TYPES) {
      expect(key).toEqual(actions.ACTION_TYPES[key]);
    }
  });

  // it('should contain an action to select a photo', () => {
  //   const index = 0;

  //   expect(actions.selectPhoto(index)).toEqual({
  //     type: 'SELECT_PHOTO',
  //     index
  //   });
  // });

  // describe('asynchronous actions', () => {
  //   it('should dispatch an action with the type of GET_PHOTOS after fetching photo information is complete', () => {
  //     const store = mockStore({ photos: [] });

  //     return store.dispatch(actions.getPhotos())
  //       .then(() => {
  //         const expectedActions = store.getActions()
  //         expect(expectedActions[0]).toEqual({
  //           type: 'GET_PHOTOS',
  //           photos: ['TestReturnString', 'TestReturnString']
  //         });
  //       });
  //   });
  // });
});

function createUser(firstName, lastName, id) {
  return {
    firstName,
    lastName,
    id
  };
}