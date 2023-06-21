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

        <v-dialog max-width="550" persistent v-model="dialog">
            <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" v-bind="attrs" depressed v-on="on" class="mr-1" small>audio Message <v-icon right
                        small>keyboard_voice
                    </v-icon>
                </v-btn>
            </template>
            <template v-slot:default="dialog">
                <v-card>
                    <v-toolbar color="primary" dark>Record audio <small class="pl-1"> (record your audio,select from the
                            list, download audio file and upload the audio file)</small></v-toolbar>
                    <v-card-text class="pt-2">
                        <audio-recorder :time="4" :start-record="callback" :stop-record="callback"
                            :start-upload="callback" :show-upload-button="false" :successful-upload="callback"
                            :failed-upload="callback" />
                        <br>
                        <input type="file" @change="selectImage" accept=".mp3,.wav,.ogg">
                        <small class="red--text" v-if="showError"> pleas choose file </small>
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
                    to: '062e853e-b7d5-4130-aabb-92012f3c4b4e',
                    file_upload: null,
                    showError: false
                },
                selectedAudio: null,
                showError: false,
                snackbar: false,
                text: 'Message sent !'
            }
        },
        methods: {
            callback(data) {
                console.debug(data)
            },
            selectImage(e) {
                this.selectedAudio = e.target.files[0]
                // console.log(this.selectedImage);
            },
            async sendMessage() {
                if (this.selectedAudio === null) {
                    this.showError = true
                    return
                } else {
                    this.showError = false
                    this.loading = true
                    const fd = new FormData();
                    fd.append("file_upload", this.selectedAudio, this.selectedAudio.name);
                    fd.append('to', '062e853e-b7d5-4130-aabb-92012f3c4b4e')
                    await axios.post('broadcast-messages', fd).then((res) => {
                        // console.log(res.data)
                        this.dialog = false
                        this.loading = false;
                        this.messageData.message = ''
                        this.snackbar=true
                        this.$emit('FetchMessages');
                    }).catch((err) => {
                        this.loading = false
                        console.log(err);
                    })
                }
            }
        },


    }
</script>