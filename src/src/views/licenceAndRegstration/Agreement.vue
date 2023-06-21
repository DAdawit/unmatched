<template>
    <div>
        <template>
            <div class="text-center">
                <v-dialog v-model="dialog" persistent max-width="700">
                    <v-card>
                        <v-card-title class="text-h5 grey lighten-2">
                            Privacy Policy
                        </v-card-title>
                        <br><br>
                        <v-card-subtitle>

                            <span class="links blue--text text-decoration-underline"
                                @click="amharic=true">Amharic</span>/
                            <span class="links blue--text text-decoration-underline"
                                @click="amharic=false">Oromifa</span>
                        </v-card-subtitle>


                        <v-card-text>
                            <template>
                                <amhricAgreement v-if="amharic == true"> </amhricAgreement>
                            </template>
                            <template v-if="amharic==false">
                                <oromifAgreement></oromifAgreement>
                            </template>

                        </v-card-text>

                        <v-divider></v-divider>

                        <v-card-actions>
                            <v-checkbox label="Accept the licence and Agreement" v-model="agree" value="value">
                            </v-checkbox>

                            <v-spacer></v-spacer>
                            <v-btn color="primary" @click="Agree" :disabled="!agree">
                                I accept
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </div>
        </template>



    </div>
</template>
<script>
import axios from 'axios'
    import {
        mapGetters
    } from 'vuex'

    import amhricAgreement from './amharicAgreement.vue'
    import oromifAgreement from './oromifaAgreement.vue'
    export default {
        components: {
            amhricAgreement,
            oromifAgreement
        },
        data() {
            return {
                agree: false,
                amharic: true,
                dialog: false
            }
        },
        computed: {
            ...mapGetters({
                user: "auth/user",
            })
        },
        methods: {
            Agree() {
                axios.get('/change-agreement/').then(()=>{
                    this.dialog=false;
                })
            }

        },
        mounted() {
            console.log(this.user.has_agreed)
            if (this.user.has_agreed == false) {
                this.dialog = true
            }
        }
    }
</script>
<style>
    /* Helper classes */
    .basil {
        background-color: #FFFBE6 !important;
    }

    .basil--text {
        color: #356859 !important;
    }

    .links {
        cursor: pointer;
    }
</style>