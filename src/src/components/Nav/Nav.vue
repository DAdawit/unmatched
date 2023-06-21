<template>
    <div>
        <v-app-bar app color="primary" dark flat v-if="auth">
            <div class="d-flex align-center">
                <v-app-bar-nav-icon  fab class="white mr-10" small text color="black" @click.stop="drawer = !drawer">
                </v-app-bar-nav-icon>
                <v-avatar>
                    <v-img alt="Vuetify Logo" class="shrink mr-2" contain src="/yefikermead.jpg"
                        transition="scale-transition" width="70" />
                </v-avatar>
            </div>

            <v-spacer></v-spacer>
            <v-btn outlined rounded class="mx-5" depressed @click="logout">logout</v-btn>
            <v-chip v-if="timeToDonate" class="mx-3 black--text" color="orange" large to="/app/charityDonation">
                <v-icon class="pr-3" color="black">notifications</v-icon>It is time to donate !!!
            </v-chip>
            <v-avatar color="blue darken-1">
                <v-img :src="`https://api.yefikrmead.com/media/${user.user_profile.profile_pic}`"
                    lazy-src="https://image.freepik.com/free-vector/user-icon_126283-435.jpg"></v-img>
            </v-avatar>
            <!-- <v-btn icon @click.stop="right_drawer = !right_drawer">
                <v-icon>menu</v-icon>
            </v-btn> -->
            <!-- <v-btn href="https://github.com/vuetifyjs/vuetify/releases/latest" target="_blank" text>
                <span class="mr-2">Latest Release</span>
                <v-icon>mdi-open-in-new</v-icon>
            </v-btn> -->
        </v-app-bar>

        <v-navigation-drawer app v-model="drawer" left>
            <v-list-item>
                <v-list-item-avatar>
                    <v-img :src="`https://api.yefikrmead.com/media/${user.user_profile.profile_pic}`"
                        lazy-src="https://image.freepik.com/free-vector/user-icon_126283-435.jpg"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                    <v-list-item-title>
                        {{ user.first_name }} {{ user.last_name }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-subtitle class="d-flex justify-center">
                        {{ user.email }} <br />
                        plan : {{ user.plane }} <br />
                        position : {{ user.position }} <br />
                        Round :{{ user.round }}<br />
                    </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

            <v-list>
                <v-list-item router to="/app/dashboard">
                    <v-list-item-icon>
                        <v-icon>dashboard</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Dashboard</v-list-item-title>
                </v-list-item>

                <v-list-item router to="/app/profile">
                    <v-list-item-icon>
                        <v-icon>person</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>profile</v-list-item-title>
                </v-list-item>
                  <v-list-item router to="/app/messages">
                    <v-list-item-icon>
                        <v-icon>message</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Messages</v-list-item-title>
                </v-list-item>

                <v-list-group sub-group no-action>
                    <template v-slot:activator>
                        <v-list-item-content>
                            <v-list-item-title>Members</v-list-item-title>
                        </v-list-item-content>
                    </template>
                    <v-list-item v-for="(memeber, i) in Members" :key="i" router :to="memeber.route">
                        <v-list-item-title v-text="memeber.name"></v-list-item-title>
                    </v-list-item>
                </v-list-group>
                <v-list-group sub-group no-action>
                    <template v-slot:activator>
                        <v-list-item-content>
                            <v-list-item-title>Giftings</v-list-item-title>
                        </v-list-item-content>
                    </template>
                    <v-list-item v-for="(gifting, i) in Giftings" :key="i" router :to="gifting.route">
                        <v-list-item-title v-text="gifting.name"></v-list-item-title>
                    </v-list-item>
                </v-list-group>

                <v-list-item router to="/app/allUsers" v-if="user.level == 0">
                    <v-list-item-icon>
                        <v-icon>groups</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>All Members</v-list-item-title>
                </v-list-item>

                <v-list-item router to="/app/transactions">
                    <v-list-item-icon>
                        <v-icon>credit_card</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Transaction</v-list-item-title>
                </v-list-item>
                <v-list-item router to="/app/registrationFee">
                    <v-list-item-icon>
                        <v-icon>payments</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>RegistrationFee</v-list-item-title>
                </v-list-item>
                <v-list-item router to="/app/marketPlace">
                    <v-list-item-icon>
                        <v-icon>store</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Marketplace</v-list-item-title>
                </v-list-item>
                <v-list-item router to="/app/help">
                    <v-list-item-icon>
                        <v-icon>help</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Help/Support</v-list-item-title>
                </v-list-item>
            </v-list>
            <template v-slot:append>
                <div class="pa-2 d-flex justify-content-center">
                    <v-btn block outlined @click="logout()">
                        Logout
                        <v-icon right>logout</v-icon>
                    </v-btn>
                </div>
            </template>
        </v-navigation-drawer>

        <!-- right_drawer -->

        <!-- <v-navigation-drawer right v-model="right_drawer" app>
            <v-icon class="d-flex justify-end" @click="right_drawer = false">close</v-icon>
            <v-row class="my-5 d-flex justify-space-around">
                <v-btn color="purple" class="white--text" small @click="component = 'userProfile'">profile</v-btn>
                <v-btn small @click="component='memebers'">team memebers</v-btn>
            </v-row>
            <v-divider></v-divider>
            <component v-bind:is="component"></component>
        </v-navigation-drawer> -->
    </div>
</template>
<script>
    // import memebers from "../../components/Nav/memebers.vue";
    // import userProfile from "../../components/Nav/userProfile.vue";
    import axios from "axios";
    import {
        mapGetters,
        mapActions
    } from "vuex";
    import router from "../../router";
    export default {
        components: {
            // memebers,
            // userProfile,
        },
        computed: {
            ...mapGetters({
                user: "auth/user",
                auth: "auth/token",
            }),
        },

        created() {
            // this.user.is_registeration_fee_paid == false & this.user.level > 2


            if (this.user.is_registeration_fee_paid == false & this.user.level > 2) {
                this.timeToDonate = true;
            } else {
                this.timeToDonate = false;
            }

        },

        data() {
            return {
                timeToDonate: false,
                component: "userProfile",
                drawer: false,
                // right_drawer: false,
                admins: [
                    ["Management", "people_outline"],
                    ["Settings", "settings"],
                ],
                Members: [
                    {
                        name: "Active Network",
                        route: "/app/activeNetwork",
                    },
                    {
                        name: "Waiting List",
                        route: "/app/waithingList",
                    },
                    {
                        name: "4TH Generation",
                        route: "/app/4thGeneration",
                    },
                ],
                Giftings: [{
                        name: "Seed",
                        route: "/app/seed/pennding",
                    },
                    {
                        name: "Harvest",
                        route: "/app/harvest",
                    },
                    {
                        name: "Service charge",
                        route: "/app/charityDonation",
                    },
                ],
                right: null,
            };
        },
        methods: {
            ...mapActions({
                Admindonations: "donate/Admindonations",
            }),

            logout() {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                localStorage.removeItem("email");
                localStorage.removeItem("first_name");
                localStorage.removeItem("last_name");
                localStorage.removeItem("id");
                router.push("/");
                window.location.reload();
            },
        },
    };
</script>