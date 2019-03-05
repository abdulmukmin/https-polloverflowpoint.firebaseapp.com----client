<template>
    <div>
        <div v-if="showList">
            <h3>{{title}}</h3>
            <table class="table table-hover">
                <tbody v-for="(answer, index) in myAnswers" :key="answer.index">
                    <tr>
                        <th scope="row">{{index+1}}</th>
                        <h5>Question: {{answer.QuestionId.title}}</h5>
                        <div v-html="answer.description"></div>
                        <td>
                            <div class="d-flex flex-column">
                                <button type="button" class="btn btn-outline-secondary btn-sm" v-on:click="detailQuestion(answer.QuestionId.slug)">Preview</button>
                                <button type="button" class="btn btn-outline-secondary btn-sm" v-on:click="populateEdit(answer._id)">Edit</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
import {mapState } from 'vuex'

export default {
    data: function(){
        return { 
            btnText: '',
            title: '',
            showList: true,

        }
    },

    mounted: function() {
        if (this.$route.path === '/myanswers'){
            this.btnText = "Create New Answer"
            this.title = "List of My Answer"
        } else if (this.$route.path !== '/myquestions' || to.path !== '/myanswers' ) {
            this.showList = false
        }
    },

    computed:{
        ...mapState([
            'isLogin',
            'myAnswers',

        ])

    },

    watch: {
        $route (to, from) {
            if (to.path === '/myanswers'){
                this.btnText = "Create New Answer"
                this.title = "List of My Answer"
                this.showList = true
            } else if (to.path !== '/myquestions' || to.path !== '/myanswers' ) {
                this.showList = false
            }
        }
    },

    created: function(){
        this.getData()
    },

    methods: {

        populateEdit(id){
            this.$router.push(`/myanswers/edit/${id}`)
        },

        getData(){
            this.$store.dispatch('getOwnAnswers')
        },

        detailQuestion(id){
            this.$router.push(`/question/${id}`)
        },

    }
}
</script>