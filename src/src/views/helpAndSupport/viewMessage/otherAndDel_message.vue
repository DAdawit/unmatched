<template>
    <div>
        <br><br><br>
        <!-- {{otherMessage}} -->
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
                                        v-model="otherMessage.type"></v-select>
                                    <h3 class="pl-5 ">Subject:</h3>
                                    <ValidationProvider rules="required" name="subject" v-slot="{ errors }">
                                        <v-text-field dense placeholder="Subject/Topic Here..." outlined class="mx-2"
                                            v-model="editData.subject" :error="errors.length > 0"
                                            :error-messages="errors[0]"></v-text-field>
                                    </ValidationProvider>

                                    <h3 class="pl-5 pb-5">Affected Account Information:</h3>

                                    <!-- <ValidationProvider rules="required" name="First Name" v-slot="{ errors }">
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
                                    </ValidationProvider> -->
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
                                    <v-card-subtitle>To: {{otherMessage.created_by.email}}</v-card-subtitle>

                                    <v-select :items="items" label="Support Type" outlined dense class="mx-2" disabled
                                        v-model="replay.type"></v-select>
                                    <h3 class="pl-5 ">Subject:</h3>
                                    <ValidationProvider rules="required" name="subject" v-slot="{ errors }">
                                        <v-text-field dense placeholder="Subject/Topic Here..." outlined class="mx-2"
                                            v-model="replay.subject" :error="errors.length > 0"
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

                                </v-card-text>

                                <v-divider></v-divider>

                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="primary" :loading="loading" type="submit">
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




        <v-container>
            <v-row class="d-flex align-content-center">
                <v-card width="100%" height="100%" class="px-5">
                    <v-card-title>subject : {{otherMessage.subject}}</v-card-title>
                    <v-card-subtitle>type : {{otherMessage.type}}</v-card-subtitle>
                    <v-divider></v-divider>
                    <v-card-text v-html="otherMessage.description">
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-subtitle>
                        <span v-if="otherMessage.created_by">
                            from : {{otherMessage.created_by.email}}
                        </span> <br>

                        created_at : {{otherMessage.created_at}}
                    </v-card-subtitle>
                    <v-card-actions>

                        <template v-if="my">
                            <v-btn color="orange" class="white--text" @click="showEditDialog()">Edit
                                <v-icon>edit</v-icon>
                            </v-btn>
                            <v-btn color="red" class="white--text"
                                @click="deleteMessage(otherMessage.id)">deletable
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
        <!-- <h1>{{my}}</h1> -->
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
                dialog: false,
                items: ['Email/Phone Correction', 'Account Deletion', 'Account Swap',
                    'Other Issues'
                ],
                replay: {},
                loading: false,
                my: false,
                editData: {},
                Editdialog: false,
            }
        },
        computed: {
            ...mapGetters({
                user: 'auth/user',
                otherMessage: 'compose/otherMessage'
            })
        },
        methods: {
            ...mapActions({
                getOtherMessage: 'compose/getOtherMessage',
                RepalayMessage: 'compose/RepalayMessage',
                UpdateDeleteAccounts: 'compose/UpdateDeleteAccounts',
                DeleteAccountAndOtherMessage: 'compose/DeleteAccountAndOtherMessage'
            }),
            ShowReplayDialog() {
                this.replay.type = this.otherMessage.type
                this.dialog = true
            },
            SendMessage() {
                this.loading = true
                this.replay.to = this.otherMessage.created_by.id
                this.RepalayMessage(this.replay).then(() => {
                    this.dialog = false
                    this.loading = false
                    Bus.$emit('showalert', 'Message sent !')
                }).catch((err) => {
                    Bus.$emit('showalert', 'showError !')
                    this.dialog = false
                    this.loading = false
                    console.log(err.response)
                })
            },
            showEditDialog() {
                // this.editData.type
                this.editData.id = this.otherMessage.id
                this.editData.subject = this.otherMessage.subject
                this.editData.description = this.otherMessage.description
                // this.editData = message;
                this.Editdialog = true
                // console.log(message)
            },
            UpdateMessage() {
                this.loading = true
                // console.log(this.editData)
                this.UpdateDeleteAccounts(this.editData).then(() => {
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
                this.DeleteAccountAndOtherMessage(id).then(() => {
                      Bus.$emit('showalert', 'Message updated successfully !')
                    router.push('/app/help')
                }).catch((err) => {
                    console.log(err.response.data)
                })
            }
        },
        created() {
            this.getOtherMessage(this.$route.params.id).then(() => {
                if (this.otherMessage.created_by.email == this.user.email) {
                    this.my = true
                } else {
                    this.my = false
                }
            })
        },
        mounted() {
            // this.replay.type = this.otherMessage.type
        }
    }
</script>