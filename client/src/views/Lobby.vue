<template>
    <div class="lobby">
        <h1>TebakAku</h1>
        <form @submit.prevent="joinRoom">
            <input
                type="text"
                placeholder="Enter the room's pin you want to join"
                v-model="room_code"
            />
            <button type="submit" :disabled="room_code.length < 8">Join</button>
            <br />
            <p>OR</p>
            <span @click="isCreateRoom = !isCreateRoom">Create a room</span>
            <div class="create-room-form" v-if="isCreateRoom">
                <form @submit.prevent="createRoom">
                    <input type="text" placeholder="Enter the room's name" v-model="roomsName" />
                    <button type="submit" :disabled="roomsName === ''">Create!</button>
                    <br />
                </form>
            </div>
        </form>
    </div>
</template>
<script>
import io from "socket.io-client";
import { mapState, mapMutations } from "vuex";

export default {
    name: "Lobby",
    beforeRouteEnter(to, from, next) {
        if (localStorage.getItem("name")) {
            next();
        } else {
            next(false);
        }
    },
    created() {
        if (this.$store.state.socket === null) {
            let socket = io("http://localhost:3000");
            this.$store.commit("setSocket", socket);
        }
        this.$store.commit("resetState");
        this.socketListener();
    },
    mounted() {
        this.socketListener();
    },
    data() {
        return {
            room_code: "",
            roomsName: "",
            isCreateRoom: false
        };
    },
    methods: {
        joinRoom() {
            let payload = {
                playerName: this.$store.state.myName,
                room_code: this.room_code
            };
            this.socket.emit("joinRoom", payload);
        },
        createRoom() {
            let payload = {
                name: this.roomsName,
                creator: this.$store.state.myName
            };
            this.socket.emit("createRoom", payload);
        },
        socketListener() {
            console.log("bisa ini mah");
            this.$store.state.socket.on("gotoRoom", function(data) {
                console.log(data);
                if (data.isCreator) {
                    this.$store.commit("setIsCreator", true);
                }
                console.log(data);
                this.$store.commit("setMyKey", data.playerKey);
                this.$store.commit("setRoomName", data.name);
                this.$store.commit("setOtherPlayers", data.player);
                this.$store.commit("setScore", 0);
                // this.$router.push('/play');
            });
        }
    },
    computed: {
        ...mapState(["socket"])
    }
};
</script>
