import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import UserListView from '../components/UserListView';
import CreateUserView from '../components/CreateUserView';
import EditUserView from '../components/EditUserView';

import { getInstance } from '../stores/';
import constants from '../constants';

const store = getInstance();

export default class App extends Component {
  constructor (props) {
    super (props);
  }

  renderCurrentView() {
    const state = store.getState();

    if(state.currentView === constants.VIEW_TYPES.LIST) {
      return <UserListView />
    }
    if(state.currentView === constants.VIEW_TYPES.CREATE) {
      return <CreateUserView />
    }
    if(state.currentView === constants.VIEW_TYPES.EDIT) {
      return <EditUserView />
    }
  }

  render () {
    return (
      <div className="app">
        {this.renderCurrentView()}
      </div>
    )
  }
}