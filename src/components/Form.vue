<template>
    <form method="POST">
        <div>
            <div v-if="!toChangePswd">
                <label for="exampleInputEmail1">Username</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter username" v-model="username">
            </div>
            <div v-if="toRegister">
                <label for="exampleInputEmail1">Email</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" v-model="email">
                <small v-if="!toChangePswd" id="emailHelp" class="form-text text-muted" >Check your email for frist password!</small>
            </div>
            <div v-if="toLogin || toChangePswd" >
                <label for="exampleInputPassword1" v-if="!toChangePswd">Password</label>
                <label for="exampleInputPassword1" v-if="toChangePswd">Last Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" v-model="password" >
            </div>
            <div v-if="toChangePswd">
                <label for="exampleInputPassword1">New Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" v-model="newPassword" >
            </div>
        </div>
        <div>
            <button type="button" class="btn btn-outline-danger btn-sm mr-2 mt-2" v-on:click="cancel()">Close</button>
            <button type="submit" class="btn btn-outline-success btn-sm ml-2 mt-2" v-on:click.prevent="btnClicked">{{btnText}}</button>
        </div>
    </form>
</template>

<script>
import serverAPI from '@/apis/connection.js'

export default {
    name:'formData',

    props:['loginClicked', 'registerClicked'],

    data:function(){
        return {
            username: '',
            email: '',
            password: '',

            btnText:'',
            toLogin: false,
            toRegister: false,
            toChangePswd: false,

            newPassword: '',

        }
    },

    watch: {
        '$route' (to, from) {
            if (to.path === '/login'){
                this.btnText = "Login"
                this.toLogin = true
                this.toRegister = false
                this.toChangePswd = false
            } else if (to.path === '/register'){
                this.btnText = "Register"
                this.toLogin = false
                this.toRegister = true
                this.toChangePswd = false
            } else if (to.path === '/changepassword'){
                this.btnText = "Save Changes"
                this.toLogin = false
                this.toRegister = false
                this.toChangePswd = true
            }
        }
    },

    mounted: function() {
        if (this.$route.path === '/login'){
            this.btnText = "Login"
            this.toLogin = true
            this.toRegister = false
        } else if (this.$route.path === '/register'){
            this.btnText = "Register"
            this.toLogin = false
            this.toRegister = true
        } else if (this.$route.path === '/changepassword'){
            this.btnText = "Save Changes"
            this.toLogin = false
            this.toRegister = false
            this.toChangePswd = true
        }
    },

    methods: {

        cancel(){
            this.$router.push({path:'/'})
        },

        btnClicked(){
            if (this.btnText === 'Login'){
                this.signIn()
            } else if (this.btnText === 'Register'){
                this.signup()
            } else if (this.btnText === 'Save Changes'){
                this.changePassword()
            }
        },

        signIn(){
            if (this.username && this.password) {
                serverAPI({
                    method:'POST',
                    url: 'https://polloverflow-server.grouppoint.online/users/signin',
                    data: {
                        name: this.username,
                        password: this.password
                    }
                })
                .then( response => {
                    localStorage.setItem('jtoken',response.data.jToken)
                    this.$store.dispatch('successFound', response.data.message)
                    this.$store.dispatch('userSuccessLoggedIn', response.data.message)
                    this.$router.push('/')
                })
                .catch( error => {
                    this.$store.dispatch('errorFound', error.response.data)
                })
            } else {
                this.$store.dispatch('errorFound', `please input valid username or password`)
            }
        },

        signup(){
            if (this.username && this.email) {
                serverAPI({
                    method: 'POST',
                    url: 'https://polloverflow-server.grouppoint.online/users',
                    data: {
                        name:this.username,
                        email:this.email,
                        role:"nonAdmin"
                    }
                })
                .then ( payload => {
                    this.$store.dispatch('successFound', "Signup success")
                    this.$router.push('/login')
                })
                .catch ( error => {
                    this.$store.dispatch('errorFound', error.response.data)
                })
            } else {
                this.$store.dispatch('errorFound', `please input valid username or email`)
            }
        },

        changePassword(){
            if (this.password && this.newPassword) {
                serverAPI({
                    method: 'PATCH',
                    url: 'https://polloverflow-server.grouppoint.online/users',
                    data: {
                        pass: {
                            last: this.password,
                            new: this.newPassword
                        }
                    },
                    headers: {
                        jtoken: localStorage.getItem('jtoken')
                    }
                })
                .then ( payload => {
                    this.$store.dispatch('successFound', "Success change password")
                    this.$router.push('/')
                })
                .catch ( error => {
                    this.$store.dispatch('errorFound', error.response.data)
                })
            } else {
                this.$store.dispatch('errorFound', `please input field last and new password`)
            }
        },
    }
}
</script>
