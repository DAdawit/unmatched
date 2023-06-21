import axios from 'axios'
const state={
    My_memebers:[],
    MembersList:{},
    AllMemebers:{}
}
const getters={
    myMemebers:state=>state.My_memebers,
    membersList:state => state.MembersList,
    allMemebers:state => state.AllMemebers,
    // allBlogPosts: state => state.BlogPosts,
}
const actions={
    async addMemeber({dispatch},data){
        return await axios.post("members",data).then(()=>{
            dispatch('getMyMemebers')
        })
    },

    async getMyMemebers({commit}){
        await axios.get("my-members").then((res)=>{
            commit('SET_MY_MEMEBERS',res.data)
        })
    },
    async updateMemeberData({dispatch},memeber){
        console.log(memeber.id)
       return await axios.put(`members/${memeber.id}`,memeber).then(()=>{
            dispatch('getMyMemebers')
        })
    },

    async DeleteMemeber({dispatch},id){
       return await axios.delete(`members/${id}`).then(()=>{
            dispatch('getMyMemebers')
        })
    },
    async getMembersList({commit}){
        await axios.get('get-member-list').then((res)=>{
            commit('SET_MEMEBERS_LIST',res.data)
        })
    },
    async adminGetMembers({commit}){
        await axios.get('members').then((res)=>{
            commit('SET_MEMEBERS',res.data)
        })
    }
}
const mutations={
    SET_MY_MEMEBERS(state,data){
        state.My_memebers=data
    },
    SET_MEMEBERS_LIST(state, data){
        state.MembersList=data
    },
    SET_MEMEBERS(state, data){
        state.AllMemebers=data
    }
}
export default{
    state,getters,actions,mutations,namespaced:true
}