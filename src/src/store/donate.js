import axios from 'axios';

const state={
    Donations:{},
    Admin:{},
    AllDonations:{},
    AdminDonations:{}
}

const getters = {
    admin:state=>state.Admin,
    donations:state=>state.Donations,
    allDonations:state=>state.AllDonations,
    adminDonation:state=>state.AdminDonations
}

const actions = {
    async getAdmin({commit}){
       await axios.get('get-admin').then((res)=>{
           commit('SET_ADMIN',res.data[0])
        //    console.log(res.data[0])
       })
    },
    async AllDonations({commit}){
        await axios.get('donations').then((res)=>{
            commit('SET_ALL_DONATIONS',res.data)
        })
    },

    async Donate({dispatch},data){
       return await axios.post('charity-donation-transactions',data).then(()=>{
           dispatch('getDonations')
       })
    },
    async deleteDonation({dispatch},id){
        return await axios.delete(`charity-donation-transactions/${id}`).then(()=>{
            dispatch('getDonations')
        })
    },
    async updateDonation({dispatch},data){
        return await axios.patch(`charity-donation-transactions/${data.id}`,data).then(()=>{
            dispatch('getDonations')
        })
    },
    async updateDonationWithImage({dispatch},data){
        return await axios.patch(`charity-donation-transactions/${data.get('id')}`,data).then(()=>{
            dispatch('getDonations')
        })
    },
    async Admindonations({commit}){
        await axios.get('donations').then((res)=>{
            commit('SET_DONATIONS',res.data)
        })
    }


}

const mutations={
    SET_DONATION_TRANSACTIONS(state, data){
        state.Donations=data
    },
    SET_ADMIN(state,data){
        state.Admin=data
    },
    SET_ALL_DONATIONS(state,data){
        state.AllDonations=data
    },
    SET_DONATIONS(state, data){
        state.AdminDonations=data
    }
}

export default{
    state,getters,actions,mutations,namespaced:true
}