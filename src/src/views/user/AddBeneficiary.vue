<template>
    <div>
        <v-card>
            <ValidationObserver v-slot="{ handleSubmit }">
                <form @submit.prevent="handleSubmit(saveBeneficiary)">
                    <br>
                    <p class="px-3">Add a Beneficiary</p>
                    <v-divider class="py-2"></v-divider>
                    <ValidationProvider rules="required" name="First Name" v-slot="{ errors }">
                        <v-text-field dense label="First Name" outlined class="mx-2" v-model="beneficiary.first_name"
                            :error="errors.length > 0" :error-messages="errors[0]">
                        </v-text-field>
                    </ValidationProvider>
                    <ValidationProvider rules="required" name="Last Name" v-slot="{ errors }">
                        <v-text-field dense label="Last Name" outlined class="mx-2" v-model="beneficiary.last_name"
                            :error="errors.length > 0" :error-messages="errors[0]">
                        </v-text-field>
                    </ValidationProvider>
                    <ValidationProvider rules="required" name="Email|email" v-slot="{ errors }">
                        <v-text-field dense label="Email" outlined class="mx-2" v-model="beneficiary.email"
                            :error="errors.length > 0" :error-messages="errors[0]">
                        </v-text-field>
                    </ValidationProvider>
                    <ValidationProvider rules="required" name="phone" v-slot="{ errors }">
                        <VuePhoneNumberInput default-country-code="ET" v-model="beneficiary.phone_number">
                        </VuePhoneNumberInput>
                        <small class="red--text">{{errors[0]}}</small>
                    </ValidationProvider>
                    <br>
                    <ValidationProvider rules="required" name="Relationship" v-slot="{ errors }">
                        <v-select :items="items" label="Relationship" outlined dense class="mx-2"
                            v-model="beneficiary.relationship" :error="errors.length > 0" :error-messages="errors[0]">
                        </v-select>
                    </ValidationProvider>
                    <small class="red--text ml-5">{{error}}</small>
                    <v-row class="d-flex justify-center">
                        <v-col cols="5">
                            <v-btn color="purple" class=" white--text" :loading="loading" type="submit" block>save
                            </v-btn>
                        </v-col>
                    </v-row>
                </form>
            </ValidationObserver>
        </v-card>
        <alert />
    </div>
</template>
<script>
    import VuePhoneNumberInput from 'vue-phone-number-input';
    import 'vue-phone-number-input/dist/vue-phone-number-input.css';
    import {
        Bus
    } from '../../main'
    import alert from '../../components/alert'
    import {
        mapActions
    } from 'vuex';
    export default {
        components: {
            alert,
            VuePhoneNumberInput
        },
        data() {
            return {
                error:'',
                loading: false,
                beneficiary: {},
                items: ['Friend', 'Father', 'Mother', 'Sister', 'Brother', 'Son', 'Daughter', 'Husband', 'Wife'],
            }
        },
        methods: {
            ...mapActions({
                addBeneficiary: 'beneficiary/addBeneficiary'
            }),
            saveBeneficiary() {
                this.loading = true;
                this.addBeneficiary(this.beneficiary).then(() => {
                    this.loading = false;
                    Bus.$emit('showalert', 'beneficiary added !')
                }).catch((errors) => {
                    this.loading = false;
                    this.error = errors.response.data.errors.email[0]
                    console.log('error')
                })
            }
        }
    }
</script>