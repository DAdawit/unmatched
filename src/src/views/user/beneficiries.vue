<template>
    <div>
        <v-container>
        <h1 class="text--secondary">Beneficiries</h1>
        </v-container>
        <div class="text-center">
            <v-dialog v-model="editDialog" width="500" persistent>
                <v-card>
                    <v-card-title class="headline grey lighten-2">
                        Update Beneficiry data
                    </v-card-title>
                    <v-card-text class="mt-3">
                        <v-text-field dense label="First Name" outlined v-model="editData.first_name">
                        </v-text-field>
                        <v-text-field dense label="Last Name" outlined v-model="editData.last_name">
                        </v-text-field>
                        <v-text-field dense label="Email" outlined v-model="editData.email">
                        </v-text-field>
                        <v-text-field dense label="Phone" outlined v-model="editData.phone_number">
                        </v-text-field>
                         <v-select :items="relations" label="Relationship" outlined dense class="mx-2" v-model="editData.relationship"></v-select>
                    </v-card-text>
                    <v-divider></v-divider>

                    <v-card-actions class="px-5">
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click="updateBeneficary()">
                            update
                        </v-btn>
                        <v-btn color="primary" text @click="editDialog = false">
                            Cancel
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </div>


        <v-container>
            <v-row>
                <v-card width="100%">
                    <v-simple-table fixed-header>
                        <template v-slot:default>
                            <thead>
                                <tr>
                                    <th class="text-left">index</th>
                                    <th class="text-left">FULL NAME </th>
                                    <th class="text-left">Email </th>
                                    <th class="text-left">CONTACT INFO </th>
                                    <th class="text-left">Relationship</th>
                                    <th class="text-left">ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(beneficiary,index) in beneficiaries" :key="beneficiary.id">
                                    <td>{{index+1}}</td>
                                    <td>{{ beneficiary.first_name}} {{beneficiary.last_name}}</td>
                                    <td>{{beneficiary.email}}</td>
                                    <td>{{beneficiary.phone_number}}</td>
                                    <td>{{beneficiary.relationship}}</td>
                                    <td>
                                        <v-icon small color="orange" class="mr-2" @click="EditBeneficiary(beneficiary)">
                                            mdi-pencil
                                        </v-icon>
                                        <v-icon small color="red" @click="deleteDelete(beneficiary.id)">
                                            mdi-delete
                                        </v-icon>
                                    </td>
                                </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                </v-card>
            </v-row>
        </v-container>
        <alert />
    </div>
</template>

<script>
    import {
        mapActions,
        mapGetters
    } from 'vuex'
    import {Bus} from '../../main'
    import alert from '../../components/alert.vue'
    export default {
        components:{
            alert
        },
        data() {
            return {
                editData: {},
                editDialog: false,
                relations: ['Friend', 'Father', 'Mother', 'Sister', 'Brother', 'Son', 'Daughter', 'Husband', 'Wife'],
            }
        },
        computed: {
            ...mapGetters({
                beneficiaries: "beneficiary/beneficiaries"
            })
        },
        methods: {
            ...mapActions({
                getBeneficieries: "beneficiary/getBeneficeries",
                UpdateUserBeneficary: "beneficiary/UpdateUserBeneficary",
                deleteUserBeneficary: "beneficiary/deleteUserBeneficary"
            }),
            EditBeneficiary(beneficiary) {
                this.editData.id = beneficiary.id
                this.editData.first_name = beneficiary.first_name
                this.editData.last_name = beneficiary.last_name
                this.editData.email = beneficiary.email
                this.editData.phone_number = beneficiary.phone_number
                this.editData.relationship = beneficiary.relationship
                this.editDialog = true;
                // console.log(this.editData)
                // console.log(beneficiary)
            },
            updateBeneficary(){
                this.loading=true;
                this.UpdateUserBeneficary(this.editData).then(()=>{
                    this.loading=false;
                    Bus.$emit('showalert','beneficary updated')
                    this.editDialog=false;
                }).catch(()=>{
                    console.log('update error')
                })
            },
            deleteDelete(id){
                this.deleteUserBeneficary(id).then(()=>{
                     Bus.$emit('showalert','beneficary deleted !')
                }).catch((err)=>{
                    console.log(err)
                })
            }
        },
        mounted() {
            this.getBeneficieries()
        }
    }
</script>