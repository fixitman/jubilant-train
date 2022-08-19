import axios from '../api/axios'
import {useStoreActions} from 'easy-peasy'



const useRefreshToken = () => {
    
    const setToken = useStoreActions(state => state.auth.setToken)
    const refresh = async () => {
        const response = await axios.get('/auth/refresh', {withCredentials: true})
        const newAccesstoken = response.data.accessToken   
        setToken(newAccesstoken)
        return newAccesstoken
    }

    return refresh
  
}

export default useRefreshToken