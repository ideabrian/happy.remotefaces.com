<template>
    <div v-if="room">
        <section class="max-w-md mx-auto p-8">
            <nuxt-link to="/">&larr;</nuxt-link>
        </section>
        <section class="max-w-md mx-auto bg-white p-8">      

            <div v-show="step == 1" class="mt-40">
                <div class="field">
                    <label class="label mt-10 mb-2 text-sm">What’s Your Email Address?</label>
                    <input v-model="email" v-validate="'required|email'" spellcheck="false" type="email" name="email" ref="email" id="email" placeholder="alex@doe.com" class="input">                  
                    <span class="help is-danger">{{ errors.first('email') }}</span>
                </div>
                <div class="field" v-if="email">
                    <button class="button is-small mt-4" v-on:click.prevent="validateEmail()" :disabled="isLoading">log in</button>
                </div>             
            </div>       
            <div v-show="step == 2" class="mt-40">
                A login link has been sent to your email address.
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
                email: '',
                step: 1,
                isLoading: false,
                name: ''
            };
        },
        head: {
            title: 'Login to Remote Faces',
        },
        computed: mapState(['room']),
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
            async validateEmail() {
                this.$validator.validate('email').then((result) => {                  
                if (result) {
                    this.login()
                 }                
               })
            },
            async login() {                
                this.isLoading = true 
                try {
                    await this.$axios.post('/user/sendLoginLink', {
                        email: this.email,
                        room_id: this.room.id,
                        name: this.name
                    }).then((result) => {  
                        this.step = 2
                    })             
                
              } catch (e) {
                    var error_message = 'Unknown error. Please please please contact patrick@lorenzut.com and he’ll fix it.'
                    if(e.response.data.email){
                        error_message = e.response.data.email
                    }
                    else if(e.response.data.message){
                        error_message = e.response.data.message
                    }
                    this.$toast.error(error_message)
                    this.isLoading = false
              }
            }  
        }
    }
</script>