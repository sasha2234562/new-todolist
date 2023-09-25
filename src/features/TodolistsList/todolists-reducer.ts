import {todolistsAPI, TodolistType} from "../../api/todolists-api";
import {Dispatch} from "redux";
import {AppActionsType, RequestStatusType, setAppErrorAC, setAppStatusAC} from "../../app/app-reduser";
import {ThunkAction} from "redux-thunk";
import {AppActionsAllType, AppRootStateType, AppThunkType} from "../../app/store";

const initialState: Array<TodolistDomainType> = [];

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsTodosType): Array<TodolistDomainType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.id);
        case "ADD-TODOLIST":
            return [{...action.todolist, filter: "all", entityStatus: 'succeeded'}, ...state];
        case "CHANGE-TODOLIST-TITLE":
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl);
        case "CHANGE-TODOLIST-FILTER":
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl);
        case "SET-TODOLISTS":
            return action.todolists.map(tl => ({...tl, filter: "all", entityStatus: "succeeded"}));
        case "CHANGE-TODOLIST-ENTITY-STATUS": {
            return state.filter(tl => tl.id === action.id ? (tl.entityStatus = action.status) : tl)
        }
        default:
            return state;
    }
};

// actions
export const removeTodolistAC = (id: string) => ({type: "REMOVE-TODOLIST", id} as const);
export const addTodolistAC = (todolist: TodolistType) => ({type: "ADD-TODOLIST", todolist} as const);
export const changeTodolistTitleAC = (id: string, title: string) => ({
    type: "CHANGE-TODOLIST-TITLE",
    id,
    title
} as const);
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => ({
    type: "CHANGE-TODOLIST-FILTER",
    id,
    filter
} as const);
export const setTodolistsAC = (todolists: Array<TodolistType>) => ({type: "SET-TODOLISTS", todolists} as const);

export const changeTodolistEntityStatusAC = (id: string, status: RequestStatusType) => ({
    type: 'CHANGE-TODOLIST-ENTITY-STATUS', id, status
} as const)
// thunks
export const fetchTodolistsTC = (): ThunkAction<void, AppRootStateType, unknown, AppActionsAllType> => {
    return (dispatch) => {
        dispatch(setAppStatusAC("loading"));
        todolistsAPI.getTodolists()
            .then((res) => {
                dispatch(setAppStatusAC("succeeded"));
                dispatch(setTodolistsAC(res.data));
            });
    };
};
export const removeTodolistTC = (todolistId: string): ThunkAction<void, AppRootStateType, unknown, AppActionsAllType> => {
    return (dispatch) => {
        dispatch(setAppStatusAC("loading"));
        dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'))
        todolistsAPI.deleteTodolist(todolistId)
            .then((res) => {
                dispatch(setAppStatusAC("succeeded"));
                dispatch(changeTodolistEntityStatusAC(todolistId, 'succeeded'))
                dispatch(removeTodolistAC(todolistId));
            });
    };
};
export const addTodolistTC = (title: string): ThunkAction<void, AppRootStateType, unknown, AppActionsAllType> => {
    return (dispatch) => {
        dispatch(setAppStatusAC("loading"));
        todolistsAPI.createTodolist(title)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(setAppStatusAC("succeeded"));
                    dispatch(addTodolistAC(res.data.data.item));
                } else if (res.data.messages.length) {
                    dispatch(setAppErrorAC(res.data.messages[0]));
                } else {
                    dispatch(setAppErrorAC("Some error occurred"));
                    dispatch(setAppStatusAC("failed"));
                }

            });
    };
};
export const changeTodolistTitleTC = (id: string, title: string): ThunkAction<void, AppRootStateType, unknown, AppActionsAllType> => {
    return (dispatch) => {
        dispatch(setAppStatusAC("loading"));
        todolistsAPI.updateTodolist(id, title)
            .then((res) => {
                dispatch(setAppStatusAC("succeeded"));
                dispatch(changeTodolistTitleAC(id, title));
            });
    };
};

// types
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>;
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>;
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>;


export type ActionsTodosType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | SetTodolistsActionType
    | AppActionsType
    | ReturnType<typeof changeTodolistEntityStatusAC>

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType,
    entityStatus: RequestStatusType
}
