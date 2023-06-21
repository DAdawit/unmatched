<template>
    <div>
        <div>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title class="d-flex title justify-space-around">
                        <v-avatar>
                            <v-img :src="`https://api.yefikrmead.com/media/${user.user_profile.profile_pic}`"></v-img>
                        </v-avatar>
                    </v-list-item-title>
                    <v-list-item-subtitle class="d-flex justify-center">
                        {{user.first_name}}
                    </v-list-item-subtitle>
                    <v-list-item-subtitle class="d-flex justify-center">
                        {{user.email}}
                    </v-list-item-subtitle>
                    <v-list-item-subtitle class="d-flex justify-center">
                        {{user.phone_number}}
                    </v-list-item-subtitle>
                    <v-list-item-title class="d-flex justify-center">
                        WINTER
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <v-list-item>
                <v-list-item-content>
                    Offline/Online
                </v-list-item-content>
                <v-select :items="statuses" label="choose one" outlined dense class="mx-2"></v-select>''
            </v-list-item>

            <v-list-item router to="/profile">
                <v-list-item-title class="d-flex justify-center">Edit Profile</v-list-item-title>
            </v-list-item>
            <v-list-item router to="/dashboard">
                <v-list-item-title class="d-flex justify-center">Need help?</v-list-item-title>
            </v-list-item>
            
<!-- {{activeUsers}} -->
            <!-- <v-list dense>
                <v-list-item v-for="item in activeUsers" :key="item.title">
                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{ item.name }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list> -->
        </div>
    </div>
</template>

<script>
    import {
        mapGetters,
        mapActions
    } from 'vuex'
    export default {
        components:{

        },
        data() {
            return {
                statuses: ['online', 'offline'],
                allMemebers: []
            }
        },
        computed: {
            ...mapGetters({
                user: 'auth/user'
            }),
        },
        methods: {
            ...mapActions({
                adminGetMembers: 'memeber/adminGetMembers',
            })
        },
        // created() {
        //     axios.get('members').then((res) => {
        //         this.allMemebers = res.data
        //         this.overlay = false
        //     })
        // }
    }
</script>