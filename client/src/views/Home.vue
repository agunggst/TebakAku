<template>
    <div class="home">
        <div>
            <h1>TebakAku</h1>
            <form @submit.prevent="start">
                <input type="text" placeholder="Enter your name" v-model="playerName" />
                <button type="submit" :disabled="playerName === ''">Let's Go!</button>
            </form>
        </div>
    </div>
</template>

<script>
import { mapMutations } from "vuex";
import io from "socket.io-client";

export default {
    name: "Home",
    components: {},
    data() {
        return {
            playerName: ""
        };
    },
    computed: {},
    methods: {
        ...mapMutations(["setSocket", "setMyName"]),
        start() {
            this.setMyName(this.playerName);
            if (this.$store.state.socket === null) {
                let socket = io("https://boiling-springs-10970.herokuapp.com/");
                this.setSocket(socket);
            }
            localStorage.setItem("name", this.playerName);
            this.$router.push("/lobby");
        }
    }
};
</script>
