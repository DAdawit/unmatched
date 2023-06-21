<template>
    <div>
        <v-dialog v-model="Imagedialog" width="50%">
            <v-card>
                <v-img :src="proofImage"></v-img>
            </v-card>
        </v-dialog>
        <v-container v-if="approvedSeedLength >0">
            <v-row>
                <h1 class="text-underline text--secondary">Aproved Seed list</h1>
            </v-row>
            <v-card text v-for="seed in approvedSeeds" :key="seed.id" :class="` post ${seed.status} py-2 px-5 mt-5`">
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
                        <v-flex xs6 sm4 md lg3>
                            <div class="caption grey--text">Date</div>
                            <div>{{moment(seed.created_at).format('YYYY-MM-DD')}}</div>
                            <!-- <span>{{moment(date).format('YYYY-MM-DD')}}</span> -->

                        </v-flex>
                        <v-flex xs6 sm4 md2 lg3>
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
                    </v-layout>
                </v-container>
            </v-card>
        </v-container>
        <v-card class="mx-3" v-if="approvedSeedLength < 1" flat tile>
            <v-card-title class="d-flex justify-center">No Approved seed data</v-card-title>
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
                approvedSeeds: {},
                approvedSeedLength: 0,
                proofImage: ''
            }
        },
        computed: {
            ...mapGetters({
                // pendingSeeds: 'seed/pendingSeeds',
                seeds: 'seed/seeds'
            }),

        },
        methods: {
            showImage(image) {
                this.proofImage = image
                this.Imagedialog = true;
                console.log(image)
            }
        },
        mounted() {
            this.approvedSeeds = this.seeds.results.filter((item) => {
                return item.status.match('Received')
            })
            this.approvedSeedLength = this.approvedSeeds.length;
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