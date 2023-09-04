import axios from 'axios'

const instans = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists/',
    withCredentials: true,
    headers: {
        'API-KEY': '8a5c1830-8604-4983-b9a4-0d09b4b6ff34'
    }
})
export const todolistAPI = {
    updateTodolist(todolistId: string, title: string) {
        return instans.put(`/${todolistId}`,
            {title}
        )
    },
    getTodolist() {
        return instans.get('')

    },
    deleteTodolist(todolistId: string) {
        return instans.delete(`${todolistId}`)
    },
    postTodolist(title: string) {
        return instans.post('', {title})
    }
}