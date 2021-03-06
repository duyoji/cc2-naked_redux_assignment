import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
import constants from '../constants';
import UserForm from '../components/UserForm';

import { getInstance } from '../stores/'
import * as actions from '../actions/';

const store = getInstance();
Enzyme.configure({ adapter: new Adapter() });

const NUMBER_OF_USERS = 5;
for(let i = 0; i < NUMBER_OF_USERS; i++) {
  const id = i + 1;
  store.dispatch(actions.createUser({
    firstName: `first_name_${id}`,
    lastName: `last_name_${id}`
  }));
}

describe('The UserForm component', () => {
  describe('When currentView is CreateView', () => {
    let wrapper;
    let unsubscribe;

    beforeEach(() => {
      store.dispatch(actions.goCreatePage());
      wrapper = mount(
        <UserForm/>
      );

      unsubscribe = store.subscribe(() => {
        wrapper = mount(
          <UserForm/>
        );
      });
    });

    afterEach(() => {
      unsubscribe();
    });

    it('renders the UserForm component to the DOM', () => {
      expect(wrapper.find('.user-form').exists()).toEqual(true);
      expect(wrapper.find('input').length).toEqual(2);
      expect(wrapper.find('.cancel').exists()).toEqual(true);
      expect(wrapper.find('.submit').exists()).toEqual(true);
      expect(wrapper.find('.delete').exists()).toEqual(false);
    });

    it('does not contain its own state, since it only utilizes the Single State Treet', () => {
      expect(wrapper.state()).toEqual({
        firstName: '',
        lastName: ''
      });
    });

    it('should move back to list page when cancel button is clicked', () => {
      expect(store.getState().currentView).toEqual(constants.VIEW_TYPES.CREATE);
      wrapper.find('.cancel').simulate('click');
      expect(store.getState().currentView).toEqual(constants.VIEW_TYPES.LIST);
    });

    describe('Create process.', () => {
      it('should call alert if first name or last name is empty when create button is clicked.', () => {
        // mock
        const originalAlert = global.alert;
        let alertCalled = false;
        let calledCount = 0;
        global.alert = () => {
          alertCalled = true;
          calledCount++;
        }

        wrapper.find('input').first().simulate('change', {
          target: {
            value: '',
            name: 'firstName'
          }
        });

        wrapper.find('input').last().simulate('change', {
          target: {
            value: '',
            name: 'lastName'
          }
        });

        wrapper.find('.submit').simulate('click');
        expect(alertCalled).toEqual(true);
        expect(calledCount).toEqual(1);

        wrapper.find('input').first().simulate('change', {
          target: {
            value: 'abc',
            name: 'firstName'
          }
        });

        wrapper.find('.submit').simulate('click');
        expect(calledCount).toEqual(2);

        wrapper.find('input').last().simulate('change', {
          target: {
            value: 'qwer',
            name: 'lastName'
          }
        });


        wrapper.find('.submit').simulate('click');
        expect(calledCount).toEqual(2);
        expect(store.getState().currentView).toEqual(constants.VIEW_TYPES.LIST);
        expect(store.getState().users.length).toEqual(NUMBER_OF_USERS + 1);

        // restore
        global.alert = originalAlert;
      });
    });
  });

  describe('When currentView is EditView', () => {
    let wrapper;
    let unsubscribe;
    let user;

    beforeEach(() => {
      user = store.getState().users[0];
      store.dispatch(actions.goEditPage(user));
      wrapper = mount(
        <UserForm/>
      );

      unsubscribe = store.subscribe(() => {
        wrapper = mount(
          <UserForm/>
        );
      });
    });

    afterEach(() => {
      unsubscribe();
    });

    it('renders the UserForm component to the DOM', () => {
      expect(wrapper.find('.user-form').exists()).toEqual(true);
      expect(wrapper.find('input').length).toEqual(2);
      expect(wrapper.find('.cancel').exists()).toEqual(true);
      expect(wrapper.find('.submit').exists()).toEqual(true);
      expect(wrapper.find('.delete').exists()).toEqual(true);
    });

    it('does not contain its own state, since it only utilizes the Single State Treet', () => {
      expect(wrapper.state()).toEqual({
        firstName: user.firstName,
        lastName: user.lastName
      });
    });

    describe('Update process.', () => {
      it('should call alert if first name or last name is empty when create button is clicked.', () => {
        // mock
        const originalAlert = global.alert;
        let alertCalled = false;
        let calledCount = 0;
        global.alert = () => {
          alertCalled = true;
          calledCount++;
        }

        wrapper.find('input').first().simulate('change', {
          target: {
            value: '',
            name: 'firstName'
          }
        });

        wrapper.find('input').last().simulate('change', {
          target: {
            value: '',
            name: 'lastName'
          }
        });

        wrapper.find('.submit').simulate('click');
        expect(alertCalled).toEqual(true);
        expect(calledCount).toEqual(1);

        wrapper.find('input').first().simulate('change', {
          target: {
            value: 'abc',
            name: 'firstName'
          }
        });

        wrapper.find('.submit').simulate('click');
        expect(calledCount).toEqual(2);

        wrapper.find('input').last().simulate('change', {
          target: {
            value: 'qwer',
            name: 'lastName'
          }
        });


        wrapper.find('.submit').simulate('click');
        expect(calledCount).toEqual(2);
        expect(store.getState().currentView).toEqual(constants.VIEW_TYPES.LIST);

        // restore
        global.alert = originalAlert;
      });
    });

    describe('delete process', () => {
      it('should cancel deleting user if confirm return false.', () => {
        // mock
        const originalConfirm = global.confirm;
        global.confirm = (message) => {
          return false;
        };

        expect(store.getState().currentView).toEqual(constants.VIEW_TYPES.EDIT);
        expect(store.getState().users.length).toEqual(NUMBER_OF_USERS + 1);
        wrapper.find('.delete').first().simulate('click');
        expect(store.getState().currentView).toEqual(constants.VIEW_TYPES.EDIT);
        expect(store.getState().users.length).toEqual(NUMBER_OF_USERS + 1);

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

        expect(store.getState().currentView).toEqual(constants.VIEW_TYPES.EDIT);
        expect(store.getState().users.length).toEqual(NUMBER_OF_USERS + 1);
        wrapper.find('.delete').first().simulate('click');
        expect(store.getState().currentView).toEqual(constants.VIEW_TYPES.LIST);
        expect(store.getState().users.length).toEqual(NUMBER_OF_USERS);
        expect(confirmMessage).toEqual(expectedMessage);
        expect(store.getState().users.filter(user => user.id === targetUser.id).length)
          .toEqual(0);

        // restore
        global.confirm = originalConfirm;
      });
    });
  });
});