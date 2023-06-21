import axios from 'axios';

const state={
    Transactions:{}
}

const getters = {
    transactions:state=>state.Transactions,
}

const actions = {
    async get_transactions({commit}){
        await axios.get('transactions').then((res)=>{
            commit('SET_TRANSACTIONS',res.data)
        })
    }
}

const mutations={
    SET_TRANSACTIONS(state,data){
        state.Transactions = data
    }
}

export default{
    state,getters,actions,mutations,namespaced:true
}