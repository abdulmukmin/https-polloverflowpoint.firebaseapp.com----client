<template>
    <div>
        <div>
            <table class="table table-hover">
                <tbody v-for="(question, index) in allQuestion" :key="question.index">
                    <tr>
                        <th scope="row">{{index+1}}</th>
                        <td>{{question.title}}</td>
                        <td>
                            {{question.UserId.name}}
                        </td>                        
                        <td>
                            <button type="button" class="btn btn-sm btn-outline-secondary" v-on:click="detailQuestion(question.slug)">
                                Answer <span class="badge badge-light" >{{question.AnswerId.length}}</span>
                            </button>
                        </td>
                        <td>
                            <button type="button" class="btn btn-outline-success btn-sm" v-on:click="doUpVote(question._id)">
                                Upvote <span class="badge badge-light">{{question.upvote.length}}</span>
                            </button>
                        </td>
                        <td>
                            <button type="button" class="btn btn-outline-danger btn-sm" v-on:click="doDownVote(question._id)">
                                Downvote <span class="badge badge-light">{{question.downvote.length}}</span>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import {mapActions, mapState, mapGetters} from 'vuex'

export default {
  pros:[],

  name: 'home',
  
  components: {
    
  },

  created(){
    this.getQuestions()
  },

  mounted: function(){

  },

  computed:{
    ...mapState([
      // 'information',
      'allQuestion',
      'isLogin'
    ])
  },

  methods:{
    ...mapActions([
      'getQuestions',
    ]),

    doUpVote(id){
        if(this.isLogin){
            this.$store.dispatch('upVote', id)
        } else {
            this.$store.dispatch('errorFound', 'Please login..')
        }
    },


    doDownVote(id){
        if(this.isLogin){
            this.$store.dispatch('downVote', id)
        } else {
            this.$store.dispatch('errorFound', 'Please login..')
        }
    },

    detailQuestion(id){
        this.$router.push(`/question/${id}`)
    },
    
  },

  watch: {

  },
}
</script>
