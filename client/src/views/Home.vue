<template>
    <div class="home">
        <h1>TebakAku</h1>
        <form @submit.prevent="start">
            <input
                type="text"
                placeholder="Enter your name"
                v-model="playerName"
            />
            <button type="submit" :disabled="playerName === ''">
                Let's Go!
            </button>
        </form>
    </div>
</template>

<script>
import {mapMutations} from 'vuex';
import io from 'socket.io-client';

export default {
    name: 'Home',
    components: {},
    data() {
        return {
            playerName: ''
        };
    },
    computed: {},
    methods: {
        ...mapMutations(['setSocket', 'setMyName']),
        start() {
            this.setMyName(this.playerName);
            if (this.$store.state.socket === null) {
                let socket = io('http://localhost:3000');
                this.setSocket(socket);
            }
            localStorage.setItem('name', this.playerName);
            this.$router.push('/lobby');
        }
    }
};
</script>
