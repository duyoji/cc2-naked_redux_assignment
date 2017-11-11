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

  it('does not contain its own state, since it only utilizes the Single State Treet', () => {
    expect(wrapper.state()).toEqual(null);
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

  // it('renders the CreateUserView component when currentView is CreateView', () => {
  //   store.dispatch(actions.goCreatePage());

  //   sinon.spy(App.prototype, 'render');
  //   wrapper = mount(<App currentView={'AllPhotos'} />);
  //   expect(App.prototype.componentDidMount.calledTwice).toEqual(true);

  //   expect(wrapper.find('.app').children().find(UserListView).exists()).toEqual(false);
  //   expect(wrapper.find('.app').children().find(CreateUserView).exists()).toEqual(true);
  //   expect(wrapper.find('.app').children().find(EditUserView).exists()).toEqual(false);
  // });

  // it('renders the CreateUserView component when currentView is EditView', () => {
  //   const state = store.getState();
  //   const targetUser = state.users[1]
  //   store.dispatch(actions.goEditPage(targetUser));

  //   expect(wrapper.find('.app').children().find(UserListView).exists()).toEqual(false);
  //   expect(wrapper.find('.app').children().find(CreateUserView).exists()).toEqual(false);
  //   expect(wrapper.find('.app').children().find(EditUserView).exists()).toEqual(true);
  // });

  // it('passes two functions into the Navbar component as props', () => {
  //   expect(Object.keys(wrapper.find('.app').children().find(Navbar).props()).length).toEqual(2);
  // });

  // it('gives the Navbar component a callback titled getPhotos', () => {
  //   expect(wrapper.find('.app').children().find(Navbar).props().hasOwnProperty('getPhotos')).toEqual(true);
  //   expect(typeof wrapper.find('.app').children().find(Navbar).props().getPhotos).toEqual('function');
  // });

  // it('modifies its own state, setting the photos property to an array of received items when the getPhotos callback if the Navbar is invoked', () => {
  //   wrapper = mount(<App currentView={ 'AllPhotos' } />);
  //   wrapper.setState({ photos: [] });
  //   expect(wrapper.state().photos).toEqual([]);
  //   wrapper.find(Navbar).props().getPhotos();
  //   setTimeout(() => {
  //     expect(wrapper.state().photos).toEqual(['First TestReturnString', 'Second TestReturnString']);
  //   }, 500)
  // });

  // it('gives the Navbar component a callback titled goHome', () => {
  //   expect(wrapper.find('.app').children().find(Navbar).props().hasOwnProperty('goHome')).toEqual(true);
  //   expect(typeof wrapper.find('.app').children().find(Navbar).props().goHome).toEqual('function');
  // });

  // it('modifies its own state, setting the currentView property to AllPhotos when the goHome callback of Navbar is invoked', () => {
  //   wrapper.setState({
  //     currentView: 'SinglePhoto',
  //     selectedPhoto: 'test'
  //   });

  //   wrapper.find('.app').children().find(Navbar).props().goHome();

  //   expect(wrapper.state().currentView).toEqual('AllPhotos');
  // });

  // it('renders the AllPhotos component by default when the currentView prop is set to AllPhotos', () => {
  //   expect(wrapper.find('.app').children().find(AllPhotos).exists()).toEqual(true);
  // });

  // it('passes two props to the AllPhotos component', () => {
  //   expect(Object.keys(wrapper.find('.app').children().find(AllPhotos).props()).length).toEqual(2);
  // });

  // it('passes the photos array in its own state as a prop to the AllPhotos component', () => {
  //   expect(wrapper.find('.app').children().find(AllPhotos).props().photos).toEqual(wrapper.state().photos);
  // });

  // it('passes a selectPhoto callback to the AllPhotos component as a prop', () => {
  //   expect(typeof wrapper.find('.app').children().find(AllPhotos).props().selectPhoto).toEqual('function');
  // });

  // it('modifies its own state, setting the currentView property to SinglePhoto and assign it a photo based on its index in the array when the selectPhoto callback of AllPhotos is invoked', () => {
  //   wrapper.find('.app').children().find(AllPhotos).props().selectPhoto(1);

  //   expect(wrapper.state().currentView).toEqual('SinglePhoto');
  //   expect(wrapper.state().selectedPhoto).toEqual('Second TestReturnString')
  // });

  // it('does NOT render the SinglePhoto component by default', () => {
  //   expect(wrapper.find('.app').children().find(SinglePhoto).exists()).toEqual(false);
  // });

  // it('renders the SinglePhoto component if the currentView prop is set to SinglePhoto', () => {
  //   wrapper.setState({currentView: 'SinglePhoto', selectedPhoto: 'test'});
  //   expect(wrapper.find('.app').children().find(SinglePhoto).exists()).toEqual(true);
  // });

  // it('passes the selectedPhoto value in its own state as a prop to the SinglePhoto component', () => {
  //   wrapper.setState({currentView: 'SinglePhoto', selectedPhoto: 'test'});
  //   expect(wrapper.find('.app').children().find(SinglePhoto).props().selectedPhoto).toEqual(wrapper.state().selectedPhoto);
  // });

  // it('does NOT render the AllPhotos component if the currentView prop is set to singlePhoto', () => {
  //   wrapper.setState({currentView: 'SinglePhoto', selectedPhoto: 'test'});
  //   expect(wrapper.find('.app').children().find(AllPhotos).exists()).toEqual(false);
  // });
});