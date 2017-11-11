import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
import constants from '../constants';
import CreateUserView from '../components/CreateUserView';

import { getInstance } from '../stores/'
import * as actions from '../actions/';

const store = getInstance();
Enzyme.configure({ adapter: new Adapter() });

describe('The App component', () => {
  let componentDidMountSpy;
  let wrapper;
  let unsubscribe;

  beforeEach(() => {
    store.dispatch(actions.goCreatePage());
    wrapper = mount(
      <CreateUserView/>
    );

    unsubscribe = store.subscribe(() => {
      wrapper = mount(
        <CreateUserView/>
      );
    });
  });

  afterEach(() => {
    unsubscribe();
  });

  it('renders the UserListView component to the DOM', () => {
    expect(wrapper.find('.create-form').exists()).toEqual(true);
    expect(wrapper.find('input').length).toEqual(2);
    expect(wrapper.find('.cancel').exists()).toEqual(true);
    expect(wrapper.find('.create').exists()).toEqual(true);
  });

  it('does not contain its own state, since it only utilizes the Single State Treet', () => {
    expect(wrapper.state()).toEqual(null);
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

      // wrapper.find('input').first().simulate('focus');
      wrapper.find('input').first().simulate('change', {
        target: {
          value: 'first-N',
          name: 'firstName'
        }
      });

      wrapper.find('.create').simulate('click');
      expect(alertCalled).toEqual(true);
      expect(calledCount).toEqual(1);

      // wrapper.find('input').last().simulate('focus');
      wrapper.find('input').last().simulate('change', {
        target: {
          value: 'last-N',
          name: 'lastName'
        }
      });

      wrapper.find('.create').simulate('click');
      expect(calledCount).toEqual(1);
      expect(store.getState().currentView).toEqual(constants.VIEW_TYPES.LIST);

      // restore
      global.alert = originalAlert;
    });
  });


});