<template>
    <div class="text-center">
        <v-dialog v-model="dialog" width="80%" persistent>
            <!-- <template v-slot:activator="{ on, attrs }">
                <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on">
                    Click Me
                </v-btn>
            </template> -->

            <v-card>
                <v-card-title class="headline grey lighten-2">
                    Add Profile
                </v-card-title>
                <ValidationObserver v-slot="{ handleSubmit }">
                    <form @submit.prevent="handleSubmit(saveProfile)">

                        <v-card-text>
                            <v-card class="pa-3">
                                <v-row class="pb-3">
                                    <!-- {{editProfile}} -->
                                    <v-col cols="12" sm="12" md="12" lg="6">
                                        <ValidationProvider rules="required" name="account name" v-slot="{ errors }">
                                            <v-text-field dense label="account_name" outlined class="mx-2"
                                                v-model="profile.account_name" :error="errors.length > 0"
                                                :error-messages="errors[0]"></v-text-field>
                                        </ValidationProvider>
                                    </v-col>
                                    <v-col cols="12" sm="12" md="12" lg="6">
                                        <ValidationProvider rules="required|integer" name="account number"
                                            v-slot="{ errors }">

                                            <v-text-field dense label="account_number" outlined class="mx-2"
                                                v-model="profile.account_number" :error="errors.length > 0"
                                                :error-messages="errors[0]"></v-text-field>
                                        </ValidationProvider>

                                    </v-col>
                                    <v-col cols="12" sm="12" md="12" lg="6">
                                        <ValidationProvider rules="required" name="payment type" v-slot="{ errors }">
                                            <v-select v-model="profile.payment_type" :items="paymentType"
                                                item-text="name" item-value="id" label="select payment type*"
                                                single-line outlined dense :error="errors.length > 0"
                                                :error-messages="errors[0]">
                                            </v-select>
                                        </ValidationProvider>
                                    </v-col>
                                    <v-col cols="12" sm="12" md="12" lg="6">
                                        <v-menu ref="menu" v-model="menu" :close-on-content-click="false"
                                            :return-value.sync="profile.birth_date" transition="scale-transition"
                                            offset-y min-width="290px">
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-text-field v-model="profile.birth_date" label="birth date"
                                                    prepend-inner-icon="event" outlined dense class="mx-2"
                                                    v-bind="attrs" v-on="on"></v-text-field>
                                            </template>
                                            <v-date-picker v-model="date" no-title scrollable>
                                                <v-spacer></v-spacer>
                                                <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                                                <v-btn text color="primary" @click="$refs.menu.save(date)">OK
                                                </v-btn>
                                            </v-date-picker>
                                        </v-menu>
                                    </v-col>
                                    <v-col cols="12" sm="12" md="12" lg="6">
                                        <ValidationProvider rules="required" name="Country" v-slot="{ errors }">
                                            <v-autocomplete :items="countryList" label="Country" outlined dense
                                                v-model="profile.country" class="mx-2" :error="errors.length > 0"
                                                :error-messages="errors[0]">
                                            </v-autocomplete>
                                        </ValidationProvider>
                                    </v-col>
                                    <v-col cols="12" sm="12" md="12" lg="6">
                                        <ValidationProvider rules="required" name="State" v-slot="{ errors }">
                                            <v-text-field dense label="State" outlined class="mx-2"
                                                v-model="profile.city" :value="profile.city" :error="errors.length > 0"
                                                :error-messages="errors[0]">
                                            </v-text-field>
                                        </ValidationProvider>
                                    </v-col>
                                    <v-col cols="12" sm="12" md="12" lg="12">
                                        <label for="" class="pl-3">Photo</label><br>
                                        <input type="file" class="pl-3" @change="selectImage">
                                    </v-col>
                                    <v-divider class="my-2"></v-divider>


                                    <v-col cols="12" sm="12" md="12" lg="12">
                                        <v-alert text type="info">
                                            <h3>IMPORTANT NOTICE!</h3>
                                            <p>Please do ensure that you upload a valid and clear passport
                                                photograph of
                                                your face above.</p>
                                            <p class="overline">THIS IS VERY VITAL BECAUSE ANY OTHER PHOTOGRAPH
                                                COULD
                                                LEAD
                                                TO THE SUSPENSION OF YOUR ACCOUNT!</p>
                                        </v-alert>
                                    </v-col>
                                </v-row>
                            </v-card>
                        </v-card-text>

                        <v-divider></v-divider>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="purple" :loading="loading" type="submit" class="white--text">
                                Save
                            </v-btn>
                        </v-card-actions>
                    </form>
                </ValidationObserver>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    import {
        Bus
    } from '../../../main'
    import {
        mapActions,
        mapGetters
    } from 'vuex'
    export default {

        computed: {
            ...mapGetters({
                user:'auth/user',
                paymentType: 'auth/paymentType',
                userProfile: 'auth/userProfile'
            })
        },
        methods: {
            ...mapActions({
                getPayments: 'auth/getPayments',
                saveUserProfile: 'auth/saveUserProfile',
                getUserProfile: 'auth/getUserProfile'
            }),
            selectImage(e) {
                this.selectedImage = e.target.files[0]
                // console.log(this.selectedImage);
            },
            saveProfile() {
                this.loading = true;
                const fd = new FormData();
                fd.append("profile_pic", this.selectedImage, this.selectedImage.name);
                fd.append("account_name", this.profile.account_name)
                fd.append("account_number", this.profile.account_number)
                fd.append("payment_type", this.profile.payment_type)
                fd.append("birth_date", this.profile.birth_date)
                fd.append("country", this.profile.country)
                fd.append("city", this.profile.city)
                fd.append("social_media_links", null)
                fd.append("user", localStorage.getItem('id'))
                this.saveUserProfile(fd).then(() => {
                    this.loading = false;
                    this.dialog = false
                    window.location.reload();
                })
                // console.log(this.profile, localStorage.getItem('id'))
            }
        },
        created() {
            this.getPayments()

        },
        mounted() {
            Bus.$on('showDialog', (() => {
                this.dialog = true
            }))
        },
        data() {
            return {
                dialog: false,
                menu: false,
                loading: false,
                date: new Date().toISOString().substr(0, 10),
                profile: {
                    birth_date: new Date().toISOString().substr(0, 10),
                    social_media_links: [{
                        name: 'Telegram',
                        link: 'https://telegram'
                    }]
                },
                countryList: [
                    "Afghanistan",
                    "Albania",
                    "Algeria",
                    "American Samoa",
                    "Andorra",
                    "Angola",
                    "Anguilla",
                    "Antarctica",
                    "Antigua and Barbuda",
                    "Argentina",
                    "Armenia",
                    "Aruba",
                    "Australia",
                    "Austria",
                    "Azerbaijan",
                    "Bahamas (the)",
                    "Bahrain",
                    "Bangladesh",
                    "Barbados",
                    "Belarus",
                    "Belgium",
                    "Belize",
                    "Benin",
                    "Bermuda",
                    "Bhutan",
                    "Bolivia (Plurinational State of)",
                    "Bonaire, Sint Eustatius and Saba",
                    "Bosnia and Herzegovina",
                    "Botswana",
                    "Bouvet Island",
                    "Brazil",
                    "British Indian Ocean Territory (the)",
                    "Brunei Darussalam",
                    "Bulgaria",
                    "Burkina Faso",
                    "Burundi",
                    "Cabo Verde",
                    "Cambodia",
                    "Cameroon",
                    "Canada",
                    "Cayman Islands (the)",
                    "Central African Republic (the)",
                    "Chad",
                    "Chile",
                    "China",
                    "Christmas Island",
                    "Cocos (Keeling) Islands (the)",
                    "Colombia",
                    "Comoros (the)",
                    "Congo (the Democratic Republic of the)",
                    "Congo (the)",
                    "Cook Islands (the)",
                    "Costa Rica",
                    "Croatia",
                    "Cuba",
                    "Curaçao",
                    "Cyprus",
                    "Czechia",
                    "Côte d'Ivoire",
                    "Denmark",
                    "Djibouti",
                    "Dominica",
                    "Dominican Republic (the)",
                    "Ecuador",
                    "Egypt",
                    "El Salvador",
                    "Equatorial Guinea",
                    "Eritrea",
                    "Estonia",
                    "Eswatini",
                    "Ethiopia",
                    "Falkland Islands (the) [Malvinas]",
                    "Faroe Islands (the)",
                    "Fiji",
                    "Finland",
                    "France",
                    "French Guiana",
                    "French Polynesia",
                    "French Southern Territories (the)",
                    "Gabon",
                    "Gambia (the)",
                    "Georgia",
                    "Germany",
                    "Ghana",
                    "Gibraltar",
                    "Greece",
                    "Greenland",
                    "Grenada",
                    "Guadeloupe",
                    "Guam",
                    "Guatemala",
                    "Guernsey",
                    "Guinea",
                    "Guinea-Bissau",
                    "Guyana",
                    "Haiti",
                    "Heard Island and McDonald Islands",
                    "Holy See (the)",
                    "Honduras",
                    "Hong Kong",
                    "Hungary",
                    "Iceland",
                    "India",
                    "Indonesia",
                    "Iran (Islamic Republic of)",
                    "Iraq",
                    "Ireland",
                    "Isle of Man",
                    "Israel",
                    "Italy",
                    "Jamaica",
                    "Japan",
                    "Jersey",
                    "Jordan",
                    "Kazakhstan",
                    "Kenya",
                    "Kiribati",
                    "Korea (the Democratic People's Republic of)",
                    "Korea (the Republic of)",
                    "Kuwait",
                    "Kyrgyzstan",
                    "Lao People's Democratic Republic (the)",
                    "Latvia",
                    "Lebanon",
                    "Lesotho",
                    "Liberia",
                    "Libya",
                    "Liechtenstein",
                    "Lithuania",
                    "Luxembourg",
                    "Macao",
                    "Madagascar",
                    "Malawi",
                    "Malaysia",
                    "Maldives",
                    "Mali",
                    "Malta",
                    "Marshall Islands (the)",
                    "Martinique",
                    "Mauritania",
                    "Mauritius",
                    "Mayotte",
                    "Mexico",
                    "Micronesia (Federated States of)",
                    "Moldova (the Republic of)",
                    "Monaco",
                    "Mongolia",
                    "Montenegro",
                    "Montserrat",
                    "Morocco",
                    "Mozambique",
                    "Myanmar",
                    "Namibia",
                    "Nauru",
                    "Nepal",
                    "Netherlands (the)",
                    "New Caledonia",
                    "New Zealand",
                    "Nicaragua",
                    "Niger (the)",
                    "Nigeria",
                    "Niue",
                    "Norfolk Island",
                    "Northern Mariana Islands (the)",
                    "Norway",
                    "Oman",
                    "Pakistan",
                    "Palau",
                    "Palestine, State of",
                    "Panama",
                    "Papua New Guinea",
                    "Paraguay",
                    "Peru",
                    "Philippines (the)",
                    "Pitcairn",
                    "Poland",
                    "Portugal",
                    "Puerto Rico",
                    "Qatar",
                    "Republic of North Macedonia",
                    "Romania",
                    "Russian Federation (the)",
                    "Rwanda",
                    "Réunion",
                    "Saint Barthélemy",
                    "Saint Helena, Ascension and Tristan da Cunha",
                    "Saint Kitts and Nevis",
                    "Saint Lucia",
                    "Saint Martin (French part)",
                    "Saint Pierre and Miquelon",
                    "Saint Vincent and the Grenadines",
                    "Samoa",
                    "San Marino",
                    "Sao Tome and Principe",
                    "Saudi Arabia",
                    "Senegal",
                    "Serbia",
                    "Seychelles",
                    "Sierra Leone",
                    "Singapore",
                    "Sint Maarten (Dutch part)",
                    "Slovakia",
                    "Slovenia",
                    "Solomon Islands",
                    "Somalia",
                    "South Africa",
                    "South Georgia and the South Sandwich Islands",
                    "South Sudan",
                    "Spain",
                    "Sri Lanka",
                    "Sudan (the)",
                    "Suriname",
                    "Svalbard and Jan Mayen",
                    "Sweden",
                    "Switzerland",
                    "Syrian Arab Republic",
                    "Taiwan",
                    "Tajikistan",
                    "Tanzania, United Republic of",
                    "Thailand",
                    "Timor-Leste",
                    "Togo",
                    "Tokelau",
                    "Tonga",
                    "Trinidad and Tobago",
                    "Tunisia",
                    "Turkey",
                    "Turkmenistan",
                    "Turks and Caicos Islands (the)",
                    "Tuvalu",
                    "Uganda",
                    "Ukraine",
                    "United Arab Emirates (the)",
                    "United Kingdom of Great Britain and Northern Ireland (the)",
                    "United States Minor Outlying Islands (the)",
                    "United States of America (the)",
                    "Uruguay",
                    "Uzbekistan",
                    "Vanuatu",
                    "Venezuela (Bolivarian Republic of)",
                    "Viet Nam",
                    "Virgin Islands (British)",
                    "Virgin Islands (U.S.)",
                    "Wallis and Futuna",
                    "Western Sahara",
                    "Yemen",
                    "Zambia",
                    "Zimbabwe",
                    "Åland Islands"
                ]

            }
        },
    }
</script>