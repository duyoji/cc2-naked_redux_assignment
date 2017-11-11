import { createStore } from 'redux'
import reducer from '../reducers/'

// singleton pattern
let store;
const getInstance = () => {
  if(store) {
    return store;
  }

  store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  return store;
};

export { getInstance };