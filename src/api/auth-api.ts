import axios from "axios";


const instanse = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '8a5c1830-8604-4983-b9a4-0d09b4b6ff34'
    }
})

export const authAPI = {
    login(value: authLogin) {
        return instanse.post('/auth/login', value)
    },
    isAuth() {
      return   instanse.get('/auth/me')
    }
}

export type authLogin = {
    values: {
        email: string
        password: string
        rememberMe: boolean
    }
}