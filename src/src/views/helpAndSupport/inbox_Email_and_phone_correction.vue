<template>
    <div>
        <v-container>
            <h1 class="text--secondary my-8">InBox</h1>
        </v-container>
        <!-- {{inbox}} -->
        <br>
        <br>

        <v-row class="d-flex justify-center" v-if="loading">
            <v-btn :loading="loading" large color="primary"></v-btn>
        </v-row>

        <div v-for="(inb,index) in inbox" :key="index">
            <v-card width="100%" outlined>

                <v-divider></v-divider>

                <v-list>
                    <v-list-item :to="{name:'changeEmail', params:{id:inb.id}}">
                        <v-list-item-avatar>
                           <v-icon color="blue">inbox</v-icon>
                        </v-list-item-avatar>

                        <v-list-item-content>
                            <v-list-item-title>{{inb.type}}
                                <span v-if="inb.to">
                                    to : {{inb.created_by.email}}
                                </span>

                            </v-list-item-title>
                            <v-list-item-subtitle>{{inb.subject}}</v-list-item-subtitle>

                            <v-list-item-subtitle v-html="inb.description"></v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>

            </v-card>
        </div>
        <v-row v-if="inbox.length < 1">
            <v-card width="100%" outlined>
                <v-card-title>NO MESSAGE IN THE INBOX</v-card-title>
            </v-card>
        </v-row>
    </div>
</template>

<script>
    import {
        mapGetters,
        mapActions
    } from 'vuex'
    export default {
        data() {
            return {
                inbox: {},
                 loading: true,
            }
        },
        computed: {
            ...mapGetters({
                emailPhoneCorrections: 'compose/emailPhoneCorrections',
                user: 'auth/user'
            })
        },
        methods: {
            ...mapActions({
                GetEmailPhoneCorrections: 'compose/GetEmailPhoneCorrections'
            })
        },
        async created() {
            this.GetEmailPhoneCorrections().then(() => {
                this.inbox = this.emailPhoneCorrections.results.filter((item) => {
                    return item.to.email.match(this.user.email)
                })
            }).then(() => {
                this.loading = false
            })
        },
    }
</script>