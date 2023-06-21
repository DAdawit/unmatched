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


        <v-snackbar v-model="snackbar_error" color="red darken-2">
            <span class="white--text"> {{ text }}</span>
            <template v-slot:action="{ attrs }">
                <v-icon color="white" v-bind="attrs" @click="error = false">
                    clear
                </v-icon>
            </template>
        </v-snackbar>



        <v-dialog v-model="Imagedialog" width="50%">
            <v-card>
                <v-img :src="proofImage"></v-img>
            </v-card>
        </v-dialog>

        <v-row>
            <v-btn color="secondary" class="my-6 ml-10 " dark to="/app/registrationFee">
                back
                <v-icon right>arrow_back</v-icon>
            </v-btn>

        </v-row>

        <!-- <v-row justify="center"> -->
        <!-- <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition"> -->
        <v-card tile>
            <!-- <v-toolbar flat dark color="primary">
                        <v-btn icon dark @click="dialog = false">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                        <v-toolbar-title>Search Memebers</v-toolbar-title>
                    </v-toolbar> -->
            <v-card-text>

                <v-container>
                    <v-text-field dense prepend-inner-icon="search" prefix="Search " outlined autofocus
                        placeholder="start typing ..." v-model="search"></v-text-field>
                </v-container>

                <v-container v-if="searchResult.count > 0">
                    <v-row>
                        <v-col class="d-flex justify-end">
                            <v-chip class="caption" color="info">
                                Total Number of results {{searchResult.count}}
                            </v-chip>
                        </v-col>
                    </v-row>
                </v-container>
                <!-- {{searchResult}} -->
                <div class="mx-3">
                    <v-row>
                        <v-col class="d-flex justify-center">
                            <v-progress-circular :size="70" :width="7" color="blue" indeterminate
                                v-if="loadingDonations">
                            </v-progress-circular>
                        </v-col>
                    </v-row>
                    <v-card width="100%">
                        <v-simple-table fixed-header class="elevation-1" loading-text="Loading... Please wait">
                            <template v-slot:default>
                                <thead>
                                    <tr>
                                        <th class="text-left">#ID</th>
                                        <th class="text-left">amount</th>
                                        <th class="text-left">description</th>
                                        <th class="text-left">Date</th>
                                        <th class="text-left">from</th>
                                        <th class="text-left">status</th>
                                        <th class="text-left">proof image</th>
                                        <th class="text-left" v-if="user.level != 0">Actions</th>
                                        <th class="text-center" colspan="2" v-if="user.level == 0">
                                            Admin
                                        </th>
                                    </tr>
                                </thead>
                                <!-- {{registrationFees.results[0].id}} -->
                                <tbody>
                                    <tr v-for="(fee, index) in searchResult.results" :key="fee.id">
                                        <td>{{index+1}}</td>
                                        <td>{{ fee.amount}}</td>
                                        <td><small>{{ fee.description }}</small></td>
                                        <td>{{ moment(fee.created_at).format("YYYY-MM-DD") }}</td>
                                        <td>{{ fee._from.first_name +' '+ fee._from.last_name }}</td>
                                        <td>
                                            <v-chip small :class="`${fee.status} white--text`">{{fee.status}}</v-chip>
                                        </td>
                                        <td>
                                            <v-btn outlined color="info" @click="showImage(fee.file_upload)">show proof
                                            </v-btn>
                                        </td>
                                        <td class="py-1">
                                            <v-btn v-if="user.level == 0" rounded outlined small color="success"
                                                class="mb-4" @click="ApproveReg(fee.id)">
                                                Approve</v-btn>
                                        </td>
                                        <td>
                                            <v-btn v-if="fee.status != 'Received' & user.level == 0" rounded outlined
                                                small color="warning" class="pa-3" @click="RejectReg(fee.id)"
                                                :loading="rejecting">Reject
                                            </v-btn>
                                        </td>
                                        <td v-if="user.level !=0">
                                            <v-btn small icon color="orange" @click="edit(fee)">
                                                <v-icon>edit</v-icon>
                                            </v-btn>
                                            <v-btn small icon color="red" @click="deletePayment(fee.id)"
                                                :loading="loading">
                                                <v-icon>delete</v-icon>
                                            </v-btn>
                                        </td>
                                    </tr>
                                </tbody>
                            </template>
                        </v-simple-table>
                    </v-card>
                    <template>
                        <div class="text-center" v-if="searching">
                            <v-btn outlined class="my-5 mr-3" v-if="searchResult.previous !== null"
                                @click="loadPrevious(searchResult.previous)" color="blue">
                                <v-icon>chevron_left</v-icon>prev page
                            </v-btn>
                            <v-btn class="my-5" v-if="searchResult.next !== null" outlined
                                @click="loadNext(searchResult.next)" color="blue">
                                next page
                                <v-icon>navigate_next</v-icon>
                            </v-btn>
                        </div>
                    </template>
                </div>
            </v-card-text>
        </v-card>
        <!-- </v-dialog> -->
        <!-- </v-row> -->
        <alert-vue></alert-vue>
    </div>
</template>
<script>
    import alertVue from '../alert.vue';
    import {
        Bus
    } from '../../main'
    import {
        mapGetters
    } from 'vuex';
    import axios from 'axios'
    export default {
        components: {
            alertVue
        },
        data() {
            return {
                snackbar_error: false,
                snackbar: false,
                dialog: false,
                notifications: false,
                sound: true,
                widgets: false,
                search: '',
                loadingDonations: false,
                searchResult: {},
                searching: false,
                Imagedialog: '',
                proofImage: '',
                text: '',
                rejecting: false,
                recivedStatus: {
                    status: "Received",
                },
                RejectStatus: {
                    status: "Rejected",
                },
            }
        },
        computed: {
            ...mapGetters({
                user: "auth/user",

            })
        },
        methods: {

            showImage(image) {
                this.proofImage = image
                this.Imagedialog = true;
            },
            loadNext(nextlink) {
                this.loadingDonations = true;
                axios.get(nextlink).then(res => {
                        this.searchResult = res.data;
                        this.loadingDonations = false;
                    })
                    .catch(err => {
                        console.log(err);
                        this.loadingDonations = false;
                    });
            },
            loadPrevious(prevlink) {
                this.loadingDonations = true;
                axios.get(prevlink).then(res => {
                        this.searchResult = res.data;
                        this.loadingDonations = false;
                    })
                    .catch(err => {
                        console.log(err);
                        this.loadingDonations = false;
                    });
            },
            ApproveReg(id) {
                const approveStatus = {
                    id: id,
                    status: "Received",
                }
                // console.log(approveStatus)
                axios.patch(`registeration-fees/${id}`,approveStatus).then(() => {
                    this.text = 'service charge approved';
                    this.snackbar = true;
                    this.searchResult = {}
                }).catch((err) => {
                    this.text = err.response.data.detail[0];
                    this.snackbar_error = true;
                })
            },

            RejectReg(id) {
                const RejectStatus = {
                    id: id,
                    status: "Rejected",
                }
                // console.log(RejectStatus)

                axios.patch(`registeration-fees/${id}`,RejectStatus).then(() => {
                    this.text = 'service charge rejected';
                    this.snackbar = true;
                    this.searchResult = {}
                }).catch((err) => {
                    this.text = err.response.data.detail[0];
                    this.snackbar_error = true;
                })
            },
        },
        watch: {
            search(newval) {
                this.loadingDonations = true;
                if (newval.length > 2) {
                    axios.get(`registeration-fees?search=${newval}`).then(res => {
                        // console.log(res.data)
                        this.searchResult = res.data
                        this.searching = true;
                        this.loadingDonations = false;

                    })
                }
                if (newval < 3) {
                    this.searchResult = {}
                }
            },
        }
    }
</script>

<style scoped>
    .v-chip.Pending {
        background: #ffb74d;
    }

    .v-chip.Received {
        background: #00b619;
    }

    .v-chip.Rejected {
        background: #b60600;
    }

    .center {
        margin: 0 auto;
    }
</style>