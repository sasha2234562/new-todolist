import {AppActionsType} from "../../app/app-reduser";

const initialState = {
    isLoggedIn: false
}
type InitialStateType = typeof initialState

export const authReduser = (state: InitialStateType = initialState, action: ActionsType)=> {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN': {
            return{...state, initialState: action.value}
        }
        default:
            return state
    }
}
export const setIsLoggedInAC = (value: boolean)=> ({type: Login_SET_IS_LOGGED_IN, value} as const)

const Login_SET_IS_LOGGED_IN = 'login/SET-IS-LOGGED-IN'
type ActionsType = ReturnType<typeof setIsLoggedInAC> | AppActionsType