import axios from 'axios'
import { parseCookies } from 'nookies'
import getToken from 'next-auth'

const secret = process.env.JWT_SECRET

export function apiClient(ctx?: any) {
    
    // const { 'next-auth.session-token': token } = parseCookies(ctx)

    const api = axios.create({
        baseURL: 'http://192.168.1.105:3333',
        // withCredentials: true
    })

    api.interceptors.response.use(response => {
        return response
    }, error => {
        const { status } = error.response
        if (status === 401) {
            console.log(error.response)
            return location.href = '/'
        }
        
        return Promise.reject(error)
    })
    
    // if (token) {
    //     api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    // }

    return api;
}