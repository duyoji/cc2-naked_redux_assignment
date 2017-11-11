import React, { Component } from 'react';

import { getInstance } from '../stores/';
import constants from '../constants';
import * as actions from '../actions/';

const store = getInstance();

const UserForm = (props) => {
  const state = store.getState();
  return <div className="user-form">
    <div>
      <label>first name:
        <input
          name="firstName"
          type="text"
          value={state.firstName}
          onChange={onChangeHandler}/>
      </label>
    </div>
    <div>
      <label>last name:
        <input
          name="lastName"
          type="text"
          value={state.lastName}
          onChange={onChangeHandler}/>
      </label>
    </div>
    <button
      className="cancel"
      onClick={onClickCancel}
    >cancel</button>
    <button
      className="submit"
      onClick={onClickSubmit}
    >submit</button>
    {renderDeleteButtonIfEditView()}
  </div>
};

const onChangeHandler = (event) => {
  const state = store.getState();
  let firstName = state.firstName;
  let lastName = state.lastName;

  if(event.target.name === 'firstName') {
    firstName = event.target.value;
  } else if(event.target.name === 'lastName') {
    lastName = event.target.value;
  }

  store.dispatch(actions.setUserName(firstName, lastName));
};

const onClickCancel = (event) => {
  store.dispatch(actions.goListPage());
};

const onClickSubmit = (event) => {
  const state = store.getState();
  const firstName = state.firstName || '';
  const lastName = state.lastName || '';

  if(!firstName.length || !lastName.length) {
    window.alert('Need to put first name and last name.');
    return;
  }

  if(state.currentView === constants.VIEW_TYPES.CREATE) {
    store.dispatch(actions.createUser({firstName, lastName}));
  } else {
    const id = state.selectedUser.id;
    store.dispatch(actions.editUser({id, firstName, lastName}));
  }
};

const onClickDelete = (event) => {
  const user = store.getState().selectedUser;
  const fullName = `${user.firstName} ${user.lastName}`;
  if(window.confirm(`Are you sure to delete ${fullName}.`)) {
    store.dispatch(actions.deleteUser(user.id));
  }
};

const renderDeleteButtonIfEditView = () => {
  if(store.getState().currentView === constants.VIEW_TYPES.EDIT) {
    return (
      <button
        className="delete"
        onClick={onClickDelete}
      >delete</button>
    )
  }
};

export default UserForm;