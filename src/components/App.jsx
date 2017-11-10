import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// import PropTypes from 'prop-types';

export const VIEW_TYPES = {
  CREATE: 'CreateView',
  EDIT: 'EditView',
  LIST: 'ListView'
};

export default class App extends Component {
  constructor (props) {
    super (props);
    console.log('constructor in App.jsx');
  }

  componentDidMount() {
    console.log('componentDidMount in App.jsx');
  }

  get currentView() {

  }

  render () {
    return (
      <div className="app">
        {this.currentView}
      </div>
    )
  }
}

// App.propTypes = {
//   currentView: PropTypes.string.isRequired,
// };