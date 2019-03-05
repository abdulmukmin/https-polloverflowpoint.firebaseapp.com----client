<template>
  <div>
    <div  v-if="showError" class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>Hay!</strong> {{ errorMessage }}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close" v-on:click="resetAlertMsg()">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
    <div v-if="showSuccess" class="alert alert-success alert-dismissible fade show" role="alert">
        <strong>Congrattss...</strong> {{successMessage}}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close" v-on:click="resetAlertMsg()">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState, mapGetters} from 'vuex'

export default {

    data: function(){
        return {

        }
    },

    computed: {
        ...mapState([
            'showError',
            'errorMessage',
            'showSuccess',
            'successMessage',

        ]),

    },

    methods: {
        ...mapActions([
            'resetAlertMsg'
        ])
    }

}
</script>
