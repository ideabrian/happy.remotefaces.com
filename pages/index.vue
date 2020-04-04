<template>
    <div v-if="room">    
        <Nav />
        <header class="pt-20 pb-32 md:pt-40 md:pb-40">            
            <div class="container text-center">                
            
                <h1 class="font-bold text-4xl sm:text-5xl md:text-5xl lg:text-5xl leading-none text-purple max-w-4xl mx-auto">
                    {{ room.title }}
                </h1> 

                <h2 class="mt-6 text-2xl mx-auto max-w-3xl">{{ room.subtitle }}</h2>
                <template v-if="$store.getters.isLoggedIn">
                    
                </template>
                <template v-else>
                    <nuxt-link class="button" to="/join">Join Now</nuxt-link>
                    <br/>
                    <nuxt-link to="/login" class="link block mt-8 lg:inline-block lg:mt-0">or login</nuxt-link>
                </template>                    
            </div>
        </header> 


        <section class="mx-auto -mt-16 text-center container">                            
            <RoomWorkers ref="roomWorkersCom" :room_id="room.id"/>                     
        </section>


        <section class="pt-40 lg:pt-56 pb-32 md:pt-48 md:pb-40" v-if="!$store.getters.isLoggedIn">            
            <div class="container text-center">
                <h1 class="font-bold text-3xl sm:text-4xl md:text-4xl lg:text-5xl leading-none max-w-4xl mx-auto">
                    This is a sales pitch.
                </h1> 

                <div class="article text-left mx-auto max-w-xl mt-10 text-2xl">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Suspendisse sed nisi lacus sed viverra. Tortor at auctor urna nunc. </p>

                    <p>Quis eleifend quam adipiscing vitae proin. Nisi lacus sed viverra tellus in hac habitasse platea dictumst. Donec pretium vulputate sapien nec. Congue eu consequat ac felis donec et odio pellentesque. At in tellus integer feugiat scelerisque varius morbi. Amet consectetur adipiscing elit ut aliquam. Fringilla ut morbi tincidunt augue interdum velit euismod. Duis tristique sollicitudin nibh sit. Bibendum ut tristique et egestas quis.</p>

                    <p>Cursus sit amet dictum sit amet justo donec enim diam. Pharetra magna ac placerat vestibulum. </p>

                    <p>Duis ut diam quam nulla porttitor massa id. Lacus suspendisse faucibus interdum posuere lorem ipsum dolor sit. Pharetra sit amet aliquam id diam. Lacus sed viverra tellus in hac habitasse platea dictumst.</p>                    

                </div>

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
    }
}
</script>