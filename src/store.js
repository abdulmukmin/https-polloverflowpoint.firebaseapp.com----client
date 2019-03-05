import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'
import serverAPI from '@/apis/connection.js'

Vue.use(Vuex)

export default new Vuex.Store({
  strict:true,
  state: {
    myQuestions: [],
    allQuestion: [],
    myAnswers: [],
    isLogin : false,
    myId: '',
    allTags : [],
    questionsOfTag: [],
    bestUsers: [],
    showError: false,
    errorMessage: '',
    showSuccess: false,
    successMessage: '',

  },

  mutations: {

    mutationSignOut(state){
      localStorage.clear()
      state.isLogin = false
    },

    mutationSuccessLoggedIn(state, payload){
      state.isLogin = true
      state.myId = payload
    },

    cekTokenResult(state, payload){
      state.isLogin = payload
    },

    mutationOwnQuestion(state, payload) {
      state.myQuestions = payload
    },

    mutationGetQuestion(state, payload){
      state.allQuestion = payload
    },

    mutationGetOwnQuestion(state,payload){
      state.myQuestions = payload
    },

    mutationGetOwnAmswer(state,payload){
      state.myAnswers = payload
    },

    mutationUpVote(state,payload){
      state.allQuestion = payload
    },

    mutationDownVote(state,payload){
      state.allQuestion = payload
    },

    mutationAllTags(state, payload){
      state.allTags = payload
    },

    mutationGetQuestionByTag(state, payload){
      state.questionsOfTag = payload
    },

    mutationBestUsers(state, payload){
      state.bestUsers = payload
    },

    mutationShowError(state, payload){
      state.showError = true
      state.errorMessage = payload
    },

    mutationShowSuccess(state, payload){
      state.showSuccess = true
      state.successMessage = payload
    },

    resetAlert(state){
      state.showSuccess = false
      state.showError = false
      state.errorMessage = ''
      state.successMessage = ''
    },
  },

  actions: {

    errorFound(context, msg){
      context.commit('resetAlert')
      context.commit('mutationShowError', msg)
    },

    successFound(context, msg){
      context.commit('resetAlert')
      context.commit('mutationShowSuccess', msg)
    },

    resetAlertMsg(context){
      context.commit('resetAlert')
    },

    upVoteAnswer(context, id){
      serverAPI.patch(`/answers/upvote`, {
        answerId: id
      },{
          headers: {
              jtoken : localStorage.getItem('jtoken')
          }
      })
      .then( response => {
        context.commit('mutationUpVote', response.data)
      })
      .catch( error => {
        this.dispatch('errorFound', error)
      })
    },

    downVoteAnswer(context, id){
      serverAPI.patch(`/answers/downvote`, {
        answerId: id
      },{
          headers: {
              jtoken : localStorage.getItem('jtoken')
          }
      })
      .then( response => {
        context.commit('mutationDownVote', response.data)
      })
      .catch( error => {
        this.dispatch('errorFound', error)
      })
    },

    upVote(context, id){
      serverAPI.patch(`/questions/upvote`, {
        questionId: id
      },{
          headers: {
              jtoken : localStorage.getItem('jtoken')
          }
      })
      .then( response => {
        context.commit('mutationUpVote', response.data)
      })
      .catch( error => {
        this.dispatch('errorFound', error)
      })
    },

    downVote(context, id){
      serverAPI.patch(`/questions/downvote`, {
        questionId: id
      },{
          headers: {
              jtoken : localStorage.getItem('jtoken')
          }
      })
      .then( response => {
        context.commit('mutationDownVote', response.data)
      })
      .catch( error => {
        this.dispatch('errorFound', error)
      })
    },

    checkToken(context){
      if (localStorage.getItem('jtoken')){
        context.commit('cekTokenResult', true)
      } else {
        context.commit('cekTokenResult', false)
      }
    },

    signOut(context){
      context.commit('mutationSignOut')
      router.push({path:'/'})
    },

    userSuccessLoggedIn(context, payload){
      context.commit('mutationSuccessLoggedIn', payload)
    },

    createQuestion(context, data){
      serverAPI.post(`/questions`, {
          title: data.title,
          description: data.description,
          slug: data.slug,
          tags: data.tags
      }, {
          headers:{
              jtoken: localStorage.getItem('jtoken')
          }
      })
      .then((response) => {
          context.commit('mutationOwnQuestion', response.data)
      })
      .catch(function (error) {
        this.dispatch('errorFound', error)
      });
      
    },

    editAnswer(context, data){
      serverAPI.put(`/answers/${data.id}`, {
          description: data.description,
      }, {
          headers:{
              jtoken: localStorage.getItem('jtoken')
          }
      })
      .then((response) => {
          context.commit('mutationGetOwnAmswer', response.data)
      })
      .catch(function (error) {
        this.dispatch('errorFound', error)
      });
      
    },

    editQuestion(context, data){
      serverAPI.put(`/questions/${data.id}`, {
          title: data.title,
          description: data.description,
          slug: data.slug,
          tags: data.tags
      }, {
          headers:{
              jtoken: localStorage.getItem('jtoken')
          }
      })
      .then((response) => {
          context.commit('mutationOwnQuestion', response.data)
      })
      .catch(function (error) {
        this.dispatch('errorFound', error)
      });
      
    },

    getOwnAnswers(context){
      serverAPI.get(`/answers`, {
        headers: {
          jToken : localStorage.getItem('jtoken')
        }
      })
      .then( payload => {
        context.commit('mutationGetOwnAmswer',payload.data)
      })
      .catch( error => {
        this.dispatch('errorFound', error)
      })
    },

    getOwnQuestions(context){
      serverAPI.get(`/questions`, {
        headers: {
          jToken : localStorage.getItem('jtoken')
        }
      })
      .then( payload => {
        context.commit('mutationGetOwnQuestion',payload.data)
      })
      .catch( error => {
        this.dispatch('errorFound', error)
      })
    },
    
    deleteOwnQuestion(context, id){
      serverAPI.delete(`/questions/${id}`,{
          headers:{
              jtoken: localStorage.getItem('jtoken')
          }
      })
      .then((response) => {
          context.commit('mutationOwnQuestion', response.data)
      })
      .catch(function (error) {
        this.dispatch('errorFound', error)
      });
    },

    getAllTags(context, id){
      serverAPI.get(`/tags/readall`)
      .then((response) => {
          context.commit('mutationAllTags', response.data)
      })
      .catch(function (error) {
        this.dispatch('errorFound', error)
      });
    },

    getBestUsers(context, id){
      serverAPI.get(`/users/best`)
      .then((response) => {
          context.commit('mutationBestUsers', response.data)
      })
      .catch(function (error) {
        this.dispatch('errorFound', error)
      });
    },

    getQuestions(context){
      serverAPI.get(`/questions/all`)
      .then( payload => {
        context.commit('mutationGetQuestion',payload.data )
      })
      .catch( error => {
        this.dispatch('errorFound', error)
      })
    },

    getQuestionByTag(context, payload){
      serverAPI.get(`/tags/search/${payload}`)
      .then( payload => {
        context.commit('mutationGetQuestionByTag',payload.data )
      })
      .catch( error => {
        this.dispatch('errorFound', error)
      })
    },

    //facebook login
    fSignIn(context, payload) {
      serverAPI.post(`/users/fSignIn`,{
        email: payload.email,
        name: payload.name,
      })
      .then( response => {
        localStorage.setItem('jtoken', response.data.jToken)
        this.dispatch('successFound', response.data.message)
        this.dispatch('userSuccessLoggedIn', response.data.message)
      })
      .catch( err => {
        console.log(err)
        this.dispatch('errorFound', err)
      })
    },

    //google login
    gSignIn(context, payload) {
      serverAPI.post(`/users/gSignIn`,{
        email: payload.U3,
        name: payload.ig,
      })
      .then( response => {
        localStorage.setItem('jtoken', response.data.jToken)
        this.dispatch('successFound', response.data.message)
        this.dispatch('userSuccessLoggedIn', response.data.message)
      })
      .catch( err => {
        console.log(err)
        this.dispatch('errorFound', err.response.data)
      })
    },

  }
})
