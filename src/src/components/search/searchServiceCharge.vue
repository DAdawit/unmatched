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
            <v-btn color="secondary" class="my-6 ml-10 " dark to="/app/charityDonation">
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
                        <v-simple-table fixed-header class="elevation-1" loading-text="Loading... Please wait"
                            v-if="!loadingDonations">
                            <template v-slot:default>
                                <thead>
                                    <tr>
                                        <th class="text-left">From</th>
                                        <th class="text-left">AMOUNT</th>
                                        <th class="text-left">DETAILS</th>
                                        <th class="text-left">Status</th>
                                        <th class="text-left">Round</th>
                                        <th class="text-left">Phone</th>
                                        <th class="text-left">DATE</th>
                                        <th class="text-left">proof</th>
                                        <th class="text-center" v-if="user.level != 0">Actions</th>
                                        <th class="text-center" colspan="2" v-if="user.level == 0">
                                            Admin
                                        </th>
                                    </tr>
                                </thead>

                                <!-- <tbody v-if="donations"> -->
                                <tr v-for="(donation, index) in searchResult.results" :key="index">
                                    <td>
                                        {{ donation._from.first_name }} {{ donation._from.last_name }}
                                    </td>
                                    <td>{{ donation.amount }}</td>
                                    <td>{{ donation.description }}</td>
                                    <td>
                                        <v-chip :class="`${donation.status} white--text`">{{donation.status}}
                                        </v-chip>
                                    </td>
                                    <td>{{ donation.round }}</td>
                                    <td>
                                        {{ donation._from.phone }}
                                    </td>
                                    <td>{{moment(donation.created_at).format('YYYY-MM-DD')}}</td>
                                    <td>
                                        <v-btn text outlined color="primary" @click="showProof(donation.file_upload)">
                                            show proof
                                        </v-btn>
                                    </td>
                                    <td v-if="user.level != 0 ">
                                        <v-btn v-if="donation.status !== 'Received'" icon small class="mr-2"
                                            color="orange" @click="editDonation(donation)">
                                            <v-icon small>
                                                mdi-pencil
                                            </v-icon>
                                        </v-btn>
                                        <v-btn v-if="donation.status !== 'Received'" icon small color="red"
                                            @click="deleteD(donation.id)" :loading="loading">
                                            <v-icon small>
                                                mdi-delete
                                            </v-icon>
                                        </v-btn>
                                    </td>
                                    <td v-if="user.level == 0">
                                        <v-btn outlined small color="green" @click="approveCharity(donation.id)">
                                            approve
                                        </v-btn>
                                    </td>
                                    <td v-if="user.level == 0">
                                        <v-btn outlined small color="red" @click="RejectCharity(donation.id)">
                                            reject</v-btn>
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
            showProof(image) {
                // console.log(image)
                this.proofImage = image;
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
            approveCharity(id) {
                this.recivedStatus.id = id;
                axios.patch(`charity-donation-transactions/${this.recivedStatus.id}`, this.recivedStatus)
                    .then(
                        () => {
                            this.text = 'service charge approved';
                            this.snackbar = true;
                            this.searchResult = {}
                        }).catch((err) => {
                        this.text = err.response.data.detail[0];
                        this.snackbar_error = true;
                    })
            },
            RejectCharity(id) {
                this.RejectStatus.id = id;
                axios.patch(`charity-donation-transactions/${this.RejectStatus.id}`, this.RejectStatus).then(
                    () => {
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
                    axios.get(`charity-donation-transactions?search=${newval}`).then(res => {
                        console.log(res.data)
                        this.searchResult = res.data
                        this.searching = true;
                        this.loadingDonations = false;

                    })
                } else {
                    this.searchResult = {}
                    this.searching = false;
                    this.loadingDonations = false;
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