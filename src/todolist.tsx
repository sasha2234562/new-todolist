import {ChangeEvent, EventHandler, useState} from "react";

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
}

export const Todolist = (props: propsTypeTodolist) => {
    const {
        title,
        todoId,
        task,
        addTask
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
                return (
                    <li>
                        <input
                            type={"checkbox"}
                            checked={item.isDone}
                        />
                        <span>{item.title}</span>
                        <button>X</button>
                    </li>
                )
            })}

        </div>
    )
}