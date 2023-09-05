import axios from "axios";


const instans = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists/',
    withCredentials: true,
    headers: {
        'API-KEY': '8a5c1830-8604-4983-b9a4-0d09b4b6ff34'
    }
})

export const tasksApi = {
    getTasks (todolistId: string) {
        return instans.get(`${todolistId}/tasks`)
    },
    postTask(todolistId: string, taskId: string) {
        return instans.put(`${todolistId}/tasks/${taskId}`)
    }
}