<template>
    <div>
        <v-dialog v-model="Imagedialog" width="50%">
            <v-card>
                <v-img :src="proofImage"></v-img>
            </v-card>
        </v-dialog>
        <v-container v-if="harvests">
            <v-card text v-for="(harvest,index) in harvests.results" :key="index"
                :class="` post ${harvest.status} px-5 mt-5`">
                <v-container>
                    <v-layout row wrap class="pa-3">
                        <v-flex xs12 md4 lg1>
                            <div class="caption grey--text ">amount</div>
                            <div class="pl-2">{{harvest.amount}}</div>
                        </v-flex>
                        <v-flex xs6 sm4 md1 lg1>
                            <div class="caption grey--text">description</div>
                            <div>{{harvest.description}}</div>
                        </v-flex>
                        <v-flex xs6 sm4 md1 lg1>
                            <div class="caption grey--text">from</div>
                            <div>{{harvest._from.first_name}} {{harvest._from.last_name}}</div>
                        </v-flex>
                        <v-flex xs6 sm4 md2 lg2>
                            <div class="caption grey--text">Date</div>
                            <div>{{moment(harvest.created_at).format('YYYY-MM--DD')}}</div>
                        </v-flex>
                        <v-flex xs6 sm4 md2 lg2>
                            <div class="caption grey--text">Status</div>
                            <v-chip small :class="`${harvest.status} white--text`">{{harvest.status}}</v-chip>
                        </v-flex>
                        <v-flex xs6 sm4 md2 lg2>
                            <div class="caption grey--text">Proof</div>
                            <v-btn small class="primary" @click="showprofe(harvest.file_upload)">show proof</v-btn>
                        </v-flex>
                        <v-flex xs6 sm4 md2 lg2>
                            <div class="caption grey--text">Action</div>
                            <v-btn rounded outlined small color="success" class="mb-4" @click="Approve(harvest.id)"
                                :loading="approveing">Approve</v-btn> <br>
                            <v-btn rounded outlined small color="warning" class="pa-3" @click="Reject(harvest.id)"
                                :loading="rejecting">Reject</v-btn>
                        </v-flex>

                    </v-layout>
                </v-container>
            </v-card>
        </v-container>
        <alert />
    </div>
</template>


<script>
    import {
        Bus
    } from '../../main'
    import alert from '../../components/alert.vue'
    import {
        mapActions,
        mapGetters
    } from 'vuex'
    export default {
        components: {
            alert
        },
        data() {
            return {
                approveing: false,
                rejecting: false,
                dialog: false,
                Imagedialog: '',
                proofImage: '',
                approveStatus: {
                    status: 'Received'
                },
                RejectStatus: {
                    status: 'Rejected'
                },
            }
        },
        computed: {
            ...mapGetters({
                // harvestMemeberList: 'harvest/harvestMemeberList',
                harvests: 'harvest/harvests'
            })
        },
        methods: {
            ...mapActions({
                // fetchMyHarvestMemebers: 'harvest/fetchMyHarvestFromMemeber',
                ApproveSeed: 'harvest/ApproveSeed',
                RejectSeed: 'harvest/RejectSeed',
                harvest: 'harvest/getHarvestList'
            }),
            Approve(id) {
                // this.approveing = true;
                this.approveStatus.id = id
                this.ApproveSeed(this.approveStatus).then(() => {
                    this.approveing = false;
                    Bus.$emit('showalert', 'accepted !')
                }).catch((err) => {
                    // this.approveing = false;
                    Bus.$emit('showError', err.response.data.errors.detail[0])
                    // console.log(err.response.data.errors.detail[0])
                })

            },
            Reject(id) {
                // this.rejecting = true
                this.RejectStatus.id = id
                this.RejectSeed(this.RejectStatus).then(() => {
                    // this.rejecting = false;
                    Bus.$emit('showalert', 'Rejected !')
                }).catch((err) => {
                    this.rejecting = false;
                    Bus.$emit('showError', err.response.data.errors.detail[0])
                    console.log(err)
                })
            },

            showprofe(image) {
                // console.log(image)
                this.proofImage = image
                this.Imagedialog = true;
            }
        },

        created() {
            this.harvest()

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
        background: #c2332f;
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