import axios from 'axios'

const state = {
    Seeds: {},
    SeedToMemeber: {},
    SeedTimeLeft: [],
    Exp_y_m_d: [],
    Exp_h_m_s: [],
    MyApprovedSeeds: 0,
    SeedToMemeberLength: 0,
    ApprovedSeeds: {},
    PendingSeeds: {},
    RejectedSeeds: {},
    Seed:{}

}
const getters = {
    seedToMemeber: state => state.SeedToMemeber,
    seeds: state => state.Seeds,
    seedTimeLeft: state => state.SeedTimeLeft,
    myApprovedSeeds: state => state.MyApprovedSeeds,
    seedToMemeberLength: state => state.SeedToMemeberLength,
    approvedSeeds:state => state.ApprovedSeeds,
    pendingSeeds:state => state.PendingSeeds,
    rejectedSeeds:state => state.RejectedSeeds,
    seed:state=>state.Seed


}
const actions = {
    async seed_to_memeber({
        commit
    }) {
        await axios.get('seed-to-member').then((res) => {
            commit("SET_SEED_TO_MEMEBER", res.data.data)
            const length = Object.keys(res.data.data).length
            // console.log('length',length)
            commit('SET_SEED_TO_MEMEBER_LENGTH',length)


            const seedTimeLeft = res.data.seed_time_left;
            let seedT = seedTimeLeft.split("-")
            commit("SET_SEED_TIME_LEFT", seedT)
        })
    },
    async getSeeds({
        commit
    }) {
        return await axios.get('seeds').then((res) => {
            commit("SET_SEEDS", res.data)
            const myapprovedSeeds = res.data.results.filter((item) => {
                return item.status.match("Received")
            })
            // approved seeds
            commit('SET_APPROVED_SEEDS', myapprovedSeeds)
            commit('SET_MY_APPROVED_SEEDS_LENGTH', myapprovedSeeds.length)

            // pendingSeeds
            const pendingSeeds = res.data.results.fileter((item) => {
                return item.status.match("Pending")
            })
            console.log('pending seeds'+pendingSeeds)
            commit('SET_PENDING_SEEDS', pendingSeeds)
            
            const rejectedSeeds = res.data.results.fileter((item) => {
                return item.status.match("Rejected")
            })
            commit('SET_REJECTED_SEEDS', rejectedSeeds)

        })
    },
    async getSeed({commit},id){
        await axios.get(`seeds/${id}`).then((res)=>{
            // console.log(res.data)
            commit('SET_SEED',res.data)
        })
    },
    async saveSeed({
        dispatch
    }, data) {
        return await axios.post('seeds', data).then(() => {
            dispatch('getSeeds')
        })
    },

    async deleteMySeed({
        dispatch
    }, id) {
        await axios.delete(`seeds/${id}`).then(() => {
            dispatch('getSeeds')
        })
    },

    async editSeed({
        dispatch
    }, data) {
        await axios.patch(`seeds/${data.id}`, data).then(() => {
            dispatch('getSeeds')
        })
    },
    async editSeedWithImage({
        dispatch
    }, data) {
        await axios.patch(`seeds/${data.get('id')}`, data).then(() => {
            dispatch('getSeeds')
        })
    },
   
}

const mutations = {
    SET_SEEDS(state, data) {
        state.Seeds = data
    },
    SET_SEED_TO_MEMEBER(state, data) {
        state.SeedToMemeber = data
    },
    SET_SEED_TIME_LEFT(state, data) {
        state.SeedTimeLeft = data
    },
    SET_MY_APPROVED_SEEDS_LENGTH(state, data) {
        state.MyApprovedSeeds = data
    },
    SET_SEED_TO_MEMEBER_LENGTH(state, data) {
        state.SeedToMemeberLength = data
    },
    SET_APPROVED_SEEDS(state, data) {
        state.ApprovedSeeds = data
    },
    SET_PENDING_SEEDS(state, data) {
        state.PendingSeeds = data
    },
    SET_REJECTED_SEEDS(state, data) {
        state.RejectedSeeds = data
    },
    SET_SEED(state,data){
        state.Seed=data
    }

}

export default {
    state,
    getters,
    actions,
    mutations,
    namespaced: true
}