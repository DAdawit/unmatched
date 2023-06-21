import axios from 'axios';

const state={
    MyHarvestMemeberList:{},
    Harvestes:{},
    NumAprovedHarvest:null
}

const getters={
    harvestMemeberList:state=>state.MyHarvestMemeberList,
    harvests:state => state.Harvestes,
    numAprovedHarvest:state => state.NumAprovedHarvest
}

const actions={
    async fetchMyHarvestFromMemeber({commit}){
        await axios.get('harvest-from-members').then((res)=>{
            commit("SET_MY_HARVEST_FROM_MEMEBER", res.data)
        })
    },
    async getHarvestList({commit}){
        await axios.get('harvests').then((res)=>{
            commit('SET_HARVESTS',res.data)
            // console.log(res.data.results)
            const approvedseeds=res.data.results.filter((item)=>{
                return item.status.match("Received")
            });
            commit("SET_NUM_APPROVED_HARVEST",approvedseeds.length)
            // console.log("approvedSeedsLength",approvedseeds.length)

        })
    },
    async ApproveSeed({dispatch},data){
        // console.log(data)
        await axios.patch(`harvests/${data.id}`,data).then(()=>{
            dispatch('getHarvestList')
        })
    },
    async RejectSeed({dispatch},data){
        // console.log(data);
        await axios.patch(`harvests/${data.id}`,data).then(()=>{
            dispatch('getHarvestList')
        })
    },

}

const mutations={
    SET_MY_HARVEST_FROM_MEMEBER(state,data){
        state.MyHarvestMemeberList=data
    },
    SET_HARVESTS(state,data){
        state.Harvestes=data
    },
    SET_NUM_APPROVED_HARVEST(state,data){
        state.NumAprovedHarvest=data
    }
}

export default{
    state,getters,actions,mutations,namespaced:true
}