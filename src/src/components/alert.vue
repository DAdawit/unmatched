<template>
  <div class="text-center ma-2">
    <v-snackbar v-model="snackbar" color="teal darken-1">
      <span class="white--text"> {{ text }}</span>
      <template v-slot:action="{ attrs }">
        <v-icon color="white" v-bind="attrs" @click="snackbar = false">
          clear
        </v-icon>
      </template>
    </v-snackbar>
    <v-snackbar v-model="error" color="red darken-2">
      <span class="white--text"> {{ text }}</span>
      <template v-slot:action="{ attrs }">
        <v-icon color="white" v-bind="attrs" @click="error = false">
          clear
        </v-icon>
      </template>
    </v-snackbar>
  </div>
</template>
<script>
  import {
    Bus
  } from '../main'
  export default {
    data: () => ({
      snackbar: false,
      error:false,
      text: `Hello, I'm a snackbar`,
    }),

    created() {
      Bus.$on("showalert", ((data) => {
        this.text = data
        this.snackbar = true;
      })),
      Bus.$on("showError",((data)=>{
        this.text= data
        this.error=true
      }))
    }
  }
</script>