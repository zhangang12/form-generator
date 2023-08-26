
import { createStore } from 'vuex'

export default createStore({
    state: {
        waitReload: true
    },
    mutations: {
        reload(state, value){
            state.waitReload = value
        }
    }
})