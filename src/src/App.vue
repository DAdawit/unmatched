<template>
  <v-app>
    <!-- <Nav v-if="token"></Nav> -->
    <Nav></Nav>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
  <!-- Invalid or inactive token -->
  <!-- redietbekana2021@gmail.com -->
  <!-- https://ekub.herokuapp.com/docs/ -->
</template>

<script>
/* eslint-disable */
// import {mapGetters} from 'vuex'
import Nav from "./components/Nav/Nav.vue";
export default {
  name: "App",
  token: null,
  components: {
    Nav
  },
  data: () => ({
    authenticated: true,
    user: localStorage.getItem("user")
  }),
  created() {
    if (localStorage.getItem("token")) {
      this.token = true;
    } else {
      this.token = false;
    }
  }
};
</script>
