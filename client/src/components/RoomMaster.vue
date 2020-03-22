<template>
    <div id="formmaster" class="form-master">
        <div id="chatmaster" class="row border border-dark">
            <div id="judulmaster">
                <h1 style="text-align:center" class="mt-2">Room Master</h1>
            </div>
            <div id="textmaster" class="border border-dark mx-3 my-1 chatMaster">
                <div>
                    <h3 class="mt-2">Clue</h3>
                </div>
                <div class="col-sm-8">
                    <p v-for="(message, i) in messages" :key="i">
                        <span class="font-weight-bold">{{ message.username }}:</span>
                        {{ message.message }}
                    </p>
                </div>
            </div>
            <div v-if="$store.state.isCreator" class="input-clue">
                <form @submit.prevent="sendClue">
                    <div id="submitmaster" class="form-group border border-dark mt-2 ml-3">
                        <label for="clue">Type your Clue</label>

                        <input
                            type="text"
                            class="form-control mb-3 ml-4"
                            style="width:410px"
                            id="message"
                            v-model="message"
                        />
                    </div>
                    <button type="submit" class="btn btn-primary mb-3">Send</button>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";

export default {
    props: ["secret_word"],
    data() {
        return {
            messages: [
                { username: "Room_Master", message: "welcome to TebakAku" }
            ],
            username: "Room_Master",
            message: ""
        };
    },
    created() {
        this.socket.on("newClue", newClue => {
            this.messages.push(newClue);
        });
    },
    mounted() {
        //   socket.on('on send message', (newMessage) =>{
        //       this.message.push(newMessage)
        //   })
    },
    methods: {
        sendClue() {
            const clue = {
                username: "Room_Master",
                message: this.message
            };
            if (clue.message == this.secret_word) {
                this.$myswal.showMessage("GA BOLEH KASIH TAU");
            } else {
                this.messages.push(clue);
                clue.roomName = this.$store.state.roomName;
                this.message = "";
                this.socket.emit("newClue", clue);
            }
        }
        // sendMessage(){
        //     const message = {
        //         username : 'Room_Master',
        //         message : this.message
        //     }
        //     this.message.push(message)
        //     socket.emit('send message', message
        // }
    },
    computed: {
        ...mapState(["socket"])
    }
};
</script>

<style>
#chatmaster {
    width: 500px;
}

#textmaster {
    width: 500px;
    min-height: 350px;
}

#submitmaster {
    width: 465px;
}

#judulmaster {
    width: 500px;
}
</style>
