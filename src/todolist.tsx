import {ChangeEvent, useState} from "react";
import {EditableSpan} from "./EditableSpan";
import {AddItemForm} from "./addItemForm";
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete, Favorite, FavoriteBorder} from "@mui/icons-material";
import {filterType} from "./App";

type Tasktype = {
    title: string
    id: string
    isDone: boolean
}

type propsTypeTodolist = {
    title: string
    todoId: string
    filter: string
    task: Array<Tasktype>
    addTask: (titleInput: string, todoId: string) => void
    removeTask: (todoId: string, taskId: string) => void
    changeStatus: (todoId: string, id: string, isDone: boolean) => void
    removeTodolist: (todId: string) => void
    changeTaskTitle: (newValue: string, todoId: string, id: string) => void
    todolistTitle: (todoId: string, newValue: string) => void
    changeFilter: (filterValue:filterType, todoId: string)=> void
}

export const Todolist = (props: propsTypeTodolist) => {
    const {
        title,
        todoId,
        task,
        filter,
        addTask,
        removeTask,
        changeStatus,
        removeTodolist,
        changeTaskTitle,
        todolistTitle,
        changeFilter
    } = props

    const removeTodolistHandler = () => {
        removeTodolist(todoId)
    }
    const changeTodolistTitle = (newValue: string) => {
        todolistTitle(todoId, newValue)
    }

    const addItem = (title: string) => {
        addTask(title, todoId)
    }
    const  onClickHandlerFilter = (filterValue: filterType)=> {
        changeFilter(filterValue , todoId)
    }
    return (
        <div className={'Todolist'}>
            <div>
                <h3><EditableSpan title={title} onChange={changeTodolistTitle}/></h3>
                <Button variant="outlined" onClick={removeTodolistHandler} startIcon={<Delete />}>
                    Delete
                </Button>
            </div>
            <AddItemForm addItem={addItem}/>

            {task.map((item) => {
                const onChange = (newValue: string) => {
                    changeTaskTitle(newValue, todoId, item.id)
                }

                const onChangeHandlerChecked = (event: ChangeEvent<HTMLInputElement>) => {
                    changeStatus(todoId, item.id, event.currentTarget.checked)
                }
                const removeTasks = () => {
                    removeTask(todoId, item.id)
                }
                const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
                return (

                    <li key={item.id}>
                            <Checkbox
                            checked={item.isDone}
                            onChange={onChangeHandlerChecked}
                            icon={<FavoriteBorder
                            />} checkedIcon={<Favorite/>}/>
                            <EditableSpan title={item.title} onChange={onChange}/>
                            <IconButton aria-label="delete" size="large" onClick={removeTasks}>
                                <Delete/>
                            </IconButton>
                    </li>
                )
            })}

            <Button color={'warning'} variant={filter === 'all' ? "contained" : 'text'}  onClick={()=>onClickHandlerFilter('all')}>All</Button>
            <Button color={'primary'} variant={filter === 'active'? 'contained': 'text'} onClick={()=>onClickHandlerFilter('active')}>Active</Button>
            <Button variant={filter === 'completed'? 'contained' : 'text'} color={'secondary'} onClick={()=>onClickHandlerFilter('completed')}>Completed</Button>
        </div>
    )
}