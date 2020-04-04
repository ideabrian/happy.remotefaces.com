<template>
  <div class="">        
    <header class="pt-40 pb-12 mb-10 bg-yellow text-purple">
      <div class="text-center container max-w-3xl">          
          <h1 class="font-bold text-3xl mb-2">Last Step!</h1>
          <h2>After payment we’ll review your application and reach out if we need further info. We’re simply verifying that you’ll be a good fit to keep this a safe emotional space... and if we’re unable to verify that then we’ll refund your payment.</h2>
      </div>
    </header>    
    <VCreditCard/>
    <div class="text-center container">
        <button :disabled="isLoading" type="submit" class="button is-purple mb-4 mt-4" @click="payTheMoney">Pay $10/month</button>      
        <p class="text-purple opacity-50">Cancel anytime.<br/>100% refund upon request.</p>

        <p class="mt-10 opacity-75 mx-auto max-w-3xl">FHS officially launches on April 1, 2020. You are receiving a 50% lifetime discount by joining before that date... but please keep in mind that there are still a few features that aren’t quite done yet :)</p>
    </div>
  </div>
</template>


<script>  
  import VCreditCard from 'v-credit-card';
  /* purgecss start ignore */
  import 'v-credit-card/dist/VCreditCard.css';
  /* purgecss end ignore */

  export default {
    components: {
        VCreditCard
    },
    data: function () {
      return {
          isLoading: false,
          card: {
            name: '',
            number: '',
            expiration: '',
            security: '',
            user_id: 0
          },
      };
    },
    methods: {
        async payTheMoney(){
            this.isLoading = true
            this.card.name = document.getElementById("name").value;
            this.card.number = document.getElementById("card-number").value;
            this.card.expiration = document.getElementById("expirationdate").value;
            this.card.security = document.getElementById("securitycode").value;
            this.card.user_id = this.$route.params.user;

            try{
                await this.$axios.post('/pay', this.card).then((result) => {
                    this.isLoading = false
                    this.$router.push('/thanks')
                })           
            } catch (e) {
                var error_message = 'Error Processing Payment'
                if(e.response.data.name){
                    error_message = e.response.data.name[0]
                }else if(e.response.data.number){
                    error_message = e.response.data.number[0]
                }
                else if(e.response.data.expiration){
                    error_message = e.response.data.expiration[0]
                }else if(e.response.data.security){
                    error_message = e.response.data.security[0]
                }else if(e.response.data.error){
                    error_message = e.response.data.error
                }
                this.$toast.error(error_message)
                
                this.isLoading = false
            }
        },        
    }
  }
  </script>