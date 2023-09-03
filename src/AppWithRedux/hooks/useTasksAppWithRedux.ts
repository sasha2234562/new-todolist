import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store";
import {useCallback} from "react";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../../state/tasks-reducer";
import {TasksStateType} from "../AppWithRedux";

export const UseTasksAppWithRedux = ()=> {
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch();

    const removeTask = useCallback(function (id: string, todolistId: string) {
        const action = removeTaskAC(id, todolistId);
        dispatch(action);
    }, [dispatch]);

    const addTask = useCallback(function (title: string, todolistId: string) {
        const action = addTaskAC(title, todolistId);
        dispatch(action);
    }, [dispatch]);

    const changeStatus = useCallback(function (id: string, isDone: boolean, todolistId: string) {
        const action = changeTaskStatusAC(id, isDone, todolistId);
        dispatch(action);
    }, [dispatch]);

    const changeTaskTitle = useCallback(function (id: string, newTitle: string, todolistId: string) {
        const action = changeTaskTitleAC(id, newTitle, todolistId);
        dispatch(action);
    }, [dispatch]);
    return{
        tasks,
        removeTask,
        addTask,
        changeStatus,
        changeTaskTitle
    }
}