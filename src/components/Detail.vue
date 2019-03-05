<template>
    <div>       
        <h2>{{titleQuestion}}</h2>
        By: <span class="badge badge-success">{{createdBy}}</span>
        On: <span class="badge badge-secondary">{{dateFormat(dateCreated)}}</span>
        <hr>
        <div v-html="myHTML"></div>
        <hr>
        tags:
        <span class="badge badge-dark ml-1 mr-1" v-for="tag in tags" :key="tag.index">{{tag.text}}</span>
        <form-answer 
          v-bind:idQuestion="questionId"
        />
    </div>
</template>

<style>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";

</style>

<script>
import serverAPI from '@/apis/connection.js'
import FormAnswer from '@/components/FormAnswer.vue'

  export default {
    name: 'home',
    components: {
      FormAnswer
      
    },

    data: () => {
      return {
        myHTML: '',
        titleQuestion: '',
        questionId: '',
        answerArr: [],
        createdBy: '', 
        tags: [],
        dateCreated: ''

      }
    },

    created: function ()  {
      
    },

    methods:{

      getDetailQuestion(id){
        serverAPI.get(`/questions/${this.$route.params.slug}`, {
            headers: {
                jtoken : localStorage.getItem('jtoken')
            }
        })
        .then( response => {
          console.log(response.data)
            this.titleQuestion = response.data.title
            this.myHTML = response.data.description
            this.questionId = response.data._id
            this.createdBy = response.data.UserId.name
            this.tags = response.data.tags
            this.dateCreated = response.data.dateCreate
        })
        .catch( error => {
            this.$store.dispatch('errorFound', error.response.data)
        })
      },

      dateFormat(date) {
        return `${new Date(date).getDate()} - ${new Date(date).getMonth()+1} - ${new Date(date).getFullYear()}`
      }
    },

    mounted() {
        this.getDetailQuestion()
    },

    watch: {

    },
  }
</script>