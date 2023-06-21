<template>
    <div>
        {{admin}}

        <br>

        {{donations}}
    </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
export default {
    data(){
        return{

        }
    },
    computed: {
        ...mapGetters({
            admin: 'donate/admin',
            donations: 'donate/donations'
        })
    },
    methods: {
        ...mapActions({
            getAdmin: 'donate/getAdmin',
            getDonations: 'donate/getDonations'
        })
    },
    created(){
        this.getAdmin()
        this.getDonations()
    }
}
</script>