<template>
    <div v-if="loaded">
        <div class="pl-5 ">
            <!-- <p v-if="!expired" class="ml-4"> Bid Now</p>
            <p v-else>Acution Completed</p> -->
        </div>
        <v-chip class="py-5" color="white">
            <v-row class="pl-4 py-5">
                <v-col>
                    <v-row class="text-decoration-underline font-weight-bold">{{displayDays}}</v-row>
                    <v-row><small>dy</small></v-row>
                </v-col>

                <v-col>
                    <v-row class="text-decoration-underline font-weight-bold">{{displayHours}}</v-row>
                    <v-row><small>hr</small></v-row>
                </v-col>
                <v-col>
                    <v-row class="text-decoration-underline font-weight-bold">{{displayMinutes}}</v-row>
                    <v-row><small>min</small></v-row>
                </v-col>
                <v-col>
                    <v-row class="text-decoration-underline font-weight-bold">{{displaySeconds}}</v-row>
                    <v-row><small>sec</small></v-row>
                </v-col>
            </v-row>
        </v-chip>

        <!-- <v-chip class="py-5" x-small>
                <span class="overline text-decoration-underline font-weight-bold">{{displayDays}}</span> <sub
                    class="caption"> <small>dy</small> </sub><span class="title">:</span>
                <span class="overline text-decoration-underline font-weight-bold">{{displayHours}}</span> <sub
                    class="caption"><small>hr</small> </sub><span class="title">:</span>
                <span class="overline text-decoration-underline font-weight-bold">{{displayMinutes}}</span> <sub
                    class="caption"><small>min</small> </sub><span class="title">:</span>
                <span class="overline text-decoration-underline font-weight-bold">{{displaySeconds}}</span> <sub
                    class="caption"><small>sec</small></sub>
            </v-chip> -->

    </div>
</template>
<script>
import {Bus} from '../main'
    export default {
        props: ["year", "month", "date", "hour", "minute", "second", "millisecond"],
        data: () => ({
            displayDays: 0,
            displayHours: 0,
            displayMinutes: 0,
            displaySeconds: 0,
            loaded: false,
            expired: false,
            m: new Date(),
        }),
        computed: {
            _second: () => 1000,
            _minutes() {
                return this._second * 60;
            },
            _hours() {
                return this._minutes * 60;
            },
            _days() {
                return this._hours * 24;
            },
            end() {
                return new Date(
                    this.year,
                    this.month,
                    this.date,
                    this.hour,
                    this.minute,
                    this.second,
                    this.millisecond
                )
            },
            timeAndsecond(){
                return [this.displayHours,this.displayMinutes,this.displaySeconds]
            }
        },
        created() {
            this.showRemaining();
            Bus.$on('checkTime',(()=>{
                Bus.$emit('CurrentAuctionTime',this.timeAndsecond)
            }))
        },
        methods: {
            formatNum: num => (num < 10 ? "0" + num : num),
            showRemaining() {
                const timer = setInterval(() => {
                    const now = new Date();
                    // const end=new Date(2021,9,30,10,10,10,10);
                    const distance = this.end.getTime() - now.getTime();
                    if (distance < 0) {
                        clearInterval(timer);
                        this.expired = true;
                        this.loaded = true;
                        Bus.$emit('AuctionCompleted');
                        // Bus.$emit('singleAuctionComplete')
                        return;
                    }
                    const days = Math.floor(distance / this._days);
                    const hours = Math.floor((distance % this._days) / this._hours);
                    const minutes = Math.floor((distance % this._hours) / this._minutes);
                    const seconds = Math.floor((distance % this._minutes) / this._second)
                    this.displayMinutes = this.formatNum(minutes)
                    this.displaySeconds = this.formatNum(seconds)
                    this.displayHours = this.formatNum(hours)
                    this.displayDays = this.formatNum(days)
                    this.loaded = true
                }, 1000);
            },
        },
    }
</script>