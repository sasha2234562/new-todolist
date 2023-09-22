export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"

const initialState = {
    status: "loading" as RequestStatusType,
    error: ""
};

export type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case "APP/SET-STATUS":
            return {...state, status: action.status};
        default:
            return state;
        case "APP/SET-ERROR": {
            return {...state};
        }
    }
};
export const setAppStatusAC = (status: RequestStatusType) => ({type: "APP/SET-STATUS", status} as const);

export const setAppErrorAC = (error: string) => ({type: "APP/SET-ERROR", error} as const);

export type AppActionsType = ReturnType<typeof setAppStatusAC> | ReturnType<typeof setAppErrorAC>
