// jest.mock('../utils/');
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
import constants from '../constants';
import App from '../components/App';
import UserListView from '../components/UserListView';
import CreateUserView from '../components/CreateUserView';
import EditUserView from '../components/EditUserView';

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
    wrapper = mount(
      <App
        currentView={store.getState().currentView}
      />
    );

    unsubscribe = store.subscribe(() => {
      wrapper = mount(
        <App
          currentView={store.getState().currentView}
        />
      );
    });
  });

  afterEach(() => {
    unsubscribe();
  });

  it('renders the App component to the DOM', () => {
    expect(wrapper.find('.app').exists()).toEqual(true);
  });

  it('renders the UserListView component when currentView is ListView', () => {
    store.dispatch(actions.goListPage());

    expect(wrapper.find('.app').children().find(UserListView).exists()).toEqual(true);
    expect(wrapper.find('.app').children().find(CreateUserView).exists()).toEqual(false);
    expect(wrapper.find('.app').children().find(EditUserView).exists()).toEqual(false);
  });

  it('renders the CreateUserView component when currentView is CreateView', () => {
    store.dispatch(actions.goCreatePage());

    expect(wrapper.find('.app').children().find(UserListView).exists()).toEqual(false);
    expect(wrapper.find('.app').children().find(CreateUserView).exists()).toEqual(true);
    expect(wrapper.find('.app').children().find(EditUserView).exists()).toEqual(false);
  });

  it('renders the CreateUserView component when currentView is EditView', () => {
    const state = store.getState();
    const targetUser = state.users[1]
    store.dispatch(actions.goEditPage(targetUser));

    expect(wrapper.find('.app').children().find(UserListView).exists()).toEqual(false);
    expect(wrapper.find('.app').children().find(CreateUserView).exists()).toEqual(false);
    expect(wrapper.find('.app').children().find(EditUserView).exists()).toEqual(true);
  });
});