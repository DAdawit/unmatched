<template>
    <div>
        <v-container>
            <h1 class="text--secondary my-8">compose</h1>
        </v-container>
        <div v-if="user.level == 0">
            <v-row>
                <v-card width="100%">
                    <ValidationObserver v-slot="{ handleSubmit }">
                        <form @submit.prevent="handleSubmit(sendMessage)">
                            <v-row class="py-10">
                                <v-col cols="12" sm="12" md="6" lg="6">
                                    <h3 class="pl-5 ">To:</h3>


                                    <v-text-field v-if="user.level > 0" dense label="Support desk Admin" outlined
                                        class="mx-2" placeholder="Support desk Admin" disabled>
                                    </v-text-field>

                                    <ValidationProvider rules="required" name="user uuid" v-slot="{ errors }">
                                        <v-text-field v-if="user.level == 0" dense label="user uuid" outlined
                                            class="mx-2" placeholder="user uuid" :error="errors.length > 0"
                                            v-model="compose.to" :error-messages="errors[0]">
                                        </v-text-field>
                                    </ValidationProvider>
                                </v-col>
                                <v-col cols="12" sm="12" md="6" lg="6">
                                    <h3 class="pl-5 ">Support Type:</h3>
                                    <ValidationProvider rules="required" name="Type" v-slot="{ errors }">
                                        <v-select :items="items" label="Support Type" outlined dense class="mx-2"
                                            v-model="compose.type" :error="errors.length > 0"
                                            :error-messages="errors[0]">
                                        </v-select>
                                    </ValidationProvider>
                                    <!-- {{compose.type}} -->
                                </v-col>
                                <v-col cols="12" sm="12" md="12" lg="12">
                                    <v-col cols="12" sm="12" md="12" lg="12">
                                        <h3 class="pl-5 ">Subject:</h3>
                                        <ValidationProvider rules="required" name="subject" v-slot="{ errors }">
                                            <v-text-field dense placeholder="Subject/Topic Here..." outlined
                                                class="mx-2" v-model="compose.subject" :error="errors.length > 0"
                                                :error-messages="errors[0]"></v-text-field>
                                        </ValidationProvider>
                                    </v-col>


                                    <h3 class="pl-5 pb-5">Affected Account Information:</h3>
                                    <v-row class="mx-2">
                                        <ValidationProvider rules="required" name="Email" v-slot="{ errors }">
                                            <v-text-field dense label="email:" outlined class="mx-2"
                                                v-model="compose.email" :error="errors.length > 0"
                                                :error-messages="errors[0]">
                                            </v-text-field>
                                        </ValidationProvider>
                                        <!-- <ValidationProvider rules="required|email" name="email" v-slot="{ errors }">
                                        <v-text-field v-if="compose.type !== 'Account Swap'" dense label="Email:"
                                            outlined class="mx-2" v-model="compose.user_id" :error="errors.length > 0"
                                            :error-messages="errors[0]">
                                        </v-text-field>
                                    </ValidationProvider> -->
                                        <ValidationProvider rules="required" name="First Name" v-slot="{ errors }">
                                            <v-text-field dense label="First Name" outlined class="mx-2"
                                                v-model="compose.first_name" :error="errors.length > 0"
                                                :error-messages="errors[0]">
                                            </v-text-field>
                                        </ValidationProvider>
                                        <ValidationProvider rules="required" name="Last name" v-slot="{ errors }">
                                            <v-text-field dense label="Last Name" outlined class="mx-2"
                                                v-model="compose.last_name" :error="errors.length > 0"
                                                :error-messages="errors[0]">
                                            </v-text-field>
                                        </ValidationProvider>

                                    </v-row>

                                    <div v-if="compose.type == 'Email/Phone Correction'">
                                        <h3 class="pl-5 pb-5"> Email/Phone Correction Information:</h3>
                                        <v-row class="mx-2">
                                            <br>
                                            <ValidationProvider rules="required" name="Wrong email/phone"
                                                v-slot="{ errors }">
                                                <v-text-field dense label="Wrong Email/phone:" outlined class="mx-2"
                                                    v-model="compose.wrong_email" :error="errors.length > 0"
                                                    :error-messages="errors[0]">
                                                </v-text-field>
                                            </ValidationProvider>
                                            <ValidationProvider rules="required|" name="Email Or Phone"
                                                v-slot="{ errors }">
                                                <v-text-field dense label="Correct Email/phone:" outlined class="mx-2"
                                                    v-model="compose.correct_email" :error="errors.length > 0"
                                                    :error-messages="errors[0]">
                                                </v-text-field>
                                            </ValidationProvider>
                                        </v-row>
                                    </div>

                                    <div v-if="compose.type === 'Account Swap'">
                                        <h3 class="pl-5 pb-5"> New User Information:</h3>
                                        <v-row class="mx-2">
                                            <br>
                                            <v-col cols="12">
                                                <v-row>
                                                    <ValidationProvider rules="required" name="New user first name"
                                                        v-slot="{ errors }">
                                                        <v-text-field dense label="First Name:" outlined class="mx-2"
                                                            v-model="compose.new_user_first_name"
                                                            :error="errors.length > 0" :error-messages="errors[0]">
                                                        </v-text-field>
                                                    </ValidationProvider>
                                                    <ValidationProvider rules="required" name="new user last name"
                                                        v-slot="{ errors }">
                                                        <v-text-field dense label="Last Name" outlined class="mx-2"
                                                            v-model="compose.new_user_last_name"
                                                            :error="errors.length > 0" :error-messages="errors[0]">
                                                        </v-text-field>
                                                    </ValidationProvider>
                                                </v-row>
                                            </v-col>
                                            <v-col cols="12">
                                                <v-row>
                                                    <ValidationProvider rules="required|email" name="New user Email"
                                                        v-slot="{ errors }">
                                                        <v-text-field dense label="Email" outlined class="mx-2"
                                                            v-model="compose.new_user_email" :error="errors.length > 0"
                                                            :error-messages="errors[0]">
                                                        </v-text-field>
                                                    </ValidationProvider>
                                                    <ValidationProvider rules="required|integer" name="phone"
                                                        v-slot="{ errors }">
                                                        <v-text-field dense label="Phone:" outlined class="mx-2"
                                                            v-model="compose.new_user_phone_number"
                                                            :error="errors.length > 0" :error-messages="errors[0]">
                                                        </v-text-field>
                                                    </ValidationProvider>
                                                </v-row>
                                            </v-col>
                                        </v-row>
                                    </div>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-container class="mx-2">
                                    <ValidationProvider rules="required" name="description" v-slot="{ errors }">
                                        <vue-editor v-model="compose.description"
                                            placeholder="Kindly input any further information you wish to add here...">
                                        </vue-editor>
                                        <small class="red--text pl-3">{{errors[0]}}</small>
                                    </ValidationProvider>
                                </v-container>
                            </v-row>
                            <v-container class="mb-5">
                                <v-row>
                                    <v-col class="d-flex justify-center">
                                        <!-- @click="sendMessage()" -->
                                        <v-btn color="primary" type="submit" :loading="loading">send message
                                            <v-icon right>send</v-icon>
                                        </v-btn>
                                    </v-col>
                                </v-row>
                            </v-container>
                            <v-row>
                            </v-row>
                        </form>
                    </ValidationObserver>
                </v-card>
            </v-row>
        </div>













        <div v-if="user.level > 0">
            <v-row>
                <v-card width="100%">
                    <ValidationObserver v-slot="{ handleSubmit }">
                        <form @submit.prevent="handleSubmit(sendMessageuser)">
                            <v-row class="py-10">
                                <v-col cols="12" sm="12" md="6" lg="6">
                                    <h3 class="pl-5 ">To:</h3>


                                    <v-text-field v-if="user.level > 0" dense label="Support desk Admin" outlined
                                        class="mx-2" placeholder="Support desk Admin" disabled>
                                    </v-text-field>


                                    <ValidationProvider rules="required|email" name="email" v-slot="{ errors }">
                                        <v-text-field v-if="user.level == 0" dense label="Email" outlined class="mx-2"
                                            placeholder="Support desk Admin" :error="errors.length > 0"
                                            :error-messages="errors[0]">
                                        </v-text-field>
                                    </ValidationProvider>
                                </v-col>
                                <v-col cols="12" sm="12" md="6" lg="6">
                                    <h3 class="pl-5 ">Support Type:</h3>
                                    <ValidationProvider rules="required" name="Type" v-slot="{ errors }">
                                        <v-select :items="items" label="Support Type" outlined dense class="mx-2"
                                            v-model="compose.type" :error="errors.length > 0"
                                            :error-messages="errors[0]">
                                        </v-select>
                                    </ValidationProvider>
                                    <!-- {{compose.type}} -->
                                </v-col>
                                <v-col cols="12" sm="12" md="12" lg="12">
                                    <v-col cols="12" sm="12" md="12" lg="12">
                                        <h3 class="pl-5 ">Subject:</h3>
                                        <ValidationProvider rules="required" name="subject" v-slot="{ errors }">
                                            <v-text-field dense placeholder="Subject/Topic Here..." outlined
                                                class="mx-2" v-model="compose.subject" :error="errors.length > 0"
                                                :error-messages="errors[0]"></v-text-field>
                                        </ValidationProvider>
                                    </v-col>


                                    <h3 class="pl-5 pb-5">Affected Account Information:</h3>
                                    <v-row class="mx-2">
                                        <ValidationProvider rules="required|email" name="email" v-slot="{ errors }">
                                            <v-text-field v-if="compose.type == 'Account Swap'" dense label="email:"
                                                outlined class="mx-2" v-model="compose.email" :error="errors.length > 0"
                                                :error-messages="errors[0]">
                                            </v-text-field>
                                        </ValidationProvider>
                                        <ValidationProvider rules="required|email" name="email" v-slot="{ errors }">
                                            <v-text-field v-if="compose.type != 'Account Swap'" dense label="Email:"
                                                outlined class="mx-2" v-model="compose.user_id"
                                                :error="errors.length > 0" :error-messages="errors[0]">
                                            </v-text-field>
                                        </ValidationProvider>
                                        <ValidationProvider rules="required" name="First Name" v-slot="{ errors }">
                                            <v-text-field dense label="First Name" outlined class="mx-2"
                                                v-model="compose.first_name" :error="errors.length > 0"
                                                :error-messages="errors[0]">
                                            </v-text-field>
                                        </ValidationProvider>
                                        <ValidationProvider rules="required" name="Last name" v-slot="{ errors }">
                                            <v-text-field dense label="Last Name" outlined class="mx-2"
                                                v-model="compose.last_name" :error="errors.length > 0"
                                                :error-messages="errors[0]">
                                            </v-text-field>
                                        </ValidationProvider>

                                    </v-row>

                                    <div v-if="compose.type == 'Email/Phone Correction'">
                                        <h3 class="pl-5 pb-5"> Email/Phone Correction Information:</h3>
                                        <v-row class="mx-2">
                                            <br>
                                            <ValidationProvider rules="required" name="Wrong email/phone"
                                                v-slot="{ errors }">
                                                <v-text-field dense label="Wrong Email/phone:" outlined class="mx-2"
                                                    v-model="compose.wrong_email" :error="errors.length > 0"
                                                    :error-messages="errors[0]">
                                                </v-text-field>
                                            </ValidationProvider>
                                            <ValidationProvider rules="required|" name="Email Or Phone"
                                                v-slot="{ errors }">
                                                <v-text-field dense label="Correct Email/phone:" outlined class="mx-2"
                                                    v-model="compose.correct_email" :error="errors.length > 0"
                                                    :error-messages="errors[0]">
                                                </v-text-field>
                                            </ValidationProvider>
                                        </v-row>
                                    </div>

                                    <div v-if="compose.type == 'Account Swap'">
                                        <h3 class="pl-5 pb-5"> New User Information:</h3>
                                        <v-row class="mx-2">
                                            <br>
                                            <v-col cols="12">
                                                <v-row>
                                                    <ValidationProvider rules="required" name="New user first name"
                                                        v-slot="{ errors }">
                                                        <v-text-field dense label="First Name:" outlined class="mx-2"
                                                            v-model="compose.new_user_first_name"
                                                            :error="errors.length > 0" :error-messages="errors[0]">
                                                        </v-text-field>
                                                    </ValidationProvider>
                                                    <ValidationProvider rules="required" name="new user last name"
                                                        v-slot="{ errors }">
                                                        <v-text-field dense label="Last Name" outlined class="mx-2"
                                                            v-model="compose.new_user_last_name"
                                                            :error="errors.length > 0" :error-messages="errors[0]">
                                                        </v-text-field>
                                                    </ValidationProvider>
                                                </v-row>
                                            </v-col>
                                            <v-col cols="12">
                                                <v-row>
                                                    <ValidationProvider rules="required|email" name="New user Email"
                                                        v-slot="{ errors }">
                                                        <v-text-field dense label="Email" outlined class="mx-2"
                                                            v-model="compose.new_user_email" :error="errors.length > 0"
                                                            :error-messages="errors[0]">
                                                        </v-text-field>
                                                    </ValidationProvider>
                                                    <ValidationProvider rules="required|integer" name="phone"
                                                        v-slot="{ errors }">
                                                        <v-text-field dense label="Phone:" outlined class="mx-2"
                                                            v-model="compose.new_user_phone_number"
                                                            :error="errors.length > 0" :error-messages="errors[0]">
                                                        </v-text-field>
                                                    </ValidationProvider>
                                                </v-row>
                                            </v-col>
                                        </v-row>
                                    </div>


                                </v-col>
                            </v-row>
                            <v-row>
                                <v-container class="mx-2">
                                    <ValidationProvider rules="required" name="description" v-slot="{ errors }">
                                        <vue-editor v-model="compose.description"
                                            placeholder="Kindly input any further information you wish to add here...">
                                        </vue-editor>
                                        <small class="red--text pl-3">{{errors[0]}}</small>
                                    </ValidationProvider>
                                </v-container>
                            </v-row>
                            <v-container class="mb-5">
                                <v-row>
                                    <v-col class="d-flex justify-center">
                                        <!-- @click="sendMessage()" -->
                                        <v-btn color="primary" type="submit" :loading="loading">send message
                                            <v-icon right>send</v-icon>
                                        </v-btn>
                                    </v-col>
                                </v-row>
                            </v-container>
                            <v-row>
                            </v-row>
                        </form>
                    </ValidationObserver>
                </v-card>
            </v-row>
        </div>


        <alert />
        <!-- {{user.level}} -->
    </div>
</template>
<script>
    import axios from 'axios'
    import {
        Bus
    } from '../../main'
    import alert from '../../components/alert.vue'
    import {
        mapGetters,
        mapActions
    } from 'vuex'
    import {
        VueEditor
    } from "vue2-editor";
    export default {
        components: {
            VueEditor,
            alert
        },
        data: () => ({
            dialog: false,
            loading: false,
            items: ['Email/Phone Correction', 'Account Deletion', 'Account Swap',
                'Other Issues'
            ],
            compose: {
                phone_number: '123-123-123'
            }
        }),
        computed: {
            ...mapGetters({
                user: 'auth/user',
                admin: 'donate/admin',
            })
        },

        methods: {
            ...mapActions({
                getAdmin: 'donate/getAdmin',
                DeleteAcount: 'compose/DeleteAcount',
                EmailPhoneCorrection: 'compose/EmailPhoneCorrection',
                AcountSwap: 'compose/AcountSwap'
            }),
            sendMessageuser() {
                this.loading = true;
                if (this.compose.type == "Email/Phone Correction") {

                    this.compose.to = this.admin.id
                    // console.log(this.compose)
                    this.EmailPhoneCorrection(this.compose).then(() => {
                        Bus.$emit('showalert', 'Message sent !')
                        this.loading = false
                    }).catch((err) => {
                        this.loading = false
                        console.log(err.response.data)
                    })
                } else if (this.compose.type == "Account Deletion" || this.compose.type == "Other Issues") {
                    // console.log(this.compose)
                    this.compose.to = this.admin.id
                    this.DeleteAcount(this.compose).then(() => {
                        Bus.$emit('showalert', 'Message sent !')
                        this.loading = false
                    }).catch((err) => {
                        console.log(err.response.data)
                        this.loading = false
                    })

                    // alert('account deletion')
                } else if (this.compose.type == "Account Swap") {
                    this.compose.to = this.admin.id
                    this.AcountSwap(this.compose).then(() => {
                        this.loading = false
                        Bus.$emit('showalert', 'Message sent !')
                    }).catch((err) => {
                        this.loading = false
                        console.log(err.response.data)
                    })
                    // alert('account swap')
                }
            },

            sendMessage() {
                this.loading = true;
                if (this.compose.type == "Email/Phone Correction") {
                    if (this.user.level > 0) {
                        this.compose.to = this.admin.id
                    } else {
                        this.compose.user_id = this.compose.email
                    }
                    // console.log(this.compose)
                    this.EmailPhoneCorrection(this.compose).then(() => {
                        Bus.$emit('showalert', 'Message sent !')
                        this.loading = false
                    }).catch((err) => {
                        this.loading = false
                        console.log(err.response.data)
                    })
                } else if (this.compose.type == "Account Deletion" || this.compose.type == "Other Issues") {
                    // console.log(this.compose)
                    if (this.user.level > 0) {
                        this.compose.to = this.admin.id
                    }
                    this.DeleteAcount(this.compose).then(() => {
                        Bus.$emit('showalert', 'Message sent !')
                        this.loading = false
                    }).catch((err) => {
                        console.log(err.response.data)
                        this.loading = false
                    })

                    // alert('account deletion')
                } else if (this.compose.type == "Account Swap") {
                    if (this.user.level > 0) {
                        this.compose.to = this.admin.id
                    }
                    this.AcountSwap(this.compose).then(() => {
                        this.loading = false
                        Bus.$emit('showalert', 'Message sent !')
                    }).catch((err) => {
                        this.loading = false
                        console.log(err.response.data)
                    })
                    // alert('account swap')
                }
            }
        },
        created() {

            this.getAdmin()
        }
    }
</script>
<style scoped>
    .v-col {
        margin: 0px;
    }
</style>