<template>
    <div>
        <br><br><br>

        <template>
            <div class="text-center">
                <v-dialog v-model="Editdialog" width="80%">
                    <v-card>
                        <ValidationObserver v-slot="{ handleSubmit }">
                            <form @submit.prevent="handleSubmit(UpdateMessage)">
                                <v-card-title class="text-h5 grey lighten-2">
                                    Edit
                                </v-card-title>
                                <br>
                                <v-card-text>
                                    <v-select :items="items" label="Support Type" outlined dense class="mx-2" disabled
                                        v-model="swapAccountMessage.type"></v-select>
                                    <h3 class="pl-5 ">Subject:</h3>
                                    <ValidationProvider rules="required" name="subject" v-slot="{ errors }">
                                        <v-text-field dense placeholder="Subject/Topic Here..." outlined class="mx-2"
                                            v-model="editData.subject" :error="errors.length > 0"
                                            :error-messages="errors[0]"></v-text-field>
                                    </ValidationProvider>

                                    <h3 class="pl-5 pb-5">Affected Account Information:</h3>

                                    <ValidationProvider rules="required" name="First Name" v-slot="{ errors }">
                                        <v-text-field dense label="First Name" outlined class="mx-2"
                                            v-model="editData.first_name" :error="errors.length > 0"
                                            :error-messages="errors[0]">
                                        </v-text-field>
                                    </ValidationProvider>
                                    <ValidationProvider rules="required" name="Last name" v-slot="{ errors }">
                                        <v-text-field dense label="Last Name" outlined class="mx-2"
                                            v-model="editData.last_name" :error="errors.length > 0"
                                            :error-messages="errors[0]">
                                        </v-text-field>
                                    </ValidationProvider>

                                    <div>
                                        <h3 class="pl-5 pb-5"> New User Information:</h3>
                                        <v-row class="mx-2">
                                            <br>
                                            <v-col cols="12">
                                                <v-row>
                                                    <ValidationProvider rules="required" name="New user first name"
                                                        v-slot="{ errors }">
                                                        <v-text-field dense label="First Name:" outlined class="mx-2"
                                                            v-model="editData.new_user_first_name"
                                                            :error="errors.length > 0" :error-messages="errors[0]">
                                                        </v-text-field>
                                                    </ValidationProvider>
                                                    <ValidationProvider rules="required" name="new user last name"
                                                        v-slot="{ errors }">
                                                        <v-text-field dense label="Last Name" outlined class="mx-2"
                                                            v-model="editData.new_user_last_name"
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
                                                            v-model="editData.new_user_email" :error="errors.length > 0"
                                                            :error-messages="errors[0]">
                                                        </v-text-field>
                                                    </ValidationProvider>
                                                    <ValidationProvider rules="required|integer" name="phone"
                                                        v-slot="{ errors }">
                                                        <v-text-field dense label="Phone:" outlined class="mx-2"
                                                            v-model="editData.new_user_phone_number"
                                                            :error="errors.length > 0" :error-messages="errors[0]">
                                                        </v-text-field>
                                                    </ValidationProvider>
                                                </v-row>
                                            </v-col>
                                        </v-row>
                                    </div>
                                    <v-container class="mx-2">
                                        <ValidationProvider rules="required" name="description" v-slot="{ errors }">
                                            <vue-editor v-model="editData.description"
                                                placeholder="Kindly input any further information you wish to add here...">
                                            </vue-editor>
                                            <small class="red--text pl-3">{{errors[0]}}</small>
                                        </ValidationProvider>
                                    </v-container>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <!-- @click="SendMessage()" -->
                                    <v-btn color="primary" type="submit" :loading="loading">
                                        Update
                                    </v-btn>
                                    <v-btn color="primary" text @click="Editdialog = false">
                                        cancel
                                    </v-btn>
                                </v-card-actions>
                            </form>

                        </ValidationObserver>
                    </v-card>
                </v-dialog>
            </div>
        </template>




        <template>
            <div class="text-center">
                <v-dialog v-model="dialog" width="80%" persistent>
                    <v-card>
                        <ValidationObserver v-slot="{ handleSubmit }">
                            <form @submit.prevent="handleSubmit(SendMessage)">
                                <v-card-title class="text-h5 grey lighten-2">
                                    Replay
                                </v-card-title>
                                <br>
                                <v-card-text>
                                    <v-card-subtitle>To: {{swapAccountMessage.created_by.email}}</v-card-subtitle>
                                    <form>
                                        <v-select :items="items" label="Support Type" outlined dense class="mx-2"
                                            disabled v-model="replay.type"></v-select>
                                        <h3 class="pl-5 ">Subject:</h3>
                                        <ValidationProvider rules="required" name="subject" v-slot="{ errors }">
                                            <v-text-field dense placeholder="Subject/Topic Here..." outlined
                                                class="mx-2" v-model="replay.subject" :error="errors.length > 0"
                                                :error-messages="errors[0]"></v-text-field>
                                        </ValidationProvider>
                                        <v-container class="mx-2">
                                            <ValidationProvider rules="required" name="subject" v-slot="{ errors }">
                                                <vue-editor v-model="replay.description"
                                                    placeholder="Kindly input any further information you wish to add here...">
                                                </vue-editor>
                                                <small class="red--text pl-3">{{errors[0]}}</small>
                                            </ValidationProvider>
                                        </v-container>
                                    </form>
                                </v-card-text>

                                <v-divider></v-divider>

                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="primary" type="submit" :loading="loading">
                                        send Message
                                        <v-icon right>send</v-icon>
                                    </v-btn>
                                    <v-btn color="primary" text @click="dialog = false">
                                        cancel
                                    </v-btn>
                                </v-card-actions>
                            </form>
                        </ValidationObserver>
                    </v-card>
                </v-dialog>
            </div>
        </template>



        <!-- {{swapAccountMessage}} -->
        <v-container>
            <v-row class="d-flex align-content-center">
                <v-card width="100%" height="100%" class="px-5">
                    <v-card-title>subject : {{swapAccountMessage.subject}}</v-card-title>
                    <v-card-subtitle>type : {{swapAccountMessage.type}}</v-card-subtitle>
                    <v-divider></v-divider>
                     <h3>Affected Account Information:</h3>
                    <v-card-text>
                        Email : {{swapAccountMessage.created_by.email}} <br>
                        first name: {{swapAccountMessage.first_name}} <br>
                        last name: {{swapAccountMessage.last_name}}<br>
                    </v-card-text>
                     <h3>New User Information:</h3>
                    <v-card-text>
                        New user email : {{swapAccountMessage.created_by.email}} <br>
                        New user first name: {{swapAccountMessage.new_user_first_name}} <br>
                        New user last name: {{swapAccountMessage.new_user_last_name}}<br>
                        New user phone number: {{swapAccountMessage.new_user_phone_number}}<br>
                    </v-card-text>
                    <h3>Description</h3>
                    <v-card-text v-html="swapAccountMessage.description">
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-subtitle>
                        from : {{swapAccountMessage.created_by.email}} <br>
                        created_at : {{swapAccountMessage.created_at}}
                    </v-card-subtitle>
                    <v-card-actions>
                        <template v-if="my">
                            <v-btn color="orange" class="white--text" @click="showEditDialog()">Edit
                                <v-icon>edit</v-icon>
                            </v-btn>
                            <v-btn color="red" class="white--text" @click="deleteMessage(swapAccountMessage.id)">delete
                                <v-icon right>delete</v-icon>
                            </v-btn>

                        </template>
                        <template v-else>
                            <v-btn color="primary" @click="ShowReplayDialog()">replay</v-btn>
                        </template>
                        <v-btn color="secondary" to="/app/help">Back</v-btn>
                    </v-card-actions>
                </v-card>

            </v-row>
        </v-container>
        <!-- {{otherMessages}} -->
        <alert />
    </div>
</template>
<script>
    import router from '../../../router'
    import {
        Bus
    } from '../../../main'
    import alert from '../../../components/alert.vue'
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
        data() {
            return {
                my: false,
                editData: {},
                Editdialog: false,
                dialog: false,
                items: ['Email/Phone Correction', 'Account Deletion', 'Account Swap',
                    'Other Issues'
                ],
                replay: {},
                loading: false
            }
        },
        computed: {
            ...mapGetters({
                user: 'auth/user',
                swapAccountMessage: 'compose/swapAccountMessage'
            })
        },
        methods: {
            ...mapActions({
                getSwapAccountMessage: 'compose/getSwapAccountMessage',
                UpdateAcountSwap: 'compose/UpdateAcountSwap',
                RepalayMessage: 'compose/RepalayMessage',
                DeleteSwapMessage: 'compose/DeleteSwapMessage'
            }),
            showEditDialog() {
                // this.editData.type
                this.editData.id = this.swapAccountMessage.id
                this.editData.subject = this.swapAccountMessage.subject
                this.editData.first_name = this.swapAccountMessage.first_name
                this.editData.last_name = this.swapAccountMessage.last_name
                this.editData.new_user_first_name = this.swapAccountMessage.new_user_first_name
                this.editData.new_user_last_name = this.swapAccountMessage.new_user_last_name
                this.editData.new_user_email = this.swapAccountMessage.new_user_email
                this.editData.new_user_phone_number = this.swapAccountMessage.new_user_phone_number
                this.editData.description = this.swapAccountMessage.description
                this.Editdialog = true
                // console.log(message)
            },
               UpdateMessage() {
                this.loading = true
                // console.log(this.editData)
                this.UpdateAcountSwap(this.editData).then(() => {
                    this.loading = false
                    Bus.$emit('showalert', 'Message updated successfully !')
                    // alert('Message updated successfully !')
                    this.Editdialog = false
                }).catch((err) => {
                    this.loading = false
                    console.log(err.response.data)
                })
            },
            deleteMessage(id) {
                this.DeleteSwapMessage(id).then(() => {
                      Bus.$emit('showalert', 'Message updated successfully !')
                    router.push('/app/help')
                }).catch((err) => {
                    console.log(err.response.data)
                })
            },
            ShowReplayDialog() {
                this.replay.type = this.emailAndPhoneCorrectionMessage.type
                this.dialog = true
            },
            SendMessage() {
                this.loading = true
                this.replay.to = this.swapAccountMessage.created_by.id
                this.RepalayMessage(this.replay).then(() => {
                    Bus.$emit('showalert', 'Message sent !')
                    this.dialog = false
                    this.loading = false
                }).catch((err) => {
                    console.log(err.response)
                    Bus.$emit('showalert', 'showError !')
                    this.dialog = false
                    this.loading = false
                })

            }
        },
        created() {
            this.getSwapAccountMessage(this.$route.params.id).then(() => {
                if (this.swapAccountMessage.created_by.email == this.user.email) {
                    this.my = true
                } else {
                    this.my = false
                }
            })
        },
        mounted() {
            this.replay.type = this.swapAccountMessage.type
        }
    }
</script>