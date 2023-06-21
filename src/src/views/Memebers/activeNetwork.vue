<template>
    <div>
        <br>
        <br>
        <v-container>
            <h1 class="text--secondary">Active Network</h1>
        </v-container>
        <v-container>
            <v-row>
                <v-col cols="12" sm="12" md="4" lg="4">
                    <teamLeader />
                </v-col>
                <v-col cols="12" sm="12" md="8" lg="8" v-if="user.parent">
                    <v-card width="100%">
                        <v-card-title class="p-10">My Sponsor</v-card-title>
                    </v-card>
                    <v-row class="d-flex justify-center my-15">
                        <v-card width="50%">
                            <v-card-title class="d-flex justify-center">Spring</v-card-title>
                            <v-divider></v-divider>

                            <v-card-text class="d-flex justify-center ">
                                <template v-if="user.parent.user_profile !== null">
                                    <v-avatar size="200">
                                        <v-img src="https://image.freepik.com/free-vector/user-icon_126283-435.jpg">
                                        </v-img>
                                    </v-avatar>
                                </template>
                                <template v-else>
                                    <v-avatar size="200">
                                        <v-icon>person</v-icon>
                                    </v-avatar>
                                </template>
                                <br>
                            </v-card-text>
                            <v-card-title class="d-flex justify-center">{{user.parent.first_name}}
                                {{user.parent.last_name}}</v-card-title>

                            <article class="d-flex justify-center">{{user.parent.email}}</article>
                            <article class="d-flex justify-center">{{user.parent.phone_number}}</article>
                            <v-divider></v-divider>
                            <v-row class="d-flex justify-space-between px-10 my-3 pb-5">
                                <v-icon class="d-flex justify-center" color="#64B5F6">mdi-facebook</v-icon>
                                <v-icon class="d-flex justify-center" color="#64B5F6">mdi-twitter</v-icon>
                            </v-row>
                        </v-card>
                    </v-row>

                    <!-- <h1>hello</h1> -->
                    <!-- {{membersList}} -->
                    <!-- <activeNetworkMemeberListVue /> -->

                </v-col>
            </v-row>
        </v-container>
        <template class="mx-10">
            <div class="text-center">
                <v-dialog persistent v-model="serviceChargeDialog" width="auto">
                    <v-card-text>
                        <v-alert prominent type="info">
                            <v-row align="center">
                                <v-col class="grow">
                                    PAY servcie Charge ,
                                    <small>and you will not see this message</small>
                                </v-col>
                                <v-col class="shrink">
                                    <v-btn to="/app/charityDonation">go to service charge</v-btn>
                                </v-col>
                            </v-row>
                        </v-alert>
                    </v-card-text>
                </v-dialog>
            </div>
        </template>

        <!-- service charge alert dialog -->
        <template class="mx-10">
            <div class="text-center">
                <v-dialog persistent v-model="registrationFeeDialog" width="auto">
                    <v-card-text>
                        <v-alert prominent type="info">
                            <v-row align="center">
                                <v-col class="grow">
                                    Go to registration fee payment ,
                                    <!-- <small>and you will not see this message</small> -->
                                </v-col>
                                <v-col class="shrink">
                                    <v-btn to="/app/registrationFee">click here</v-btn>
                                </v-col>
                            </v-row>
                        </v-alert>
                    </v-card-text>
                </v-dialog>
            </div>
        </template>

    </div>
</template>
<script>
    import axios from 'axios'
    import {
        mapGetters,
    } from 'vuex'
    import teamLeader from './teamLeader.vue'
    export default {
        components: {
            teamLeader,
        },
        data() {
            return {
                dialog: false,
                registrationFeeDialog: false,
                serviceChargeDialog: false
            }
        },
        computed: {
            ...mapGetters({
                user: 'auth/user',
            })
        },

        created() {
            if (this.user.is_registeration_fee_paid == false & this.user.level > 2) {
                this.registrationFeeDialog = true
            } else {
                this.registrationFeeDialog = false
            }
            if (this.user.force_to_service_charge == true & this.user.level > 2) {
                this.serviceChargeDialog = true;
            } else {
                this.serviceChargeDialog = false;
            }
        }
    }
</script>