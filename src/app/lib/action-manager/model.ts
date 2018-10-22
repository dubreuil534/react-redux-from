import { AnyAction, Dispatch } from "redux";

import { AxiosPromise, AxiosResponse } from "axios";

export interface IAsyncAction {
    types: string[];
    requestAction: (dispatch: Dispatch<any>) => AxiosPromise<any>;
    successAction?: TSuccessAction;
    errorAction?: TErrorAction;
}

type TSuccessAction = (dispatch: Dispatch<AnyAction>, data: any, response: AxiosResponse) => any;
type TErrorAction = (dispatch: Dispatch<AnyAction>, response: AxiosResponse) => any;