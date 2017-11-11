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
    expect(wrapper.find('.create-user-view').exists()).toEqual(true);
  });
});