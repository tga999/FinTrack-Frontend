import axios from 'axios'

//Instancia de axios con url base de mi API
const api = axios.create({
    baseURL: 'http://localhost:3000/api',
})

//interceptor que agrega el token a cada peticion
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
})

export default api  