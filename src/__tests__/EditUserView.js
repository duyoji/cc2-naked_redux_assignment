import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
import constants from '../constants';
import EditUserView from '../components/EditUserView';

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

describe('The EditUserView component', () => {
  let wrapper;
  let unsubscribe;

  beforeEach(() => {
    const user = store.getState().users[0];
    store.dispatch(actions.goEditPage(user));
    wrapper = mount(
      <EditUserView/>
    );

    unsubscribe = store.subscribe(() => {
      wrapper = mount(
        <EditUserView/>
      );
    });
  });

  afterEach(() => {
    unsubscribe();
  });

  it('renders the EditUserView component to the DOM', () => {
    expect(wrapper.find('.edit-user-view').exists()).toEqual(true);
  });
});