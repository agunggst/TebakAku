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
        <div class="room-box d-flex justify-center">
            <RoomMaster v-bind:secret_word="secret_word"></RoomMaster>
            <RoomPlayer></RoomPlayer>
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
            secret_word_input: ''
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
        }
    },
    computed: {
        ...mapState(['room_code', 'socket', 'myName', 'otherPlayers'])
    }
};
</script>
