<template>
  <div>
    <template>
      <div class="text-center">
        <v-dialog v-model="dialog" width="500">
          <v-card>
            <v-img :src="profeImage"></v-img>
          </v-card>
        </v-dialog>
      </div>
    </template>

    <!-- seedToMemeber.seed_is_waiting -->
    <div v-if="harvestMemeberList.harvest_is_waiting">
      <br /><br /><br />
      <v-container>
        <v-row class="d-flex justify-content-center">
          <v-card width="100%" flat tile>
            <v-card-title class="d-flex justify-center">
              <h1>You have to secure your payment to get paid the next round !</h1>
              <br />
              <h4>Remaing time until you secure your payment or it will pass you</h4>
            </v-card-title>
            <v-card-text class="d-flex justify-center">
              <v-img src="/remaing_time.png" height="300" max-width="400"></v-img>
            </v-card-text>
          </v-card>
        </v-row>
      </v-container>
      <!-- {{seedTimeLeft}} -->
    </div>

    <v-card class="mx-3" v-else flat>
      <v-card-title class="d-flex justify-center grey--text">HARVEST MEMBERS LIST</v-card-title>
      <v-item-group class="px-3">
        <v-row class="pt-5 d-flex justify-space-around">
          <v-col v-for="memeber in harvestMemeberList.data" :key="memeber.id" cols="12" xs="6" sm="4" md="4" lg="3">
            <v-item cols="12" xs="1" sm="6" md="6" lg="3">
              <v-card class="mx-auto" max-width="320">
                <v-img max-height="270"
                  src="https://img.freepik.com/free-vector/white-background-with-blue-tech-hexagon_1017-19366.jpg?size=626&ext=jpg&uid=R26073852&ga=GA1.2.1150267792.1654041129">
                  <v-row>
                    <v-col class="d-flex justify-center" cols="12">
                      <v-avatar size="80">
                        <v-img :src="`https://api.yefikrmead.com/media/${memeber.user_profile.profile_pic}`">
                        </v-img>
                      </v-avatar>
                    </v-col>
                    <v-col class="d-flex justify-center" cols="12">
                      <span class="overline">{{ memeber.first_name }} {{ memeber.last_name }}
                      </span>
                    </v-col>
                    <v-divider class="mx-10"></v-divider>
                    <v-col cols="12">

                      <v-list-items>
                        <v-list-item-content>
                          <span class="grey--text px-2 overline">Name <small>{{ memeber.first_name }}
                              {{ memeber.last_name }}</small></span>
                          <span class="grey--text px-2 overline">Phone <small> {{ memeber.phone_number }}</small></span>
                          <span class="grey--text px-2 overline">Act
                            <small>{{ memeber.user_profile.account_number }}</small></span>
                        </v-list-item-content>
                      </v-list-items>
                    </v-col>
                  </v-row>
                </v-img>
              </v-card>
            </v-item>
          </v-col>
        </v-row>
      </v-item-group>
      <v-divider class="ma-10 m"></v-divider>
    </v-card>

    <harvestList />

    <v-card width="100%" class="mx-3">
      <v-card-title class="pl-10">NO GIFT RECORD AVAILABLE FOR DISPLAY YET!</v-card-title>
    </v-card>
    <alert />



    <!-- service charge alert dialog -->
    <template class="mx-10">
      <div class="text-center">
        <v-dialog persistent v-model="serviceChargeDialog" width="auto">
          <v-card-text>
            <v-alert prominent type="info">
              <v-row align="center">
                <v-col class="grow">
                  PAY servcie Charge ,
                  <small>and you will not see this message</small>
                </v-col>
                <v-col class="shrink">
                  <v-btn to="/app/charityDonation">go to service charge</v-btn>
                </v-col>
              </v-row>
            </v-alert>
          </v-card-text>
        </v-dialog>
      </div>
    </template>



    <!-- service charge alert dialog -->
    <template class="mx-10">
      <div class="text-center">
        <v-dialog persistent v-model="registrationFeeDialog" width="auto">
          <v-card-text>
            <v-alert prominent type="info">
              <v-row align="center">
                <v-col class="grow">
                  Go to registration fee payment ,
                  <!-- <small>and you will not see this message</small> -->
                </v-col>
                <v-col class="shrink">
                  <v-btn to="/app/registrationFee">click here</v-btn>
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
  import axios from "axios";
  import harvestList from "./harvestList.vue";
  import alert from "../../components/alert.vue";
  import {
    mapActions,
    mapGetters
  } from "vuex";
  export default {
    components: {
      alert,
      harvestList,
    },
    data() {
      return {
        dialog2: false,
        approveing: false,
        rejecting: false,
        dialog: false,
        profeImage: "",
        seedTimeLeft: [2, 2, 2, 31],
        approveStatus: {
          status: "Received",
        },
        RejectStatus: {
          status: "Rejected",
        },
        registrationFeeDialog: false,
        serviceChargeDialog: false
      };
    },
    computed: {
      ...mapGetters({
        harvestMemeberList: "harvest/harvestMemeberList",
        user: "auth/user",
      }),
    },
    methods: {
      ...mapActions({
        fetchMyHarvestMemebers: "harvest/fetchMyHarvestFromMemeber",
      }),
    },
    created() {
      if (this.user.is_registeration_fee_paid == false & this.user.level > 2) {
        this.registrationFeeDialog = true
      } else {
        this.registrationFeeDialog = false
      }
      if (this.user.force_to_service_charge == true & this.user.level > 2) {
        this.serviceChargeDialog = true;
      } else {
        this.serviceChargeDialog = false;
      }
      this.fetchMyHarvestMemebers();
    },
  };
</script>