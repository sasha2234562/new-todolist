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
        default:
            return state;
        case "APP/SET-ERROR": {
            return {...state, error: action.error};
        }
    }
};
export const setAppStatusAC = (status: RequestStatusType) => ({type: "APP/SET-STATUS", status} as const);
export const setAppErrorAC = (error: string) => ({type: "APP/SET-ERROR", error} as const);


export type AppActionsType = ReturnType<typeof setAppStatusAC> | ReturnType<typeof setAppErrorAC>
export type InitialStateType = {
    status: RequestStatusType,
    error: string | null,
    isInitialized: boolean
}