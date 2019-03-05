<template>
    <div>
        <div v-if="showList" class="d-flex justify-content-start  flex-wrap mt-2 mb-2 mr-2 ml-2">
            <div class="card text-black bg-light mb-2 ml-2 mr 2 mt-2" v-for="user in bestUsers" :key="user.index" style="max-width: 10rem;" > 
                <div class="card-header">{{user.name}}</div>
                <div class="card-body">
                    <h3 class="card-title">{{user.popularity}}</h3>
                </div>
            </div>
        </div>
        <router-view />
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'listUser',

    data: function(){
        return {
            showList: true
        }
    },

    computed: mapState([
        'bestUsers'
    ]),

    created: function (){
        this.$store.dispatch('getBestUsers')
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
