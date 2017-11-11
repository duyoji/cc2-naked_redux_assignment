import { createStore } from 'redux'
import { VIEW_TYPES } from '../components/App';
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