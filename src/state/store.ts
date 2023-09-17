import {ActionsType as TasksActionsType, tasksReducer} from './tasks-reducer';
import {ActionsType as TodolistsActionsType, todolistsReducer} from './todolists-reducer';
import {applyMiddleware, combineReducers, createStore, legacy_createStore} from 'redux';
import { useDispatch } from 'react-redux';
import thunk, {ThunkDispatch} from "redux-thunk";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})
const middlewareEnhancer = applyMiddleware(thunk)

// непосредственно создаём store
export const store = legacy_createStore(rootReducer, middlewareEnhancer);
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>
type AppDispatch = ThunkDispatch<AppRootStateType, unknown, TodolistsActionsType | TasksActionsType>
export const useAppDispatch = () => useDispatch<AppDispatch>()
// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;
