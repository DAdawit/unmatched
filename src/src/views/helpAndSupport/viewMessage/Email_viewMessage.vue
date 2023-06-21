<template>
    <div>
        <br><br><br>
        <!-- {{emailAndPhoneCorrectionMessage}} -->
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
                                        v-model="editData.type"></v-select>
                                    <h3 class="pl-5 ">Subject:</h3>
                                    <ValidationProvider rules="required" name="subject" v-slot="{ errors }">
                                        <v-text-field dense placeholder="Subject/Topic Here..." outlined class="mx-2"
                                            v-model="editData.subject" :error="errors.length > 0"
                                            :error-messages="errors[0]"></v-text-field>
                                    </ValidationProvider>

                                    <h3 class="pl-5 pb-5">Affected Account Information:</h3>
                                    <v-row>
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
                                    </v-row>
                                    <h3 class="pl-5 pb-5"> Email/Phone Correction Information:</h3>
                                    <v-row>

                                        <br>
                                        <ValidationProvider rules="required" name="Wrong email/phone"
                                            v-slot="{ errors }">
                                            <v-text-field dense label="Wrong Email/phone:" outlined class="mx-2"
                                                v-model="editData.wrong_email" :error="errors.length > 0"
                                                :error-messages="errors[0]">
                                            </v-text-field>
                                        </ValidationProvider>
                                        <ValidationProvider rules="required|" name="Email Or Phone" v-slot="{ errors }">
                                            <v-text-field dense label="Correct Email/phone:" outlined class="mx-2"
                                                v-model="editData.correct_email" :error="errors.length > 0"
                                                :error-messages="errors[0]">
                                            </v-text-field>
                                        </ValidationProvider>

                                        <v-container class="mx-2">
                                            <ValidationProvider rules="required" name="description" v-slot="{ errors }">
                                                <vue-editor v-model="editData.description"
                                                    placeholder="Kindly input any further information you wish to add here...">
                                                </vue-editor>
                                                <small class="red--text pl-3">{{errors[0]}}</small>
                                            </ValidationProvider>
                                        </v-container>
                                    </v-row>
                                </v-card-text>

                                <v-divider></v-divider>

                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <!-- @click="SendMessage()" -->
                                    <v-btn color="primary" type="submit" :loading="loading">
                                        Update
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
                                    <v-card-subtitle>To: {{emailAndPhoneCorrectionMessage.created_by.email}}
                                    </v-card-subtitle>


                                    <v-select :items="items" label="Support Type" outlined dense class="mx-2" disabled
                                        v-model="replay.type"></v-select>
                                    <h3 class="pl-5 ">Subject:</h3>
                                    <ValidationProvider rules="required" name="subject" v-slot="{ errors }">
                                        <v-text-field dense placeholder="Subject/Topic Here..." outlined class="mx-2"
                                            v-model="replay.subject" :error="errors.length > 0"
                                            :error-messages="errors[0]"></v-text-field>
                                    </ValidationProvider>
                                    <v-container class="mx-2">
                                        <ValidationProvider rules="required" name="description" v-slot="{ errors }">
                                            <vue-editor v-model="replay.description"
                                                placeholder="Kindly input any further information you wish to add here...">
                                            </vue-editor>
                                            <small class="red--text pl-3">{{errors[0]}}</small>
                                        </ValidationProvider>
                                    </v-container>

                                </v-card-text>

                                <v-divider></v-divider>

                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <!-- @click="SendMessage()" -->
                                    <v-btn color="primary" type="submit">
                                        send Message
                                        <v-icon right>send</v-icon>
                                    </v-btn>
                                    <v-btn color="primary" text @click="dialog = false" :loading="loading">
                                        cancel
                                    </v-btn>
                                </v-card-actions>
                            </form>

                        </ValidationObserver>
                    </v-card>
                </v-dialog>
            </div>
        </template>




        <v-container>
            <v-row class="d-flex align-content-center">
                <v-card width="100%" height="100%" class="px-5">
                    <v-card-title>subject : {{emailAndPhoneCorrectionMessage.subject}}</v-card-title>
                    <v-card-subtitle>type : {{emailAndPhoneCorrectionMessage.type}}</v-card-subtitle>
                    <v-divider></v-divider>
                    <v-card-text v-html="emailAndPhoneCorrectionMessage.description">
                    </v-card-text>
                    <v-card-text>
                        WrongEmail: {{emailAndPhoneCorrectionMessage.wrong_email}} <br>
                        CorrectEmail: {{emailAndPhoneCorrectionMessage.correct_email}}
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-subtitle>
                        <span v-if="emailAndPhoneCorrectionMessage.created_by">
                            from : {{emailAndPhoneCorrectionMessage.created_by.email}} <br>
                        </span>
                        created_at : {{emailAndPhoneCorrectionMessage.created_at}}
                    </v-card-subtitle>
                    <v-card-actions>
                        <template v-if="my">
                            <v-btn color="orange" class="white--text" @click="showEditDialog()">Edit
                                <v-icon>edit</v-icon>
                            </v-btn>
                            <v-btn color="red" class="white--text"
                                @click="deleteMessage(emailAndPhoneCorrectionMessage.id)">deletable
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
        <!-- {{my}} -->
        <!-- {{emailAndPhoneCorrectionMessage.created_by}} {{user.email}} -->

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
                loading: false,
                dialog: false,
                Editdialog: false,
                editData: {},
                my: false,
                items: ['Email/Phone Correction', 'Account Deletion', 'Account Swap',
                    'Other Issues'
                ],
                replay: {}
            }
        },
        computed: {
            ...mapGetters({
                user: 'auth/user',
                emailAndPhoneCorrectionMessage: 'compose/emailAndPhoneCorrectionMessage',
            })
        },
        methods: {
            ...mapActions({
                getEmailPhoneCorrectionMessage: 'compose/getEmailPhoneCorrectionMessage',
                RepalayMessage: 'compose/RepalayMessage',
                DeleteEmailChangeMessage: 'compose/DeleteEmailChangeMessage',
                UpdateEmailPhoneCorrections: 'compose/UpdateEmailPhoneCorrections'
            }),
            ShowReplayDialog() {
                this.replay.type = this.emailAndPhoneCorrectionMessage.type
                this.dialog = true
            },
            SendMessage() {
                this.loading = true
                this.replay.to = this.emailAndPhoneCorrectionMessage.created_by.id
                this.RepalayMessage(this.replay).then(() => {
                    Bus.$emit('showalert', 'Message sent !')
                    this.dialog = false
                    this.loading = false
                }).catch((err) => {
                    this.loading = false
                    console.log(err.response)
                })
            },
            showEditDialog() {
                // this.editData.type
                this.editData.id = this.emailAndPhoneCorrectionMessage.id
                this.editData.subject = this.emailAndPhoneCorrectionMessage.subject
                this.editData.first_name = this.emailAndPhoneCorrectionMessage.first_name
                this.editData.last_name = this.emailAndPhoneCorrectionMessage.last_name
                this.editData.wrong_email = this.emailAndPhoneCorrectionMessage.wrong_email
                this.editData.correct_email = this.emailAndPhoneCorrectionMessage.correct_email
                this.editData.description = this.emailAndPhoneCorrectionMessage.description
                // this.editData = message;
                this.Editdialog = true
                // console.log(message)
            },
            UpdateMessage() {
                this.loading = true
                this.UpdateEmailPhoneCorrections(this.editData).then(() => {
                    this.loading = false
                    Bus.$emit('showalert', 'Message updated successfully !')
                    // alert('Message updated successfully !')
                    this.Editdialog = false
                }).catch((err) => {
                    this.loading = false
                    console.log(err.response.data)
                })
            },
            deleteMessage(mid) {
                const data = {
                    id: mid
                }
                this.DeleteEmailChangeMessage(data).then(() => {
                    alert('message deleted !')
                    router.push('/app/help')
                }).catch((err) => {
                    console.log(err.response.data)
                })
            }
        },
        created() {
            // console.log(this.emailAndPhoneCorrectionMessage.created_by.email, this.user.email)
            this.getEmailPhoneCorrectionMessage(this.$route.params.id).then(() => {
                if (this.emailAndPhoneCorrectionMessage.created_by.email == this.user.email) {
                    this.my = true
                } else {
                    this.my = false
                }
            })
        },
        mounted() {
            console.log(this.emailAndPhoneCorrectionMessage.created_by.email == this.user.email)

            this.replay.type = this.emailAndPhoneCorrectionMessage.type
        }
    }
</script>