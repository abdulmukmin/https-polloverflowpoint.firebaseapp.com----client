<template>
    <div>
        <div v-if="showList" class="d-flex justify-content-start  flex-wrap mt-2 mb-2 mr-2 ml-2">
            <div class="card text-black bg-light mb-2 ml-2 mr 2 mt-2" v-for="tag in allTags" :key="tag.index" style="max-width: 10rem;" v-on:click="getDetailTag(tag)">
                <router-link :to="'/tags/'+tag"> 
                    <div class="card-header">{{tag}}</div>
                </router-link>
            </div>
        </div>
        <router-view />
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'listTag',

    data: function(){
        return {
            showList: true
        }
    },

    computed: mapState([
        'allTags'
    ]),

    created: function (){
        this.$store.dispatch('getAllTags')
    },

    methods: {
        getDetailTag: function (tag)  {
            this.$store.dispatch('getQuestionByTag', this.$route.params.tagname)
        },
    },

    mounted: function(){

    },

    watch: {

    },
}
</script>
