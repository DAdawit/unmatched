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

        <v-dialog max-width="600" persistent v-model="dialog">
            <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" v-bind="attrs" depressed v-on="on" small>write Message <v-icon right small>chat
                    </v-icon>
                </v-btn>
            </template>
            <template v-slot:default="dialog">
                <v-card>
                    <v-toolbar color="primary" dark>Write Message</v-toolbar>
                    <v-card-text>
                        <v-textarea v-model="messageData.message" label="Write your text here ..."></v-textarea>
                        <small class="red--text" v-if="showError"> Message required ! </small>

                    </v-card-text>
                    <v-card-actions class="justify-end">
                        <v-btn class="primary" @click="sendMessage" :loading="loading">send <v-icon right>send</v-icon>
                        </v-btn>
                        <v-btn text @click="dialog.value = false">Close</v-btn>
                    </v-card-actions>
                </v-card>
            </template>
        </v-dialog>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        data() {
            return {
                loading: false,
                dialog: false,
                messageData: {
                    message: '',
                    to: '062e853e-b7d5-4130-aabb-92012f3c4b4e'
                },
                showError:false,
                 snackbar: false,
                text: 'Message sent !'
            }
        },
        methods: {
            async sendMessage() {
                if (this.messageData.message === '') {
                    this.showError = true
                    return
                } else {
                    this.loading = true
                    await axios.post('broadcast-messages', this.messageData).then((res) => {
                        // console.log(res.data)
                        this.dialog = false
                        this.loading = false;
                        this.messageData.message = ''
                        this.$emit('FetchMessages');
                        this.snackbar=true
                    }).catch((err) => {
                        this.loading = false
                        console.log(err);
                    })
                }
            }
        },


    }
</script>