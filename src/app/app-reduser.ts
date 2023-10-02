import {authAPI} from "../api/auth-api";
import {AppActionsAllType} from "./store";
import {setIsLoggedInAC} from "../features/login/login-reducer";
import {AnyAction, Dispatch} from "redux";

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"

const initialState: InitialStateType = {
    status: "loading",
    error: "Error",
    isInitialized: false
};

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case "APP/SET-STATUS":
            return {...state, status: action.status};
        case "APP/SET-ERROR": {
            return {...state, error: action.error};
        }
        case "APP/SET-INITIALIZED": {
            return {...state, isInitialized: action.value}
        }
        default:
            return state;
    }
};
export const setAppStatusAC = (status: RequestStatusType) => ({type: "APP/SET-STATUS", status} as const);
export const setAppErrorAC = (error: string) => ({type: "APP/SET-ERROR", error} as const);
export const setIsInitializedAC = (value: boolean) => ({type: "APP/SET-INITIALIZED", value} as const)

export const isInitializedTC = () => (dispatch: Dispatch) => {
    authAPI.isAuth().then(resolve => {
        if (resolve.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true))
        }
    })
    dispatch(setIsInitializedAC(true))
}

export type AppActionsType = ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setAppErrorAC>
    | ReturnType<typeof setIsInitializedAC>
export type InitialStateType = {
    status: RequestStatusType,
    error: string | null,
    isInitialized: boolean
}