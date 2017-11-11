import { createStore } from 'redux'
import reducer from '../reducers/'

// singleton pattern
let store;
const getInstance = () => {
  if(store) {
    return store;
  }

  store = createStore(reducer);
  return store;
};

export { getInstance };