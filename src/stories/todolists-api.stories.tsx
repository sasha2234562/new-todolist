import React, {useEffect, useState} from 'react'
import axios from "axios";
import {todolistAPI} from "../api/todolist-api";

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
        todolistAPI.getTodolist()
            .then(resolve => setState(resolve.data))

    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.postTodolist('New Todolist')
            .then(resolve => setState(resolve.data))
        todolistAPI.postTodolist('New Todolist 2').then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '1b54d308-cdcf-41e0-888c-9af0566ff3d0'
        todolistAPI.deleteTodolist(todolistId)
            .then(resolve => setState(resolve.data))
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

