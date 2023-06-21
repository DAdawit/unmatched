// dev
// const axiosinstance = axios.create({
//     baseURL:  "https://devapi.yefikrmead.com/"
// });

// production
const axiosinstance = axios.create({
  baseURL: "https://api.yefikrmead.com",
});

import router from "../../router/index";
import axios from "axios";

const state = {
  token: null,
  User: null,
  PaymentType: [],
  UserProfile: {},
};

const getters = {
  user: (state) => state.User,
  paymentType: (state) => state.PaymentType,
  userProfile: (state) => state.UserProfile,
  token: (state) => state.token,
};

const actions = {
  async loginUser({ commit }, user) {
    return await axiosinstance.post("signin", user).then((res) => {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Token ${localStorage.getItem("token")}`;
      commit("SET_TOKEN", res.data.results.token);
      commit("SET_USER", res.data.results);
      localStorage.setItem("token", res.data.results.token);
      localStorage.setItem("id", res.data.results.id);
    });
  },
  async ChangePassword(_, data) {
    return await axios.patch("/change-password", data);
  },
  async attempt({ commit, state }, token) {
    if (token) {
      commit("SET_TOKEN", token);
    }
    if (!state.token) {
      return;
    }
    try {
      let response = await axios.get("verify-token");
      commit("SET_USER", response.data);
    } catch (e) {
      commit("SET_TOKEN", null);
      commit("SET_USER", null);
      localStorage.removeItem("token");
      router.push("login");
    }
  },

  async getPayments({ commit }) {
    await axios.get("payment-types").then((res) => {
      // console.log(res.data.results)
      commit("SET_PAYMENT_TYPE", res.data.results);
    });
  },

  async saveUserProfile(_, data) {
    // console.log(data)
    return await axios.post("user-profile-add", data).then(() => {
      // console.log(res.data)
    });
  },

  async getUserProfile({ commit }, user_id) {
    await axios.get(`/user-profile-by-user/${user_id}`).then((res) => {
      commit("SET_USER_PROFILE", res.data);
    });
  },
  async updateUserProfile({ dispatch }, data) {
    await axios.patch("/user-profile-rud", data).then(() => {
      // console.log(res.data)
      dispatch("getUserProfile", localStorage.getItem("id"));
    });
  },

  async resetPassword(_, data) {
    // alert('reset')
    console.log(data);
    return await axios.put("reset-password", data);
  },
  async forgetPassword(_, data) {
    // alert('reset')
    // console.log(data)
    return await axiosinstance.put("reset-password", data);
  },
};

const mutations = {
  SET_TOKEN(state, data) {
    state.token = data;
  },
  SET_USER(state, data) {
    state.User = data;
  },
  SET_PAYMENT_TYPE(state, data) {
    state.PaymentType = data;
  },
  SET_USER_PROFILE(state, data) {
    state.UserProfile = data;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
};
