import { useStoreState } from "easy-peasy"
import { Outlet, Navigate, useLocation } from "react-router-dom"

function RequireAuth() {
    const auth = useStoreState(state => state.auth)
    const location = useLocation()
    
    if (auth.user) {        
        return (<Outlet />)
    } else {                
        return (
            <Navigate to={'/login'} state={{ from: location }} replace />
        )
    }
}

export default RequireAuth