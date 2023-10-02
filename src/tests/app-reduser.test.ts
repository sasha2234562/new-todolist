import {appReducer, InitialStateType, setAppErrorAC, setAppStatusAC} from "../app/app-reduser";
import {v1} from "uuid";
import {removeTodolistAC, TodolistDomainType, todolistsReducer} from "../features/TodolistsList/todolists-reducer";


test('correct error should be sed', () => {
    const startState: InitialStateType = {
        status: 'idle',
        error: null,
        isInitialized: false
    }
    const endState = appReducer(startState, setAppErrorAC('some error'))
    expect(endState.error).toBe('some error')
})

test('correct status should be set', () => {
    const startState: InitialStateType = {
        status: 'idle',
        error: null,
        isInitialized: false
    }
    const endState = appReducer(startState, setAppStatusAC('loading'))
    expect(endState.status).toBe('loading')
})

test('correct entity status of todolist should be changed', () => {
    const todolistId1: string = v1()
    const todolistId2: string = v1()
    const startState: TodolistDomainType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'all', entityStatus: "idle", order: 0, addedDate: ""},
        {id: todolistId2, title: 'What to buy', filter: 'all', entityStatus: "idle", order: 0, addedDate: ""}
    ]
    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1));

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})