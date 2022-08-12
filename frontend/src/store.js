import {createStore, action} from 'easy-peasy'



const store = createStore({

    error:{
        message: 'Some Message',
        setError: action((state,payload)=>{
            state.message = payload
        })
    },
    auth:{
        user:null,
        token:null,
        setToken: action((state,payload)=>{
            state.token = payload
        }),
        setUser: action((state, payload)=>{
            state.user = payload
        }),

        
    }

})

export default store;
