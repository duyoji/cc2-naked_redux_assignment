import React from 'react';
import UserListView from '../components/UserListView';
import CreateUserView from '../components/CreateUserView';
import EditUserView from '../components/EditUserView';
import { getInstance } from '../stores/';
import constants from '../constants';

const store = getInstance();

const App = (props) => {
  return (
    <div className="app">
      {renderCurrentView()}
    </div>
  );
};

const renderCurrentView = () => {
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
};

export default App;