<template>
    <div>
        <div class="max-w-md md:max-w-6xl mx-auto mb-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">                                                                                
            <canvas ref="canvas"  width="480" height="320" class="hidden"></canvas>
            <div class="col-span-1 relative" v-show="streaming">
                <video class="rounded" ref="yourVideo" style="border-radius:6px" width="480" height="320"></video>
                <div v-if="!$store.getters.isLoggedIn" class="absolute text-center left-0 right-0 bottom-0 text-white p-4 bg-purple" style="border-bottom-left-radius:6px;border-bottom-right-radius:6px">
                    <h3 class="mb-2">It works! Now... join the fun?</h3>
                    <nuxt-link to="/join" class="button is-small">Join</nuxt-link>
                </div>
            </div>
            <button v-show="!streaming" ref="yourFace" class="col-span-1 relative bg-purple text-center rounded text-yellow cursor-pointer hover:bg-purple-800 content-center py-4" style="border-radius:6px" @click="startStream">
                <span class="text-6xl leading-snug -mt-2 block">+</span>Click to Put<br/>Your Face Here
            </button>

            <RoomWorker :worker="worker" :room_id="room_id" v-for="worker in workers" :key="worker.username"/>
            
        </div>  
    </div> 
</template>
<script>
import RoomWorker from '~/components/RoomWorker.vue';
export default {       
    props: ['room_id'], 
    data: function(){
        return { 
            streaming: false,
            workers: [],
            photosTaken: 0
        }
    },
    components: {
        RoomWorker
    },
    methods: {   
        async updateUserStatus(status){
            this.workers[0].status = status //because i'll always be first
        },
        async uploadPicture(still, gif){
            this.photosTaken = this.photosTaken + 1
            this.$axios.post('/updateImage',{
                still: still,
                gif: gif,
                room_id: this.room_id
            }).then((result) => {
                if(result && result.data){
                    this.workers = result.data
                    if(this.photosTaken == 1){
                        setTimeout(this.takePicture, 10000) //do it faster first time, cuz we only got still the first time
                    }
                    else{
                        setTimeout(this.takePicture, 60000) //do it again a minute later
                    }
                }
            })
        },
        async takePicture() {
            var canvas = this.$refs.canvas
            var video = this.$refs.yourVideo
            var context = canvas.getContext('2d');
            context.drawImage(video, 0, 0, 480, 320);
            var data = canvas.toDataURL('image/jpeg');

            if(this.photosTaken > 0 && gifshot.isWebCamGIFSupported()){
                //pass both still and gif in. still for future gif production. gif for current display
                var that = this
                gifshot.createGIF({
                    'gifWidth': 480,
                    'gifHeight': 320,
                    'interval': 0.25,
                    'numFrame': 4,
                    'keepCameraOn': true,
                    'cameraStream': video.srcObject,
                }, function(obj) {
                    if(!obj.error) {
                        that.uploadPicture(data, obj.image)
                    }
                });
            }else{
                this.uploadPicture(data, null)                
            }
            
        },
        async startStream(){
            
            var video = this.$refs.yourVideo

            if (navigator.mediaDevices === undefined) {
                navigator.mediaDevices = {};
            }

            if (navigator.mediaDevices.getUserMedia === undefined) {
                navigator.mediaDevices.getUserMedia = function(constraints) {
                    var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
                    
                    if (!getUserMedia) {
                        return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
                    }
                    return new Promise(function(resolve, reject) {
                        getUserMedia.call(navigator, constraints, resolve, reject);
                    });
                }
            }

            navigator.mediaDevices.getUserMedia({ video: true, audio: false })
            .then(function(stream) {
                
                if ("srcObject" in video) {
                    video.srcObject = stream;
                } else {
                    // Avoid using this in new browsers, as it is going away.
                    video.src = window.URL.createObjectURL(stream);
                }
                video.play();
            })
            .catch(function(err) {                
                if(err.name == 'NotAllowedError'){
                    alert('Error. Your web browser is not letting remotefaces.com access your camera.')
                }else if(err.name == 'NotReadableError'){
                    alert('Error. Another application is currently using your webcam. Please stop that application and then try again.')
                }else{
                    alert(err);
                }        
            });

            var that = this
            video.addEventListener('canplay', function(ev){
                if (!that.streaming) {
                    that.streaming = true;                    
                    if(that.$store.getters.isLoggedIn){
                        setTimeout(that.takePicture, 1000)
                    }
                }
            }, false);
            
        },        
        async getWorkers(){
            if(!this.streaming){
                this.$axios.get('/getWorkers/' + this.room_id).then((result) => {
                    this.workers = result.data
                })
                setTimeout(this.getWorkers, 5000)
            }
        }
    },
    mounted(){
        this.getWorkers()
    }
}
</script>