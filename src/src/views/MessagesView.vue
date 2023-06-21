<template>
    <div>
        <v-container>
            <v-row>
                <h1 class="text--secondary mr-5 mt-2">Messages</h1>
                <search-user-vue></search-user-vue>
            </v-row>
        </v-container>
        <br>
        <Messages />
        <br>
    </div>
</template>
<script>
    import Messages from '../components/Messages/Messages.vue'
    import AddNewMessage from '../components/Messages/AddNewMessage.vue'
    import AudioMessage from '../components/Messages/audioMessage.vue'
    export default {
        components: {
            Messages,
            AddNewMessage,
            AudioMessage
        },
        methods: {
            callback(data) {
                console.log(data)
            }
        }
    }
</script>