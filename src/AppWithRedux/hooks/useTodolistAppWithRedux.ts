import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store";
import {FilterValuesType, TodolistType} from "../AppWithRedux";
import {useCallback} from "react";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC
} from "../../state/todolists-reducer";

export const useTodolistAppWithRedux = ()=> {

    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    const dispatch = useDispatch();

    const changeFilter = useCallback(function (value: FilterValuesType, todolistId: string) {
        const action = changeTodolistFilterAC(todolistId, value);
        dispatch(action);
    }, [dispatch]);

    const removeTodolist = useCallback(function (id: string) {
        const action = removeTodolistAC(id);
        dispatch(action);
    }, [dispatch]);

    const changeTodolistTitle = useCallback((id: string, title: string) => {
        const action = changeTodolistTitleAC(id, title);
        dispatch(action);
    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        const action = addTodolistAC(title);
        dispatch(action);
    }, [dispatch]);

    return{
        todolists,
        changeFilter,
        removeTodolist,
        changeTodolistTitle,
        addTodolist
    }
}
