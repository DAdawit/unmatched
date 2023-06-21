<template>
    <div>
        <v-img id="bg" class="d-flex align-center"
            src="login2.jpg">
            <v-div class="d-flex justify-center">
                <v-card width="500">
                    <ValidationObserver v-slot="{ handleSubmit }">
                        <form @submit.prevent="handleSubmit(reset)">
                            <v-row class="d-flex justify-center pt-5">
                              <v-card-title class="d-flex justify-center">የፍቅር መዓድ</v-card-title>
                            </v-row>
                            <v-row class="d-flex justify-center">
                                <v-col cols="10">
                                    <v-card-title class="d-flex justify-center">Reset password</v-card-title>
                                    <ValidationProvider rules="required|email" name="E-mail" v-slot="{ errors }">
                                        <v-text-field dense label="E-mail" placeholder="Email" outlined
                                            v-model="user.email" class="d-flex justify-center mx-2"
                                            :error="errors.length > 0" :error-messages="errors[0]">
                                        </v-text-field>
                                    </ValidationProvider>
                                    <v-divider class="my-2"></v-divider>
                                    <v-container>
                                        <!-- <v-row> -->
                                        <v-btn color="blue" class="justify-center white--text" type="submit" block>Reset
                                        </v-btn>
                                         <router-link to="/login" class="d-flex justify-end my-5">Login page</router-link>
                                        <!-- </v-row> -->
                                    </v-container>
                                    <div v-if="show">
                                        <p>{{message}}</p>
                                    </div>
                                    <br>
                                </v-col>
                            </v-row>
                        </form>
                    </ValidationObserver>
                </v-card>
            </v-div>
        </v-img>
    </div>
</template>
<script>
    import {
        mapActions
    } from 'vuex'
    export default {
        data() {
            return {
                message: '',
                user: {},
                show: false
            }
        },
        methods: {
            ...mapActions({
                forgetPassword: 'auth/forgetPassword'
            }),
            reset() {
                var useremail = {
                    email: this.user.email,
                }
                this.forgetPassword(useremail).then(() => {
                    this.message = 'New password has been sent to your email address';
                    this.show = true
                }).catch((err) => {
                    console.log(err)
                })
            }
        },
    }
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