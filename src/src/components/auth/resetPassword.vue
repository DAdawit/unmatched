<template>
    <div class="text-center">
        <!-- <v-dialog v-model="dialog" width="500" persistent>
            <template v-slot:activator="{ on, attrs }">
                <v-btn small color="blue lighten-2" dark v-bind="attrs" v-on="on">
                    change password
                    <v-icon right>build</v-icon>
                </v-btn>
            </template> -->

        <v-card>
            <v-card-title class="d-flex justify-content-center text-secondary">
                Change password
            </v-card-title>
            <v-form ref="registerForm" v-model="valid" lazy-validation>
                <v-col cols="12" sm="12" md="12" lg="12">
                    <v-text-field v-model="user.oldPassword" dense outlined
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, rules.min]"
                        :type="show1 ? 'text' : 'password'" name="input-10-1" label="old password"
                        hint="At least 5 characters" counter @click:append="show1 = !show1" class="px-5">
                    </v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12" lg="12">
                    <v-text-field v-model="user.newPassword" dense outlined
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, rules.min]"
                        :type="show1 ? 'text' : 'password'" name="input-10-1" label="new password"
                        hint="At least 5 characters" counter @click:append="show1 = !show1" class="px-5">
                    </v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12" lg="12">
                    <v-text-field block v-model="verify" dense outlined :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="[rules.required, passwordMatch]" :type="show1 ? 'text' : 'password'" name="input-10-1"
                        label="verify Password" counter @click:append="show1 = !show1" class="px-5">
                    </v-text-field>
                </v-col>
            </v-form>
            <v-row class="d-flex justify-content-center">
                <p class="text-danger small overline">{{error}}</p>
            </v-row>

            <v-container class="px-10">
                <v-btn block color="purple" class="white--text mb-5" @click="changePassword()" >save</v-btn>
            </v-container>
            <br>
        </v-card>
        <!-- </v-dialog> -->
    </div>
</template>
<script>
    import {
        Bus
    } from '../../main'
    import {
        mapGetters,
        mapActions
    } from 'vuex';
    export default {
        data() {
            return {
                rules: {
                    required: value => !!value || "Required.",
                    min: v => (v && v.length >= 5) || "Min 5 characters"
                },
                dialog: false,
                verify: "",
                valid: true,
                show: false,
                error: '',
                show1: false,
                loading: false,
                user: {
                    oldPassword: "",
                    newPassword: "",
                    user_id: ''
                }
            }
        },
        methods: {
            ...mapActions({
                resetPassword: 'auth/resetPassword'
            }),
            changePassword() {
                this.loading = true;
                this.user.user_id = this.user.id;
                this.CangeUserPassword(this.user).then(() => {
                    Bus.$emit('passwordCahnged')
                    this.dialog = false;
                    this.loading = false;
                }).catch((err) => {
                    this.error = err.response.data.error;
                    this.loading = false;
                });
            }
        },
        computed: {
            ...mapGetters(['user']),
            passwordMatch() {
                return () => this.user.newPassword === this.verify || "Password must match";
            },
        },
    }
</script>