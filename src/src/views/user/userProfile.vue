<template>
  <div>
    <v-container>
      <h1 class="text--secondary my-8">Profile</h1>
      <div v-if="!userProfile.account_number">
        <addProfile> </addProfile>
      </div>
    </v-container>

    <v-row class="mx-3">
      <v-col cols="12" sm="12" md="12" lg="4">
        <v-card>
          <v-card-title class="d-flex justify-center">
            <template v-if="user.user_profile">
              <v-avatar size="150">
                <v-img :src="`https://api.yefikrmead.com/media/${user.user_profile.profile_pic}`">
                </v-img>
              </v-avatar>
            </template>
          </v-card-title>
          <h3 class="d-flex justify-center">
            {{ user.first_name }} {{ user.last_name }}
          </h3>
          <h5 class="d-flex justify-center">{{ user.email }}</h5>
          <v-row class="d-flex justify-center my-3 pb-5">
            <v-icon class="d-flex justify-center" color="#64B5F6">mdi-facebook</v-icon>
            <v-icon class="d-flex justify-center" color="#64B5F6">mdi-twitter</v-icon><br />
          </v-row>
          <changePassword />
        </v-card>

        <!-- beneficiary component -->
        <AddBeneficiary />

        <br />
        <v-card>
          <p class="px-3 pt-2">Account Guarantor</p>
          <v-divider></v-divider>
          <v-alert icon="mdi-shield-lock-outline" prominent text type="info">
            <h3>IMPORTANT NOTICE!</h3>
            Please fill this form if you are the guarantor standing on behalf of : Helen
            Hailu.
          </v-alert>
          <v-form class="pb-3">
            <v-text-field dense label="Your user ID" outlined class="d-flex justify-center mx-2">
            </v-text-field>
            <v-divider class="my-2"></v-divider>
            <v-btn color="purple" class="justify-end white--text ml-5">save</v-btn>
          </v-form>
        </v-card>
        <br />

        <v-card class="py-5">
          <p class="px-3 pt-2">Reset my password</p>
          <v-divider class="py-2"></v-divider>
          <ValidationObserver v-slot="{ handleSubmit }">
            <form @submit.prevent="handleSubmit(ResetPassword)">
              <ValidationProvider rules="required|email" name="E-mail" v-slot="{ errors }">
                <v-text-field dense label="E-mail" placeholder="Current Password" outlined v-model="user.email"
                  class="d-flex justify-center mx-2" :error="errors.length > 0" :error-messages="errors[0]">
                </v-text-field>
              </ValidationProvider>
              <v-divider class="my-2"></v-divider>
              <v-btn color="purple" class="justify-end white--text ml-5" type="submit">Reset</v-btn>
            </form>
          </ValidationObserver>
        </v-card>
      </v-col>

      <!-- EditProfile  -->
      <v-col cols="12" sm="12" md="12" lg="8">
        <v-card class="pa-3">
          <p class="pl-3 pt-3">Edit Profile</p>
          <v-divider class="my-2"></v-divider>
          <ValidationObserver v-slot="{ handleSubmit }">
            <form @submit.prevent="handleSubmit(updatePro)">
              <v-row class="pb-3">
                <v-col cols="12" sm="12" md="12" lg="6">
                  <ValidationProvider rules="required" name="account name" v-slot="{ errors }">
                    <v-text-field dense label="account_name" outlined class="mx-2" v-model="userProfile.account_name"
                      :error="errors.length > 0" :error-messages="errors[0]"></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="12" md="12" lg="6">
                  <ValidationProvider rules="required|integer" name="account number" v-slot="{ errors }">
                    <v-text-field dense label="account_number" outlined class="mx-2"
                      v-model="userProfile.account_number" :error="errors.length > 0" :error-messages="errors[0]">
                    </v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="12" md="12" lg="6">
                  <ValidationProvider rules="required" name="payment type" v-slot="{ errors }">
                    <v-select v-model="userProfile.payment_type" :items="paymentType" item-text="name" item-value="id"
                      label="payment type*" single-line outlined dense :error="errors.length > 0"
                      :error-messages="errors[0]">
                    </v-select>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="12" md="12" lg="6">
                  <v-menu ref="menu" v-model="menu" :close-on-content-click="false"
                    :return-value.sync="userProfile.birth_date" transition="scale-transition" offset-y
                    min-width="290px">
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field v-model="userProfile.birth_date" label="birth date" prepend-inner-icon="event"
                        outlined dense class="mx-2" v-bind="attrs" v-on="on"></v-text-field>
                    </template>
                    <v-date-picker v-model="userProfile.birth_date" no-title scrollable>
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                      <v-btn text color="primary" @click="$refs.menu.save(userProfile.birth_date)">OK</v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="12" md="12" lg="6">
                  <ValidationProvider rules="required" name="Country" v-slot="{ errors }">
                    <v-select :items="['ethiopia', 'Eirtria', 'sudan']" label="Country" outlined dense
                      v-model="userProfile.country" class="mx-2" :error="errors.length > 0" :error-messages="errors[0]">
                    </v-select>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="12" md="12" lg="6">
                  <ValidationProvider rules="required" name="city" v-slot="{ errors }">
                    <v-text-field dense label="State" outlined class="mx-2" v-model="userProfile.city"
                      :value="userProfile.city" :error="errors.length > 0" :error-messages="errors[0]">
                    </v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="12" md="12" lg="12">
                  <label for="" class="pl-3">Photo</label><br />
                  <input type="file" class="pl-3" @change="selectImage" />
                </v-col>
                <v-divider class="my-2"></v-divider>
                <v-row class="d-flex justify-content-center">
                  <v-col cols="4">
                    <v-btn color="purple" class="white--text" :loading="loading" type="submit" block>save
                    </v-btn>
                  </v-col>
                </v-row>

                <v-col cols="12" sm="12" md="12" lg="12">
                  <v-alert text type="info">
                    <h3>IMPORTANT NOTICE!</h3>
                    <p>
                      Please do ensure that you upload a valid and clear passport
                      photograph of your face above.
                    </p>
                    <p class="overline">
                      THIS IS VERY VITAL BECAUSE ANY OTHER PHOTOGRAPH COULD LEAD TO THE
                      SUSPENSION OF YOUR ACCOUNT!
                    </p>
                  </v-alert>
                </v-col>
              </v-row>
            </form>
          </ValidationObserver>
        </v-card>
        <br />
        <v-card>
          <v-form>
            <p class="pl-3 pt-3">Preferred Payment Option</p>
            <v-divider class="my-2"></v-divider>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
    <beneficiary />
    <alert />

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

    <!-- alert for service charge  -->

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
  </div>
</template>
<script>
  import axios from "axios";
  import {
    mapActions,
    mapGetters
  } from "vuex";
  import {
    Bus
  } from "../../main";
  import alert from "../../components/alert.vue";
  import addProfile from "./profile/addProfile";
  import AddBeneficiary from "./AddBeneficiary";
  import beneficiary from "./beneficiries.vue";
  import changePassword from "../../components/auth/changePassword.vue";
  // import updateProfile from './profile/updateProfile'
  export default {
    components: {
      AddBeneficiary,
      beneficiary,
      addProfile,
      alert,
      changePassword,
      // updateProfile
    },
    data() {
      return {
        loading: false,
        selectedImage: null,
        dialog: false,
        profile: {
          birth_date: new Date().toISOString().substr(0, 10),
        },
        // date: new Date().toISOString().substr(0, 10),
        menu: false,
        editProfile: {},
        donations: {},
        registrationFeeDialog: false,
        serviceChargeDialog: false

      };
    },
    computed: {
      ...mapGetters({
        paymentType: "auth/paymentType",
        userProfile: "auth/userProfile",
        user: "auth/user",
      }),
    },
    methods: {
      ...mapActions({
        getPayments: "auth/getPayments",
        saveUserProfile: "auth/saveUserProfile",
        getUserProfile: "auth/getUserProfile",
        updateUserProfile: "auth/updateUserProfile",
        resetPassword: "auth/resetPassword",
      }),
      selectImage(e) {
        this.selectedImage = e.target.files[0];
        console.log(this.selectedImage);
      },
      updatePro() {
        // console.log(this.selectedImage)
        if (this.selectedImage == null) {
          this.loading = true;
          this.editProfile.account_name = this.userProfile.account_name;
          this.editProfile.account_number = this.userProfile.account_number;
          this.editProfile.payment_type = this.userProfile.payment_type;
          this.editProfile.account_number = this.userProfile.account_number;
          this.editProfile.birth_date = this.userProfile.birth_date;
          this.editProfile.country = this.userProfile.country;
          this.editProfile.city = this.userProfile.city;
          this.editProfile.user = this.user.id;
          this.updateUserProfile(this.editProfile).then(() => {
            Bus.$emit("showalert", "profile updated successfully !");
            this.loading = false;
          });
        } else if (this.selectedImage != null) {
          this.loading = true;
          const fd = new FormData();
          fd.append("profile_pic", this.selectedImage, this.selectedImage.name);
          fd.append("account_name", this.userProfile.account_name);
          fd.append("account_number", this.userProfile.account_number);
          fd.append("payment_type", this.userProfile.payment_type);
          fd.append("birth_date", this.userProfile.birth_date);
          fd.append("country", this.userProfile.country);
          fd.append("city", this.userProfile.city);
          fd.append("user", localStorage.getItem("id"));
          this.updateUserProfile(fd).then(() => {
            Bus.$emit("showalert", "profile updated successfully !");
            this.loading = false;
            this.dialog = false;
          });
        }

        // console.log(this.editProfile);

        // console.log(this.profile, localStorage.getItem('id'))
      },
      ResetPassword() {
        var useremail = {
          email: this.user.email,
        };
        this.resetPassword(useremail)
          .then(() => {
            Bus.$emit("showalert", "new password sent to your email ,  success!");
          })
          .catch((err) => {
            console.log(err);
          });
      },
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
      this.getPayments();
      this.getUserProfile(this.user.id).then(() => {
        Bus.$emit("showDialog");
      });
      // service charge payment
    },
  };
</script>