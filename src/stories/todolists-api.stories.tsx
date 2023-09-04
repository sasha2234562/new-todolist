import React, {useEffect, useState} from 'react'
import axios from "axios";

export default {
    title: 'API'
}

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '8a5c1830-8604-4983-b9a4-0d09b4b6ff34'
    }
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
            .then(resolve=> setState(resolve.data))

    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists',{title: 'New Todolist'}, settings)
            .then(resolve=> setState(resolve.data))
        axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists',{title: 'New Todolist Two'}, settings)
            .then(resolve=> setState(resolve.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        axios.delete('https://social-network.samuraijs.com/api/1.1/todo-lists/1b54d308-cdcf-41e0-888c-9af0566ff3d0', settings)
            .then(resolve=> setState(resolve.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        axios.put('https://social-network.samuraijs.com/api/1.1/todo-lists/9fe3f4dd-f2dd-47a4-b430-af2be7081bc5',{title: 'New Todolist Last'}, settings)
            .then(resolve=> setState(resolve.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

