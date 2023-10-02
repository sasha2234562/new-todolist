import {AppActionsType, setAppStatusAC} from "../../app/app-reduser";
import {Dispatch} from "redux";
import {authAPI} from "../../api/auth-api";
import {handleServerAppError} from "../../utils/error-utils";

const initialState = {
    isLoggedIn: false
}
type InitialStateType = typeof initialState
export const authReducer = (state: InitialStateType = initialState, action: AuthActionsType) => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN': {
            return {...state, initialState: action.value}
        }
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (value: boolean) => ({type: Login_SET_IS_LOGGED_IN, value} as const)

// thunks
export const loginTC = (data: any) => (dispatch: Dispatch<AuthActionsType | AppActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.login(data).then(resolve => {
        if(data.resultCode === 0) {
            dispatch(setAppStatusAC('succeeded'))
            dispatch(setIsLoggedInAC(true))
        }
        handleServerAppError(resolve.data, dispatch)
    })
}

//types
const Login_SET_IS_LOGGED_IN = 'login/SET-IS-LOGGED-IN'
export type AuthActionsType = ReturnType<typeof setIsLoggedInAC>