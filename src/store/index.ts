import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        showAddDialog: false
    },
    mutations: {
        setShowAddDialog(state, value: boolean)
        {
            state.showAddDialog = value;
        }
    },
    actions: {
    },
    modules: {
    }
})
