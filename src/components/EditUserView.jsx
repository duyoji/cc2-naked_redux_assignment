import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import UserForm from './UserForm'

const EditUserView = (props) => {
  return <div className="edit-user-view">
    <h1>Edit User Page</h1>
    <UserForm />
  </div>
};

export default EditUserView;