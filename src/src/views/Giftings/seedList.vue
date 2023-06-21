<template>
    <div>
        <!-- <v-dialog v-model="dialog" width="500">
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
                                <ValidationProvider rules="required" name="round" v-slot="{ errors }">
                                    <v-select v-model="editData.round"
                                        :items="['First Round','Second Round','Third Round','Fourth Round','Fivth Round']"
                                        label="round" outlined dense :error="errors.length > 0"
                                        :error-messages="errors[0]">
                                    </v-select>
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
                            <v-btn color="primary" text @click="dialog = false">
                                I accept
                            </v-btn>
                        </v-card-actions>
                    </form>
                </ValidationObserver>
            </v-card>
        </v-dialog> -->



        <br> <br><br>
        <!-- <v-container v-if="seeds.results.length >0">
            <v-row>
                <h1 class="text-underline text--secondary">Seed list</h1>
            </v-row>
            <v-card text v-for="seed in seeds.results" :key="seed.id" :class="` post ${seed.status} py-2 px-5 mt-5`">
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
                            <div>{{seed.created_at}}</div>
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
        <v-card class="mx-3" v-if="seeds.results.length < 1">
            <v-card-title class="d-flex justify-center">No seeded data</v-card-title>
            <v-card-title class="d-flex justify-center">THANK YOU!</v-card-title>
        </v-card> -->

        <alert />


        <v-card flat class="my-10">
            <v-card-title class="text-center justify-center py-6">
                <h1 class="subheading grey--text mb-5 ">Dashboard</h1>
            </v-card-title>
            <v-tabs fixed-tabs background-color="transparent" color="light-blue darken-3">
                <v-tab to="">
                    pending seeds
                    <v-icon right>pending</v-icon>
                </v-tab>
                <v-tab>
                    approved seeds
                    <v-icon right>verified</v-icon>
                </v-tab>
                <v-tab>
                    rejected seeds
                    <v-icon right>thumb_down_alt</v-icon>
                </v-tab>
                <v-tab>
                    Manage My Acutions
                    <v-icon right>settings</v-icon>
                </v-tab>
                <v-tab-item>
                    <penndingSeeds />
                </v-tab-item>
                <v-tab-item>
                    <approvedSeeds />
                </v-tab-item>
                <v-tab-item>
                    <rejectedSeeds />
                </v-tab-item>
            </v-tabs>
        </v-card>
    </div>
</template>

<script>
    // import {
    //     Bus
    // } from '../../main'
    import alert from '../../components/alert.vue'
    import penndingSeeds from './seedsCom/penndingSeeds'
    import approvedSeeds from './seedsCom/approvedSeeds'
    import rejectedSeeds from './seedsCom/RejectedSeeds'
    import {mapActions,mapGetters} from 'vuex'
    export default {
        components: {
            alert,
            penndingSeeds,
            approvedSeeds,
            rejectedSeeds,
        },
        data() {
            return {
                seed: {},
                selectedImage: null,
                dialog: false,
                loading: false,
                editData: {}
            }
        },
        computed: {
            ...mapGetters({
                seeds: "seed/seeds",
            })
        },
        methods: {
            ...mapActions({
                getSeeds: 'seed/getSeeds',
                deleteMySeed: 'seed/deleteMySeed',

            }),
            selectImage(e) {
                this.selectedImage = e.target.files[0]
                // console.log(this.selectedImage);
            },
            deleteSeed(id) {
                this.loading = true
                this.deleteMySeed(id).then(() => {
                    this.loading = false
                }).catch((err) => {
                    this.loading = false
                    console.log(err)
                })
            },
            editSeed(data) {
                this.dialog = true;
                this.editData = data
            }
        },
        created() {
            // this.getSeeds().then((res) => {
            //     console.log(res)
            // }).catch((err) => {
            //     console.log(err)
            // })
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