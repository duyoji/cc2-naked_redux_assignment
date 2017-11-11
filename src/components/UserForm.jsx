import React, { Component } from 'react';

import { getInstance } from '../stores/';
import constants from '../constants';
import * as actions from '../actions/';

const store = getInstance();

export default class UserForm extends Component {
  constructor (props) {
    super (props);

    this.onClickCancel = this.onClickCancel.bind(this);
    this.onClickSubmit = this.onClickSubmit.bind(this);
    this.onClickDelete = this.onClickDelete.bind(this);
  }

  onChangeHandler(event) {
    const state = store.getState();
    let firstName = state.firstName;
    let lastName = state.lastName;

    if(event.target.name === 'firstName') {
      firstName = event.target.value;
    } else if(event.target.name === 'lastName') {
      lastName = event.target.value;
    }

    store.dispatch(actions.setUserName(firstName, lastName));
  }

  onClickCancel(event) {
    store.dispatch(actions.goListPage());
  }

  onClickSubmit(event) {
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
  }

  onClickDelete(event) {
    const user = store.getState().selectedUser;
    const fullName = `${user.firstName} ${user.lastName}`;
    if(window.confirm(`Are you sure to delete ${fullName}.`)) {
      store.dispatch(actions.deleteUser(user.id));
    }
  }

  renderDeleteButtonIfEditView() {
    if(store.getState().currentView === constants.VIEW_TYPES.EDIT) {
      return (
        <button
          className="delete"
          onClick={this.onClickDelete}
        >delete</button>
      )
    }
  }

  render() {
    const state = store.getState();

    return <div className="user-form">
      <div>
        <label>first name:
          <input
            name="firstName"
            type="text"
            value={state.firstName}
            onChange={this.onChangeHandler}/>
        </label>
      </div>
      <div>
        <label>last name:
          <input
            name="lastName"
            type="text"
            value={state.lastName}
            onChange={this.onChangeHandler}/>
        </label>
      </div>
      <button
        className="cancel"
        onClick={this.onClickCancel}
      >cancel</button>
      <button
        className="submit"
        onClick={this.onClickSubmit}
      >submit</button>
      {this.renderDeleteButtonIfEditView()}
    </div>
  }
}