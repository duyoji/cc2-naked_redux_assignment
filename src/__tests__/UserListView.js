import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
import constants from '../constants';
import UserListView from '../components/UserListView';

import { getInstance } from '../stores/'
import * as actions from '../actions/';

const store = getInstance();
const NUMBER_OF_USERS = 5;
for(let i = 0; i < NUMBER_OF_USERS; i++) {
  const id = i + 1;
  store.dispatch(actions.createUser({
    firstName: `first_name_${id}`,
    lastName: `last_name_${id}`
  }));
}

Enzyme.configure({ adapter: new Adapter() });

describe('The App component', () => {
  let componentDidMountSpy;
  let wrapper;
  let unsubscribe;

  beforeEach(() => {
    store.dispatch(actions.goListPage());
    wrapper = mount(
      <UserListView/>
    );

    unsubscribe = store.subscribe(() => {
      wrapper = mount(
        <UserListView/>
      );
    });
  });

  afterEach(() => {
    unsubscribe();
  });

  it('renders the UserListView component to the DOM', () => {
    expect(wrapper.find('.list').exists()).toEqual(true);
    expect(wrapper.find('.create-user').exists()).toEqual(true);
  });

  it('does not contain its own state, since it only utilizes the Single State Treet', () => {
    expect(wrapper.state()).toEqual(null);
  });

  it('renders user items', () => {
    store.dispatch(actions.goListPage());
    expect(wrapper.find('.user-item').length).toEqual(5);
  });

  it('should move to cretae user page when create button is clicked.', () => {
    expect(store.getState().currentView).toEqual(constants.VIEW_TYPES.LIST);
    wrapper.find('.create-user').simulate('click');
    expect(store.getState().currentView).toEqual(constants.VIEW_TYPES.CREATE);
  });

  it('should move to edit user page when create button is clicked.', () => {
    expect(store.getState().currentView).toEqual(constants.VIEW_TYPES.LIST);

    wrapper.find('.edit-user').first().simulate('click');

    expect(store.getState().currentView).toEqual(constants.VIEW_TYPES.EDIT);
    expect(store.getState().selectedUser).toEqual(store.getState().users[0]);
  });

  describe('delete process', () => {
    it('should cancel deleting user if confirm return false.', () => {
      // mock
      const originalConfirm = global.confirm;
      global.confirm = (message) => {
        return false;
      };

      expect(store.getState().currentView).toEqual(constants.VIEW_TYPES.LIST);
      expect(store.getState().users.length).toEqual(5);
      wrapper.find('.delete-user').first().simulate('click');
      expect(store.getState().currentView).toEqual(constants.VIEW_TYPES.LIST);
      expect(store.getState().users.length).toEqual(5);

      // restore
      global.confirm = originalConfirm;
    });

    it('should cancel deleting user if confirm return false.', () => {
      // mock
      const originalConfirm = global.confirm;
      let confirmMessage;
      global.confirm = (message) => {
        confirmMessage = message;
        return true;
      };
      const targetUser = store.getState().users[0];
      const fullName = `${targetUser.firstName} ${targetUser.lastName}`;
      const expectedMessage = `Are you sure to delete ${fullName}.`;

      expect(store.getState().currentView).toEqual(constants.VIEW_TYPES.LIST);
      expect(store.getState().users.length).toEqual(5);
      wrapper.find('.delete-user').first().simulate('click');
      expect(store.getState().currentView).toEqual(constants.VIEW_TYPES.LIST);
      expect(store.getState().users.length).toEqual(4);
      expect(confirmMessage).toEqual(expectedMessage);
      expect(store.getState().users.filter(user => user.id === targetUser.id).length)
        .toEqual(0);

      // restore
      global.confirm = originalConfirm;
    });
  });
});