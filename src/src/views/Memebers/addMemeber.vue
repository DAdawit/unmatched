<template>
    <div class="text-center">
        <v-dialog v-model="dialog" width="500" persistent>
            <template v-slot:activator="{ on, attrs }">
                <v-btn color="blue" dark v-bind="attrs" v-on="on" :disabled="disabled">
                    add memeber
                    <v-icon right>add</v-icon>
                </v-btn>

                <p v-if="show" class="text--secondary">You can't add memeber till you pay your turn</p>
            </template>

            <v-card>
                <v-card-title class="headline grey lighten-2">
                    Add New Member
                </v-card-title>
                <ValidationObserver v-slot="{ handleSubmit }">
                    <form @submit.prevent="handleSubmit(createMemeber)">
                        <v-card-text class="mt-3">
                            <ValidationProvider rules="required" name="First Name" v-slot="{ errors }">
                                <v-text-field dense label="First Name" outlined v-model="memeber.first_name"
                                    :error="errors.length > 0" :error-messages="errors[0]">
                                </v-text-field>
                            </ValidationProvider>

                            <ValidationProvider rules="required" name="Last Name" v-slot="{ errors }">
                                <v-text-field dense label="Last Name" outlined v-model="memeber.last_name"
                                    :error="errors.length > 0" :error-messages="errors[0]">
                                </v-text-field>
                            </ValidationProvider>
                            <ValidationProvider rules="required|email" name="email" v-slot="{ errors }">
                                <v-text-field dense label="Email" outlined v-model="memeber.email"
                                    :error="errors.length > 0" :error-messages="errors[0]">
                                </v-text-field>
                            </ValidationProvider>
                            <ValidationProvider rules="required" name="phone number" v-slot="{ errors }">
                                <VuePhoneNumberInput default-country-code="ET" v-model="memeber.phone_number">
                                </VuePhoneNumberInput>
                                <small class="red--text">{{errors[0]}}</small>
                            </ValidationProvider>
                            <small class="red--text">{{error}}</small>
                        </v-card-text>
                        <v-divider></v-divider>

                        <v-card-actions class="px-5">
                            <v-spacer></v-spacer>
                            <v-btn color="primary" type="submit" :loading="loading">
                                create Memeber
                            </v-btn>
                            <v-btn color="primary" text @click="canselDialog">
                                Cancel
                            </v-btn>
                        </v-card-actions>
                    </form>
                </ValidationObserver>
            </v-card>
        </v-dialog>
        <alert />
    </div>
</template>

<script>
    import {
        Bus
    } from '../../main'
    import VuePhoneNumberInput from 'vue-phone-number-input';
    import 'vue-phone-number-input/dist/vue-phone-number-input.css';

    import alert from '../../components/alert.vue'
    import {
        mapActions,
        mapGetters
    } from 'vuex'
    export default {
        components: {
            alert,
            VuePhoneNumberInput
        },
        data() {
            return {
                error: '',
                memeber: {
                    first_name: '',
                    last_name: '',
                    email: '',
                    phone_number: ''
                },
                dialog: false,
                disabled: true,
                show: true,
                loading: false,
            }
        },
        computed: {
            ...mapGetters({
                seeds: "seed/seeds",
                user: 'auth/user',
                approvedSeeds: "seed/approvedSeeds"
            })
        },

        methods: {
            ...mapActions({
                addMemeber: "memeber/addMemeber",
                getSeeds: 'seed/getSeeds',

                // saveSeed: 'seed/saveSeed',
                seed_to_memeber: 'seed/seed_to_memeber',
                // getHarvestList: 'harvest/getHarvestList',
                getSeeds: 'seed/getSeeds',


            }),
           createMemeber() {
                this.loading = true
                  this.addMemeber(this.memeber).then(() => {
                    this.loading = false
                    this.dialog = false
                    Bus.$emit("showalert", 'new memeber added')
                }).catch(errors => {
                    this.loading = false
                    this.error = errors.response.data.errors.email[0]
                    alert(errors.response.data.errors.detail[0])
                    Bus.$emit("showError",errors.response.data.errors.detail[0])
                    if(errors.response.data.errors.detail[0] != null){
                        this.error= 'You Need To Pay Registration Fee To Add A New Member'
                    }
                    // console.log(errors.response.data);
                })
            },
            canselDialog() {
                this.dialog = false
                this.memeber = {}
            }
        },
        beforeCreate() {
            this.getSeeds()
            this.seed_to_memeber()
        },
        created() {
            //  console.log(this.approvedSeeds.length)
            if (this.user.level < 3) {
                this.disabled = false;
                this.show = false;
                // console.log('can add memeber')
            } else if (this.user.level >= 3 && this.approvedSeeds.length > 0) {
                this.disabled = false;
                this.show = false;
                // console.log('can add memeber')
            } else if (this.user.level >= 3 && this.approvedSeeds.length == 0) {
                this.disabled = true;
                this.show = true;
                // console.log('can not add memeber')
            }
            // this.showAddbutton = false
            // console.log(this.disabled)

        }

    }
</script>