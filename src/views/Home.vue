<template>
  <div class="home" >
    <div >
      <h3>Newest Question :</h3>
      <list />
    </div>
    <router-view />
  </div>
</template>


<script>
// @ is an alias to /src
import {mapActions, mapState, mapGetters} from 'vuex'
import List from '@/components/List.vue'

export default {
  pros:[],
  name: 'home',
  components: {
    List
  },

  created(){
    this.getQuestions()
  },

  mounted: function(){

  },

  computed:{
    ...mapState([
      // 'information',
      'allQuestion'
    ])
  },

  methods:{
    ...mapActions([
      'getQuestions'
    ])
    
  },

  watch: {

  },
}
</script>