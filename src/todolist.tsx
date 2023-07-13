import {ChangeEvent, useState} from "react";
import {EditableSpan} from "./EditableSpan";
import {AddItemForm} from "./addItemForm";

type Tasktype = {
    title: string
    id: string
    isDone: boolean
}

type propsTypeTodolist = {
    title: string
    todoId: string
    task: Array<Tasktype>
    addTask: (titleInput: string, todoId: string) => void
    removeTask: (todoId: string, taskId: string) => void
    changeStatus: (todoId: string, id: string, isDone: boolean) => void
    removeTodolist: (todId: string) => void
    changeTaskTitle: (newValue: string, todoId: string, id: string) => void
    todolistTitle: (todoId: string, newValue: string) => void
}

export const Todolist = (props: propsTypeTodolist) => {
    const {
        title,
        todoId,
        task,
        addTask,
        removeTask,
        changeStatus,
        removeTodolist,
        changeTaskTitle,
        todolistTitle
    } = props

    const removeTodolistHandler = () => {
        removeTodolist(todoId)
    }
    const changeTodolistTitle = (newValue: string) => {
        todolistTitle(todoId, newValue)
    }

const addItem= (title: string)=> {
        addTask(title, todoId)
}
    return (
        <div className={'Todolist'}>
            <div>
                <h3><EditableSpan title={title} onChange={changeTodolistTitle}/></h3>
                <button onClick={removeTodolistHandler}>x</button>
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
                return (
                    <li key={item.id}>
                        <input
                            type={"checkbox"}
                            checked={item.isDone}
                            onChange={onChangeHandlerChecked}
                        />
                        <EditableSpan title={item.title} onChange={onChange}/>
                        <button onClick={removeTasks}>X</button>
                    </li>
                )
            })}

        </div>
    )
}