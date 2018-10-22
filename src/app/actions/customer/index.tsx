import { AnyAction, Dispatch } from "redux";

import { createAsyncAction, executeDeleteRequest, executeGetRequest, executePostRequest } from "app/lib/action-manager";
import { ICustomer } from "app/models/customer";

import * as ACTIONS from "../action-type";

const endpointUrl = "customers";

export function getCustomers() {
  return createAsyncAction("GET_CUSTOMERS", {
    types: Object.assign([], ACTIONS),
    requestAction: function() {
      return executeGetRequest(endpointUrl);
    },
    successAction: function(dispatch: Dispatch<AnyAction>, result: any) {
      dispatch(parseCustomers(result));
    }
  });
}

const parseCustomers = (response?: ICustomer[]) => {
  return {
    type: ACTIONS.PARSE_CUSTOMERS,
    payload: response
  };
};

export function createCustomer(customer: ICustomer) {
  return createAsyncAction("CREATE_STUDENT", {
    types: Object.assign([], ACTIONS),
    requestAction: function() {
      return executePostRequest(endpointUrl, customer);
    },
    successAction: function(dispatch: Dispatch<AnyAction>, result: any) {
      dispatch(parseCustomers(result));
    }
  });
}

export function deleteCustomer(customerId: number) {
  return createAsyncAction("DELETE_STUDENT", {
    types: Object.assign([], ACTIONS),
    requestAction: function() {
      return executeDeleteRequest(`${endpointUrl}/${customerId}`);
    },
    successAction: function(dispatch: Dispatch<AnyAction>, result: any) {
      dispatch(parseCustomers(result));
    }
  });
}

