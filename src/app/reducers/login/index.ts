import * as ACTIONS from "app/actions/action-type";

const initialState = {
    user: {}
};

const handlers = {
    [ACTIONS.PARSE_USER]: (state: any, action: any) => {
        return {
            ...state,
            user: action.payload
        };
    }
};

export function loginReducer(state: any = initialState, action: any) {
    if (action.type in handlers) {
        return handlers[action.type](state, action);
    } else {
        return state;
    }
}