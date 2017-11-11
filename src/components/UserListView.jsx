import React from 'react';
import { getInstance } from '../stores/';
import constants from '../constants';
import * as actions from '../actions/';

const store = getInstance();

const UserListView = (props) => {
  return (
    <div className="list">
      <h1>User List Page</h1>
      <ul>
        {renderUserList()}
      </ul>
      <button
        className="create-user"
        onClick={onClickCreate}>create</button>
    </div>
  );
};

const onClickCreate = (event) => {
  store.dispatch(actions.goCreatePage());
}

const renderUserList = () => {
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
      </li>
    );
  });
};

export default UserListView;