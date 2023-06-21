<template>
    <div>
        <v-container>
            <h1 class="text--secondary my-8">InBox</h1>
        </v-container>
        <v-row class="mx-3">
            <v-col cols="12" sm="12" md="4" lg="4">
                <!-- <v-card> -->
                <!-- <v-row class="d-flex justify-content-start"> -->
                <v-card class="mx-auto" width="400">
                    <v-list>
                        <v-list-item-group v-model="item" color="orange" disabled>
                            <v-list-item v-for="(item, i) in items" :key="i" @click="component=item.component">
                                <v-list-item-icon>
                                    <v-icon v-text="item.icon"></v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title v-text="item.text"></v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list-item-group>
                    </v-list>
                </v-card>
            </v-col>
            <v-col cols="12" sm="12" md="8" lg="8">
                <keep-alive>
                    <component :is="component"></component>
                </keep-alive>
            </v-col>
            <!-- </v-card> -->
        </v-row>
        <template class="mx-10">
            <div class="text-center">
                <v-dialog persistent v-model="dialog" width="auto">
                    <v-card-text>
                        <v-alert prominent type="error">
                            <v-row align="center">
                                <v-col class="grow">
                                    It is time for charity Donation , Please Donate! <small>and you will not see this
                                        message</small>
                                </v-col>
                                <v-col class="shrink">
                                    <v-btn to="/app/charityDonation">go to charity donation</v-btn>
                                </v-col>
                            </v-row>
                        </v-alert>
                    </v-card-text>
                </v-dialog>
            </div>
        </template>
    </div>

</template>
<script>
    import axios from 'axios'
    import compose from './compose.vue'
    import inbox_other_act_deletion from './inbox_Other_Act_deletion.vue'
    import outbox_Other_Act_deletion from './outbox_Other_Act_deletion.vue'
    import in_account_swap from './inbox_Account_swap.vue'
    import out_account_swap from './outbox_Account_swap.vue'
    import in_emailChange from './inbox_Email_and_phone_correction'
    import out_emailChange from './outbox_Email_and_phone_correction.vue'

    export default {
        components: {
            compose,
            inbox_other_act_deletion,
            outbox_Other_Act_deletion,
            in_account_swap,
            out_account_swap,
            in_emailChange,
            out_emailChange
        },
        data() {
            return {
                dialog: false,
                component: 'inbox_other_act_deletion',
                item: 1,
                items: [{
                        text: ' compose',
                        icon: 'create',
                        component: 'compose'
                    },
                    {
                        text: 'inbox Replied,Account Delete and Other messages',
                        icon: 'inbox',
                        component: 'inbox_other_act_deletion'
                    },
                    {
                        text: 'outbox Account Delete and Other messages',
                        icon: 'outbox',
                        component: 'outbox_Other_Act_deletion'
                    },
                    {
                        text: 'inbox Email correction Messages',
                        icon: 'inbox',
                        component: 'in_emailChange'
                    },
                    {
                        text: 'outbox Email correction Messages',
                        icon: 'outbox',
                        component: 'out_emailChange'
                    },
                    {
                        text: 'inbox Account swap Messages',
                        icon: 'inbox',
                        component: 'in_account_swap'
                    },
                    {
                        text: 'outbox Account swap Messages',
                        icon: 'outbox',
                        component: 'out_account_swap'
                    },
                ],
            }
        },
        created() {
            if (this.user.received_count >= 6 && this.user.has_donated == false) {
                this.dialog = true
            } else {
                this.dialog = false
            }
        }

    }
</script>