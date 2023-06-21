import axios from 'axios'
 
const state={
    ACCOUNT_STATUS_REPORT:{},
    AccountStatusReport:{},
    MembersInPercent:{},
    LatestTransactions:{},
    Gifts:{},
}

const getters={
    accountStatusReport:state=>state.ACCOUNT_STATUS_REPORT,
    AccountStatusReport:state=>state.AccountStatusReport,
    MembersInPercent:state=>state.MembersInPercent,
    LatestTransactions:state=>state.LatestTransactions,
    gifts:state=>state.Gifts,
}

const actions={
    async get_account_statutory_report({commit}){
        await axios.get('stastics/account-statutory-report').then((res)=>{
            commit('SET_ACCOUNT_STATUS_REPORT',res.data)
            // console.log(res.data)
        })
    },

    async get_stastics_members({commit}){
        await axios.get('stastics/members').then((res)=>{
            // console.log(res.data)
            commit('SET_STATICS_MEMBERS',res.data)
        })
    },

    async get_members_in_percent({commit}){
        await axios.get('stastics/members-in-percent').then((res)=>{
            commit('SET_MEMBERS_IN_PERCENT',res.data)
        })
    },

    async get_latest_transactions({commit}){
        await axios.get('stastics/latest-transactions').then((res)=>{
            commit('SET_LATEST_TRANSACTIONS',res.data)
        })
    },

    async get_stastics_gifts({commit}){
        await axios.get('stastics/gifts').then((res)=>{
            commit('SET_GIFTS',res.data)
        })
    },
}

const mutations={
    SET_ACCOUNT_STATUS_REPORT(state,data){
        state.ACCOUNT_STATUS_REPORT=data
    },
    SET_STATICS_MEMBERS(state,data){
        state.AccountStatusReport=data
    },
    SET_MEMBERS_IN_PERCENT(state,data){
        state.MembersInPercent=data
    },
    SET_LATEST_TRANSACTIONS(state,data){
        state.LatestTransactions=data
    },
    SET_GIFTS(state,data){
        state.Gifts=data
    },
}


export default{
    state,getters,actions,mutations,namespaced:true
}