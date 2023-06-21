<template>
  <div>
    <v-list two-line>
      <template v-for="(item, index) in activeUsers">
        <v-subheader v-if="item.header" :key="item.header" v-text="item.header"></v-subheader>
        <v-divider v-else-if="item.divider" :key="index" :inset="item.inset"></v-divider>
        <v-list-item v-else :key="item.email">
          <template v-if="item.user_profile !== null">
            <v-list-item-avatar>
              <v-img :src="item.user_profile.profile_pic"
                lazy-src="https://image.freepik.com/free-vector/user-icon_126283-435.jpg"></v-img>
            </v-list-item-avatar>
          </template>
          <template v-if="item.user_profile === null">
            <v-list-item-avatar>
              <v-img src="https://image.freepik.com/free-vector/user-icon_126283-435.jpg"
                lazy-src="https://image.freepik.com/sfree-vector/user-icon_126283-435.jpg"></v-img>
            </v-list-item-avatar>
          </template>


          <v-list-item-content>
            <v-list-item-title v-html="item.first_name"></v-list-item-title>
            <v-list-item-subtitle v-html="item.email"></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </div>
</template>
<script>
  import axios from 'axios'
  export default {
    computed: {
      activeUsers: function () {
        return this.allMemebers.filter((memeber) => {
          return memeber.is_active
        })
      }
    },
    created() {
      axios.get('members').then((res) => {
        this.allMemebers = res.data
        this.overlay = false
      })
    },
    data: () => ({
      allMemebers: [],
      items: [{
          header: '',
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          name: 'kasu man',
          email: "kasuman@gmail.com",
        },
        {
          divider: true,
          inset: true
        },
        {
          header: '',
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          name: 'dawit ',
          email: "dawit@gmali.com",
        },
        {
          divider: true,
          inset: true
        },
        {
          header: '',
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          name: 'lili',
          email: "lili@gmail.com",
        },
        {
          divider: true,
          inset: true
        },
      ],
    }),
  }
</script>