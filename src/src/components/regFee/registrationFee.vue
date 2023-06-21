<template>
    <div class="text-center">
        <!-- payment dialog -->
        <!-- {{admin}} -->
        <v-dialog v-model="paymentdialog" width="800" persistent>
            <v-card width="100%">
                <v-card-title class="headline grey lighten-2 mb-2">
                    Registration fee
                    <v-card-subtitle> {{admin.user_profile.account_name }}
                        {{admin.user_profile.account_number }}
                    </v-card-subtitle>
                </v-card-title>

                <v-overlay v-model="overlay">
                    <v-progress-circular indeterminate size="64"></v-progress-circular>
                </v-overlay>
                <div v-if="waitingForApproval== true">
                    <v-card-text class="d-flex justify-center">
                        <h1 class="grey--text">Already paid. Waiting for approval ...</h1>
                    </v-card-text>
                    <v-card-actions class="d-flex justify-end">
                        <v-btn @click="paymentdialog=false" color="primary" rounded depressed>close dialog</v-btn>
                    </v-card-actions>
                </div>
                <ValidationObserver v-slot="{ handleSubmit }" v-if="waitingForApproval== false">
                    <form @submit.prevent="handleSubmit(save)">
                        <v-card-text>
                            <ValidationProvider rules="required|integer" name="amount" v-slot="{ errors }">
                                <v-text-field dense outlined label="amount" v-model="serviceCharge.amount"
                                    :error="errors.length > 0" :error-messages="errors[0]">
                                </v-text-field>
                            </ValidationProvider>
                            <ValidationProvider rules="required" name="description" v-slot="{ errors }">
                                <v-textarea outlined label="description" v-model="serviceCharge.description"
                                    :error="errors.length > 0" :error-messages="errors[0]">
                                </v-textarea>
                            </ValidationProvider>
                            <label>Proof image</label><br />
                            <ValidationProvider rules="image" name="image proof" v-slot="{ errors }">
                                <input type="file" @change="selectImage" />
                                <br />
                                <small class="red--text pl-3">{{ errors[0] }}</small>
                            </ValidationProvider>
                            <br /><br />
                        </v-card-text>
                        <v-divider></v-divider>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" type="submit" :loading="post_loading">save</v-btn>
                        </v-card-actions>
                    </form>
                </ValidationObserver>
            </v-card>
        </v-dialog>



        <!-- payment edit dialog  -->
        <v-dialog v-model="editDialog" width="800">
            <v-card width="100%">
                <v-card-title class="headline grey lighten-2 mb-2">
                    Registration fee
                </v-card-title>
                <ValidationObserver v-slot="{ handleSubmit }">
                    <form @submit.prevent="handleSubmit(editPayment)">
                        <v-card-text>
                            <ValidationProvider rules="required|integer" name="amount" v-slot="{ errors }">
                                <v-text-field dense outlined label="amount" v-model="editdata.amount"
                                    :error="errors.length > 0" :error-messages="errors[0]">
                                </v-text-field>
                            </ValidationProvider>
                            <ValidationProvider rules="required" name="description" v-slot="{ errors }">
                                <v-textarea outlined label="description" v-model="editdata.description"
                                    :error="errors.length > 0" :error-messages="errors[0]">
                                </v-textarea>
                            </ValidationProvider>
                            <label>Proof image</label><br />
                            <ValidationProvider rules="image" name="image proof" v-slot="{ errors }">
                                <input type="file" @change="selectEditImage" />
                                <br />
                                <small class="red--text pl-3">{{ errors[0] }}</small>
                            </ValidationProvider>
                            <br /><br />
                        </v-card-text>
                        <v-divider></v-divider>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" type="submit" :loading="editLoading"> update </v-btn>
                        </v-card-actions>
                    </form>
                </ValidationObserver>
            </v-card>
        </v-dialog>


        <v-dialog v-model="Imagedialog" width="50%">
            <v-card>
                <v-img :src="proofImage"></v-img>
            </v-card>
        </v-dialog>

        <!-- {{registrationFees.results}} -->
        <v-container>
            <v-row>
                <v-col class="d-flex justify-end">
                    <v-chip class="caption" color="info">
                        Total paid registraation fee {{registrationFees.count}}
                    </v-chip>
                </v-col>
            </v-row>
        </v-container>
        <v-row>
            <v-col class="d-flex justify-center">
                <v-progress-circular :size="70" :width="7" color="blue" indeterminate v-if="loadingDonations">
                </v-progress-circular>
            </v-col>
        </v-row>

        <v-container>
            <v-simple-table fixed-header class="elevation-1" loading-text="Loading... Please wait">
                <template v-slot:default>
                    <thead>
                        <tr>
                            <th class="text-left">#ID</th>
                            <th class="text-left">amount</th>
                            <th class="text-left">description</th>
                            <th class="text-left">Date</th>
                            <th class="text-left">from</th>
                            <th class="text-left">status</th>
                            <th class="text-left">proof image</th>
                            <th class="text-left" v-if="user.level != 0">Actions</th>
                            <th class="text-center" colspan="2" v-if="user.level == 0">
                                Admin
                            </th>
                        </tr>
                    </thead>
                    <!-- {{registrationFees.results[0].id}} -->
                    <tbody>
                        <tr v-for="(fee, index) in registrationFees.results" :key="fee.id">
                            <td>{{index+1}}</td>
                            <td>{{ fee.amount}}</td>
                            <td><small>{{ fee.description }}</small></td>
                            <td>{{ moment(fee.created_at).format("YYYY-MM-DD") }}</td>
                            <td>{{ fee._from.first_name + ' ' + fee._from.last_name }}</td>
                            <td>
                                <v-chip small :class="`${fee.status} white--text`">{{fee.status}}</v-chip>
                            </td>
                            <td>
                                <v-btn outlined color="info" @click="showImage(fee.file_upload)">show proof</v-btn>
                            </td>
                            <td class="py-1">
                                <v-btn v-if="user.level == 0" rounded outlined small color="success" class="mb-4"
                                    @click="Approve(fee.id)">
                                    Approve</v-btn>
                            </td>
                            <td>
                                <v-btn v-if="fee.status != 'Received' & user.level == 0" rounded outlined small
                                    color="warning" class="pa-3" @click="Reject(fee.id)" :loading="rejecting">Reject
                                </v-btn>
                            </td>
                            <td v-if="user.level !=0">
                                <v-btn small icon color="orange" @click="edit(fee)">
                                    <v-icon>edit</v-icon>
                                </v-btn>
                                <v-btn small icon color="red" @click="deletePayment(fee.id)" :loading="loading">
                                    <v-icon>delete</v-icon>
                                </v-btn>
                            </td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>
            <template>
                <div class="text-center ">
                    <v-btn outlined class="my-5 mr-3" v-if="registrationFees.previous !== null"
                        @click="loadPrevious(registrationFees.previous)" color="blue">
                        <v-icon>
                            chevron_left
                        </v-icon>
                        prev page
                    </v-btn>
                    <v-btn class="my-5" v-if="registrationFees.next !== null" outlined
                        @click="loadNext(registrationFees.next)" color="blue">
                        next page
                        <v-icon>
                            navigate_next
                        </v-icon>
                    </v-btn>
                </div>
            </template>
        </v-container>
        <alert-vue></alert-vue>
    </div>
</template>

<script>
    import alertVue from '../alert.vue';
    import {
        Bus
    } from '../../main'
    import axios from 'axios';
    // import registrationFeeList from './regestrationFeeList.vue'
    import {
        mapGetters,
        mapActions
    } from 'vuex';

    export default {
        components: {
            // registrationFeeList,
            alertVue
        },
        data() {
            return {
                waitingForApproval: true,
                overlay: false,
                paymentdialog: true,
                serviceCharge: {},
                selectedImage: '',
                loading: false,
                Imagedialog: false,
                serviceCharge: {},
                selectedImage: '',
                selectedEditImage: '',
                loading: false,
                proofImage: '',
                Imagedialog: false,
                approveing: false,
                rejecting: false,
                editDialog: false,
                editLoading: false,
                post_loading: false,
                registrationFees: {},
                loadingDonations: false,
                currentList: 'registeration-fees',
                approveStatus: {
                    status: 'Received'
                },
                RejectStatus: {
                    status: 'Rejected'
                },
                editdata: {}
            }
        },
        computed: {
            ...mapGetters({
                admin: "donate/admin",
                user: 'auth/user',
                // registrationFees: 'registerationfee/registrationFees'

            })
        },
        methods: {
            ...mapActions({
                getAdmin: "donate/getAdmin",
                payRegistrationFee: 'registerationfee/payRegistrationFee',
                // getRegistrationFees: 'registerationfee/getRegistrationFees',
                changeStatus: 'registerationfee/changeStatus',
            }),

            async getRegistrationFees() {
                this.loadingDonations = true
                this.overlay = true;
                await axios.get(this.currentList).then((res) => {
                    this.registrationFees = res.data
                    this.loadingDonations = false;
                }).then(() => {
                    this.overlay = false;
                    if (this.registrationFees.count > 0) {
                        this.waitingForApproval = true
                    } else {
                        this.waitingForApproval = false
                    }
                })
            },

            selectImage(e) {
                this.selectedImage = e.target.files[0];
            },
            selectEditImage(e) {
                this.selectedEditImage = e.target.files[0];
            },
            edit(fee) {
                this.editdata = {
                    ...fee
                }
                this.editDialog = true
            },

            async deletePayment(id) {
                await axios.delete(`registeration-fees/${id}`).then(() => {
                    Bus.$emit("showalert", "payment deleted successfuly !");
                    this.getRegistrationFees();
                }).catch((err) => {
                    console.log(err.response.data);
                })
            },

            async editPayment() {
                if (this.selectedEditImage != '') {
                    // edit payment with image 
                    const fd = new FormData();
                    fd.append("file_upload", this.selectedEditImage, this.selectedEditImage.name);
                    fd.append("amount", this.editdata.amount)
                    fd.append("description", this.editdata.description)
                    this.editLoading = true
                    await axios.patch(`registeration-fees/${this.editdata.id}`, fd).then(() => {
                        Bus.$emit("showalert", "update success !");
                        this.getRegistrationFees();
                        this.editLoading = false
                        this.editDialog = false
                    }).catch((err) => {
                        this.editLoading = false
                        console.log(err.response.data)
                    })

                } else if (this.selectedEditImage == '') {
                    // edit payment without payment 
                    const data = {};
                    data.amount = this.editdata.amount;
                    data.description = this.editdata.description;
                    this.editLoading = true
                    await axios.patch(`registeration-fees/${this.editdata.id}`, data).then(() => {
                        Bus.$emit("showalert", "update success !");
                        this.getRegistrationFees()
                        this.editLoading = false
                        this.editDialog = false
                    }).catch((err) => {
                        this.editLoading = false
                        console.log(err.response.data)
                    })
                }
            },
            async save() {
                this.post_loading = true;
                const fd = new FormData();
                fd.append("file_upload", this.selectedImage, this.selectedImage.name);
                fd.append("_from", this.user.id)
                fd.append("amount", this.serviceCharge.amount);
                fd.append("description", this.serviceCharge.description);
                fd.append("_to", this.admin.id);
                await axios.post('registeration-fees', fd).then(() => {
                    this.post_loading = false;
                    Bus.$emit("showalert", "successs !");
                    this.paymentdialog = false;
                    this.getRegistrationFees();
                }).catch((err) => {
                    console.log(err.response.data);
                    this.post_loading = false;
                })
            },


            showImage(image) {
                this.proofImage = image
                this.Imagedialog = true;
            },
            async Approve(id) {
                this.approveStatus.id = id
                await axios.patch(`registeration-fees/${id}`, this.approveStatus).then(() => {
                    this.getRegistrationFees()
                    Bus.$emit("showalert", "successs !");
                }).catch((err) => {
                    console.log(err.response.data.errors.detail[0]);
                    Bus.$emit('showError', err.response.data.errors.detail[0])
                })
            },

            async Reject(id) {
                this.RejectStatus.id = id
                await axios.patch(`registeration-fees/${id}`, this.RejectStatus).then(() => {
                    this.getRegistrationFees()
                    Bus.$emit("showalert", "Rejected !");
                }).catch((err) => {
                    console.log(err.response.data);
                })
            },

            loadPrevious(prevlink) {
                this.currentList = prevlink;
                console.log(prevlink);
                this.loadingDonations = true;
                axios
                    .get(prevlink)
                    .then((res) => {
                        this.registrationFees = res.data;
                        this.loadingDonations = false;
                    })
                    .catch((err) => {
                        console.log(err);
                        this.loadingDonations = false;
                    });
            },

            loadNext(nextlink) {
                this.currentList = nextlink;
                console.log(nextlink);
                this.loadingDonations = true;
                axios
                    .get(nextlink)
                    .then((res) => {
                        this.registrationFees = res.data;
                        this.loadingDonations = false;
                    })
                    .catch((err) => {
                        console.log(err);
                        this.loadingDonations = false;
                    });
            },
        },

        created() {
            this.getRegistrationFees();
            this.getAdmin();

            if (this.user.is_registeration_fee_paid == false & this.user.level > 2) {
                this.paymentdialog = true
            } else {
                this.paymentdialog = false
            }
        }
    }
</script>

<style scoped>
    .v-chip.Pending {
        background: #FFB74D;
    }

    .v-chip.Received {
        background: #00b619;
    }

    .v-chip.Rejected {
        background: #b60600;
    }

    .v-icon.Received {
        display: none;
    }

    .post.Pending {
        border-left: 4px solid #FFB74D;
    }

    .post.Received {
        border-left: 4px solid #00b619;
    }

    .post.Rejected {
        border-left: 4px solid #b60600;
    }
</style>