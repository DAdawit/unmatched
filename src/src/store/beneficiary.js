import axios from 'axios';
const state={
    Beneficiaries:{}
}
const getters={
    beneficiaries:state=>state.Beneficiaries
}
const actions={
    async addBeneficiary({dispatch},data){
        return await axios.post('beneficiaries',data).then(()=>{
            dispatch('getBeneficeries')
        })
    },

    async getBeneficeries({commit}){
        return await axios.get('beneficiaries').then((res)=>{
            commit('SET_BENEFICIERIES',res.data)
        })
    },
    async UpdateUserBeneficary({dispatch},data){
        return await axios.put(`beneficiaries/${data.id}`,data).then(()=>{
            dispatch('getBeneficeries')
        })
    },

    async deleteUserBeneficary({dispatch},id){
        await axios.delete(`beneficiaries/${id}`).then(()=>{
            dispatch('getBeneficeries')
        })
    }
}
const mutations={
    SET_BENEFICIERIES(state,data){
        state.Beneficiaries=data
    }
}

export default{
    state,getters,actions,mutations,namespaced:true
}