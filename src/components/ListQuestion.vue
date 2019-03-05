<template>
    <div>
        <div v-if="showList">
            <h4>{{title}}</h4>
            <table class="table table-hover">
                <tbody v-for="(question, index) in myQuestions" :key="question.index">
                    <tr>
                        <td>{{index+1}}</td>
                        <td>{{question.title}}</td>
                        <td>
                            <button type="button" class="btn btn-sm btn-primary">
                                Answer <span class="badge badge-light">{{question.AnswerId.length}}</span>
                                <span class="sr-only">unread messages</span>
                            </button>
                        </td>
                        <td>
                            <button type="button" class="btn btn-outline-secondary btn-sm" v-on:click="detailQuestion(question.slug)">Preview</button>
                        </td>
                        <td>
                            <button type="button" class="btn btn-outline-secondary btn-sm" v-on:click="populateEdit(question.slug)">Edit</button>
                        </td>
                        <td>
                            <button type="button" class="btn btn-outline-danger btn-sm" v-on:click="doDelete(question._id)">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <button v-if="btnText" type="button" class="btn btn-outline-secondary" v-on:click="btnClicked">{{btnText}}</button>
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
        if (this.$route.path === '/myquestions'){
            this.btnText = "Create New Question"
            this.title = "List of My Question"
            this.getMyQuestion()
        } else if (this.$route.path === '/myanswers'){
            this.btnText = "Create New Answer"
            this.title = "List of My Answer"
        } else if (this.$route.path !== '/myquestions' || to.path !== '/myanswers' ) {
            this.showList = false
        }
    },

    computed:{
        ...mapState([
            'isLogin',
            'myQuestions',

        ])

    },

    watch: {
        $route (to, from) {
            if (to.path === '/myquestions'){
                this.btnText = "Create New Question"
                this.title = "List of My Question"
                this.showList = true
            } else if (to.path === '/myanswers'){
                this.btnText = "Create New Answer"
                this.title = "List of My Answer"
                this.showList = true
            } else if (to.path !== '/myquestions' || to.path !== '/myanswers' ) {
                this.showList = false
            }
        }
    },

    created: function(){
        this.getMyQuestion()
    },

    methods: {
        btnClicked(){
            this.btnText = ''
            if (this.title === 'List of My Question'){
                this.$router.push('/myquestions/create')
            } else if (this.title === 'List of My Answer'){
                this.$router.push('/myanswers/create')
            }
        },

        populateEdit(slug){
            this.btnText = ''
            if (this.title === 'List of My Question'){
                this.$router.push(`/myquestions/edit/${slug}`)
            } else if (this.title === 'List of My Answer'){
                this.$router.push(`/myanswers/edit/${slug}`)
            }            
        },

        getMyQuestion(){
            this.$store.dispatch('getOwnQuestions')
        },

        doDelete(id){
            this.$store.dispatch('deleteOwnQuestion', id)
        },

        detailQuestion(id){
            this.$router.push(`/question/${id}`)
        },

    }
}
</script>
