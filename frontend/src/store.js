import { createStore, action, persist } from 'easy-peasy'



const store = createStore(
    {
        error: {
            message: '',
            setError: action((state, payload) => {
                state.message = payload
            })
        },
        auth: persist({
            user: null,
            token: null,
            setToken: action((state, payload) => {
                state.token = payload
            }),
            setUser: action((state, payload) => {
                state.user = payload
            }),
            logout: action((state, payload) => {
                state.user = null;
                state.token = null;
            }),
            
        })

    }
)

export default store;
