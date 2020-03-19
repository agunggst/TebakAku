<template>
  <div class="lobby">
    <h1>TebakAku</h1>
    <form @submit.prevent="joinRoom">
      <input type="text" placeholder="Enter the room's pin you want to join" v-model="roomsPin">
      <button type="submit" :disabled="roomsPin.length < 8">Join</button><br>
      <p>OR</p>
      <span @click="isCreateRoom = !isCreateRoom">Create a room</span>
      <div class="create-room-form" v-if="isCreateRoom">
        <form @submit.prevent="createRoom">
          <input type="text" placeholder="Enter the room's name" v-model="roomsName">
          <button type="submit" :disabled="roomsName === ''">Create!</button><br>
        </form>
      </div>

    </form>
  </div>
</template>
<script>
import io from 'socket.io-client'

export default {
  name: 'Lobby',
  beforeRouteEnter (to, from, next) {
   if(localStorage.getItem("name")){
     next()
   }else {
     next(false)
   }
  },
  cretaed() {
    if(this.$store.state.socket === null){
      let socket = io('http://localhost3000')
      this.$store.commit('setSocket', socket)
    }
   
  },
  data() {
    return {
      roomsPin: '',
      roomsName: '',
      isCreateRoom: false,
    };
  },
  methods: {
    joinRoom() {

    },
    createRoom() {

    }

  }
}
</script>
