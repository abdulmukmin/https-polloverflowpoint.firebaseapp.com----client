<template>
    <div>       
        <h2>{{title}}</h2>
        <hr>
        <h5> Title : <input type="text" placeholder="Title here..." v-model="titleQuestion" /> </h5> 
        <wysiwyg v-model="myHTML" />
        <vue-tags-input
            v-model="tag"
            :tags="tags"
            @tags-changed="newTags => tags = newTags"
        />
        <router-link to="/myquestions">
            <button type="button" class="btn btn-outline-warning">Cancel</button>
        </router-link>
        <button type="button" class="btn btn-outline-secondary" v-on:click="btnClicked()">Save</button>
    </div>
</template>

<style>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
</style>

<script>
import serverAPI from '@/apis/connection.js'
import VueTagsInput from '@johmun/vue-tags-input';

export default {
    components: {
        VueTagsInput,
    },

    data: function(){
        return {
            myHTML: '',
            title: '',
            titleQuestion: '',
            questionId: '',
            tag: '',
            tags: [],

        }
    },

    watch: {
        $route (to, from) {
            if (to.path === '/myquestions/create') {
                this.title = 'Create New Question'
            } else if (to.path === '/myquestions/edit/:slug') {
                this.title = 'Edit Question'
            } else if (to.path === '/myanswers/create') {
                this.title = 'Create New Answer'
            } 
        }
    },

    mounted: function() {
        if (this.$route.path === '/myquestions/create'){
            this.title = 'Create New Question'
        } else if (this.$route.name === "editQuestion" && this.$route.params.slug){
            this.title = 'Edit Question'
            this.populateEdit()
        } else if (this.$route.path === '/answer/create'){
            this.title = 'Create New Answer'
        }
    },

    methods: {
        populateEdit(){
            serverAPI.get(`/questions/${this.$route.params.slug}`, {
                headers: {
                    jtoken : localStorage.getItem('jtoken')
                }
            })
            .then( response => {
                this.titleQuestion = response.data.title
                this.myHTML = response.data.description
                this.questionId = response.data._id
                this.tags = response.data.tags
            })
            .catch( error => {
                this.$store.dispatch('errorFound', error.response.data)
            })
        },

        btnClicked(){
            if (this.titleQuestion && this.myHTML){
                if( this.title === 'Create New Question'){
                    let data = {
                        title: this.titleQuestion,
                        description: this.myHTML,
                        slug: this.stringToSlug(this.titleQuestion),
                        tags: this.tags
                    }
                    this.$store.dispatch('createQuestion', data)
                    this.$router.push({path:'/myquestions'})
                } 
                else if( this.title === 'Edit Question'){
                    let data = {
                        title: this.titleQuestion,
                        description: this.myHTML,
                        slug: this.stringToSlug(this.titleQuestion),
                        id: this.questionId,
                        tags: this.tags
                    }
                    this.$store.dispatch('editQuestion', data)
                    this.$router.push({path:'/myquestions'})
                } 
            } else {
                this.$store.dispatch('errorFound', `Please insert valid title and description!`)
            }
        },

        stringToSlug (str) {
            str = str.replace(/^\s+|\s+$/g, ''); // trim
            str = str.toLowerCase();
        
            // remove accents, swap ñ for n, etc
            var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
            var to   = "aaaaeeeeiiiioooouuuunc------";
            for (var i=0, l=from.length ; i<l ; i++) {
                str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
            }

            str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
                .replace(/\s+/g, '-') // collapse whitespace and replace by -
                .replace(/-+/g, '-'); // collapse dashes

            return str;
        }
    }
}
</script>
