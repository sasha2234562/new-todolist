import {
    AddTodolistActionType,
    changeTodolistEntityStatusAC,
    RemoveTodolistActionType,
    SetTodolistsActionType
} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from "../../api/todolists-api";
import {AppActionsAllType, AppRootStateType, AppThunkType} from "../../app/store";
import {AppActionsType, RequestStatusType, setAppStatusAC} from "../../app/app-reduser";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {ThunkAction} from "redux-thunk";

const initialState: TasksStateType = {};

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsTasksType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)};
        case "ADD-TASK":
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]};
        case "UPDATE-TASK":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, ...action.model} : t)
            };
        case "ADD-TODOLIST":
            return {...state, [action.todolist.id]: []};
        case "REMOVE-TODOLIST":
            const copyState = {...state};
            delete copyState[action.id];
            return copyState;
        case "SET-TODOLISTS": {
            const copyState = {...state};
            action.todolists.forEach(tl => {
                copyState[tl.id] = [];
            });
            return copyState;
        }
        case "SET-TASKS":
            return {...state, [action.todolistId]: action.tasks};
        case "CHANGE-TASK-ENTITY-STATUS": {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {
                    ...t,
                    entityStatus: action.status
                } : t)
            }
        }
        default:
            return state;
    }
};

// actions
export const removeTaskAC = (taskId: string, todolistId: string) =>
    ({type: "REMOVE-TASK", taskId, todolistId} as const);
export const addTaskAC = (task: TaskType) =>
    ({type: "ADD-TASK", task} as const);
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) =>
    ({type: "UPDATE-TASK", model, todolistId, taskId} as const);
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) =>
    ({type: "SET-TASKS", tasks, todolistId} as const);
export const changeTaskEntityStatusAC = (todolistId: string, taskId: string, status: RequestStatusType) =>
    ({type: "CHANGE-TASK-ENTITY-STATUS", todolistId, taskId, status} as const)

// thunks
export const fetchTasksTC = (todolistId: string): AppThunkType => (dispatch) => {
    dispatch(setAppStatusAC("loading"));
    todolistsAPI.getTasks(todolistId)
        .then((res) => {
            dispatch(setAppStatusAC("succeeded"));
            const tasks = res.data.items;
            dispatch(setTasksAC(tasks, todolistId));
        }).catch(error => {
        handleServerNetworkError(error, dispatch)
    })
};
export const removeTaskTC = (taskId: string, todolistId: string): AppThunkType => (dispatch) => {
    dispatch(changeTaskEntityStatusAC(todolistId, taskId, "loading"))
    dispatch(setAppStatusAC("loading"));
    todolistsAPI.deleteTask(todolistId, taskId)
        .then(res => {
            handleServerAppError(res.data, dispatch)
            dispatch(changeTaskEntityStatusAC(todolistId, taskId, "succeeded"))
            dispatch(removeTaskAC(taskId, todolistId));
        }).catch(error => {
        handleServerNetworkError(error, dispatch)
    })
};
export const addTaskTC = (title: string, todolistId: string): AppThunkType => (dispatch) => {
    dispatch(setAppStatusAC("loading"));
    dispatch(changeTodolistEntityStatusAC(todolistId, "loading"))
    todolistsAPI.createTask(todolistId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(changeTodolistEntityStatusAC(todolistId, "succeeded"))
                dispatch(setAppStatusAC("succeeded"));
                dispatch(addTaskAC(res.data.data.item));
            } else {
                dispatch(changeTodolistEntityStatusAC(todolistId, "succeeded"))
                handleServerAppError(res.data, dispatch)
            }
        }).catch(error => {
        handleServerNetworkError(error, dispatch)
    })
    ;
};
export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string): AppThunkType =>
    (dispatch, getState: () => AppRootStateType) => {
        const state = getState();
        const task = state.tasks[todolistId].find(t => t.id === taskId);
        if (!task) {
            //throw new Error("task not found in the state");
            console.warn("task not found in the state");
            return;
        }

        const apiModel: UpdateTaskModelType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            title: task.title,
            status: task.status,
            ...domainModel
        };
        dispatch(setAppStatusAC("loading"));
        dispatch(changeTaskEntityStatusAC(todolistId, taskId, "loading"))
        todolistsAPI.updateTask(todolistId, taskId, apiModel)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(changeTaskEntityStatusAC(todolistId, taskId, "succeeded"))
                    dispatch(setAppStatusAC("succeeded"));
                    dispatch(updateTaskAC(taskId, domainModel, todolistId));
                }
                handleServerAppError(res.data, dispatch)
            }).catch(error => {
            handleServerNetworkError(error, dispatch)
        });
    };

// types
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
export type TasksStateType = {
    [key: string]: Array<TaskType>

}
export type ActionsTasksType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | ReturnType<typeof setTasksAC>
    | AppActionsType
    | ReturnType<typeof changeTodolistEntityStatusAC>
    | ReturnType<typeof changeTaskEntityStatusAC>