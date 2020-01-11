import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        showAddDialog: false,
        showRunDialog: false
    },
    mutations: {
        setShowAddDialog(state, value: boolean)
        {
            state.showAddDialog = value;
        },
        setShowRunDialog(state, value: boolean)
        {
            state.showRunDialog = value;
        }
    },
    actions: {
        loadExample(payload: any)
        {
            
        }
    },
    modules: {
    }
})
