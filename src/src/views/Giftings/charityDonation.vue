<template>
  <div>
    <br /><br />




    <v-card class="mx-auto" max-width="320" v-if="adminDonation.length > 0">
      <v-img max-height="270"
        src="https://img.freepik.com/free-vector/white-background-with-blue-tech-hexagon_1017-19366.jpg?size=626&ext=jpg&uid=R26073852&ga=GA1.2.1150267792.1654041129">
        <v-row>
          <v-col class="d-flex justify-center" cols="12">
            <template v-if="adminDonation[0].user_profile !== null">
              <v-avatar size="80">

                <v-img :src="
                    `https://api.yefikrmead.com/media/${adminDonation[0].user_profile.profile_pic}`
                  " lazy-src="https://image.freepik.com/free-vector/user-icon_126283-435.jpg"></v-img>
              </v-avatar>
            </template>
            <template v-if="adminDonation[0].user_profile === null">
              <v-avatar size="80">
                <v-img src="https://image.freepik.com/free-vector/user-icon_126283-435.jpg"
                  lazy-src="https://image.freepik.com/free-vector/user-icon_126283-435.jpg">
                </v-img>
              </v-avatar>
            </template>

          </v-col>
          <v-col class="d-flex justify-center" cols="12">


            <span class="overline"> {{ adminDonation[0].first_name }} {{ adminDonation[0].last_name }}
            </span>
          </v-col>
          <!-- <v-divider class="mx-10"></v-divider> -->
          <v-col cols="12">
            <v-list-items>
              <v-list-item-content>
                <span class="grey--text px-2 overline">Email <small>{{ adminDonation[0].email }}</small></span>
                <span class="grey--text px-2 overline">Phone <small> {{ adminDonation[0].phone_number }}</small></span>
                <span class="grey--text px-2 overline">Act num
                  <small>{{
                      adminDonation[0].user_profile.account_number
                    }}</small></span>
              </v-list-item-content>
            </v-list-items>
          </v-col>
        </v-row>
      </v-img>
    </v-card>





    <!-- {{adminDonation}} -->
    <!-- <v-divider></v-divider> -->
<!--  -->
    <v-container>
      <v-row v-if="user.force_to_service_charge & user.level >2"> 
        <v-col class="d-flex justify-end">
          <v-dialog v-model="serviceChargeDilaog">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark v-bind="attrs" v-on="on">
                Pay Service Charge
                <v-icon right>
                  payments
                </v-icon>
              </v-btn>
            </template>
            <div class="d-flex justify-end">
              <v-card width="100%">
                <v-card-title class="headline grey lighten-2 mb-2">
                   Pay Service Charge
                    <v-card-subtitle> {{admin.user_profile.account_name }}
                        {{admin.user_profile.account_number }}
                    </v-card-subtitle>
                </v-card-title>
                <ValidationObserver v-slot="{ handleSubmit }">
                  <form @submit.prevent="handleSubmit(save)">
                    <v-card-text>
                      <ValidationProvider rules="required|integer" name="amount" v-slot="{ errors }">
                        <v-text-field dense outlined label="amount" v-model="seed.amount" :error="errors.length > 0"
                          :error-messages="errors[0]">
                        </v-text-field>
                      </ValidationProvider>
                      <ValidationProvider rules="required" name="description" v-slot="{ errors }">
                        <v-textarea outlined label="description" v-model="seed.description" :error="errors.length > 0"
                          :error-messages="errors[0]">
                        </v-textarea>
                      </ValidationProvider>
                      <ValidationProvider rules="required" name="round" v-slot="{ errors }">
                        <v-select v-model="seed.round" :items="[
                      'First Round',
                      'Second Round',
                      'Third Round',
                      'Fourth Round',
                      'Fivth Round',
                    ]" label="round" outlined dense :error="errors.length > 0" :error-messages="errors[0]">
                        </v-select>
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
                      <v-btn color="primary" :loading="loading" type="submit">
                        save
                      </v-btn>
                      <v-btn color="primary" outlined @click="serviceChargeDilaog=false">
                        cancel
                      </v-btn>
                    </v-card-actions>
                  </form>
                </ValidationObserver>
              </v-card>
            </div>
          </v-dialog>

        </v-col>
      </v-row>
    </v-container>


    <!-- <v-container >
            <h1 class="d-flex justify-center">wait until you get more than five seed</h1>
        </v-container> -->

    <v-dialog v-model="Imagedialog" width="50%">
      <v-card>
        <v-img :src="proofImage"></v-img>
      </v-card>
    </v-dialog>



    <v-dialog v-model="Editdialog" width="50%" persistent>
      <v-card width="100%">
        <v-card-title class="headline grey lighten-2 mb-2">
          Servie Charge
        </v-card-title>
        <ValidationObserver v-slot="{ handleSubmit }">
          <form @submit.prevent="handleSubmit(updateD)" enctype="multipart/form-data">
            <v-card-text>
              <ValidationProvider rules="required|integer" name="amount" v-slot="{ errors }">
                <v-text-field dense outlined label="amount" v-model="editData.amount" :error="errors.length > 0"
                  :error-messages="errors[0]">
                </v-text-field>
              </ValidationProvider>
              <ValidationProvider rules="required" name="description" v-slot="{ errors }">
                <v-textarea outlined label="description" v-model="editData.description" :error="errors.length > 0"
                  :error-messages="errors[0]">
                </v-textarea>
              </ValidationProvider>
              <ValidationProvider rules="required" name="round" v-slot="{ errors }">
                <v-select v-model="editData.round" :items="[
                    'First Round',
                    'Second Round',
                    'Third Round',
                    'Fourth Round',
                    'Fivth Round',
                  ]" label="round" outlined dense :error="errors.length > 0" :error-messages="errors[0]">
                </v-select>
              </ValidationProvider>
              <label>Proof image</label><br />
              <ValidationProvider rules="image" name="image proof" v-slot="{ errors }">
                <input type="file" @change="editImage" />
                <br />
                <small class="red--text pl-3">{{ errors[0] }}</small>
              </ValidationProvider>
              <br /><br />
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" :loading="editloading" type="submit">
                update
              </v-btn>
              <v-btn color="primary" text @click="closeEdit()">
                close
              </v-btn>
            </v-card-actions>
          </form>
        </ValidationObserver>
      </v-card>
    </v-dialog>

    <!-- {{admin}} -->

    <br />

    <v-container>
      <h1 class="text--secondary">Service Charge</h1>
    </v-container>
    <v-container>



      <!-- search service charge componenent   -->
      <v-row v-if="user.level == 0">
        <v-btn color="primary" class="my-6 ml-10 " dark to="/app/searchServiceCharge">
          Search service charge
          <v-icon right>person_search</v-icon>
        </v-btn>
      </v-row>






      <v-container>
        <v-row>
          <v-col class="d-flex justify-end">
            <v-chip class="caption" color="info">
              Total paid {{donations.count}}
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


      <v-simple-table fixed-header class="elevation-1" loading-text="Loading... Please wait" v-if="!loadingDonations">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">From</th>
              <th class="text-left">AMOUNT</th>
              <th class="text-left">DETAILS</th>
              <th class="text-left">Status</th>
              <th class="text-left">Round</th>
              <th class="text-left">Phone</th>
              <th class="text-left">DATE</th>
              <th class="text-left">proof</th>
              <th class="text-center" v-if="user.level != 0">Actions</th>
              <th class="text-center" colspan="2" v-if="user.level == 0">
                Admin
              </th>
            </tr>
          </thead>
          <template>

          </template>
          <tbody v-if="donations">
            <tr v-for="(donation, index) in donations.results" :key="index">
              <td>
                {{ donation._from.first_name }} {{ donation._from.last_name }}
              </td>
              <td>{{ donation.amount }}</td>
              <td>{{ donation.description }}</td>
              <td>
                <v-chip :class="`${donation.status} white--text`">{{
                  donation.status
                }}</v-chip>
              </td>
              <td>{{ donation.round }}</td>
              <td>
                {{ donation._from.phone }}
              </td>
              <td>{{moment(donation.created_at).format('YYYY-MM-DD')}}</td>
              <td>
                <v-btn text outlined color="primary" @click="showProof(donation.file_upload)">show proof
                </v-btn>
              </td>
              <td v-if="user.level != 0 ">
                <v-btn v-if="donation.status !== 'Received'" icon small class="mr-2" color="orange"
                  @click="editDonation(donation)">
                  <v-icon small>
                    mdi-pencil
                  </v-icon>
                </v-btn>
                <v-btn v-if="donation.status !== 'Received'" icon small color="red" @click="deleteD(donation.id)"
                  :loading="loading">
                  <v-icon small>
                    mdi-delete
                  </v-icon>
                </v-btn>
              </td>
              <td v-if="user.level == 0">
                <v-btn outlined small color="green" @click="approveCharity(donation.id)">approve
                </v-btn>
              </td>
              <td v-if="user.level == 0">
                <v-btn outlined small color="red" @click="RejectCharity(donation.id)">reject</v-btn>
              </td>
            </tr>
          </tbody>
          <p class="d-flex justify-center" v-else>
            NO ENTRY AVAILABLE FOR LISTING.
          </p>
        </template>
      </v-simple-table>

      <!-- {{donations.count}} -->
      <template>
        <div class="text-center ">
          <v-btn outlined class="my-5 mr-3" v-if="donations.previous !== null" @click="loadPrevious(donations.previous)"
            color="blue">
            <v-icon>
              chevron_left
            </v-icon>
            prev page
          </v-btn>
          <v-btn class="my-5" v-if="donations.next !== null" outlined @click="loadNext(donations.next)" color="blue">
            next page
            <v-icon>
              navigate_next
            </v-icon>
          </v-btn>
        </div>
      </template>
      <!-- </v-card> -->
    </v-container>
    <alert />
    <!-- <h1>{{user.level}}</h1> -->
  </div>
</template>

<script>
  import axios from "axios";
  import {
    Bus
  } from "../../main";
  import alert from "../../components/alert.vue";
  import searchServiceChargeVue from "../../components/search/searchServiceCharge.vue";
  import {
    mapGetters,
    mapActions
  } from "vuex";
  export default {
    components: {
      alert,
      searchServiceChargeVue
    },
    data() {
      return {
        selectedImage: null,
        updateImage: null,
        seed: {},
        loadingDonations: false,
        loading: false,
        proofImage: "",
        Imagedialog: false,
        Editdialog: false,
        editData: {},
        editloading: false,
        showform: false,
        serviceChargeDilaog:false,
        donations: {},
        currentList: 'charity-donation-transactions',
        recivedStatus: {
          status: "Received",
        },
        RejectStatus: {
          status: "Rejected",
        },
      };
    },
    computed: {
      ...mapGetters({
        admin: "donate/admin",
        // donations: 'donate/donations',
        user: "auth/user",
        adminDonation: "donate/adminDonation",
      }),
    },
    methods: {
      ...mapActions({
        getAdmin: "donate/getAdmin",
        getDonations: "donate/getDonations",
        Donate: "donate/Donate",
        deleteDonation: "donate/deleteDonation",
        updateDonation: "donate/updateDonation",
        updateDonationWithImage: "donate/updateDonationWithImage",
        Admindonations: "donate/Admindonations",
      }),
      loadPrevious(prevlink) {
        this.currentList = prevlink;
        this.loadingDonations = true;
        axios
          .get(prevlink)
          .then((res) => {
            this.donations = res.data;
            this.loadingDonations = false;
          })
          .catch((err) => {
            console.log(err);
            this.loadingDonations = false;
          });
      },

      loadNext(nextlink) {
        this.currentList = nextlink;
        // console.log(nextlink);
        this.loadingDonations = true;
        axios
          .get(nextlink)
          .then((res) => {
            this.donations = res.data;
            this.loadingDonations = false;
          })
          .catch((err) => {
            console.log(err);
            this.loadingDonations = false;
          });
      },
      selectImage(e) {
        this.selectedImage = e.target.files[0];
        // console.log(this.selectedImage);
      },
      editImage(e) {
        this.updateImage = e.target.files[0];
        // console.log(this.selectedImage);
      },
      save() {
        this.loading = true;
        const fd = new FormData();
        fd.append("file_upload", this.selectedImage, this.selectedImage.name);
        fd.append("amount", this.seed.amount);
        fd.append("description", this.seed.description);
        fd.append("round", this.seed.round);
        fd.append("_to", this.admin.id);
        this.Donate(fd)
          .then(() => {
            this.loading = false;
            Bus.$emit("showalert", "successs !");
          })
          .catch((err) => {
            this.loading = false;
            // console.log(err.response.data.errors.detail[0])
            Bus.$emit("showError", err.response.data.errors.detail[0]);
            this.loading = false;
          })
        ``;
      },
      deleteD(id) {
        this.deleteDonation(id)
          .then(() => {
            Bus.$emit("showalert", "Service Charge deleted !");
          })
          .catch((err) => {
            console.log(err);
          });
      },
      showProof(image) {
        // console.log(image)
        this.proofImage = image;
        this.Imagedialog = true;
      },
      editDonation(donation) {
        this.editData = {};
        this.Editdialog = true;
        this.editData.id = donation.id;
        this.editData.amount = donation.amount;
        this.editData.description = donation.description;
        this.editData.round = donation.round;

        // console.log(this.editData)
      },
      updateD() {
        this.editloading = true;
        if (this.updateImage == null) {
          this.updateDonation(this.editData).then(() => {
            this.editloading = false;
            this.Editdialog = false;
          });
        } else if (this.updateImage !== null) {
          const fd = new FormData();
          fd.append("file_upload", this.updateImage, this.updateImage.name);
          fd.append("id", this.editData.id);
          fd.append("amount", this.editData.amount);
          fd.append("description", this.editData.description);
          fd.append("round", this.editData.round);
          this.updateDonationWithImage(fd).then(() => {
            this.editloading = false;
            this.Editdialog = false;
          }).catch((err) => {
            console.log(err.response.data.errors.detail[0])
            this.Editdialog = false;
            this.editloading = false;
          });
        }
      },

      closeEdit() {
        this.Editdialog = false;
      },

      async approveCharity(id) {
        this.recivedStatus.id = id;
        await axios.patch(`charity-donation-transactions/${this.recivedStatus.id}`, this.recivedStatus).then(
          () => {
            this.get_charity_donation_transactions();
            Bus.$emit('showalert', 'service charge approved');
          }).catch((err) => {
          Bus.$emit('showError', err.response.data.detail[0])
        })
      },
      async RejectCharity(id) {
        this.RejectStatus.id = id;
        await axios.patch(`charity-donation-transactions/${this.RejectStatus.id}`, this.RejectStatus).then(
          () => {
            this.get_charity_donation_transactions();
            Bus.$emit('showalert', 'service charge Rejected');
          }).catch((err) => {
          Bus.$emit('showError', err.response.data.detail[0])
        })

      },
      async get_charity_donation_transactions() {
        this.loadingDonations = true
        await axios
          .get(this.currentList)
          .then((res) => {
            this.donations = res.data;
            this.loadingDonations = false
          })
          .catch((err) => {
            console.log(err);
            this.loadingDonations = false
          });
      }
    },
    created() {
      this.get_charity_donation_transactions();
      this.loadingDonations = true

      this.getAdmin();

      if (this.user.force_to_service_charge == true & this.user.level > 2) {
        this.serviceChargeDilaog = true;
      } else {
        this.serviceChargeDilaog = false;
      }

    },
  };
</script>

<style scoped>
  .v-chip.Pending {
    background: #ffb74d;
  }

  .v-chip.Received {
    background: #00b619;
  }

  .v-chip.Rejected {
    background: #b60600;
  }

  .center {
    margin: 0 auto;
  }
</style>