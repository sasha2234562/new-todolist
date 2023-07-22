import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

export type RemoveTodolistType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
export type AddTodolistType = {
    type: 'ADD-TODOLIST',
    title: string
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string
    title: string
}
export type ChangeTodolistFilterType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}

export type ActionsType =
    ChangeTodolistTitleActionType
    | RemoveTodolistType
    | AddTodolistType
    | ChangeTodolistFilterType

// меня вызовут и дадут мне стейт (почти всегда объект)
// и инструкцию (action, тоже объект)
// согласно прописанному type в этом action (инструкции) я поменяю state
export const todolistsReducer = (state: TodolistType[], action: ActionsType): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return (
                state.filter(item => item.id !== action.id)
            )
        case 'ADD-TODOLIST':
            return [...state, {id: v1(), title: action.title, filter: 'all'}]
        case 'CHANGE-TODOLIST-TITLE':
            const todolist = state.find(item => item.id === action.id);
            if (todolist) {
                todolist.title = action.title
            }
            return [...state]
        case 'CHANGE-TODOLIST-FILTER':
            const todolists = state.find(item => item.id === action.id);
            if (todolists) {
                todolists.filter = action.filter
            }
            return [...state]

        default:
            throw new Error('I don\'t understand this type')
    }
}

export const RemoveTodolistAC = (todolistId: string): RemoveTodolistType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}
export const AddTodolistAC = (newTodolistTitle: string): AddTodolistType => {
    return {
        type: 'ADD-TODOLIST',
        title: newTodolistTitle
    }
}
export  const ChangeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType =>{
    return{
        type: 'CHANGE-TODOLIST-TITLE',
        id,
        title
    }
}
export const ChangeTodolistFilter = (id: string, filter: FilterValuesType ): ChangeTodolistFilterType=> {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        id,
        filter
    }
}
