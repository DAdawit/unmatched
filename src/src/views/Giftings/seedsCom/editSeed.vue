<template>
    <div>
        <v-dialog v-model="dialog" width="500" persistent>
            <v-card>
                <v-card-title class="text-h5 grey lighten-2">
                    Privacy Policy
                    <!-- {{seed}} -->
                </v-card-title>
                <ValidationObserver v-slot="{ handleSubmit }">
                    <form @submit.prevent="handleSubmit(updateseed)">
                        <v-card-text>
                            <ValidationProvider rules="required|integer" name="amount" v-slot="{ errors }">
                                <v-text-field dense outlined label="amount" v-model="editData.amount"
                                    :error="errors.length > 0" :error-messages="errors[0]">
                                </v-text-field>
                            </ValidationProvider>
                            <ValidationProvider rules="required" name="description" v-slot="{ errors }">
                                <v-textarea outlined label="description" v-model="editData.description"
                                    :error="errors.length > 0" :error-messages="errors[0]">
                                </v-textarea>
                            </ValidationProvider>
                            <ValidationProvider rules="required" name="round" v-slot="{ errors }">
                                <v-select v-model="editData.round"
                                    :items="['First Round','Second Round','Third Round','Fourth Round','Fivth Round']"
                                    label="Round" outlined dense :error="errors.length > 0" :error-messages="errors[0]">
                                </v-select>
                            </ValidationProvider>
                            <label>Proof image</label> <br>
                            <ValidationProvider rules="image" name="image proof" v-slot="{ errors }">
                                <input type="file" @change="selectImage">

                                <br>
                                <small class="red--text pl-3">{{errors[0]}}</small>
                            </ValidationProvider>
                            <br><br>
                        </v-card-text>
                        <v-divider></v-divider>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" type="submit">
                                update
                            </v-btn>
                            <v-btn text color="primary" @click="cancelEdit()">
                                Cancel
                            </v-btn>
                        </v-card-actions>
                    </form>
                </ValidationObserver>
            </v-card>
        </v-dialog>

        <!-- <h1>edit seed</h1> -->
        <!-- {{seed}} -->
        <alert />
    </div>
</template>
<script>
    // import {Bus} from '@/main.js'
    import alert from '@/components/alert'
    import router from '@/router/index'
    import {
        mapGetters,
        mapActions
    } from 'vuex'

    export default {
        components: {
            alert
        },
        data() {
            return {
                dialog: false,
                editData: {},
                selectedImage: null
            }
        },
        computed: {
            ...mapGetters({
                seed: 'seed/seed'
            })
        },

        methods: {
            ...mapActions({
                getSeed: 'seed/getSeed',
                editSeed: 'seed/editSeed',
                editSeedWithImage: 'seed/editSeedWithImage'
            }),
            updateseed() {
                // console.log(this.editData)
                if (this.selectedImage == null) {
                    this.editSeed(this.editData).then(() => {
                        router.push('/app/seed/pennding')
                    }).catch((err) => {
                        console.log('err', err.response)
                    })
                } else if (this.selectedImage != null) {
                    // console.log('there is image')
                    const fd = new FormData();
                    fd.append("file_upload", this.selectedImage, this.selectedImage.name);
                    fd.append("amount", this.editData.amount)
                    fd.append("description", this.editData.description)
                    fd.append("round", this.editData.round)
                    fd.append("id", this.editData.id)
                    this.editSeedWithImage(fd).then(()=>{
                        router.push('/app/seed/pennding')
                    }).catch((err) => {
                        console.log(err.response)
                    })
                }

            },
            cancelEdit() {
                alert('cancel edit')
                router.push('/app/seed/pennding')
            },
            selectImage(e) {
                this.selectedImage = e.target.files[0]
                // console.log(this.selectedImage);
            },
        },

        created() {
            this.getSeed(this.$route.params.id).then(() => {
                this.editData.id = this.seed.id;
                this.editData.amount = this.seed.amount;
                this.editData.description = this.seed.description
                this.editData.round = this.seed.round;
                this.dialog = true
            })
        },
        mounted() {

            // this.dialog = true;
        }

    }
</script>