<template>
    <v-container>
        <v-row class="py-10">
            <v-row>
                <v-col cols="12" class="d-flex justify-center">
                    <h3>{{oramifa.title}}</h3>
                </v-col>
                <v-col cols="12" class="d-flex justify-end"> guyyaa {{date}} G.C</v-col>
            </v-row>

            <v-row>
                <p>Ahaadii waligaltee kun kan qophaa’ee fi kan mirknaa’ee Waldaa Dhunfaa Giddu Gala Leenjii Toofta Keennaa Feedhi Irratti Hundaa’ee Yafiqir Ma’aad Ittii Gaafatamumma isaa murtaa’ee  teessoon addis ababa tin dhaabbata hunda’ee amman boodaa tajaajilaa keenna/ dhaabbataa / jedhamuun kan waamamuu fi 
                Obbo/addee <span class="font-weight-black"> {{user.first_name}}  {{user.last_name}} </span> Teessoon __________________ ammaa boodaa tajaajilaa fayyadamaa tajaajilaa/waligltee fudhataa/ jedhamee wamamuu  jidduutii waligaltee raawwameedha. 
                </p>

                <!-- services object  -->
                <v-col cols="12" class="d-flex justify-center">
                    <h3>{{oramifa.service.title}}</h3>
                </v-col>
                <p>{{oramifa.service.para}}</p>
                <ul v-for="(list,index) in oramifa.service.lists" :key="index">
                    <li>{{list}}</li>
                </ul>

                <!-- work object  -->
                <v-col cols="12" class="d-flex justify-center">
                    <h3>{{oramifa.work.title}}</h3>
                </v-col>
                <ul v-for="(list,index) in oramifa.work.lists" :key="index">
                    <li>{{list}}</li>
                </ul>

                <!-- agreement object  -->

                <v-col cols="12" class="d-flex justify-center">
                    <h3>{{oramifa.agreement.title}}</h3>
                </v-col>
                <p>{{oramifa.agreement.para}}</p>

                <!-- ownership object  -->
                <v-col cols="12" class="d-flex justify-center">
                    <h3>{{oramifa.ownership.title}}</h3>
                </v-col>
                <p>{{oramifa.ownership.para}}</p>
                <!-- partnership object  -->


                <v-col cols="12" class="d-flex justify-center">
                    <h3>{{oramifa.partnership.title}}</h3>
                </v-col>
                <div v-for="(para,index) in oramifa.partnership.paras" :key="index">
                    <p>{{para}}</p>
                </div>
                <p>{{oramifa.partnership.para}}</p>


                <!-- TerminationOfCcontract object  -->
                <v-col cols="12" class="d-flex justify-center">
                    <h3>{{oramifa.TerminationOfCcontract.title}}</h3>
                </v-col>
                <ul v-for="(list,index) in oramifa.TerminationOfCcontract.lists" :key="index">
                    <li>{{list}}</li>
                </ul>


                <!-- KeepingAsecret object -->

                <v-col cols="12" class="d-flex justify-center">
                    <h3>{{oramifa.KeepingAsecret.title}}</h3>
                </v-col>
                <div v-for="(para,index) in oramifa.KeepingAsecret.paras" :key="index">
                    <p>{{para}}</p>
                </div>
                <ul v-for="(list,index) in oramifa.KeepingAsecret.lists" :key="index">
                    <li>{{list}}</li>
                </ul>

                <!-- payment object   -->
                <v-col cols="12" class="d-flex justify-center">
                    <h3>{{oramifa.payment.title}}</h3>
                </v-col>
                <p>{{oramifa.payment.para}}</p>


                <!-- ApplicableLaws object  -->
                <v-col cols="12" class="d-flex justify-center">
                    <h3>{{oramifa.ApplicableLaws.title}}</h3>
                </v-col>
                <p>{{oramifa.ApplicableLaws.para}}</p>

                <!-- Improvement object  -->

                <v-col cols="12" class="d-flex justify-center">
                    <h3>{{oramifa.Improvement.title}}</h3>
                </v-col>
                    <p>{{oramifa.Improvement.para}}</p>
                    <v-col cols="12" class="d-flex justify-center">
                    <h3>{{oramifa.termination}}</h3>
                </v-col>
            </v-row>
                <v-row>
                    <v-col>
                        <v-img></v-img>
                    </v-col>
                </v-row>
        </v-row>

    </v-container>
</template>
<script>
    import {
        mapGetters
    } from 'vuex'
    export default {
        data() {
            return {
                date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
                oramifa: {
                    title: 'Ahaadii waligaltee',
                    para: 'Ahaadii waligaltee kun kan qophaa’ee fi kan mirknaa’ee Waldaa Dhunfaa Giddu Gala Leenjii Toofta Keennaa Feedhi Irratti Hundaa’ee Yafiqir Ma’aad Ittii Gaafatamumma isaa murtaa’ee  teessoon ______________tin dhaabbata hunda’ee amman boodaa tajaajilaa keenna/ dhaabbataa / jedhamuun kan waamamuu fi Obbo/addee______________________________Teessoon __________________ ammaa boodaa tajaajilaa fayyadamaa tajaajilaa/waligltee fudhataa/ jedhamee wamamuu  jidduutii waligaltee raawwameedha.',
                    service: {
                        title: '1. Ijannoo Seerummaa Fayyadamaa Tajaajilaa',
                        para: 'Raawwatinsaa waligaltee kanaf tajaajilaa fayyadamaan walitii dhufeenyaa qabuu dhaabbata walin qabu qaxariis ta’ee sharikkummaa akka hin taanee waligaltootaa lemeenu waligaluun  kan armaan gadii waligalaniruu.',
                        lists: [
                            '1.1 Tajaajilaa fayyadamaan tajaajilaa keennaan moobaayilii ykn applikeeshinii weeb qopheessee fayyadamuun feedhii guutuu irrattii kan hundaa’ee keennaa/ iquubii hammayaa /fayyadamaa ta’uuf naamootaa biroofis tajaajilaa kanumaa akka itti fayyadaman ragaa keenuudhaaf waligalaniruu.',
                            '1.2 Tajaajilaa fayyadamaan itiyophiyaa keessattii bu’uuraa seerootaa haariroo haawwasaa fi yakkaa jiruu  akkasumaas seerootaa adda addaatiin kan hin haamatamnee  fi dabalataanis  hojjii dhaabbatichaa fi maqaa gaari dambii fi qajeelfamaa adeemsaa sirnaa hojii bifaa eggateen tajaajilaa keennaan keennaa hammayyaa ykn kan iquubii kan moobaayilaa ykn applikeeshinii weebii qophessee  dhiyyeeseen itti fayyadamuuf hundaa ni haamatamaa.',
                            '1.3 Taajajilaa fayyadaama tajaajilaa keennaan appilikeeshinii moobaayilaa fayyadamuun mammilootaa tajaajilaa keennaa biiroo waliin walittii dhufeenyaa jiruu ilaalchisee naamusaa hojii hundaa ni ',
                            '1.4 Taajajilaa fatyyadamaan kan itti fayyadamuu fi biroo akka itti fayyadama tajaajilaan raga seeraa qabbeessaa ta’ee kan keennuu yeroo, sa’aatii fi iddoo barbadee ta’aa. ',
                            '1.5 Tajaajilaa fayyadaman tajaajilichii yerooo itti fayyadamuu , tajaajilaa fayyadamuu itti jalqabuu fi yeroo itti xumuramuu , saa’atii hojii fi itti fuffinsaa fi raawwatinsaa waligalteef akka gargaaruu toftaa hojichaa ofii isaatiin murteesuu mirgaa qaba.ta’uus dambii fi qajeelfamaootaa hojiichaa kan armaan gadii akkasumaas akkumaa barbaachisuummaattii ykn seeraa yommuu dirqiisiisuu gara fulduraatii tajaajilaa keennatiin hojjiwaan dabalamuuf dambii fi qajelfamaa hordofee ni hojjataa.'
                        ]
                    },
                    work: {
                        title: '2. Qajeelfamaa Naamusaa Hojji',
                        lists: [
                            'Waligaltee fudhataan kt irratii ragaan guutee sirriittii kan guutamee ta’u isaa ni mirkanneessaa',
                            'Kt irrattii raga dhabbatichaa jiruu beeksiisuu fi taajajilama fayyadamtootaa haara fi jiraata hojii dhaabbatichaa , faayyidaa fi dirqamaa beeksiisuuf itti fayyadamuu ni danda’aa',
                            'Jiraataa waligaltee fudhataa tajaajilaa fayyadamtootaa haaraf raga/ibsaa/ yommuu keennuu haala hojii dhaabbataichaatiin ta’uu qaba.',
                            'Waligaltee fudhataan kammiyuu tajaajilaa fayyadamuuf tajaajilaa keennan applikeeshinii  itti fayyadamuuf yommuu murteessuu dhaabbatichii siistaamii irrattii galmaa’uu fi kafaltii galmee yommoo raawwatuu nagahee vaatii fudhachuu  irraa eggamaa. Nagahee kanumaa appruvaalii siistamii irrattii wal qabsiisuu irraa jiraataa.',
                            'Waligaltootaa hundaa namootaa 6 qarshii iquubii 7500/kumaa torbaa fi dhibbaa shan/  marsaa itti anuuf darbuu diqramaa qaba.',
                            'Waligaltee fudhatan kafaltii tajaajilaa sistamaa akkumaa gaafateettii sa’aatii 24 keessattii yerummaa sana kafaluu qabaa.',
                            'Tajaajilamaan kammiyuu maqaa dhabbatichaatiin adeemsaa hojii dhabbataichaatin itti fayyadamun  haa ta’uu malee  tajaajilaaa keennaan appilikeeshinii umeen osoo hin fayyadamiin haala bifaa kammiyuun miseensaa haarsa ta’ee jirataa kafaltiis ta’ee keennaa  fudhachuu  hin danda’uu.',
                            'Tajaajilaa keennaan adeemsaa hojii fi itti fayyadama applikeeshini ragaa dogogorsiisaa keennuudhaan , haannaa, acabarabaruu, fi hojii hin taane hojjatee yoo argamee yerummaa sana siistamii tajaajilaa keennuu irraa akka haaamuu godhamee dhimichii qulquleesuuf qoratamuuf fi murteesuuf angoo qabvuuf qaama poolisii fi mana murtiittii akka dhiyaatuu ni godhamaa.',
                            'Tajaajilaa fayyadamtootaa haaras ta’ee jiraataa miseensaa jiraataa biroo ykn miseensaa haaraa waa’ee dhaabbtichaa fi ademsaa hojii fi itti fayyadamaa gabasaa tajaajilaa haara itti keennamee nama  fayyadamaa raga ofii isaatiin akka keennamee fakkeesuun doggorsiisuun , ',
                            ' tajaajilamaa kammiyuu dhaabbataa wal fakkaataa ykn waliittii dhufeenyaa qabuu irraatti  hojjachaa  jirachuu isaa dhaabbatichaaf guyyootaa 3 keessaattii beeksiisuu qaba.',
                            'Namnii tokkoo yeroo tokko ol osii isaa tajaajilaa appilkeeshinii  moobaayilaatiin galmaa’uu hin danda’uu. Haala kammiyuu garuu nama tokko yeroo tokko ol galmaa’ee yoo argamee tokko qofaa haambiisuun kan hafan hunda dhabbatichaa haaquu mirgaa qaba.',
                            'Umrii isaa waggaa 18 ol ta’aan hundaa applikeeshiniitiin fayyadamuu ni danda’aa'
                        ]
                    },
                    agreement: {
                        title: '3. Yeroo waligalteen turuu',
                        para: 'Armaan gadiittii yeroon waligalteen xumuramun  duraa waligalteen addan kutuuf sababaa dandeesisuu jedhamee tarreeffaman keessaattii inii tokkoo ykn hundumtuu yoo mudatuu batuus waligalteen kun qaama waligaltee  fi dhaabbataa jidduutii yeroo hin murtofaneef cimee turaa.'
                    },
                    ownership: {
                        title: '4. Abbummaa',
                        para: 'Mallattolee dhaabbatichaa daldalaa  hundii isaanii fi moggafamnii isaanii leenjii fi kaninsaa qajeelfamaa fi meeshalee deegarsaa walittii dhufeenyaa qabuu hojidhaaf mijaa’aatif qabeenyootaa ahaadii fudhataaf kennamuu hundaa qabeenyummaa isaanii kan dhaabatichaa qofaa ta’aa.'
                    },
                    partnership: {
                        title: '5. Sharikummaa kan hin qabnee ta’uu',
                        paras: ['Ahaadii fudhataan applikeeshiiii moobaayilaa dhaabbatichaatiin fayyadamuun tajaajilaa argatuuf kafaltii tajaajilaa dhaabbatichaatiin murta’uu kafaluudhaaf waligaleeraa. Kafaltiin tajaajilaa yeroon yeroon foyya’insaa irrattii kan taasifamuu yoo ta’uu fayyadamtoonii tajaajilaa weeb saayitii dhaabbatichaatin fi midiyaa haawasaa kafaltii tajaajilaa fi hanga isaa akka beekan ni taasifamaa . Fayyadaman tajaajilaa dhaabbata tajajilaa keennaa ijjannoo dhaabbatichaa fi tooftaa hojii namootaa kan birootif sababa beeksiisutiin kan argatuu  heeyyamaa irrattii kan hundaa’ee iquubii ykn keennaan alaa kafaltii kammiyuu dhaabbatichaa irraa ykn tajaajilaa keennaa irraa kafalamuu kan hin jirree ta’uu isaa fayyadamaan tajaajilaa ni beekaa.',
                            ' dogogoraan kan kafalmee fi gara herregaa dhaabbatichaati kafaltii galii taasifamee deebi’uu kan danda’uu namnii galchee dhabbatichaaf guyyaa 3 keessattii iyyannoo barrefamaan nagahee galii baankii ragaa mummee waliin qaaman dhiyyeesuu irraa jiraataa. Dhaabbatichii doogogoraan 15% ta’uu isaa yoo mirkanneesuu guyyaa 2 keessatti maallaqichaa taaksii mootummaa irraa hirisuudhaan ni deebisaa.',
                            'Akka sadarkaa carraa fi hanga qarshii 20,000, 60,000 fi 200,000 carraan kan baheef bu’uuraa dambichaatiin 5% kafaltii tajaajilaa guyyootaa 3 keessaatti kafaluu qaba.'
                        ]
                    },
                    TerminationOfCcontract: {
                        title: '6. Waligaltee addan kuutuu',
                        lists: [
                            '6.1 Waligaltee addan kutudhaaf sababa gaha fi amnsiisaa jiraachuu isaa eennaa beekamuu dhaabbatichaa xalayaa off eggannoo kennuudhaan yerummaa sana waligaltichaa addaan kuutuu ni danda’aa.',
                            '6.2 Sababooni gaha fi amansiisaan amalaa fi seeraa sarbuu kan jedhaman waligaltee kana keessattii lakkofsaa 2 jalatii kan caqasaman  keewwatootaa waligaltee fi fulaa duraaf akkumaa hojidhaaf barbaachisaa ta’aanitii dhaabbatichii dambii fui qajelafamootaa baasuu fi itiyophiyaa keessattii seerootaa yakkaa fi sivilii hojii irraa jiran irrattii yakkaa ykn gochaa seeraan alaa jedhamanii kan caqasaman haalawwaan seera naamusaa fi dambiiwwaan sarabamanii yoo argamanii',
                            '6.3  sarabamuu keewwatootaa waligaltee kana inni ol’aanaan fi ykn maqaa gaarii fi beekkamtii dhaabataichaas ta’ee qaama waligaltee kan xureessan ykn kan midhan gochootaa dhaabbatichaa irrattii raawwataman off eggannoo malee waligalteen addan kuutuu  ni danda’aama.'
                        ]
                    },
                    KeepingAsecret: {
                        title: '7. Iccitii eeguu ',
                        paras: [
                            '7.1.   Itti gaafatamtonii waligaltee kana keessatti ilaalaman bahuuf akka dandeessisan dhaabbatichi qaama waligalteetif iciitiwwan keennu fi ragaalee dhaabbbumma addaa dhaabbatichii kan irraa qabu guutummaa guutuuti iccitiidhaan kan qabaman ta’uu waligalee  jiraa.',
                            '7.2.  Iccitiwwan kunneen fi ragaawwan mirgaa abbumaa addaa dhaabbatichaa kan irra qabu qaama 3ffaa kan birootiif dabarsanii keennun dhaabatichaa irrattii rakkoo umuu  kan danda’uu ta’uu irratii waligalameeraa. ',
                            '7.3.  Qaamnii waligaltee hojii hojjatuuf barbaachisaa sababa ta’eefi dhaabbatichaa ifaan fi barreefamaan waligaltee taasifamee yoo ta’ee malee qaamni waligaltee ragaalee icciitii ta’an fi mirgaa abbumaa addaa dhaabaticha ta’aan qaama 3ffaaf dabarsuu ykn fayyadamuun yeroo waligalteen cimee jiruutiis ta’ee waligalteen addan cite boodaa gonkumaa hin danda’aamu. Ragaawwan iciitii ta’aan ykn mirgaa abbumaa dhunfaa kan qaban kan itti anan ni haamataa.'
                        ],
                        lists: [
                            'Kan barreefamee , kan maxanafamee, hojii wixinee ykn fakkii eleketirooniksii ykn sagaleen dhaabatrichaan kan qophaan fi qaama waligalteef kan darban,',
                            'Ragaawwan kammiyuu kan barreefamee ykn ifaan kan mulatuu iciitii ykn mirga dhunfaa jechuun irrattii maxanafamee ykn haala wal fakkataa ta’een ykn barmaatileen dhaabbatichii iciitidha jadhee kan eggee fi kan qabatee .',
                            'Karooraa  raawwii , hojii fi gurgurta, tarree maammilootaa , sa’aa hojiimaata, icciiti daldalaa, sirnaa safartuu, sirnaa herregaa, tooftaa fi adeemsaa hojii mataa saganataa kompiwutaraa ykn waa umuu ykn foyya’insaa kammiyuu, tilmaamaa gatii fi ibsaa dursaa gurgurtaa',
                            'Qaamni waligaltee sababa hojii isaatiin maamilootaa dhaabbatichaa beekee  fi namootaa dhiyyeesootaa kan ta’aan ykn ragaalee maammilootaa keenyaa ilaalatan hundaa ni haamataa.',
                            'Haala kammiyuu waligaltee kana yeroo addan kuutuu qaamni waligaltee hojiitiif akka isaa mija’uuf qabeenyaa dhaabbatichaa irraa fudhan abeenyootaa kammiyuu yerumaa sanaa dhabbatichaaf ni deebisaa.'
                        ],
                    },
                    payment: {
                        title: '8. Kafaltii beenyaa ilaalchisee',
                        para: 'Qaamni waligaltee adeemsaa raawwii waligaltee keessattii waligaltee kanatti tarree 2 kan caqasaman sirnaa hojii fi sababaa dangaa darbuun badii balleesuuf hundaa dhabbatichaa irrattii midhaa dhabbatichaa irratti geesseef benyaa gahaa ta’ee kafaluuf dirgama qaba.'
                    },
                    ApplicableLaws: {
                        title: '9. Seerootaa raawwataman',
                        para: 'Walgaltee kanattii kan hin haamatamnee fi raawwii waligaltee kanaf walitii dhufeenyaa qabu seerotaa sivilii itiyophiyaa waa’ee waligalteewwan kan haamatee kan jedhuu jala keewataalee haamatamee akkumaa barbaachisumaa isatiinm  kan raawwatamuu ta’aa '
                    },
                    Improvement: {
                        title: '11. Foyyaa’insaa',
                        para:'Waligalteen kun qaamolee waligaltootaa feedhii ifaa waliin fi bu’uuraa waligaltee barrefamaa foyya’uus ta’ee jijjiramuu ni danda’aa.',
                    },
                    termination:'Gara dhabbatichaa yeroo seenuu fi yeroo galama’uu waligaltee kaana duubisanii fi hubatanii akka waligalaan ni lakaa’amaa.'
                }
            }
        },
                computed: {
            ...mapGetters({
                user: "auth/user",
            })
        },
    }
</script>