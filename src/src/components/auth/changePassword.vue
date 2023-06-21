<template>
    <div class="text-center">
        <v-dialog v-model="dialog" width="500" persistent>
            <template v-slot:activator="{ on, attrs }">
                <v-btn small color="blue lighten-2 mb-3" dark v-bind="attrs" v-on="on">
                    change password
                    <v-icon right>build</v-icon>
                </v-btn>
            </template>

            <v-card>
                <v-card-title class="d-flex justify-content-center text-secondary">
                    Change password
                </v-card-title>

                <v-container>
                    <v-container>
                        <v-form ref="registerForm" v-model="valid" lazy-validation>
                            <v-row>
                                <v-form ref="registerForm" v-model="valid" lazy-validation>
                                    <v-row class="d-flex justify-content-center">
                                        <v-col cols="12" sm="10" md="10" lg="10">
                                            <v-text-field v-model="user.old_password" dense outlined
                                                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                                :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'"
                                                name="input-10-1" label="old password" hint="At least 6 characters"
                                                counter @click:append="show1 = !show1" class="px-5">
                                            </v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="10" md="10" lg="10">
                                            <v-text-field v-model="user.new_password" dense outlined
                                                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                                :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'"
                                                name="input-10-1" label="new password" hint="At least 6 characters"
                                                counter @click:append="show1 = !show1" class="px-5">
                                            </v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="10" md="10" lg="10">
                                            <v-text-field block v-model="verify" dense outlined
                                                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                                :rules="[rules.required, passwordMatch]"
                                                :type="show1 ? 'text' : 'password'" name="input-10-1" requireds
                                                label="verify Password" counter @click:append="show1 = !show1"
                                                class="px-5">
                                            </v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-form>

                            </v-row>
                            <v-row class="d-flex justify-content-center">
                                <p class="red--text small overline">{{error}}</p>
                            </v-row>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="primary" text @click="dialog = false">
                                    cancel
                                </v-btn>
                                <v-btn color="primary" text @click="changePassword()" :disabled="!valid" :loading="loading">
                                    save
                                </v-btn>
                            </v-card-actions>
                        </v-form>
                    </v-container>
                </v-container>
            </v-card>
        </v-dialog>
        <alert />
    </div>
</template>
<script>
import {Bus} from '../../main'
import alert from '../alert.vue'
    import {
        // mapGetters,
        mapActions
    } from 'vuex';
    export default {
        components:{
          alert  
        },
        data() {
            return {
                rules: {
                    required: value => !!value || "Required.",
                    min: v => (v && v.length >= 6) || "Min 5 characters"
                },
                dialog: false,
                verify: "",
                valid: false,
                show: false,
                error: '',
                show1:false,
                loading:false,
                user: {
                    old_password: "",
                    new_password: "",
                }
            }
        },
        methods: {
            ...mapActions({
                ChangePassword: 'auth/ChangePassword'
            }),
            changePassword() {
                this.loading=true;
                this.user.user_id = this.user.id;
                this.ChangePassword(this.user).then(() => {
                    Bus.$emit('showalert','Password changed successfully')
                    this.dialog=false;
                    this.loading=false;
                }).catch((err) => {
                    this.error = err.response.data.errors.old_password[0];
                    console.log(this.error)
                    this.loading=false;
                });
            }
        },
        computed: {
        
            passwordMatch() {
                return () => this.user.new_password === this.verify || "Password must match";
            },
        },
    }
</script>