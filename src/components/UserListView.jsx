import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { getInstance } from '../stores/';
import constants from '../constants';
import * as actions from '../actions/';

const store = getInstance();

export default class UserListView extends Component {
  constructor (props) {
    super (props);
    this.onClickCreate = this.onClickCreate.bind(this);
  }

  confirmDelete(user) {
    const fullName = `${user.firstName} ${user.lastName}`;
    if(window.confirm(`Are you sure to delete ${fullName}.`)) {
      store.dispatch(actions.deleteUser(user.id));
    }
  }

  renderUserList() {
    const state = store.getState();
    return state.users.map((user) => {
      return (
        <li
          className="user-item"
          key={user.id}>
          {user.firstName} {user.lastName}
          <button
            className='edit-user'
            onClick={(event) => {
              store.dispatch(actions.goEditPage(user));
            }}
            >edit</button>
          <button
            className="delete-user"
            onClick={(event) => {
              this.confirmDelete(user);
            }}
            >delete</button>
        </li>
      );
    });
  }

  onClickCreate(event) {
    store.dispatch(actions.goCreatePage());
  }

  render () {
    return (
      <div className="list">
        <h1>User List Page</h1>
        <ul>
          {this.renderUserList()}
        </ul>
        <button
          className="create-user"
          onClick={this.onClickCreate}>create</button>
      </div>
    )
  }
}