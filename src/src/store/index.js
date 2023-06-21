import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth/auth'
import memeber from './memebers.js'
import beneficiary from './beneficiary'
import seed from './seed.js'
import harvest from './harvest.js'
import stat from './stat.js'
import transaction from './transaction'
import donate from './donate'
import compose from './compose'
import advert from './advert'
import registerationfee from './regestrationfee'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,memeber,beneficiary,advert,seed,harvest,stat,transaction,donate,compose,registerationfee
  }
})
