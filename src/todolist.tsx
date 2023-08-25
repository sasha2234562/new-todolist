import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './AppWithRedux';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import IconButton from "@mui/material/IconButton/IconButton";
import {Delete} from "@mui/icons-material";
import {Button, Checkbox} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {AppRoorStateType} from "./state/store";
import {TasksStateType, TodolistType} from "./AppWithRedux";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./state/todolists-reducer";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    // removeTask: (taskId: string, todolistId: string) => void
    // changeFilter: (value: FilterValuesType, todolistId: string) => void
    // addTask: (title: string, todolistId: string) => void
    // changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    // removeTodolist: (id: string) => void
    // changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType
    // changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}

export function Todolist(props: PropsType) {

    const todolists =  useSelector<AppRoorStateType, Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<AppRoorStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()


    const addTask = (title: string) => {
        dispatch(addTaskAC(title, props.id))
    }

    const removeTodolist = () => {
        dispatch(removeTodolistAC(props.id))
    }
    const changeTodolistTitle = (title: string) => {
        dispatch(changeTodolistTitleAC(props.id, title))
    }

    // const onAllClickHandler = () => props.changeFilter("all", props.id);
    // const onActiveClickHandler = () => props.changeFilter("active", props.id);
    // const onCompletedClickHandler = () => props.changeFilter("completed", props.id);
    function changeFilter(value: FilterValuesType, todolistId: string) {
        dispatch(changeTodolistFilterAC(todolistId, value))
    }
    return <div>
        <h3> <EditableSpan value={props.title} onChange={changeTodolistTitle} />
            <IconButton onClick={removeTodolist}>
                <Delete />
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => dispatch(removeTaskAC(t.id,props.id))
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        dispatch(changeTaskStatusAC(t.id, e.currentTarget.checked, props.id))
                    }
                    const onTitleChangeHandler = (newValue: string) => {
                        dispatch(changeTaskTitleAC(t.id, newValue, props.id))
                    }


                    return <div key={t.id} className={t.isDone ? "is-done" : ""}>
                        <Checkbox
                            checked={t.isDone}
                            color="primary"
                            onChange={onChangeHandler}
                        />

                        <EditableSpan value={t.title} onChange={onTitleChangeHandler} />
                        <IconButton onClick={onClickHandler}>
                            <Delete />
                        </IconButton>
                    </div>
                })
            }
        </div>
        <div>
            <Button variant={props.filter === 'all' ? 'outlined' : 'text'}
                    onClick={()=> changeFilter('all', props.id)}
                    color={'inherit'}
            >All
            </Button>
            <Button variant={props.filter === 'active' ? 'outlined' : 'text'}
                    onClick={()=> changeFilter('active', props.id)}
                    color={'primary'}>Active
            </Button>
            <Button variant={props.filter === 'completed' ? 'outlined' : 'text'}
                    onClick={()=> changeFilter('completed', props.id)}
                    color={'secondary'}>Completed
            </Button>
        </div>
    </div>
}


