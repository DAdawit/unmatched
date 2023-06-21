<template>
  <div>

    <!-- add advert  -->
    <template>
      <div class="text-center">
        <v-dialog v-model="dialog" max-width="700">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on">
              Click Me
            </v-btn>
          </template>

          <v-card max-width="700">
            <v-card-title class="text-h5  lighten-2">
              Add advert
            </v-card-title>
            <v-card>
              <ValidationObserver v-slot="{ handleSubmit }">
                <form @submit.prevent="handleSubmit(addAdvert)">
                  <br>

                  <v-divider class="py-2"></v-divider>
                  <ValidationProvider rules="required" name="Title" v-slot="{ errors }">
                    <v-text-field dense label="Title" outlined class="mx-2" v-model="advert.title"
                      :error="errors.length > 0" :error-messages="errors[0]">
                    </v-text-field>
                  </ValidationProvider>
                  <v-row>
                    <v-container class="mx-2">
                      <ValidationProvider rules="required" name="description" v-slot="{ errors }">
                        <vue-editor v-model="advert.description"
                          placeholder="Kindly input any further information you wish to add here...">
                        </vue-editor>
                        <span class="red--text pl-3">{{errors[0]}}</span>
                      </ValidationProvider>
                    </v-container>
                  </v-row>
                  <div class="mt-3">
                    <v-row>
                      <v-col cols="12" sm="12" md="12" lg="12">
                        <label for="" class="pl-3">Add Image</label><br>
                      <!-- <ValidationProvider rules="required" name="image" v-slot="{ errors }"> -->
                        <input type="file" class="pl-3" @change="selectImage" name="image" ref="files" multiple>
                        <!-- <small class="red--text pl-3">{{errors[0]}}</small>
                        </ValidationProvider> -->
                      </v-col>
                    </v-row>
                  </div>

                  <v-row class="d-flex justify-center">
                    <v-col cols="5">
                      <v-btn color="purple" class=" white--text" :loading="loading" type="submit" block>save
                      </v-btn>
                    </v-col>
                  </v-row>
                </form>
              </ValidationObserver>
            </v-card>
          </v-card>
        </v-dialog>
      </div>
    </template>








    <v-row>
      <v-col cols="12" sm="12" md="4" lg="6">

        <v-card :loading="loading" max-width="374">
          <v-img height="250" src="https://cdn.vuetifyjs.com/images/cards/cooking.png"></v-img>

          <v-card-title>Cafe Badilico</v-card-title>

          <v-card-text>
            <div>Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.</div>
          </v-card-text>

          <v-divider class="mx-4"></v-divider>

          <v-card-title>Tonight's availability</v-card-title>

          <v-card-actions>
            <v-btn color="deep-purple lighten-2" text>
              Reserve
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

    </v-row>
    <template>
    </template>
  </div>
</template>

<script>
import { mapActions } from "vuex";
  import {
    VueEditor
  } from "vue2-editor";
  export default {
    components: {
      VueEditor,
    },
    data() {
      return {
        advert: {},
        loading:false,
        dialog: true,
        pictures:[]
      }
    },

    methods: {
      ...mapActions({
          AddAdvert : 'advert/AddAdvert'
      }),
      addAdvert() {
        const formData = new FormData()
        for(let i=0; i < this.pictures.length; i++){
          let file = this.pictures[i]
         
          formData.append('pictures['+i+']',file)
        }
        // formData.append('pictures',this.pictures)
        formData.append('title',this.advert.title)
        formData.append('description',this.advert.description)
        this.AddAdvert(formData)
      },
      selectImage(e) {
        for( let i=0; i < this.$refs.files.files.length; i++){
          this.pictures.push(this.$refs.files.files[i])
        }
          console.log(this.pictures)
      },
    }
  }
</script>