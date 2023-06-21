<template>
  <div>
    <br><br>
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64" color="white"></v-progress-circular>
    </v-overlay>
    <v-container>
      <v-row>
        <h1 class="text--secondary mr-5 ">All memebers</h1>
        <search-user-vue></search-user-vue>
      </v-row>
    </v-container>

    <v-container>
      <v-row>
        <v-col class="d-flex justify-end">
          <v-chip class="caption" color="info">
            Total Number of users {{allMemebers.count}}
          </v-chip>
        </v-col>
      </v-row>
    </v-container>
    <div class="mx-3">
      <v-card width="100%">
        <v-row>
          <v-col class="d-flex justify-center">
            <v-progress-circular :size="70" :width="7" color="blue" indeterminate v-if="loadingDonations">
            </v-progress-circular>
          </v-col>
        </v-row>
        <v-simple-table v-if="!loadingDonations" fixed-header height="100%" :loading="true"
          loading-text="Loading... Please wait">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">#index</th>
                <th class="text-left">ID</th>
                <th class="text-left">Profile</th>
                <th class="text-left">Name</th>
                <th class="text-left">AgreeTerms</th>
                <th class="text-left">Email</th>
                <th class="text-left">phone_number</th>
                <th class="text-left">Level</th>
                <th class="text-left">Left</th>
                <th class="text-left">Right</th>
                <th class="text-left">Parent</th>
                <th class="text-left">Country</th>
                <th class="text-left">City</th>
                <th class="text-left">Account Number</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(memeber, index) in allMemebers.results" :key="index">
                <td>{{ index + 1 }}</td>
                <td>
                  <v-btn color="primary" outlined @click="getUUID(memeber.id)">get ID</v-btn>
                </td>
                <td>
                  <v-avatar v-if="memeber.user_profile">
                    <v-img :src="memeber.user_profile.profile_pic" lazy-src="https://picsum.photos/id/11/10/6"></v-img>
                  </v-avatar>
                </td>
                <td class="text-lowercase">
                  {{ memeber.first_name }} {{ memeber.last_name }}
                </td>
                  <td>
                  <v-chip :class="`${memeber.has_agreed}`">{{ memeber.has_agreed}}</v-chip>
                </td>
                <td>{{ memeber.email }}</td>
                <td>{{ memeber.phone_number }}</td>
                <td>{{ memeber.level }}</td>
                <td>{{ memeber.lft }}</td>
                <td>{{ memeber.rght }}</td>
                <td v-if="memeber.parent">{{ memeber.parent.email }}</td>
                <td v-if="memeber.user_profile">
                  {{ memeber.user_profile.country }}
                </td>
                <td v-if="memeber.user_profile">
                  {{ memeber.user_profile.city }}
                </td>
              
                <td v-if="memeber.user_profile">
                  {{ memeber.user_profile.account_number }}
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card>
      <template>
        <div class="text-center">
          <v-btn outlined class="my-5 mr-3" v-if="allMemebers.previous !== null"
            @click="loadPrevious(allMemebers.previous)" color="blue">
            <v-icon>chevron_left</v-icon>prev page
          </v-btn>
          <v-btn class="my-5" v-if="allMemebers.next !== null" outlined @click="loadNext(allMemebers.next)"
            color="blue">
            next page
            <v-icon>navigate_next</v-icon>
          </v-btn>
        </div>
      </template>
    </div>




  </div>
</template>
<script>
  import searchUserVue from "../components/search/searchUser.vue";
  import axios from "axios";
  // import {
  //     Bus
  // } from '../../main'
  // import alert from '../../components/alert.vue'
  import {
    mapGetters,
    mapActions
  } from "vuex";
  export default {
    name: "Home",

    metaInfo: {
      title: "yefikirmaed",
      titleTemplate: "%s - all-users",
      htmlAttrs: {
        lang: "en",
        amp: true
      }
    },
    components: {
      searchUserVue
    },
    data() {
      return {
        loadingDonations: false,
        overlay: false,
        search: "",
        allMemebers: []
      };
    },
    computed: {
      ...mapGetters({
        // allMemebers: 'memeber/allMemebers'
      }),
      filterdUser: function () {
        return this.allMemebers.results.filter(memeber => {
          return memeber.first_name.match(this.search);
        });
      }
    },
    methods: {
      loadPrevious(prevlink) {
        this.loadingDonations = true;
        axios
          .get(prevlink)
          .then(res => {
            this.allMemebers = res.data;
            this.loadingDonations = false;
          })
          .catch(err => {
            console.log(err);
            this.loadingDonations = false;
          });
      },
      loadNext(nextlink) {
        this.loadingDonations = true;
        axios
          .get(nextlink)
          .then(res => {
            this.allMemebers = res.data;
            this.loadingDonations = false;
          })
          .catch(err => {
            console.log(err);
            this.loadingDonations = false;
          });
      },
      ...mapActions({
        adminGetMembers: "memeber/adminGetMembers"
      }),
      getUUID(id) {
        alert(id);
      }
    },
    created() {
      this.overlay = true;
      axios.get("members").then(res => {
        this.allMemebers = res.data;
        this.overlay = false;
      });

      axios.get('members?search=yefik').then(res => {
        console.log('search result', res.data)
      })
    }
  };
</script>

<style scoped>
    .v-chip.false {
        background: #FFB74D;
    }

    .v-chip.true {
        background: #00b619;
    }
</style>