<template>
    <div class="gameboard">
        <h1>-TebakAku-</h1>
        <div class="room-code">
            <p>Room Code: {{ room_code }}</p>
        </div>
        <div class="guess-word-input" v-if="$store.state.isCreator">
            <form v-on:submit.prevent="setSecretWord">
                <input type="text" v-model="secret_word_input" />
                <button type="submit">Set</button>
            </form>
        </div>
        <div class="guess-word" v-if="$store.state.isCreator">
            <p>Guess Word: {{ secret_word }}</p>
        </div>
        <!-- <div class="players-list">
            {{ otherPlayers }}
        </div> -->
        <div class="guess-word-player" v-if="!$store.state.isCreator"></div>
        <div class="room-box d-flex">
            <RoomMaster v-bind:secret_word="secret_word"></RoomMaster>
            <RoomPlayer
                v-bind:secret_word="secret_word"
                :isPlaying="isPlaying"
                @checkAnswer="checkAnswer"
            ></RoomPlayer>
        </div>
        <div class="button-leave">
            <button class="btn btn-primary" v-on:click="leaveRoom">
                Leave Room
            </button>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import RoomMaster from '@/components/RoomMaster.vue';
import RoomPlayer from '@/components/RoomPlayer.vue';
import {mapState, mapMutations} from 'vuex';

export default {
    name: 'gameboard',
    data: function() {
        return {
            secret_word: '',
            placeholder: '',
            secret_word_input: '',
            isPlaying: false,
            isWinning: false,
            isGameEnded: false
        };
    },
    components: {
        RoomMaster,
        RoomPlayer
    },
    methods: {
        setSecretWord: function() {
            this.secret_word = this.secret_word_input;
            this.placeholder = '';
            this.secret_word_input = '';
            let payload = {
                roomName: this.roomName,
                isPlaying: true,
                secret_word: this.secret_word
            };
            this.socket.emit('changeIsPlaying', payload);
        },
        socketlistener() {
            this.socket.on('changeIsPlaying', data => {
                this.isPlaying = data.isPlaying;
                this.secret_word = data.secret_word;
            });
            this.socket.on('endGame', winner => {
                this.isPlaying = false;
                this.isGameEnded = true;
                if (this.isWinning) {
                    console.log('you are the WINNER!');
                    this.$myswal.showMessage('you are the WINNER!');
                } else if (this.$store.state.isCreator) {
                    console.log(`game is ended, the winner is ${winner}`);
                    this.$myswal.showMessage(
                        `game is ended, the winner is ${winner}`
                    );
                } else {
                    console.log(`sorry you are lost, the winner is ${winner}`);
                    this.$myswal.showMessage(
                        `sorry you are lost, the winner is ${winner}`
                    );
                }
            });
            this.socket.on('playerLeave', player => {
                this.$store.commit('setOtherPlayers', player);
            });
        },
        checkAnswer(answer) {
            if (answer == this.secret_word) {
                this.isWinning = true;
                let payload = {
                    roomName: this.roomName,
                    winner: this.$store.state.myName
                };
                this.socket.emit('endGame', payload);
            }
        },
        leaveRoom() {
            if (this.$store.state.isCreator && !this.isGameEnded) {
                console.log(
                    'Game master Cannot leave while game is still on going'
                );
                this.$myswal.showError(
                    'Game master Cannot leave while game is still on going'
                );
            } else {
                localStorage.removeItem('name');
                this.socket.emit('leaveRoom', {
                    roomName: this.roomName,
                    room_code: this.room_code,
                    playerKey: this.$store.state.myKey
                });
                this.$router.push('/');
            }
        }
    },
    computed: {
        ...mapState([
            'room_code',
            'socket',
            'myName',
            'otherPlayers',
            'roomName'
        ])
    },
    created() {
        this.socketlistener();
    },
    destroyed() {
        this.socket.off('changeIsPlaying');
        this.socket.off('endGame');
        this.socket.off('playerLeave');
    }
};
</script>
