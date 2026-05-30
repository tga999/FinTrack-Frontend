import { Navigate } from 'react-router-dom'

function RutaProtegida({ children }:{children: React.ReactNode}){
    
    const token = localStorage.getItem('token')

    if (!token){
        return <Navigate to="/" />
    }
    return <>{ children }</>
}

export default RutaProtegida