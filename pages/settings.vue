<template>

    <div v-if="newRoom">
        <section class="max-w-md mx-auto p-8">
            <nuxt-link to="/">&larr;</nuxt-link>
        </section>
        <section class="pt-20 pb-32">        
            <div v-if="$store.getters.isOwner">
                <div class="container text-center">
                    <h1 class="font-bold text-3xl lg:text-4xl leading-none max-w-4xl mx-auto">
                        Change Things Here
                    </h1> 

                    <div class="text-left mx-auto max-w-lg mt-10">
                        <div class="mt-10">
                            <label><strong>Room Name</strong></label>
                            <input v-model="newRoom.name" class="input" type="text" name="name" v-validate="'required'" />
                            <span class="mt-1 help is-danger">{{ errors.first('name') }}</span>
                        </div>
                        <div class="mt-10">
                            <label><strong>Page Title</strong></label>
                            <input v-model="newRoom.title" class="input" type="text" name="title" v-validate="'required'" />
                            <span class="mt-1 help is-danger">{{ errors.first('title') }}</span>
                        </div>
                        <div class="mt-10">
                            <label><strong>Page Subtitle</strong></label>
                            <input v-model="newRoom.subtitle" class="input" type="text" name="subtitle" v-validate="'required'" />
                            <span class="mt-1 help is-danger">{{ errors.first('subtitle') }}</span>
                        </div>
                        <div class="mt-10">
                            <label><strong>Sales Pitch</strong></label>
                            <textarea v-model="newRoom.pitch" class="textarea" name="pitch" v-validate="'required'"></textarea>
                            <span class="mt-1 help is-danger">{{ errors.first('pitch') }}</span>
                            <p class="text-sm">This is only visible to non-logged-in viewers. It’s the compelling reason that somebody should join this room. Markdown supported.</p>
                        </div>
                        <div class="mt-10">
                            <button class="button is-small" @click.prevent="validateRoomSettings" :disabled="isLoading">Update Settings</button>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    data: function(){
        return{
            newRoom: null,
            isLoading: false
        }
    },
    computed: mapState(['room']),
    methods: {
        async validateRoomSettings(){
            this.$validator.validateAll().then((result) => {                  
                if (result) {
                    this.updateRoomSettings()
                }
            })
        },
        async updateRoomSettings(){
            this.isLoading = true 
            try {            
                await this.$axios.post('/rooms/' + this.room.id + '/update', {
                    name: this.newRoom.name,
                    title: this.newRoom.title,
                    subtitle: this.newRoom.subtitle,
                    pitch: this.newRoom.pitch
                }).then((result) => {
                    this.isLoading = false
                    this.$store.commit('UPDATE_ROOM', result.data)
                    this.$toast.success('Settings Updated') 
                })
            } catch (e) {      
                var error_message = 'Unknown error. Please please please contact patrick@lorenzut.com and he’ll fix it.'
                if(e.response.data.message){
                    error_message = e.response.data.message
                }
                this.$toast.error(error_message)
                this.isLoading = false
            }
        }
    },
    mounted(){
        if(this.room){
            this.newRoom = Object.assign({}, this.room)
        }
    },
    watch: {
        room() {
            this.newRoom = Object.assign({}, this.room)
        }
    }   
}
</script>