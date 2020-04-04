export default function ({ store, redirect }) {
    if(store.getters.isLoggedIn && $nuxt.$cookie.get('join-room')){
        var room_deets = $nuxt.$cookie.get('join-room').split('-')
        $nuxt.$cookie.delete('join-room');
        try {
            $nuxt.$axios.post('/rooms/join',{
                slug: room_deets[0],
                token: room_deets[1]
            }).then((result) => {
                $nuxt.$router.push('/' + room_deets[0])
            }) 
        } catch (e) {            
            console.log(e);
        }        
    }    
}