<template>
    <div>
        <v-row justify="center">

            <v-btn color="primary" class="my-6 ml-10 " dark @click="dialog = true">
                Search memebers
                <v-icon right>person_search</v-icon>
            </v-btn>

            <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
                <v-card tile>
                    <v-toolbar flat dark color="primary">
                        <v-btn icon dark @click="dialog = false">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                        <v-toolbar-title>Search Memebers</v-toolbar-title>
                    </v-toolbar>
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
                                <v-simple-table v-if="!loadingDonations" fixed-header height="100%" :loading="true"
                                    loading-text="Loading... Please wait">
                                    <template v-slot:default>
                                        <thead>
                                            <tr>
                                                <th class="text-left">#index</th>
                                                <th class="text-left">ID</th>
                                                <th class="text-left">Profile</th>
                                                <th class="text-left">Name</th>
                                                <th class="text-left">AgreeTerms</th>
                                                <th class="text-left">Email</th>
                                                <th class="text-left">phone_number</th>
                                                <th class="text-left">Level</th>
                                                <th class="text-left">Left</th>
                                                <th class="text-left">Right</th>
                                                <th class="text-left">Parent</th>
                                                <th class="text-left">Country</th>
                                                <th class="text-left">City</th>
                                                <th class="text-left">Account Number</th>
                                            </tr>
                                        </thead>
                                        <tbody v-if="searching">
                                            <tr v-for="(memeber, index) in searchResult.results" :key="index">
                                                <td>{{ index + 1 }}</td>
                                                <td>
                                                    <v-btn color="primary" outlined @click="getUUID(memeber.id)">get ID
                                                    </v-btn>
                                                </td>
                                                <td>
                                                    <v-avatar v-if="memeber.user_profile">
                                                        <v-img :src="memeber.user_profile.profile_pic"
                                                            lazy-src="https://picsum.photos/id/11/10/6"></v-img>
                                                    </v-avatar>
                                                </td>
                                                <td class="text-lowercase">
                                                    {{ memeber.first_name }} {{ memeber.last_name }}
                                                </td>
                                                  <td>
                                                    <v-chip :class="`${memeber.has_agreed}`">{{ memeber.has_agreed}}
                                                    </v-chip>
                                                </td>
                                                <td>{{ memeber.email }}</td>
                                                <td>{{ memeber.phone_number }}</td>
                                                <td>{{ memeber.level }}</td>
                                                <td>{{ memeber.lft }}</td>
                                                <td>{{ memeber.rght }}</td>
                                                <td v-if="memeber.parent">{{ memeber.parent.email }}</td>
                                                <td v-if="memeber.user_profile">
                                                    {{ memeber.user_profile.country }}
                                                </td>
                                                <td v-if="memeber.user_profile">
                                                    {{ memeber.user_profile.city }}
                                                </td>
                                              
                                                <td v-if="memeber.user_profile">
                                                    {{ memeber.user_profile.account_number }}
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

                    <div style="flex: 1 1 auto;"></div>
                </v-card>
            </v-dialog>
        </v-row>
    </div>
</template>
<script>
    import axios from 'axios'
    export default {
        data() {
            return {
                dialog: false,
                notifications: false,
                sound: true,
                widgets: false,
                search: '',
                loadingDonations: false,
                searchResult: {},
                searching: false
            }
        },
        methods: {
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
        },
        watch: {
            search(newval) {
                this.loadingDonations = true;
                if (newval.length > 2) {
                    axios.get(`members?search=${newval}`).then(res => {
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
    .v-chip.false {
        background: #FFB74D;
    }

    .v-chip.true {
        background: #00b619;
    }
</style>