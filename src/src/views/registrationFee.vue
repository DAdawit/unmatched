<template>
    <div>

        <v-container>
            <h1 class="text--secondary">Registration Fee </h1>
        </v-container>


        <!-- search service charge componenent   -->
        <v-container>

            <v-row v-if="user.level == 0">
                <v-btn color="primary" class="my-6 ml-10 " dark to="/app/searchRegistrationFee">
                    Search REgistration Fee
                    <v-icon right>person_search</v-icon>
                </v-btn>
            </v-row>
        </v-container>

        <registration-fee-vue></registration-fee-vue>
    </div>
</template>

<script>
    import {
        mapGetters,
        mapActions
    } from 'vuex';
    import registrationFeeVue from '../components/regFee/registrationFee.vue'
    export default {
        components: {
            registrationFeeVue
        },
        computed: {
            ...mapGetters({
                user: "auth/user",
                admin: "donate/admin",
            })
        },
        methods: {
            ...mapActions({
                getAdmin: "donate/getAdmin",
            })
        }

    }
</script>