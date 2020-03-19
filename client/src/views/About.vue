<template>
  <div class="about">
    <RoomMaster />
  </div>
</template>

<script>
// @ is an alias to /src
import RoomMaster from '@/components/RoomMaster.vue'

export default {
  name: 'Home',
  components: {
    RoomMaster
  }
}
</script>