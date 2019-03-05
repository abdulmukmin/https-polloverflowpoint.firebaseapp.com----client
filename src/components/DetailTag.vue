<template>
  <div>
    <button type="submit" class="badge badge-info" v-on:click="backToTags()">Back</button>
    <table class="table table-hover">
        <tbody v-for="(question, index) in questionsOfTag" :key="question.index">
            <tr>
                <th scope="row">{{index+1}}</th>
                <td>{{question.title}}</td>
                <td>
                    {{question.UserId.name}}
                </td>                        
                <td>
                    <button type="button" class="btn btn-outline-secondary btn-sm" v-on:click="detailQuestion(question.slug)">Detail</button>
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
</template>

<script>
// @ is an alias to /src
import {mapActions, mapState, mapGetters} from 'vuex'

export default {
    pros:[],
    name: 'home',
    components: {
      
    },

  watch: {

  },

  computed:{
    ...mapState([
      'questionsOfTag'
    ])
  },

  methods:{
    ...mapActions([
      

    ]),

    doUpVote(id){
      this.$store.dispatch('upVote', id)
    },


    doDownVote(id){
      this.$store.dispatch('downVote', id)
    },

    detailQuestion(id){
        this.$router.push(`/question/${id}`)
    },

    backToTags(){
      this.$router.push(`/tags`)
    }
    
  },


  created: function ()  {
    this.$store.dispatch('getQuestionByTag', this.$route.params.tagname)
  },
}
</script>
