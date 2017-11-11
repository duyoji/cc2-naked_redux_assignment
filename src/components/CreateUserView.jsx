import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { getInstance } from '../stores/';
import constants from '../constants';
import * as actions from '../actions/';

const store = getInstance();

export default class CreateUserView extends Component {
  constructor (props) {
    super (props);

    this.onClickCancel = this.onClickCancel.bind(this);
    this.onClickCreate = this.onClickCreate.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  onClickCancel(event) {
    store.dispatch(actions.goListPage());
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

  onClickCreate(event) {
    const state = store.getState();
    let firstName = state.firstName || '';
    let lastName = state.lastName || '';

    if(!firstName.length || !lastName.length) {
      window.alert('Need to put first name and last name.');
      return;
    }

    store.dispatch(actions.createUser({firstName, lastName}));
  }

  render() {
    const state = store.getState();

    return <div className="create-form">
      <h1>Create User Page</h1>
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
        className="create"
        onClick={this.onClickCreate}
      >create</button>
    </div>
  }
}