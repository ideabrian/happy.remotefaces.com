<template>
    <div v-if="room">    
        <Nav />
        <header class="pt-20 pb-32 md:pt-40 md:pb-40">            
            <div class="container text-center">
            
                <h1 class="font-bold text-4xl sm:text-5xl md:text-5xl lg:text-5xl leading-none text-purple max-w-4xl mx-auto" v-html="room.title"></h1> 

                <h2 class="mt-6 text-2xl mx-auto max-w-3xl" v-html="room.subtitle"></h2>
                <template v-if="$store.getters.isLoggedIn">
                    
                </template>
                <template v-else>
                    <nuxt-link class="button" to="/join">Join Now</nuxt-link>
                    <br/>
                    <nuxt-link to="/login" class="link block mt-1 lg:inline-block">or login</nuxt-link>
                </template>                    
            </div>
        </header> 


        <section class="mx-auto -mt-16 mb-32 text-center container">                            
            <RoomWorkers ref="roomWorkersCom" :room_id="room.id"/>                     
        </section>


        <section class="mb-32" v-if="!$store.getters.isLoggedIn">            
            <div class="article text-left mx-auto max-w-xl mt-10 text-2xl">
                <vue-markdown v-if="room && room.pitch" :source="room.pitch"></vue-markdown>
            </div>
        </section> 
        <section class="container text-center" v-if="!$store.getters.isLoggedIn">
            <nuxt-link class="button" to="/join">Join Now</nuxt-link>
        </section>

    </div>
</template>

<script>
import RoomWorkers from '~/components/RoomWorkers.vue'
import Nav from '~/components/Nav.vue'
import { mapState } from 'vuex'
export default {     
    head () {
        return {
            title: this.title,
        }
    },
    components: {
        RoomWorkers,
        Nav
    },    
    computed: {
        title(){
            if(this.room){
                return this.room.name
            }else{
                return 'Virtual Coworking'
            }
        },
        ...mapState(['room'])
    },
    methods: {
        stopConfetti(){
            this.$confetti.stop();
        },
        startConfetti(){
            if(this.$store.state.confetti){
                this.$confetti.start({
                    defaultDropRate: 15
                });
                setTimeout(this.stopConfetti, 3000)
                this.$store.commit('SET_CONFETTI', false)
            }
        }
    },
    mounted(){
        if(this.room){
            this.startConfetti()            
        }
    },
    watch: {
        room() {
            this.startConfetti()
        }
    }  
}
</script>