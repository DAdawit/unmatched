<template>
    <div>
        <v-container>
            <v-row>
                <!-- {{user}} -->
                <v-card width="100%">
                    <v-card-title class="d-flex justify-center">Team Leader</v-card-title>
                    <v-card-subtitle class="d-flex justify-center">{{admin.position}}</v-card-subtitle>
                    <!-- {{admin.user_profile.profile_pic}} -->
                    <div class="back">
                        <v-card-text class="d-flex justify-center ">
                            <template v-if="admin.user_profile">
                                <v-avatar size="200">
                                     <!-- <v-icon>person</v-icon> -->
                                    <v-img :src="`https://api.yefikrmead.com/media/${admin.user_profile.profile_pic}`" lazy-src="https://image.freepik.com/free-vector/user-icon_126283-435.jpg">
                                    </v-img>
                                </v-avatar>
                            </template>
                            <template v-else>
                                <v-avatar size="200">
                                    <v-img src="/logo.jpg" lazy-src="https://image.freepik.com/free-vector/user-icon_126283-435.jpg"></v-img>
                                </v-avatar>
                            </template>
                            <br>
                        </v-card-text>
                        <v-card-title class="d-flex justify-center">{{admin.first_name}} {{admin.last_name}}
                        </v-card-title>

                        <article class="d-flex justify-center">{{admin.email}}</article>
                        <article class="d-flex justify-center">{{admin.phone_number}}</article>

                        <!-- <article class="d-flex justify-center">+251934835319</article> -->
                    </div>
                    <v-row class="d-flex justify-center my-3 pb-5">
                        <v-icon class="d-flex justify-center" color="#64B5F6">mdi-facebook</v-icon>
                        <v-icon class="d-flex justify-center" color="#64B5F6">mdi-twitter</v-icon>
                    </v-row>
                </v-card>
            </v-row>
            <!-- {{admin}} -->
        </v-container>
    </div>
</template>
<script>
    import {
        mapGetters,
        mapActions
    } from 'vuex';
    export default {
        data() {
            return {

            }
        },
        computed: {
            ...mapGetters({
                // user: 'auth/user',
                admin: 'donate/admin',
            })
        },
        methods: {
            ...mapActions({
                getAdmin: 'donate/getAdmin',
            })
        },
        created() {
            this.getAdmin()
        }

    }
</script>
<style scoped>
    .back {
        background-color: rgb(7, 218, 255);
    }

    p {
        padding: 0px;
    }
</style>