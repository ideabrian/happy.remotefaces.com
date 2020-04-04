<template>
    <div>        
        <footer class="text-center mt-64">

            <div>
                <div class="container py-6 article">                    
                    <p>Powered by <a href="https://remotefaces.com" target="_blank">remotefaces.com</a> | <a href="https://remotefaces.com/terms">terms</a> | <a to="https://remotefaces.com/privacy">privacy</a></p>
                </div>
            </div>
        </footer> 
        <script src='/js/gifshot.js'></script>
    </div>   
</template>

<script>
export default {
    data: function(){
        return {
            email: '',
            name: '',
            subscriptionSending: false,
            subscribed: false
        }
    },
    methods: {
        subscribeToNewsletter(){
            this.subscriptionSending = true
            this.$validator.validate('email').then((result) => {
                if (result) {
                    this.$axios.post('/newsletter/subscribe',{
                        email: this.email,
                        name: this.name
                    }).then((result) => {
                        if(result.data && result.data.success){
                            this.email = ''
                            this.subscribed = true
                        }else{
                            
                        }
                    }) 
                }
            })
        },
        setName(){
            this.name = 742
        }
    },
    mounted(){
        setTimeout(this.setName(), 1500);
    }
}
</script>