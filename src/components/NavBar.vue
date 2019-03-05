<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
            <a class="navbar-brand"><h2>poll OverflowPoint</h2></a>
            <form class="form-inline my-2 my-lg-0">
            <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" v-model="search">
            </form>
        </div>
        <g-signin-button
            v-if="!propislogin" 
            :params="googleSignInParams"
            @success="onSignInSuccessGg"
            @error="onSignInErrorGg">
            Sign in with Google
        </g-signin-button>
        <fb-signin-button
            v-if="!propislogin" 
            :params="fbSignInParams"
            @success="onSignInSuccessFb"
            @error="onSignInErrorFb">
            Sign in with Facebook
        </fb-signin-button>
        <router-link to="/login">
            <button type="button" class="btn btn-outline-primary mr-2 ml-2 " 
                v-if="!propislogin" 
                v-on:click="$emit('showLogin')">
                    Login
            </button>
        </router-link>
        <router-link to="/register">
            <button type="button" class="btn btn-primary ml-2 mr-2 btn-sm"
                v-if="!propislogin"
                v-on:click="$emit('showRegister')">
                Register
            </button>
        </router-link>
        <button type="button" class="btn btn-outline-danger ml-2 mr-2 btn-sm"
            v-if="propislogin"
            v-on:click="doLogout()">
            Logout
        </button>
    </nav>
</template>

<script>

window.fbAsyncInit = function() {
    FB.init({
      appId      : '1030320517177374',
      cookie     : true,  // enable cookies to allow the server to access the session
      xfbml      : true,  // parse social plugins on this page
      version    : 'v3.2' // use graph api version 2.8
    });
  };
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

export default {
    name:'login',

    props: ["propislogin"],

    data:function(){
        return {
            name: '',
            password: '',
            fbSignInParams: {
                scope: 'email',
                return_scopes: true
            },
            googleSignInParams: {
                client_id: '601481270136-eter4vimp31mvl4ao7i2gtkf9pgt42e2.apps.googleusercontent.com'
            },
            search: '',

        }
    },

    computed:{

    },

    watch: {
        search : function (newValue) {
            if ( this.search === '' ) {
                
            } else {
                
            }
        },
    },

    methods: {
        doLogout(){
            return this.$store.dispatch('signOut')
        },

        onSignInSuccessFb (response) {
            FB.api('/me?fields=id,name,email', data => {
                this.$store.dispatch('fSignIn', data)
            })
        },

        onSignInErrorFb (error) {
            this.$store.dispatch('errorFound', error)
        },

        onSignInSuccessGg (googleUser) {
            const profile = googleUser.getBasicProfile() // etc etc
            this.$store.dispatch('gSignIn', profile)
        },

        onSignInErrorGg (error) {
            this.$store.dispatch('errorFound', error)
        }

    },

    mounted: function() {
        
    },
}
</script>

<style>
.fb-signin-button {
  /* This is where you control how the button looks. Be creative! */
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #4267b2;
  color: #fff;
  margin-left: 2px;
  margin-right: 2px;
}

.g-signin-button {
  /* This is where you control how the button looks. Be creative! */
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #3c82f7;
  color: #fff;
  box-shadow: 0 3px 0 #0f69ff;
  margin-left: 2px;
  margin-right: 2px;
}
</style>