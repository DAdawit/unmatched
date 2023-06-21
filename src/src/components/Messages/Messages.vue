<template>
    <div>
        <v-snackbar v-model="snackbar" color="teal darken-1">
            <span class="white--text"> {{ text }}</span>
            <template v-slot:action="{ attrs }">
                <v-icon color="white" v-bind="attrs" @click="snackbar = false">
                    clear
                </v-icon>
            </template>
        </v-snackbar>



        <v-container v-if="user.level===0">
            <v-row>
                <v-col class="d-flex justify-end">
                    <AudioMessage v-on:FetchMessages="fetchMessages()" />
                    <AddNewMessage v-on:FetchMessages="fetchMessages()" />
                </v-col>
            </v-row>
        </v-container>

        <v-overlay :value="overlay">
            <v-progress-circular color="blue" indeterminate size="64"></v-progress-circular>
        </v-overlay>
        <!-- delete alert  -->
        <v-dialog v-model="deleteDialog" persistent max-width="400">
            <v-card>

                <v-alert prominent type="error" max-height="300" class="py-5">

                    <v-row align="center" class="d-flex justify-center mb-5">
                        Delete this message
                    </v-row>
                    <v-row class="shrink justify-center">
                        <v-btn class="mr-2" :loading="deleteLoading" @click="deleteMessage(postId)">delete <v-icon
                                right>delete</v-icon>
                        </v-btn>
                        <v-btn @click="deleteDialog=false">cancel</v-btn>

                    </v-row>
                </v-alert>
            </v-card>
        </v-dialog>

        <!-- view message Detail  -->
        <v-dialog v-model="viewMessageDialog" persistent max-width="600" v-if="show">
            <v-card>
                <v-card-title class="text-decoration-underline">{{messageDetail.created_by.email}}</v-card-title>
                <v-card-text>{{messageDetail.message}}</v-card-text>
                <div v-if="messageDetail.file_upload !== null">
                    <audio-player :src="messageDetail.file_upload" />
                </div>
                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="viewMessageDialog = false">
                        close
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!-- updatemessage dialog  -->
        <div>
            <v-dialog max-width="600" persistent v-model="updateDialog" v-if="showUpdatedialog">
                <template>
                    <v-card>
                        <v-toolbar color="primary" dark>Write Message</v-toolbar>
                        <v-card-text>
                            <v-textarea v-model="updateData.message" label="Write your text here ..."></v-textarea>
                        </v-card-text>
                        <v-card-actions class="justify-end">
                            <v-btn class="primary" @click="updateMessage" :loading="updateLoading">update <v-icon right>
                                    update
                                </v-icon>
                            </v-btn>
                            <v-btn text @click="updateDialog = false">Close</v-btn>
                        </v-card-actions>
                    </v-card>
                </template>
            </v-dialog>
        </div>



        <template>
            <v-simple-table>
                <template v-slot:default>
                    <thead>
                        <tr>
                            <th class="text-left">
                                From
                            </th>
                            <th class="text-left">
                                Message
                            </th>
                            <th class="text-left">
                                Date
                            </th>
                            <th class="text-center">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="message in messages.results" :key="message.id">
                            <td>{{message.created_by.email}}</td>
                            <td v-if="message.message">{{ message.message | snippet }}</td>
                            <td v-else>
                                Audio message. Clik view and listen ...
                            </td>


                            <!-- <td>{{ message.message | snippet }}</td> -->
                            <td>{{ moment(message.created_at).format("LLL")}}</td>

                            <td colspan="3">
                                <v-btn icon @click="showUpDialog(message)" small :disabled="message.file_upload"
                                    v-if="user.level===0" class="mr-3">
                                    <v-icon color="yellow darken-3" >
                                        edit
                                    </v-icon>
                                </v-btn>
                                <v-btn icon small v-if="user.level===0">
                                    <v-icon color="red lighten-1" @click="showDeleteAlert(message.id)" >
                                        delete
                                    </v-icon>
                                </v-btn>

                                <v-btn class="primary" @click="showMessage(message)" >
                                    view
                                    <v-icon right small>
                                        visibility
                                    </v-icon>
                                </v-btn>
                            </td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>
        </template>



        <div class="text-center">
            <v-btn outlined class="my-5 mr-3" v-if="messages.previous !== null" @click="loadPrevious(messages.previous)"
                color="blue">
                <v-icon>chevron_left</v-icon>prev page
            </v-btn>
            <v-btn class="my-5" v-if="messages.next !== null" outlined @click="loadNext(messages.next)" color="blue">
                next page
                <v-icon>navigate_next</v-icon>
            </v-btn>
        </div>
    </div>
</template>

<script>
    import {
        mapGetters
    } from 'vuex'
    import axios from 'axios'
    import AddNewMessage from './AddNewMessage'
    import AudioMessage from './audioMessage.vue'
    export default {
        components: {
            AddNewMessage,
            AudioMessage
        },
        data() {
            return {
                messages: {},
                audio: null,
                overlay: false,
                deleteDialog: false,
                deleteLoading: false,
                postId: '',
                viewMessageDialog: false,
                messageDetail: {},
                show: false,
                updateDialog: false,
                showUpdatedialog: false,
                updateData: {},
                snackbar: false,
                text: '',
                updateLoading: false

            }
        },
        computed: {
            ...mapGetters({
                user: 'auth/user',

            })
        },
        methods: {
            callback(data) {
                console.debug(data)
                this.audio = data
            },
            stopRecord(data) {
                console.log(data);
            },
            showDeleteAlert(id) {
                this.postId = id
                this.deleteDialog = true

            },
            showMessage(message) {
                this.messageDetail = message
                this.viewMessageDialog = true
                this.show = true
            },
            showUpDialog(message) {
                this.updateData.message = message.message
                this.updateData.id = message.id
                this.updateDialog = true
                this.showUpdatedialog = true
            },
            async updateMessage() {
                this.updateLoading = true;
                await axios.patch(`broadcast-messages/${this.updateData.id}`, this.updateData).then((res) => {
                    console.log(res.data);
                    this.updateDialog = false
                    this.showUpdatedialog = false
                    this.updateLoading = false;
                    this.fetchMessages();
                    this.text = 'updated successfuly !'
                    tihs.snackbar = true
                }).catch((err) => {
                    console.log(err);
                })
            },
            async deleteMessage(id) {
                this.deleteLoading = true
                await axios.delete(`broadcast-messages/${id}`).then((res) => {
                    console.log(res.data)
                    this.deleteDialog = false
                    this.deleteLoading = false
                    this.text = 'Deleted successfuly !'
                    this.snackbar = true
                    this.fetchMessages();
                }).catch((err) => {
                    console.log(err);
                })
            },
            loadPrevious(prevlink) {
                this.overlay = true;
                axios
                    .get(prevlink)
                    .then(res => {
                        this.messages = res.data;
                        this.overlay = false;
                    })
                    .catch(err => {
                        console.log(err);
                        this.loadingDonations = false;
                        this.overlay = false;

                    });
            },
            loadNext(nextlink) {
                this.overlay = true;
                axios
                    .get(nextlink)
                    .then(res => {
                        this.messages = res.data;
                        this.overlay = false;
                    })
                    .catch(err => {
                        console.log(err);
                        this.loadingDonations = false;
                        this.overlay = false;

                    });
            },

            fetchMessages() {
                this.overlay = true
                axios.get('broadcast-messages').then((res) => {
                    this.messages = res.data
                    this.overlay = false
                }).catch((err)=>{
                    this.overlay=false
                    console.log(err.response.statusText);
                })
            }

        },
        created() {
            this.fetchMessages();
        }

    }
</script>