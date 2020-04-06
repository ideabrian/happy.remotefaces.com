<template>
  <div v-if="room">
    <section class="max-w-md mx-auto p-8">
      <nuxt-link to="/">&larr;</nuxt-link>
    </section>
    <section  class="max-w-md mx-auto bg-white p-8">      

      <div v-show="step == 1" class="mt-40">      
        
        <div class="field">
          <label class="label mt-10 mb-2 text-sm">What’s Your Email Address?</label>
          <input class="input" type="email" ref="email" v-model="email" name="email" v-validate="'required|email'" placeholder="alex@doe.com"/>
          <span class="mt-1 help is-danger">{{ errors.first('email') }}</span>
        </div>
        
        <div class="field" v-if="email">
          <button class="button is-small mt-2" @click.prevent="validateEmail" :disabled="isLoading">Submit</button>
        </div>      
      </div>
      <div v-show="step == 2" class="mt-40">
        <div class="field">
          <label class="label mt-10 mb-2 text-sm">Please Choose a Username</label>
          <input class="input" type="text" v-model="username" name="username" v-validate="'required|alpha_dash|max:15'" placeholder="groovysauce"/>
          <span class="mt-1 help is-danger">{{ errors.first('username') }}</span>                
        </div> 

        <div class="field" v-if="username">
          <button class="button is-small mt-2" @click.prevent="validateUsername" :disabled="isLoading">Submit</button>
        </div>
      </div>
      <div v-show="step == 3" class="mt-40">
        Thanks for signing up! A login link has been sent to your email address!
      </div>
    </section>
  </div>
</template>


<script>  
  import { mapState } from 'vuex'
  export default {
    layout: 'login',  
    middleware: 'guest',
    data: function () {
      return {
        step: 1,
        email: '',
        username: '',
        password: '',
        user_id: 0,
        isLoading: false,
        name: ''
      };
    },
    computed: {
        title(){
            if(this.room){
                return 'Sign Up - ' + this.room.title
            }else{
                return 'Sign Up'
            }
        },
        ...mapState(['room'])
    },
    head () {
        return {
            title: this.title,
        }
    },
    mounted(){
      setTimeout(this.setName(), 1500);
      if(this.room){
        this.$refs.email.focus()        
      }
    },
    methods: {
      setName(){
          this.name = 742
      },
      async validateUsername(){        
        this.$validator.validate('username').then((result) => {                  
          if (result) {
            this.setUsername()
          }
        })
      },
      async setUsername(){
        this.isLoading = true 
        try {            
          await this.$axios.post('/user/setUsername', {
            username: this.username,
            user_id: this.user_id,
            room_id: this.room.id,
            name: this.name
          }).then((result) => {
            this.isLoading = false 
            this.step = 3     
          })
        } catch (e) {      
          var error_message = 'Unknown error. Please please please contact patrick@lorenzut.com and he’ll fix it.'
          if(e.response.data.username){
            error_message = e.response.data.username
          }
          else if(e.response.data.message){
            error_message = e.response.data.message
          }
          this.$toast.error(error_message)
          this.isLoading = false
        }
      },
      async validateEmail(){
        this.$validator.validate('email').then((result) => {                  
          if (result) {
            this.submitEmail()
          }
        })
      },
      async submitEmail(){
        this.isLoading = true         
        try {            
          await this.$axios.post('/rooms/subscribe', {
            email: this.email,
            room_id: this.room.id,
            name: this.name
          }).then((result) => {
            this.isLoading = false 
            if(result.data && result.data.success){
              if(result.data.user){
                this.step = 3 //skip the username selection
              }else{
                this.user_id = result.data.user_id
                this.step = 2
              }
            }      
          })
        } catch (e) {          
          
        }
        
      },      
    }
  }
  </script>