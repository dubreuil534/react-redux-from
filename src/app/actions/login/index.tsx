import { AnyAction, Dispatch } from "redux";

import { createAsyncAction, executePostRequest } from "app/lib/action-manager";
import { IUser } from "app/models/user";

import * as ACTIONS from "../action-type";

const endpointUrl = "login";

export function login(user: IUser) {
    return createAsyncAction("LOGIN", {
        types: Object.assign([], ACTIONS),
        requestAction: function() {
            return executePostRequest(endpointUrl, user);
        },
        successAction: function(dispatch: Dispatch<AnyAction>, result: any) {
            dispatch(parseUser(result));
        }
    });
}

const parseUser = (response?: any) => {
    return {
        type: ACTIONS.PARSE_USER,
        payload: response
    };
};