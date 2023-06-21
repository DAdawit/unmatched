<template>
    <div>
        <v-container>
            <h1 class="text--secondary">Waithing List</h1>
        </v-container>


        <!-- edit memeber dialog -->
        <div class="text-center">
            <v-dialog v-model="editDialog" width="500" persistent>
                <v-card>
                    <v-card-title class="headline grey lighten-2">
                        Update memeber data
                    </v-card-title>
                    <v-card-text class="mt-3">
                        <v-text-field dense label="First Name" outlined v-model="memberdata.first_name">
                        </v-text-field>
                        <v-text-field dense label="Last Name" outlined v-model="memberdata.last_name">
                        </v-text-field>
                        <v-text-field dense label="Email" outlined v-model="memberdata.email">
                        </v-text-field>
                        <v-text-field dense label="Phone" outlined v-model="memberdata.phone_number">
                        </v-text-field>
                    </v-card-text>
                    <v-divider></v-divider>

                    <v-card-actions class="px-5">
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click="updateMemeber()" :loading="uploading">
                            update
                        </v-btn>
                        <v-btn color="primary" text @click="editDialog = false">
                            Cancel
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </div>

        <v-container>
            <v-row>
                <v-col cols="12" sm="12" md="4" lg="4">
                    <teamLeader />
                </v-col>
                <v-col cols="12" sm="12" md="8" lg="8">
                    <!-- <v-text-field prepend-inner-icon="search"></v-text-field> -->
                    <v-card width="100%" v-if="seeds">
                        <v-row class="d-flex justify-space-between px-10 mt-5 py-5">
                            <div>{{myMemebers.length}} memebers</div>
                            <addMemeber v-if="myMemebers.length < 2" />
                            <small v-else>You reached maximum number of member for this action</small>
                        </v-row>
                        <v-divider></v-divider>
                        <br><br>
                        <v-simple-table>
                            <template v-slot:default>
                                <thead>
                                    <tr>
                                        <th class="text-left">PHOTO</th>
                                        <th class="text-left">FULL NAME </th>
                                        <th class="text-left">Email </th>
                                        <th class="text-left">CONTACT INFO </th>
                                        <th class="text-left">DATE</th>
                                        <th class="text-left">ACTIONS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="memeber in myMemebers" :key="memeber.id">
                                        <td>
                                            <v-avatar>
                                                <v-icon>
                                                    person
                                                </v-icon>
                                                <!-- <v-img :src="memeber.user_profile.profile_pic"></v-img> -->
                                            </v-avatar>
                                        </td>
                                        <td>{{ memeber.first_name}} {{memeber.last_name}}</td>
                                        <td>{{memeber.email}}</td>
                                        <td>{{memeber.phone_number}}</td>
                                        <td>{{memeber.created_at}}</td>
                                        <td>
                                            <v-btn icon small class="mr-2" color="orange" @click="editMemeber(memeber)">
                                                <v-icon small>
                                                    mdi-pencil
                                                </v-icon>
                                            </v-btn>
                                            <v-btn icon small color="red" @click="deleteMemeber(memeber.id)"
                                                :loading="loading">
                                                <v-icon small>
                                                    mdi-delete
                                                </v-icon>
                                            </v-btn>
                                        </td>
                                    </tr>
                                </tbody>
                            </template>
                        </v-simple-table>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>



        <template>
            <div class="text-center">
                <v-dialog v-model="resetdialog" width="500" persistent>
                    <v-card>
                        <v-card-title class="text-h5 grey lighten-2">
                            send reset password
                        </v-card-title>

                        <v-card-text>
                            send new password to : <span> <strong>{{memberdata.email}}</strong></span>
                            <p class="red--text">{{this.error}}</p>
                        </v-card-text>
                        <v-divider></v-divider>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" @click="ResetPassword()">
                                ok
                            </v-btn>
                            <v-btn color="primary" text @click="resetdialog = false">
                                cancle
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </div>
        </template>

        <alert />


        <!-- service charge alert dialog -->
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
    // import axios from 'axios'
    import {
        Bus
    } from '../../main'
    import alert from '../../components/alert.vue'
    import {
        mapActions,
        mapGetters
    } from 'vuex'
    import addMemeber from './addMemeber.vue'
    import teamLeader from './teamLeader.vue'
    export default {
        components: {
            alert,
            teamLeader,
            addMemeber
        },
        data() {
            return {
                uploading: false,
                loading: false,
                editDialog: false,
                memberdata: {},
                dialog: false,
                oldemail: '',
                resetdialog: false,
                error: '',
                registrationFeeDialog: false,
                serviceChargeDialog: false
            }
        },
        computed: {
            ...mapGetters({
                myMemebers: 'memeber/myMemebers',
                seeds: "seed/seeds",
                user: 'auth/user',
            })
        },
        methods: {
            ...mapActions({
                resetPassword: 'auth/resetPassword',
                GetMYmembers: 'memeber/getMyMemebers',
                updateMemeberData: 'memeber/updateMemeberData',
                DeleteMemeber: 'memeber/DeleteMemeber',
                getSeeds: 'seed/getSeeds',
            }),
            editMemeber(memeber) {
                this.memberdata.id = memeber.id
                this.memberdata.first_name = memeber.first_name
                this.memberdata.last_name = memeber.last_name
                this.memberdata.email = memeber.email
                this.memberdata.phone_number = memeber.phone_number
                this.editDialog = true
            },
            updateMemeber() {
                this.uploading = true;
                this.updateMemeberData(this.memberdata).then(() => {
                    this.uploading = false;
                    this.editDialog = false
                    Bus.$emit('showalert', 'updated successfully !')
                    this.resetdialog = true
                }).catch(() => {
                    this.uploading = false;
                    // console.log('err')
                })
            },
            deleteMemeber(id) {
                this.loading = true
                this.DeleteMemeber(id).then(() => {
                    this.loading = false
                    this.editDialog = false
                    Bus.$emit('showalert', 'deleted successfully !')

                }).catch((error) => {
                    this.loading = false
                    Bus.$emit('showError', error.response.data.errors.detail[0])
                })
            },
            ResetPassword() {
                var useremail = {
                    email: this.memberdata.email,
                }
                this.resetPassword(useremail).then(() => {
                    Bus.$emit('showalert', 'new password sent to your email ,  success!')
                    this.resetdialog = false
                }).catch((err) => {
                    this.error = err.response.data.errors.detail[0]
                })
            }
        },
        mounted() {
            this.GetMYmembers()
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
            this.getSeeds()
        }
    }
</script>