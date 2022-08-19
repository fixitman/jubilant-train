import { privateAxios } from '../api/axios'
import useRefreshToken from './useRefreshToken'
import { useEffect, useState } from 'react'
import { useStoreState } from 'easy-peasy'
import axios from 'axios'

function usePrivateAxios() {
    const [aToken, setAtoken] = useState(useStoreState(state => state.auth.token))
    const refresh = useRefreshToken()


    useEffect(() => {
        const reqInt = privateAxios.interceptors.request.use(
            function (config) {
                if(!config.headers.authorization){
                    config.headers.authorization = `Bearer ${aToken}`
                    console.log('added header: ' + config.headers.authorization)  
                    return config
                }
            },
            function (error) {
                throw (error)
            }
        )

        const resInt = privateAxios.interceptors.response.use(
            (res) => res,
            async (error) => {                
                const previousRequest = error?.config
                if (error?.response?.status === 401) {
                    console.log('401')
                    if (!previousRequest.sent) {
                        previousRequest.sent = true
                        const newToken = await refresh()
                        setAtoken(newToken)
                        previousRequest.headers.authorization = `Bearer ${newToken}`
                        console.log('resending', previousRequest.headers.authorization)
                       
                        return await axios(previousRequest)
                    } else {
                        console.log('already tried once. failing')
                        throw(error)
                    }
                } else {
                    console.log('not 401', JSON.stringify(error,null,3))
                    throw(error)
                }
            }
        )

        return () => {
            privateAxios.interceptors.request.eject(reqInt);
            privateAxios.interceptors.response.eject(resInt);            
        }

    }, [aToken,refresh])



    return privateAxios
}

export default usePrivateAxios