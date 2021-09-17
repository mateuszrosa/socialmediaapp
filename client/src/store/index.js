import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "../reducers";
import { loadState, saveState } from "./sessionStorage";

const persistedState = loadState();
export const store = createStore(
  rootReducer,
  persistedState,
  composeWithDevTools(
    applyMiddleware(thunk)
    // other store enhancers if any
  )
);

store.subscribe(() => {
  saveState(store.getState());
})