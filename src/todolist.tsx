import {ChangeEvent, useState} from "react";

type Tasktype = {
    title: string
    id: string
    isDone: boolean
}
type propsTypeTodolist = {
    title: string
    todoId: string
    task: Array<Tasktype>
    addTask: (titleInput:string, todoId: string)=>void
    removeTask: (todoId: string, taskId: string)=>void
    changeStatus: (todoId: string, id: string, isDone: boolean)=>void
}

export const Todolist = (props: propsTypeTodolist) => {
    const {
        title,
        todoId,
        task,
        addTask,
        removeTask,
        changeStatus
    } = props


    let [titleInput, setTitleInput]= useState('')
    const onChangeHandler= (e: ChangeEvent<HTMLInputElement>)=> {
        setTitleInput(e.currentTarget.value)
    }
    const onClickHadler = ()=> {
        addTask(titleInput, todoId)
        setTitleInput('')
    }

    return (
        <div className={'Todolist'}>
            <h3>{title}</h3>
            <input value={titleInput} onChange={onChangeHandler}/>
            <button onClick={onClickHadler}>+</button>

            {task.map((item) => {

                const onChangeHandlerChecked= (event: ChangeEvent<HTMLInputElement>)=> {
                    changeStatus(todoId, item.id, event.currentTarget.checked)
                }
                return (
                    <li key={item.id}>
                        <input
                            type={"checkbox"}
                            checked={item.isDone}
                            onChange={onChangeHandlerChecked}
                        />
                        <span>{item.title}</span>
                        <button onClick={()=>removeTask(todoId, item.id)}>X</button>
                    </li>
                )
            })}

        </div>
    )
}