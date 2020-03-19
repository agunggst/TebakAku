<template>
  <div id="roomplayer" class="container">
    <div id="chatplayer" class="row border border-dark">
        <div id="judulplayer">
        <h1 style="text-align:center" class="mt-2">Room - Pemain</h1>
        </div>
        <div id="textplayer" class="border border-dark mx-3 my-1">
            <div>
            <h3 class="mt-2">Tebakan</h3>
            </div>
            <div class="col-sm-8">
            <p v-for="(message,i) in messages" :key="i">
                <span>{{message.player}}:{{message.message}}</span>
            </p>
            </div>
        </div>
        <div>
            <form @submit.prevent="sendMessage">
                <div id="submitplayer" class="form-group border border-dark mt-2 ml-3">
                    <label>Nama pemain</label>
                    <input type="text" class="form-control mb-3 ml-4" style="width:400px" v-model="player">
                
                    <label >Tebakan</label>
                    <input type="text" class="form-control  mb-3 ml-4" style="width:400px" v-model="message">
                </div>
            <button type="submit" class="btn btn-primary mb-3">Submit</button>
            </form>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'roomplayer',
  data(){
      return{
          messages:[{player: 'Tebakan', message:'silakan tebak' }],
          player: "",
          message: ""
      }
  },
  methods:{
      sendTebakan(event){
          event.preventDefault();
          const message={
              player: this.player,
              message: this.message
          }
          console.log(message)
      }
  } 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
#chatplayer {
    width: 500px
}

#textplayer {
    width: 500px;
    min-height: 350px
}

#submitplayer {
    width: 465px
}

#judulplayer {
    width: 500px
}

</style>
