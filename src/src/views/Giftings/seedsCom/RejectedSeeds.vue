<template>
    <div>
        <v-dialog v-model="Imagedialog" width="50%">
            <v-card>
                <v-img :src="proofImage"></v-img>
            </v-card>
        </v-dialog>
        <v-dialog v-model="dialog" width="500">
            <v-card>
                <v-card-title class="text-h5 grey lighten-2">
                    Privacy Policy
                </v-card-title>
                <ValidationObserver v-slot="{ handleSubmit }">
                    <form @submit.prevent="handleSubmit(update)">
                        <v-card-text>
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
                                <label>Proof image</label><br>
                                <ValidationProvider rules="image" name="image proof" v-slot="{ errors }">
                                    <input type="file" @change="selectImage">
                                    <br>
                                    <small class="red--text pl-3">{{errors[0]}}</small>
                                </ValidationProvider>
                                <br><br>
                            </v-card-text>
                        </v-card-text>
                        <v-divider></v-divider>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" text @click="closeEdit()">
                                I accept
                            </v-btn>
                        </v-card-actions>
                    </form>
                </ValidationObserver>
            </v-card>
        </v-dialog>


        <v-container v-if="rejectedSeedLength >0">
            <v-row>
                <h1 class="text-underline text--secondary">Rejected Seed list</h1>
            </v-row>
            <v-card text v-for="seed in rejectedSeeds" :key="seed.id" :class="` post ${seed.status} py-2 px-5 mt-5`">
                <v-container>
                    <v-layout row wrap class="pa-3">
                        <v-flex xs12 md2 lg1>
                            <div class="caption grey--text ">amount</div>
                            <div class="pl-2">{{seed.amount}}</div>
                        </v-flex>
                        <v-flex xs6 sm4 md3 lg3>
                            <div class="caption grey--text">description</div>
                            <div>{{seed.description}}</div>
                        </v-flex>
                        <v-flex xs6 sm4 md2 lg2>
                            <div class="caption grey--text">Date</div>
                            <!-- <div>{{seed.created_at}}</div> -->
                            <div>{{moment(seed.created_at).format('YYYY-MM-DD')}}</div>

                        </v-flex>
                        <v-flex xs6 sm4 md2 lg2>
                            <div class="caption grey--text">To</div>
                            <div>{{seed._to.first_name}} {{seed._to.last_name}}</div>
                        </v-flex>
                        <v-flex xs6 sm4 md2 lg2>
                            <div class="caption grey--text">status</div>
                            <v-chip small :class="`${seed.status} white--text`">{{seed.status}}</v-chip>
                        </v-flex>
                        <v-flex xs6 sm4 md2 lg2>
                            <div class="caption grey--text">Proof</div>
                            <v-btn outlined color="primary" @click="showImage(seed.file_upload)">show proof
                                <v-icon right>image</v-icon>
                            </v-btn>
                        </v-flex>
                        <v-flex xs6 sm4 md2 lg2>
                            <div class="caption grey--text">Action</div>
                            <v-btn small icon color="orange" @click="editSeed(seed)">
                                <v-icon>edit</v-icon>
                            </v-btn>
                            <v-btn small icon color="red" @click="deleteSeed(seed.id)" :loading="loading">
                                <v-icon>delete</v-icon>
                            </v-btn>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-card>
        </v-container>
        <v-card class="mx-3" v-if="rejectedSeedLength < 1" flat tile>
            <v-card-title class="d-flex justify-center">No Rejected seedes</v-card-title>
            <v-card-title class="d-flex justify-center">THANK YOU!</v-card-title>
        </v-card>
    </div>
</template>
<script>
    import {
        mapGetters
    } from 'vuex';
    export default {
        data() {
            return {
                rejectedSeeds: {},
                rejectedSeedLength: 0,
                dialog: false,
                editData: {},
                proofImage: '',
                rounds: ['First Round', 'Second Round', 'Third Round', 'Fourth Round', 'Fivth Round']
            }
        },
        computed: {
            ...mapGetters({
                // pendingSeeds: 'seed/pendingSeeds',
                seeds: 'seed/seeds'
            }),

        },
        methods: {
            editSeed(data) {
                this.dialog = true;
                this.editData.amount = data.amount;
                this.editData.description = data.description;
            },
            deleteSeed(id) {
                console.log(id)
            },
            closeEdit() {
                this.dialog = false;
            },
            showImage(image) {
                this.proofImage = image
                this.Imagedialog = true;
                // console.log(image)
            }
        },

        mounted() {
            this.rejectedSeeds = this.seeds.results.filter((item) => {
                return item.status.match('Rejected')
            })
            this.rejectedSeedLength = this.rejectedSeeds.length;
        }
    }
</script>
<style scoped>
    .v-chip.Pending {
        background: #FFB74D;
    }

    .v-chip.Received {
        background: #00b619;
    }

    .v-chip.Rejected {
        background: #b60600;
    }

    .v-icon.Received {
        display: none;
    }

    .post.Pending {
        border-left: 4px solid #FFB74D;
    }

    .post.Received {
        border-left: 4px solid #00b619;
    }

    .post.Rejected {
        border-left: 4px solid #b60600;
    }
</style>