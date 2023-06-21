<template>
  <div>
    <v-container>
      <h2>Dashboard</h2>
    </v-container>
    <v-card class="mx-2">
      <v-row>
        <v-col cols="12" sm="12" md="8" lg="8">
          <v-row>
            <v-col cols="12" sm="12" md="6" lg="6">
              <v-card class="mt-4 mx-auto" max-width="400">
                <v-sheet class="v-sheet--offset mx-auto" color="purple" elevation="12" max-width="calc(100% - 32px)">
                  <v-sparkline :labels="labels" :value="value" color="white" line-width="2" padding="16"></v-sparkline>
                </v-sheet>

                <v-card-text class="pt-0">
                  <div class="title font-weight-light mb-2">
                    {{ AccountStatusReport.first_tier_members }}
                  </div>
                  <div class="subheading font-weight-light grey--text">
                    Total Number of 1st Tier Members
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" sm="12" md="6" lg="6">
              <v-card class="mt-4 mx-auto" max-width="400">
                <v-sheet class="v-sheet--offset mx-auto" color="teal" elevation="12" max-width="calc(100% - 32px)">
                  <v-sparkline :labels="labels" :value="value" color="white" line-width="2" padding="16"></v-sparkline>
                </v-sheet>

                <v-card-text class="pt-0">
                  <div class="title font-weight-light mb-2">
                    {{ AccountStatusReport.second_tier_members }}
                  </div>
                  <div class="subheading font-weight-light grey--text">
                    Total Number of 2nd Tier Members
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" sm="12" md="6" lg="6">
              <v-card class="mt-4 mx-auto" max-width="400">
                <v-sheet class="v-sheet--offset mx-auto" color="red" elevation="12" max-width="calc(100% - 32px)">
                  <v-sparkline :labels="labels" :value="value" color="white" line-width="2" padding="16"></v-sparkline>
                </v-sheet>

                <v-card-text class="pt-0">
                  <div class="title font-weight-light mb-2">
                    {{ AccountStatusReport.third_tier_members }}
                  </div>
                  <div class="subheading font-weight-light grey--text">
                    Total Number of 3rd Tier Members
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" sm="12" md="6" lg="6">
              <v-card class="mt-4 mx-auto" max-width="400">
                <v-sheet class="v-sheet--offset mx-auto" color="orange" elevation="12" max-width="calc(100% - 32px)">
                  <v-sparkline :labels="labels" :value="value" color="white" line-width="2" padding="16"></v-sparkline>
                </v-sheet>

                <v-card-text class="pt-0">
                  <div class="title font-weight-light mb-2">
                    {{ AccountStatusReport.waiting_room }}
                  </div>
                  <div class="subheading font-weight-light grey--text">
                    Total Members in the Waiting Room
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-card>
                <v-card-title> Network Analytics Report </v-card-title>
                <v-card-subtitle>
                  Report of your team network status and health level.
                </v-card-subtitle>
                <v-card-text>
                  <v-row class="d-flex justify-space-around">
                    <v-col>
                      <v-icon color="purple" class="py-2">circle</v-icon>1st Tier<br />
                      <h1 class="py-2">{{ MembersInPercent.first_tier_members }}%</h1>
                      <p>1 / 2 Members</p>
                    </v-col>
                    <v-col>
                      <v-icon color="teal" class="py-2">circle</v-icon>2nd Tier<br />
                      <h1 class="py-2">{{ MembersInPercent.second_tier_members }}%</h1>
                      <p>0 / 4 Members</p>
                    </v-col>
                    <v-col>
                      <v-icon color="pink" class="py-2">circle</v-icon>3rd Tier
                      <br />
                      <h1 class="py-2">{{ MembersInPercent.third_tier_members }}%</h1>
                      <p>1 / 8 Members</p>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" sm="12" md="4" lg="4">
          <v-card>
            <v-card-title> My Account Statutory Report </v-card-title>
            <v-divider></v-divider>

            <v-card-text>
              <article class="d-flex justify-center mt-3">Account Verification</article>
              <v-progress-linear :value="accountStatusReport.account_verfication" color="blue" height="13" class="mt-6">
                <template v-slot="{ value }">
                  <strong>{{ Math.ceil(value) }}%</strong>
                </template>
              </v-progress-linear>
              <article class="d-flex justify-center mt-3">
                Preferred Payment Method
              </article>

              <v-progress-linear :value="accountStatusReport.payment_method_added" color="teal" height="13"
                class="mt-6">
                <template v-slot="{ value }">
                  <strong>{{ Math.ceil(value) }}%</strong>
                </template>
              </v-progress-linear>
              <article class="d-flex justify-center mt-3">Seed</article>

              <v-progress-linear :value="accountStatusReport.seed" color="orange" height="13" class="mt-6">
                <template v-slot="{ value }">
                  <strong>{{ Math.ceil(value) }}%</strong>
                </template>
              </v-progress-linear>
              <article class="d-flex justify-center mt-3">Harvest</article>

              <v-progress-linear :value="accountStatusReport.harvest" color="yellow" height="13" class="mt-6">
                <template v-slot="{ value }">
                  <strong>{{ Math.ceil(value) }}%</strong>
                </template>
              </v-progress-linear>
              <article class="d-flex justify-center mt-3">Service charge</article>

              <v-progress-linear :value="accountStatusReport.charity_donation" color="pink" height="13" class="mt-6">
                <template v-slot="{ value }">
                  <strong>{{ Math.ceil(value) }}%</strong>
                </template>
              </v-progress-linear>
              <article class="d-flex justify-center mt-3">1nd Tier</article>

              <v-progress-linear :value="accountStatusReport.first_tier_members" color="lime" height="13" class="mt-6">
                <template v-slot="{ value }">
                  <strong>{{ Math.ceil(value) }}%</strong>
                </template>
              </v-progress-linear>
              <article class="d-flex justify-center mt-3">2nd Tier</article>

              <v-progress-linear :value="accountStatusReport.second_tier_members" color="cyan" height="13" class="mt-6">
                <template v-slot="{ value }">
                  <strong>{{ Math.ceil(value) }}%</strong>
                </template>
              </v-progress-linear>
              <article class="d-flex justify-center mt-3">3nd Tier</article>

              <v-progress-linear :value="accountStatusReport.third_tier_members" color="indigo" height="13"
                class="mt-6">
                <template v-slot="{ value }">
                  <strong>{{ Math.ceil(value) }}%</strong>
                </template>
              </v-progress-linear>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row class="mx-2">
        <v-card width="100%" class="py-3">
          <v-row class="d-flex justify-space-around">
            <v-col class="d-flex justify-center">
              <v-row>
                <v-col cols="12">
                  <p class="d-flex justify-center">Total Package</p>
                </v-col>
                <v-col cols="12">
                  <h1 class="d-flex justify-center">{{ gifts.total_gifts }}</h1>
                  <h3 class="d-flex justify-center">Total Gifts</h3>
                </v-col>
              </v-row>
            </v-col>
            <v-divider vertical></v-divider>
            <v-col class="d-flex justify-center">
              <v-row>
                <v-col cols="12">
                  <p class="d-flex justify-center">Gift Received</p>
                </v-col>
                <v-col cols="12">
                  <h1 class="d-flex justify-center">
                    {{ gifts.gift_received }}
                  </h1>
                  <h3 class="d-flex justify-center green--text">Gifts Received</h3>
                </v-col>
              </v-row>
            </v-col>
            <v-divider vertical></v-divider>
            <v-col class="d-flex justify-center">
              <v-row>
                <v-col cols="12">
                  <p class="d-flex justify-center">Total Package</p>
                </v-col>
                <v-col cols="12">
                  <p class="d-flex justify-center">{{ gifts.outstanding }}</p>

                  <h3 class="d-flex justify-center red--text">Gifts Pending</h3>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </v-row>
      <br />
      <br />
      <v-card>
        <h3 class="pa-5">Transactions Record - 10 Most Recent</h3>
        <template>
          <v-simple-table fixed-header height="300px">
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">ID</th>
                  <th class="text-left">From</th>
                  <th class="text-left">To</th>
                  <th class="text-left">AMOUNT</th>
                  <th class="text-left">DATE</th>
                </tr>
              </thead>
              <tbody v-if="LatestTransactions">
                <tr v-for="(transaction, index) in LatestTransactions" :key="index">
                  <td>{{ index + 1 }}</td>
                  <td>{{ transaction.from_name }} {{ transaction.from_last_name }}</td>
                  <td>
                    {{ transaction.to_first_name }}
                    {{ transaction.to_last_name }}
                  </td>
                  <td>{{ transaction.amount }}</td>
                  <td>{{ transaction.created_at }}</td>
                </tr>
              </tbody>

              <tbody v-if="(LatestTransactions.length = 0)">
                <h2 class="d-flex justify-center">NO TRANSACTION RECORD AVAILABLE!</h2>
              </tbody>
            </template>
          </v-simple-table>
        </template>
      </v-card>
    </v-card>
    <addProfile />

    <template class="mx-10">
      <div class="text-center">
        <v-dialog persistent v-model="dialog" width="auto">
          <v-card-text>
            <v-alert prominent type="error">
              <v-row align="center">
                <v-col class="grow">
                  It is time for charity Donation , Please Donate!
                  <small>and you will not see this message</small>
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
    <agreement />
  </div>
</template>
<script>
  import agreement from '../../views/licenceAndRegstration/Agreement.vue'
  import axios from "axios";
  import {
    mapGetters,
    mapActions
  } from "vuex";
  import {
    Bus
  } from "../../main";
  import addProfile from "./profile/addProfile.vue";
  export default {
    components: {
      addProfile,
      agreement,
    },
    computed: {
      ...mapGetters({
        user: "auth/user",
        userProfile: "auth/userProfile",
        paymentType: "auth/paymentType",
        accountStatusReport: "stat/accountStatusReport",
        AccountStatusReport: "stat/AccountStatusReport",
        MembersInPercent: "stat/MembersInPercent",
        LatestTransactions: "stat/LatestTransactions",
        gifts: "stat/gifts",
      }),
    },
    methods: {
      ...mapActions({
        getUserProfile: "auth/getUserProfile",
        get_account_statutory_report: "stat/get_account_statutory_report",
        get_stastics_members: "stat/get_stastics_members",
        get_members_in_percent: "stat/get_members_in_percent",
        get_latest_transactions: "stat/get_latest_transactions",
        get_stastics_gifts: "stat/get_stastics_gifts",
      }),
    },
    created() {
      this.get_account_statutory_report();
      this.get_stastics_members();
      this.get_members_in_percent();
      this.get_latest_transactions();
      this.get_stastics_gifts();
      this.getUserProfile(this.user.id).then(() => {
        if (!this.userProfile.account_number) {
          Bus.$emit("showDialog");
        }
      });
  



      // console.log(this.user.has_donated, this.user.received_count);
    },
    mounted() {


    },
    data: () => ({
      dialog: false,
      timeToDonate: false,
      statuses: [{
          title: "Account Verification",
          percentage: 100,
          color: "blue",
        },
        {
          title: "Preferred Payment Method",
          percentage: 100,
          color: "teal",
        },
        {
          title: "Seed",
          percentage: 100,
          color: "orange",
        },
        {
          title: "Harvest",
          percentage: 1,
          color: "orange",
        },
        {
          title: "Charity Donation",
          percentage: 10,
          color: "yellow",
        },
        {
          title: "1st Tier",
          percentage: 100,
          color: "purple",
        },
        {
          title: "2nd Tier",
          percentage: 0,
          color: "purple",
        },
        {
          title: "3rd Tier",
          percentage: 0,
          color: "purple",
        },
      ],
      labels: ["12am", "3am", "6am", "9am", "12pm", "3pm", "6pm", "9pm"],
      value: [200, 675, 410, 390, 310, 460, 250, 240],
    }),
  };
</script>
<style scoped>
  .v-sheet--offset {
    top: -24px;
    position: relative;
  }
</style>