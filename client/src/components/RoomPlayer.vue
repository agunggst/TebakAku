<template>
    <div id="roomplayer" class="form-player">
        <div id="chatplayer" class="row border border-dark">
            <div id="judulplayer">
                <h1 style="text-align:center" class="mt-2">Room - Pemain</h1>
            </div>
            <div id="textplayer" class="border border-dark mx-3 my-1 chatMaster">
                <div>
                    <h3 class="mt-2">Tebakan</h3>
                </div>
                <div class="col-sm-8">
                    <p v-for="(message, i) in messages" :key="i">
                        <span>{{ message.player }}: {{ message.message }}</span>
                    </p>
                </div>
            </div>
            <div v-if="!$store.state.isCreator && isPlaying" class="input-answer">
                <form @submit.prevent="sendAnswer">
                    <div id="submitplayer" class="form-group border border-dark mt-2 ml-3">
                        <label>Tebakan</label>
                        <input
                            type="text"
                            class="form-control mb-3 ml-4"
                            style="width:400px"
                            v-model="message"
                        />
                    </div>
                    <button type="submit" class="btn btn-primary mb-3">Submit</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
    name: "roomplayer",
    props: ["isPlaying"],
    data() {
        return {
            messages: [],
            player: this.myName,
            message: ""
        };
    },
    computed: {
        ...mapState(["myName", "socket"])
    },
    created() {
        this.socketListener();
    },
    methods: {
        sendAnswer() {
            const payload = {
                player: this.$store.state.myName,
                message: this.message,
                roomName: this.$store.state.roomName
            };
            this.messages.push(payload);
            this.$emit("checkAnswer", this.message);
            this.socket.emit("sendAnswer", payload);
            // this.message = "";
        },
        socketListener() {
            this.socket.on("sendAnswer", payload => {
                this.messages.push(payload);
            });
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
#chatplayer {
    width: 500px;
}

#textplayer {
    width: 500px;
    min-height: 350px;
}

#submitplayer {
    width: 465px;
}

#judulplayer {
    width: 500px;
}
</style>
