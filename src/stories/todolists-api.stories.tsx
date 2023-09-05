import React, {useEffect, useState} from 'react'
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
        const todolistId = 'dc05a722-ac4c-4b1e-8d80-dd39db8bbc15'
        tasksApi.getTasks(todolistId).then(res => setState(res.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'dc05a722-ac4c-4b1e-8d80-dd39db8bbc15'
        const taskId = ''
        tasksApi.postTask(todolistId, taskId).then(res => setState(res.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}