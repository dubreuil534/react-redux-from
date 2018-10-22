import * as ACTIONS from "app/actions/action-type";

const initialState = {
    customers: []
};

const handlers = {
    [ACTIONS.PARSE_CUSTOMERS]: (state: any, action: any) => {
        return {
            ...state,
            customers: action.payload
        };
    }
};

export function customerReducer(state: any = initialState, action: any) {
    if (action.type in handlers) {
        return handlers[action.type](state, action);
    } else {
        return state;
    }
}