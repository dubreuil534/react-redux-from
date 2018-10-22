import { routerReducer, RouterState } from "react-router-redux";
import { combineReducers } from "redux";

import { customerReducer } from "app/reducers/customer";
import { loginReducer } from "app/reducers/login";

import { RootState } from "./state";

export { RootState, RouterState };

export const rootReducer = combineReducers<RootState>({
  router: routerReducer,
  customer: customerReducer,
  login: loginReducer
});
