<template>
    <div>
        <!-- answers Form -->
        <div class="card my-4">
        <h5 class="card-header">Contribute with answer :</h5>
        <div class="card-body">
            <form>
            <div class="form-group">
                <wysiwyg v-model="myHTML" />
            </div>
            <button type="submit" class="btn btn-primary" v-on:click.prevent="saveAnswer">Submit</button>
            </form>
        </div>
        </div>

        <!-- Single answer -->
        <div class="media mb-4" v-for="answer in answers" :key="answer._id">
            <img class="d-flex mr-3 rounded-circle" src="http://placehold.it/50x50" alt="">
            <div class="media-body">
                <h5 class="mt-0">{{answer.UserId.name}}</h5>
                <div v-html="answer.description"></div>
            </div>
            <div class="d-flex flex-column">

                <button type="button" class="btn btn-outline-success btn-sm" v-on:click="upVoteAnswer(answer._id)">
                    Upvote <span class="badge badge-light">{{answer.upvote.length}}</span>
                </button>
                <button type="button" class="btn btn-outline-danger btn-sm" v-on:click="downVoteAnswer(answer._id)">
                    Downvote <span class="badge badge-light">{{answer.downvote.length}}</span>
                </button>
                <button type="button" class="btn btn-warning btn-sm" v-on:click="">Report this!</button>
            </div>
        </div>

    </div>
</template>

<style>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
</style>

<script>
    import serverAPI from '@/apis/connection.js'
    import { mapState } from 'vuex';

    export default {
        props:{
            idQuestion: String
        },

        created:() => {

        },

        data(){
            return {
                myHTML: '',
                answers: [],
                
            }
        },

        computed:{
            ...mapState([
                'isLogin'
            ])
        },

        methods: {

            doUpVote(id){
                this.$store.dispatch('upVoteAnswer', id)
            },


            doDownVote(id){
                this.$store.dispatch('downVoteAnswer', id)
            },

            saveAnswer: function(){
                if(!localStorage.jtoken){
                    this.$store.dispatch('errorFound', 'please sign in to contribute answer!')
                } else if (this.content1 === ''){
                    this.$store.dispatch('errorFound', 'please input valid answer!')
                } else {
                    serverAPI.post(`/answers`, {
                        description: this.myHTML,
                        questionId: this.idQuestion
                    }, {
                        headers:{
                            jtoken: localStorage.getItem('jtoken')
                        }
                    })
                    .then((response) => {
                        this.myHTML = ''
                        this.getAnswer()
                    })
                    .catch(function (error) {
                        this.$store.dispatch('errorFound', error.response.data)
                    });
                }
            },

            getAnswer: function(){
                serverAPI.get(`/answers/related/${this.$route.params.slug}`,{
                    headers:{
                        jtoken: localStorage.getItem('jtoken')
                    }
                })
                .then((response) => {
                    this.answers = response.data
                })
                .catch(function (error) {
                    this.$store.dispatch('errorFound', error.response.data)
                })
            },

            upVoteAnswer(id){
                if (this.isLogin) {
                    serverAPI.patch(`/answers/upvote`, {
                        answerId: id
                    },{
                        headers: {
                            jtoken : localStorage.getItem('jtoken')
                        }
                    })
                    .then( response => {
                        this.answers = response.data
                    })
                    .catch( error => {
                        console.log(error)
                        this.$store.dispatch('errorFound', error.response.data)
                    })
                } else {
                    this.$store.dispatch('errorFound', 'Please login..')
                }
            },

            downVoteAnswer(id){
                if (this.isLogin) {
                    serverAPI.patch(`/answers/downvote`, {
                        answerId: id
                    },{
                        headers: {
                            jtoken : localStorage.getItem('jtoken')
                        }
                    })
                    .then( response => {
                        this.answers = response.data
                    })
                    .catch( error => {
                        this.$store.dispatch('errorFound', error.response.data)
                    })
                } else {
                    this.$store.dispatch('errorFound', 'Please login..')
                }
            },
        },

        mounted() {
            this.getAnswer()
        },
    }
</script>
