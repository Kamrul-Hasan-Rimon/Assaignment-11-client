import axios from 'axios'
import { useContext, useEffect } from 'react'
import { AuthContext } from '../components/context/AuthProvider'
import { useNavigate } from 'react-router-dom'
export const myaxios = axios.create({
    baseURL: import.meta.env.VITE_API,
    withCredentials: true,
})


export const useAxiosSecure = () => {
    const { logout } = useContext(AuthContext)
    const navigate = useNavigate()
    useEffect(() => {
        myaxios.interceptors.response.use(
            res => {
                return res
            },
            async error => {
                console.log('error cougth from our very own axios interceptors-->', error.response)
                if (error.response.status === 401 || error.response.status === 403) {
                    logout()
                    navigate('/login')

                }
            }

        )
    }, [logout, navigate])
    return myaxios;
}