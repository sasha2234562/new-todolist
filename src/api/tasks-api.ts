import axios from "axios";


const instans = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists/',
    withCredentials: true,
    headers: {
        'API-KEY': '8a5c1830-8604-4983-b9a4-0d09b4b6ff34'
    }
})
type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
type ModelType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    order: number
    addedDate: string
    deadline: string
}
type GetTaskResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}
export const tasksApi = {
    getTasks(todolistId: string) {
        return instans.get<GetTaskResponse>(`${todolistId}/tasks`)
    },
    postTask(todolistId: string, title: string) {
        return instans.post(`${todolistId}/tasks/`, {title: title})
    },
    instansTask(todolistId: string, taskId: string, model:ModelType) {
        return instans.put(`${todolistId}/tasks/${taskId}`, model)
    },
    deleteTask(todolistId: string, taskId: string) {
        return instans.delete(`${todolistId}/tasks/${taskId}`)
    }
}