<template>
    <div>       
        <h2>{{title}}</h2>
        <hr>
        <wysiwyg v-model="myHTML" />
        <router-link to="/myanswers">
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

export default {
    data: function(){
        return {
            myHTML: '',
            title: '',
            AnswerId: '',

        }
    },

    watch: {
        $route (to, from) {
            this.title = 'Create New Answer'
        }
    },

    mounted: function() {
        if (this.$route.name === "editAnswer" && this.$route.params.id){
            this.title = 'Edit Answer'
            this.populateEdit()
        } 
    },

    methods: {
        populateEdit(){
            serverAPI.get(`/answers/${this.$route.params.id}`, {
                headers: {
                    jtoken : localStorage.getItem('jtoken')
                }
            })
            .then( response => {
                this.myHTML = response.data.description
                this.AnswerId = response.data._id
            })
            .catch( error => {
                this.$store.dispatch('errorFound', error.response.data)
            })
        },

        btnClicked(){
            if (this.myHTML){
                let data = {
                    id: this.AnswerId,
                    description: this.myHTML,
                }
                this.$store.dispatch('editAnswer', data)
                this.$router.push({path:'/myanswers'})
            } else {
                this.$store.dispatch('errorFound', `Please insert valid title and description!`)
            }
        },
    }
}
</script>
