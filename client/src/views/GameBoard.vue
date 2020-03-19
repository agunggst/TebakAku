<template>
  <div class="gameboard">
    <h1>-TebakAku-</h1>
    <RoomMaster />
  </div>
</template>

<script>
// @ is an alias to /src
import RoomMaster from '@/components/RoomMaster.vue'

export default {
  name: 'gameboard',
  components: {
    RoomMaster
  }
}
</script>