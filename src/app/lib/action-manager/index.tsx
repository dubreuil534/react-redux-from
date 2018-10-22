import { Dispatch } from "redux";

import axios, { AxiosPromise, AxiosRequestConfig, AxiosResponse } from "axios";

import { REQUEST_PREFIX } from "./constant";
import { IAsyncAction } from "./model";

function buildAxiosConfig(): AxiosRequestConfig {
    return {
        headers: {
            // "Authorization": "Basic YWRtaW46d2VsY29tZTE=",
            "Content-Type": "application/json"
        }
    };
}

export function executeGetRequest(url: string, queryParams?: { [key: string]: string }): AxiosPromise<any> {
    return axios.get(buildEndpointWithParameters(url, queryParams), buildAxiosConfig());
}

export function executePostRequest(url: string, body: any, queryParams?: { [key: string]: string }): AxiosPromise<any> {
    return axios.post(buildEndpointWithParameters(url, queryParams), body, buildAxiosConfig());
}

export function executePutRequest(url: string, body: any, queryParams?: { [key: string]: string }): AxiosPromise<any> {
    return axios.put(buildEndpointWithParameters(url, queryParams), body, buildAxiosConfig());
}

export function executeDeleteRequest(url: string, queryParams?: { [key: string]: string }): AxiosPromise<any> {
    return axios.delete(buildEndpointWithParameters(url, queryParams), buildAxiosConfig());
}

export function createAsyncAction(actionTypePrefix: string, asyncAction: IAsyncAction) {
    if (!asyncAction.types[actionTypePrefix.concat(REQUEST_PREFIX.START)]) {
        console.error(
            "Vos action-type ne correspondent pas aux normes établies dans ce projet.Vérifiez " + actionTypePrefix + " : ",
            Object.keys(asyncAction.types));
    }

    return (dispatch: Dispatch) => {
        dispatch(baseAction(actionTypePrefix.concat(REQUEST_PREFIX.START))); // dispatch start request
        console.log("asyncAction.requestAction", asyncAction.requestAction);
        return asyncAction.requestAction(dispatch)
            .then((response: AxiosResponse<any>) => {
                console.log("response", response);
                dispatch(baseAction(actionTypePrefix.concat(REQUEST_PREFIX.SUCCESS), response)); // dispatch success request

                if (asyncAction.successAction) {
                    asyncAction.successAction(dispatch, response.data, response); // dispatch asyncAction.successAction
                }
            })
            .catch((error: AxiosResponse<any>) => {
                console.log("error", error.config);
                dispatch(baseAction(actionTypePrefix.concat(REQUEST_PREFIX.FAILURE), error)); // dispatch error request

                if (asyncAction.errorAction) {
                    asyncAction.errorAction(dispatch, error); // dispatch asyncAction.errorAction
                }
            });

    };
}

const baseAction = (actionType: string, response?: AxiosResponse<any>) => {
    return {
        type: actionType,
        payload: response
    };
};

function buildEndpointWithParameters(endpoint: string, params?: { [key: string]: string }): string {
    const baseUrl = "http://localhost:8080/";
    if (!params) {
        return baseUrl + endpoint;
    }
    const resultArray: string[] = [];
    Object.keys(params).forEach((key: string) => {
        let value: string = params[key];
        value = value.trim();
        resultArray.push(key + "=" + encodeURIComponent(value));
    });
    return baseUrl + endpoint + "?" + resultArray.join("&");
}