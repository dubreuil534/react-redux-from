import { RouterState } from "react-router-redux";

import { ICustomer } from "app/models/customer";

export interface RootState {
  router: RouterState;
  customer: { customers: ICustomer[] };
  login: { user: {} };
}
