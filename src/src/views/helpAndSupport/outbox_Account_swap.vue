<template>
    <div>
        <v-container>
            <h1 class="text--secondary my-8">Outbox</h1>
        </v-container>
        <!-- {{outbox}} -->
        <br> <br>
        <!-- <v-row> -->
        <v-row class="d-flex justify-center" v-if="loading">
            <v-btn :loading="loading" large color="primary"></v-btn>
        </v-row>
        <div v-for="(out,index) in outbox" :key="index">
            <v-card width="100%" outlined>

                <v-divider></v-divider>

                <v-list>
                    <v-list-item :to="{name:'swap', params:{id:out.id}}">
                        <v-list-item-avatar>
                            <v-icon color="blue">outbox</v-icon>
                        </v-list-item-avatar>

                        <v-list-item-content>
                            <v-list-item-title>{{out.type}}</v-list-item-title>
                            <v-list-item-subtitle>{{out.subject}}
                                from : {{out.created_by.email}}
                            </v-list-item-subtitle>
                            <v-list-item-subtitle v-html="out.description"></v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>

            </v-card>
        </div>
        <v-card width="100%" outlined v-if="outbox.length < 1">
            <v-card-title>NO MESSAGE IN THE OUTBOXX</v-card-title>
        </v-card>
        <!-- </v-row> -->
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
                outbox: {},
                loading: true,
            }
        },
        computed: {
            ...mapGetters({
                accountSwapMessages: 'compose/accountSwapMessages',
                user: 'auth/user'
            })
        },
        methods: {
            ...mapActions({
                GetAcountSwap: 'compose/GetAcountSwap'
            })
        },
        async created() {
            this.GetAcountSwap().then(() => {
                this.outbox = this.accountSwapMessages.results.filter((item) => {
                    return item.created_by.email.match(this.user.email)
                })
            }).then(() => {
                this.loading = false
            })
        },

        // mounted() {
        //     this.inbox = this.accountDeleteMessages.results.filter((item) => {
        //         return item.to.email.match(this.user.email)
        //     })
        //     console.log(this.inbox)
        // }
    }
</script>