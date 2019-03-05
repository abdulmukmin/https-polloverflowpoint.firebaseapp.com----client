<template>
  <div id="app" class="container">
    <div>
      <nav-bar 
        @showLogin="showLoginForm"
        @showRegister="showRegisterForm"
        :propislogin="isLogin"
      />
      <alert />
      <div class="row">
        <div class="col-3">
          <side-bar 
            :propislogin="isLogin"
          />
        </div>
        <div class="col-9">
          <router-view 
            :loginClicked="toLogin"
            :registerClicked="toRegister"

          />
        </div>
      </div> 
    </div>
  </div>
</template>

<script>
  import NavBar from '@/components/NavBar.vue'
  import SideBar from '@/components/SideBar.vue'
  import {mapState} from 'vuex'
  import Alert from '@/components/Alert.vue'

export default {
  components:{
    NavBar,
    SideBar,
    Alert,

  },

  data: function(){
    return {
      toLogin: false,
      toRegister: false,
      showAlert: false,
      alertMessage: '',

    }

  },

  computed:{

    isLogin: function(){
      return this.$store.state.isLogin
    },

  },

  mounted: function(){
    this.checkLogin()
  },

  methods:{
    checkLogin(){
      this.$store.dispatch('checkToken')
    },

    showLoginForm(){
      this.toLogin = true
      this.toRegister = false
    },

    showRegisterForm(){
      this.toLogin = false
      this.toRegister = true
    },
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#nav {
  padding: 10px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
