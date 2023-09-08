import React, {ChangeEvent, useEffect, useState} from 'react'
import {todolistAPI} from "../api/todolist-api";
import {tasksApi} from "../api/tasks-api";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolist()
            .then(resolve => setState(resolve.data))

    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.postTodolist('New Todolist')
            .then(resolve => {
                setState(resolve.data)
            })
        todolistAPI.postTodolist('New Todolist 2').then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '5fb9e60b-8c24-42f7-8d75-606ad274922c'
        todolistAPI.deleteTodolist(todolistId)
            .then(resolve => {
                setState(resolve.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId: string = '9fe3f4dd-f2dd-47a4-b430-af2be7081bc5'
        const title: string = 'New Todolist Last'
        todolistAPI.updateTodolist(todolistId, title)
            .then(resolve => setState(resolve.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '976dc380-75e9-419d-8b91-cc7ffa0f42ea'
        tasksApi.getTasks(todolistId).then(res => setState(res.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState('')
    const [title, setTitle] = useState('')
    const onChangeTaskId = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value)
    }
    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onClickHandler = () => {
        tasksApi.postTask(todolistId, title).then(res => setState(res.data))
    }
    return <div>
        <div><input placeholder={'todolist-id'} type="text" onChange={onChangeTaskId}/></div>
        <div><input placeholder={'title'} type="text" onChange={onChangeTitle}/></div>
        <button onClick={onClickHandler}>create</button>
        <div>{state && JSON.stringify(state)}</div>
    </div>
}
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "dc05a722-ac4c-4b1e-8d80-dd39db8bbc15"
        const taskId = "eb205e1b-f557-4f91-b677-7dd3641317e2"
        tasksApi.instansTask(todolistId, taskId).then(res => setState(res.data))
    }, []);
    return <div>{state && JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState('')
    const [taskId, setTaskId] = useState('')
    const onClickHandler = () => {
        tasksApi.deleteTask(todolistId, taskId).then(res => setState(res.data))
    }
    const onChangeTodolistHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value)
    }
    const onChangeTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskId(e.currentTarget.value)
    }
    return <div>
        <div><input placeholder={'todolistId'} type="text" onChange={onChangeTodolistHandler}/></div>
        <div><input placeholder={'taskId'} type="text" onChange={onChangeTaskHandler}/></div>
        <div>
            <button onClick={onClickHandler}>Delete</button>
        </div>
        {state && JSON.stringify(state)}
    </div>
}