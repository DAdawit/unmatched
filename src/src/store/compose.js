import axios from 'axios';

const state = {
    AccountDeleteMessages: {},
    EmailPhoneCorrections: {},
    AccountSwapMessages: {},
    OtherMessage: {},
    EmailAndPhoneCorrectionMessage: {},
    SwapAccountMessage: {},
}
const getters = {
    accountDeleteMessages: state => state.AccountDeleteMessages,
    emailPhoneCorrections: state => state.EmailPhoneCorrections,
    accountSwapMessages: state => state.AccountSwapMessages,
    otherMessage: state => state.OtherMessage,
    emailAndPhoneCorrectionMessage: state => state.EmailAndPhoneCorrectionMessage,
    swapAccountMessage: state => state.SwapAccountMessage

}

const actions = {
    async AcountSwap(_, data) {
        // console.log(data)
        return await axios.post('acount-swaps', data)
    },

    async DeleteAcount(_, data) {
        // console.log(data)
        return await axios.post('account-deletions', data)
    },

    async EmailPhoneCorrection(_, data) {
        // console.log(data)
        return await axios.post('email-phone-corrections', data)
    },

    async GetAcountSwap({
        commit
    }) {
        await axios.get('acount-swaps').then((res) => {
            commit('SET_ACCOUNT_SWAP_MESSAGES', res.data)
        })
    },
    async GetDeleteAccounts({
        commit
    }) {
        await axios.get('account-deletions').then((res) => {
            commit('SET_ACCOUNT_DELETE_MESSAGES', res.data)
        })
    },
    async GetEmailPhoneCorrections({
        commit
    }) {
        await axios.get('email-phone-corrections').then((res) => {
            commit('SET_EMAIL_PHONE_CORRECTION_MESSAGGES', res.data)
        })
    },
    async getEmailPhoneCorrectionMessage({
        commit
    }, id) {
        await axios.get(`email-phone-corrections/${id}`).then((res) => {
            commit('SET_EMAIL_PHONE_CORRECTION_MESSAGE', res.data)
        })
    },
    async getSwapAccountMessage({
        commit
    }, id) {
        await axios.get(`acount-swaps/${id}`).then((res) => {
            commit('SET_ACCOUNT_SWAP_MESSAGE', res.data)
        })
    },
    async getOtherMessage({
        commit
    }, id) {
        await axios.get(`account-deletions/${id}`).then((res) => {
            // console.log(res.data)
            commit('SET_OTHER_MESSAGE', res.data)
        })
    },


    async UpdateAcountSwap({
        dispatch
    }, data) {
        await axios.patch(`acount-swaps/${data.id}`,data).then(() => {
            dispatch('getSwapAccountMessage',data.id)
        })
    },
    async UpdateDeleteAccounts({
        dispatch
    }, data) {
        // console.log(data)
        await axios.patch(`account-deletions/${data.id}`, data).then(() => {
            dispatch('getOtherMessage', data.id)
        })
    },

    async UpdateEmailPhoneCorrections({
        dispatch
    }, data) {
        return await axios.patch(`email-phone-corrections/${data.id}`, data).then(() => {
            dispatch('getEmailPhoneCorrectionMessage', data.id)
        })
    },


    async DeleteEmailChangeMessage(_, id) {
        return await axios.delete(`email-phone-corrections/${id}`)
    },
    async DeleteSwapMessage(_, id) {
        return await axios.delete(`acount-swaps/${id}`)
    },
    async DeleteAccountAndOtherMessage(_, id) {
        return await axios.delete(`account-deletions/${id}`)
    },
    // RepalayMessage

    async RepalayMessage(_, data) {
        return await axios.post('account-deletions', data)
    }
}

const mutations = {
    SET_ACCOUNT_DELETE_MESSAGES(state, data) {
        state.AccountDeleteMessages = data
    },
    SET_EMAIL_PHONE_CORRECTION_MESSAGGES(state, data) {
        state.EmailPhoneCorrections = data
    },
    SET_ACCOUNT_SWAP_MESSAGES(state, data) {
        state.AccountSwapMessages = data
    },
    SET_OTHER_MESSAGE(state, data) {
        state.OtherMessage = data
    },
    SET_EMAIL_PHONE_CORRECTION_MESSAGE(state, data) {
        state.EmailAndPhoneCorrectionMessage = data
    },
    SET_ACCOUNT_SWAP_MESSAGE(state, data) {
        state.SwapAccountMessage = data
    }
}

export default {
    state,
    getters,
    actions,
    mutations,
    namespaced: true
}