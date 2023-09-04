import axios from 'axios'

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '8a5c1830-8604-4983-b9a4-0d09b4b6ff34',
    },
}

export const todolistAPI = {
    updateTodolist(todolistId: string, title: string) {
        const promise = axios.put(
            `https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`,
            { title },
            settings
        )
        return promise
    },
    getTodolist(){
        const promise = axios.get(`https://social-network.samuraijs.com/api/1.1/todo-lists`,
            settings)
        return promise
    },
    deleteTodolist(todolistId: string) {
        const promise = axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, settings)
        return promise
    },
    postTodolist(title: string) {
        return axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists/', {title}, settings)
    }
}