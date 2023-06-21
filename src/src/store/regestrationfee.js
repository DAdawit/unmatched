import axios from "axios"

const state = {
    RegistraitonFees: {}
}

const getters = {
    registrationFees: state => state.RegistraitonFees
}

const actions = {
    async getRegistrationFees({
        commit
    }) {
        await axios.get('registeration-fees').then((res) => {
            commit('SET_REGISTRAITON_FEES', res.data)
        })
    },
    async payRegistrationFee(_, data) {
         await axios.post('registeration-fees',data).then(() => {
            return dispatch('getRegistrationFees')
        })
    },

    async approveRegFee({dispatch},data) {
        axios.patch(`registeration-fees/${data.id}`).then((res) => {
            console.log(res.data)
            dispatch('getRegistrationFees')
        })
    },
    async changeStatus({
        dispatch
    }, data) {
       return axios.patch(`registeration-fees/${data.id}`).then((res) => {
            console.log(res.data)
            dispatch('getRegistrationFees')
        })
    }
}

const mutations = {
    SET_REGISTRAITON_FEES(state, data) {
        state.RegistraitonFees = data
    }
}

export default {
    state,
    getters,
    actions,
    mutations,
    namespaced: true
}