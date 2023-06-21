<template>
    <div>
        <v-container>
            <h1 class="text--secondary my-8">Marketplace</h1>
        </v-container>
         <v-container>
            <h2 class="text--secondary my-8">{{listTitle}}</h2>
        </v-container>

                <v-container >
            <v-card text v-for="(li,index) in list" :key="index"
                class="px-5 mt-5`">
                <v-container>
                    <v-layout row wrap class="pa-3">
                        <v-flex xs12 md4 lg1>
                            <!-- <div class="caption grey--text ">index</div> -->
                            <div class="pl-2">{{index+1}}</div>
                        </v-flex>
                        <v-flex xs11 sm11 md11 lg11>
                            <!-- <div class="caption grey--text">description</div> -->
                            <div>{{li.title}}</div>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-card>
        </v-container>
    </div>
</template>

<script>
export default {
    data(){
        return{
            listTitle:'የማህበሩ የሥራ ዓላማ',
            list:[
                {title:'የተለያዩ ሥልጠናዎች መስጠት'},
                {title:'የተለያዩ የሥልጠና ምክሮች'},
                {title:'ማንኛውንም የሶፍትዌር ሥራ'},
                {title:'የኒትዌርክ መስመር ዝርጋታ እና ማከፋፈያ'},
                {title:' የግንባታ ሥራ መስራት'},
                {title:'ማንኛውንም የግንባታ እቃዎች ማስመጣት እና መላክ'},
                {title:'በሀገር ውስጥ እና በውጭ ሄር ጨረታ ላይ መሳተፍ'},
                {title:'በድርጅቱ ሥም አክሲዮን በመግዛት ከሌላ ድርጅት ጋር በሽርክና ከሶስተኛ ወገን ጋር መስራት ።'},
                {title:'ምርጥ ዘር ማክፋፈል ።'},
                {title:'የቅባት እህል ለሀገር ውስጥ እና ለውጭ ሀገር ማቅረብ'},
                {title:'የእርሻ ሥራ መስራት'},
                {title:'ጥሬ እህሎችን ለውጭ ሀገር እና ለሀገር ውስጥ ገበያ ማቅረብ'},
                {title:'የንብ ምርት'},
                {title:'የማር ውጤት እና ንብን በማምረት ለውጭ ሀገር እና ለሀገር ውስጥ ገበያ ማቅረብ'},
                {title:'የቀንድ እንሳሳት፣ ፍየል እና በግ ማርባት፣ ማድለብ እና ለውጭ ሀገር እና ለሀገር ውስጥ ገበያ ማቅረብ'},
                {title:'የፍላጎት ሥጦታ መስጠት'},
                {title:'ሥጋ አርደው በማዘጋጀት ለውጭ እና ለሀገር ውስጥ ገበያ ማቅረብ '},
                {title:'ሰሊጥ፣ ሱፍ እና ኦቾሎኒ ለውጭ እና ለሀገር ውስጥ ገበያ ማቅረብ'},
                {title:'ስንዴ፣ በቆሎ፣ ማሾ፣ ባቄላ እና አኩሪ አተር ለሁሉም ጥሬ እህል ለሀገር ውስጥ እና ለውጭ ሀገር ገበያ ማቅረብ'},
                {title:'ማንኛውምንም ጥራጥሬ እህል መስራት'},
                {title:'ሽንኩርት፣ ቲማቲም፣ ቃሪያ እና የመሳሰሉትን በማምረት ለሀገር ውስጥ እና ለውጭ ገበያ ማቅረብ'},
                {title:'ቅመማቅመሞችን ማምረት እና መሸጥ ማከፋፈል'},
                {title:'ቡና ማምረት፣ መግዛት ወደ ውጭ ሀገር መላክ'},
                {title:'ለሀገር እድገት ማበርከት'},
                {title:'የሥራ እድል መፍጠር ።'},
            ]
        }
    }
}
</script>