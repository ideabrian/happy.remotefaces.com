<template>
    <div class="text-center mt-20">Trying to log you in.</div>
</template>
<script>
export default {
    layout: 'login',
    methods: {
        async login(){
            this.$auth.loginWith('local', {
                data: {
                    id: this.$route.params.user_id,
                    token: this.$route.params.token
                },
            }).then((result) => {
                this.$store.commit('SET_CONFETTI', true)
                this.$router.push('/')
            })
        }
    },
    mounted(){
        this.login()
    }
}
</script>