<template>
  <div>
    <v-img id="bg" class="d-flex align-center mb-10" src="/banner1.jpg">
      <div class="d-flex justify-center">
        <ValidationObserver v-slot="{ handleSubmit }">
          <form @submit.prevent="handleSubmit(login)">
            <v-card max-width="500" class="mb-15 pb-15">
              <!-- <v-col cols="10"> -->
              <!-- <p class="body-2 text-center pt-2">
                    visit our company website <a href="https://yefikirmaed.com/" target="_blank">yefikirmaed</a>.
                  </p> -->
              <!-- </v-col> -->
              <v-row class="d-flex justify-center">
                <v-col cols="10">
                  <v-card-title class="d-flex justify-center"
                    >የፍቅር መዓድ</v-card-title
                  >
                  <ValidationProvider
                    rules="required"
                    name="email"
                    v-slot="{ errors }"
                  >
                    <v-text-field
                      prepend-inner-icon="email"
                      placeholder="E-mail"
                      dense
                      outlined
                      v-model="user.email"
                      :error="errors.length > 0"
                      :error-messages="errors[0]"
                    ></v-text-field>
                  </ValidationProvider>
                  <ValidationProvider
                    rules="required"
                    name="password"
                    v-slot="{ errors }"
                  >
                    <v-text-field
                      prepend-inner-icon="lock"
                      placeholder="password"
                      dense
                      outlined
                      :type="show1 ? 'text' : 'password'"
                      v-model="user.password"
                      :error="errors.length > 0"
                      :error-messages="errors[0]"
                      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                      @click:append="show1 = !show1"
                    >
                    </v-text-field>
                  </ValidationProvider>
                  <router-link to="/forgetPassword" class="d-flex justify-end"
                    >forget password?</router-link
                  >
                </v-col>

                <small class="red--text" small> {{ error }}</small>
                <v-col cols="10">
                  <v-btn block class="primary" type="submit" :loading="loading"
                    >login</v-btn
                  >
                </v-col>
              </v-row>
            </v-card>
          </form>
        </ValidationObserver>
      </div>
    </v-img>
  </div>
</template>
<script>
import router from "../../router/index";
import axios from "axios";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      loading: false,
      error: "",
      show1: false,
      user: {
        email: "",
        password: "",
      },
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({
      loginUser: "auth/loginUser",
    }),

    login() {
      this.loading = true;
      this.loginUser(this.user)
        .then(() => {
          axios.defaults.headers.common[
            "Authorization"
          ] = `Token ${localStorage.getItem("token")}`;
          this.loading = false;
          // console.log(res)
          router.push("/app/dashboard");
          // store.commite('auth/SET_USER')
          // window.location.reload()
          // alert('success')
        })
        .catch((errors) => {
          this.loading = false;
          this.error = errors.response.data.errors.detail[0];
        });
    },
  },
};
</script>
<style scoped>
#bg {
  position: fixed;
  top: 0;
  left: 0;

  /* Preserve aspet ratio */
  min-width: 100%;
  min-height: 100%;
}
</style>
