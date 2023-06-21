<template>
    <div>
        <v-card width="100%">
            <v-card-title class="">My Network</v-card-title>
        </v-card>
        <v-card width="100%">
            <v-card-title class="pl-10 mt-2">Number 1st Tier Team Members Available</v-card-title>
            <div v-for="(memeber,index) in membersList.first_tier_members" :key="index">
                <v-card max-width="100%" class="px-5 pt-3 mx-2">
                    <v-row class="d-flex justify-start mt-2">


                        <template v-if="memeber.user_profile !== null">
                            <v-list-item-avatar>
                                <v-img :src="`https://api.yefikrmead.com/media/${memeber.user_profile.profile_pic}`"
                                    lazy-src="https://image.freepik.com/free-vector/user-icon_126283-435.jpg">
                                </v-img>
                            </v-list-item-avatar>
                        </template>
                        <template v-if="memeber.user_profile === null">
                            <v-list-item-avatar>
                                <v-img src="https://image.freepik.com/free-vector/user-icon_126283-435.jpg"
                                    lazy-src="https://image.freepik.com/free-vector/user-icon_126283-435.jpg">
                                </v-img>
                            </v-list-item-avatar>
                        </template>

                        <v-card-title>
                            {{memeber.first_name}}
                            {{memeber.last_name}}
                        </v-card-title>
                        <v-card-title>
                            {{memeber.email}}
                        </v-card-title>
                        <v-spacer></v-spacer>
                        <v-btn icon @click="show1 = !show1">
                            <v-icon>{{ show1 ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                        </v-btn>
                    </v-row>
                    <v-expand-transition>
                        <div v-show="show1">
                            <v-divider></v-divider>

                            <v-card-text>
                                <v-row>
                                    <v-col cols="12" sm="6" md="6" lg="6">
                                        <v-card-title>Sponser</v-card-title>
                                        <v-card-subtitle>
                                            <span
                                                class="font-weight-bold">Name:</span>{{memeber.parent.first_name}}{{memeber.parent.first_name}}
                                            <br>
                                            <span class="font-weight-bold">Phone:</span>{{memeber.parent.phone_number}}
                                            <br>
                                        </v-card-subtitle>
                                    </v-col>

                                    <v-col cols="12" sm="6" md="6" lg="6">
                                        <v-card-title>Profile</v-card-title>
                                        <v-card-subtitle v-if="memeber.user_profile">
                                            <span class="font-weight-bold">Account
                                                number:</span>{{memeber.user_profile.account_number}}
                                            <br>
                                            <span
                                                class="font-weight-bold">Country:</span>{{memeber.user_profile.country}}
                                            <br>
                                            <span class="font-weight-bold">city:</span>{{memeber.user_profile.city}}
                                        </v-card-subtitle>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                        </div>
                    </v-expand-transition>
                </v-card>
            </div>
        </v-card>





        <v-card width="100%">
            <v-card-title class="pl-10 mt-2">Number 2nd Tier Team Members Available</v-card-title>
            <div v-for="(memeber,index) in membersList.second_tier_members" :key="index">
                <v-card max-width="100%" class="px-5 pt-3 mx-2">
                    <v-row class="d-flex justify-start mt-2">

                        <template v-if="memeber.user_profile !== null">
                            <v-list-item-avatar>
                                <v-img :src="`https://api.yefikrmead.com/media/${memeber.user_profile.profile_pic}`"
                                    lazy-src="https://image.freepik.com/free-vector/user-icon_126283-435.jpg">
                                </v-img>
                            </v-list-item-avatar>
                        </template>
                        <template v-if="memeber.user_profile === null">
                            <v-list-item-avatar>
                                <v-img src="https://image.freepik.com/free-vector/user-icon_126283-435.jpg"
                                    lazy-src="https://image.freepik.com/free-vector/user-icon_126283-435.jpg">
                                </v-img>
                            </v-list-item-avatar>
                        </template>

                        <v-card-title>
                            {{memeber.first_name}}
                            {{memeber.last_name}}
                        </v-card-title>
                        <v-card-title>
                            {{memeber.email}}
                        </v-card-title>
                        <v-spacer></v-spacer>
                        <v-btn icon @click="show2 = !show2">
                            <v-icon>{{ show2 ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                        </v-btn>
                    </v-row>
                    <v-expand-transition>
                        <div v-show="show2">
                            <v-divider></v-divider>

                            <v-card-text>
                                <v-row>
                                    <v-col cols="12" sm="6" md="6" lg="6">
                                        <v-card-title>Sponser</v-card-title>
                                        <v-card-subtitle>
                                            <span
                                                class="font-weight-bold">Name:</span>{{memeber.parent.first_name}}{{memeber.parent.first_name}}
                                            <br>
                                            <span class="font-weight-bold">Phone:</span>{{memeber.parent.phone_number}}
                                            <br>
                        
                                        </v-card-subtitle>
                                    </v-col>

                                    <v-col cols="12" sm="6" md="6" lg="6">
                                        <v-card-title>Profile</v-card-title>
                                        <v-card-subtitle v-if="memeber.user_profile">
                                            <span class="font-weight-bold">Account
                                                number:</span>{{memeber.user_profile.account_number}}
                                            <br>
                                            <span
                                                class="font-weight-bold">Country:</span>{{memeber.user_profile.country}}
                                            <br>
                                            <span class="font-weight-bold">city:</span>{{memeber.user_profile.city}}
                                        </v-card-subtitle>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                        </div>
                    </v-expand-transition>
                </v-card>
            </div>
        </v-card>








        <v-card width="100%">
            <v-card-title class="pl-10 mt-2">Number 3rd Tier Team Members Available</v-card-title>
            <div v-for="(memeber,index) in membersList.third_tier_members" :key="index">
                <v-card max-width="100%" class="px-5 pt-3 mx-2">
                    <v-row class="d-flex justify-start mt-2">

                        <template v-if="memeber.user_profile !== null">
                            <v-list-item-avatar>
                                <v-img :src="`https://api.yefikrmead.com/media/${memeber.user_profile.profile_pic}`"
                                    lazy-src="https://image.freepik.com/free-vector/user-icon_126283-435.jpg">
                                </v-img>
                            </v-list-item-avatar>
                        </template>
                        <template v-if="memeber.user_profile === null">
                            <v-list-item-avatar>
                                <v-img src="https://image.freepik.com/free-vector/user-icon_126283-435.jpg"
                                    lazy-src="https://image.freepik.com/free-vector/user-icon_126283-435.jpg">
                                </v-img>
                            </v-list-item-avatar>
                        </template>

                        <v-card-title>
                            {{memeber.first_name}}
                            {{memeber.last_name}}
                        </v-card-title>
                        <v-card-title>
                            {{memeber.email}}
                        </v-card-title>
                        <v-spacer></v-spacer>
                        <v-btn icon @click="show3 = !show3">
                            <v-icon>{{ show3 ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                        </v-btn>
                    </v-row>
                    <v-expand-transition>
                        <div v-show="show3">
                            <v-divider></v-divider>

                            <v-card-text>
                                <v-row>
                                    <v-col cols="12" sm="6" md="6" lg="6">
                                        <v-card-title>sponser</v-card-title>
                                        <v-card-subtitle v-if="memeber.parent">
                                            <span
                                                class="font-weight-bold">Name:</span>{{memeber.parent.first_name}}{{memeber.parent.first_name}}
                                            <br>
                                            <span class="font-weight-bold">Phone:</span>
                                            {{memeber.parent.phone_number}}
                                            <br>
                                            <!-- <span
                                                            class="font-weight-bold">Plane:</span> {{memeber.parent.plane}}
                                                        <br>
                                                        <span
                                                            class="font-weight-bold">Position:</span> {{memeber.parent.position}} -->
                                        </v-card-subtitle>
                                    </v-col>

                                    <!-- profile_pic: "IMG_20210909_153101_955_siKZZFf.jpg" -->
                                    <v-col cols="12" sm="6" md="6" lg="6">
                                        <v-card-title>Profile</v-card-title>
                                        <v-card-subtitle v-if="memeber.user_profile">
                                            <span class="font-weight-bold">Account
                                                number:</span>{{memeber.user_profile.account_number}}
                                            <br>
                                            <span
                                                class="font-weight-bold">Country:</span>{{memeber.user_profile.country}}
                                            <br>
                                            <span class="font-weight-bold">city:</span>{{memeber.user_profile.city}}
                                        </v-card-subtitle>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                        </div>
                    </v-expand-transition>
                </v-card>
            </div>
        </v-card>







        <v-card width="100%">
            <v-card-title class="pl-10 mt-2">Number 4th Tier Team Members Available</v-card-title>
            <div v-for="(memeber,index) in membersList.fourth_tier_members" :key="index">
                <v-card max-width="100%" class="px-5 pt-3 mx-2">
                    <v-row class="d-flex justify-start mt-2">

                        <template v-if="memeber.user_profile !== null">
                            <v-list-item-avatar>
                                <v-img :src="`https://api.yefikrmead.com/media/${memeber.user_profile.profile_pic}`"
                                    lazy-src="https://image.freepik.com/free-vector/user-icon_126283-435.jpg">
                                </v-img>
                            </v-list-item-avatar>
                        </template>
                        <template v-if="memeber.user_profile === null">
                            <v-list-item-avatar>
                                <v-img src="https://image.freepik.com/free-vector/user-icon_126283-435.jpg"
                                    lazy-src="https://image.freepik.com/free-vector/user-icon_126283-435.jpg">
                                </v-img>
                            </v-list-item-avatar>
                        </template>

                        <v-card-title>
                            {{memeber.first_name}}
                            {{memeber.last_name}}
                        </v-card-title>
                        <v-card-title>
                            {{memeber.email}}
                        </v-card-title>
                        <v-spacer></v-spacer>
                        <v-btn icon @click="show4 = !show4">
                            <v-icon>{{ show3 ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                        </v-btn>
                    </v-row>
                    <v-expand-transition>
                        <div v-show="show4">
                            <v-divider></v-divider>

                            <v-card-text>
                                <v-row>
                                    <v-col cols="12" sm="6" md="6" lg="6">
                                        <v-card-title>sponser</v-card-title>
                                        <v-card-subtitle v-if="memeber.parent">
                                            <span
                                                class="font-weight-bold">Name:</span>{{memeber.parent.first_name}}{{memeber.parent.first_name}}
                                            <br>
                                            <span class="font-weight-bold">Phone:</span>
                                            {{memeber.parent.phone_number}}
                                            <br>
                                            <!-- <span
                                                            class="font-weight-bold">Plane:</span> {{memeber.parent.plane}}
                                                        <br>
                                                        <span
                                                            class="font-weight-bold">Position:</span> {{memeber.parent.position}} -->
                                        </v-card-subtitle>
                                    </v-col>

                                    <!-- profile_pic: "IMG_20210909_153101_955_siKZZFf.jpg" -->
                                    <v-col cols="12" sm="6" md="6" lg="6">
                                        <v-card-title>Profile</v-card-title>
                                        <v-card-subtitle v-if="memeber.user_profile">
                                            <span class="font-weight-bold">Account
                                                number:</span>{{memeber.user_profile.account_number}}
                                            <br>
                                            <span
                                                class="font-weight-bold">Country:</span>{{memeber.user_profile.country}}
                                            <br>
                                            <span class="font-weight-bold">city:</span>{{memeber.user_profile.city}}
                                        </v-card-subtitle>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                        </div>
                    </v-expand-transition>
                </v-card>
            </div>
        </v-card>




    </div>
</template>

<script>
    import {
        mapActions,
        mapGetters
    } from 'vuex'
    export default {
        data() {
            return {
                show1: false,
                show2: false,
                show3: false,
                show4: false,
            }
        },
        computed: {
            ...mapGetters({
                membersList: 'memeber/membersList',
            })
        },
        methods: {
            ...mapActions({
                getMembersList: 'memeber/getMembersList'

            })

        },
        created() {
            this.getMembersList()
        }
    }
</script>