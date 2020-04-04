export const state = () => ({
    _currentUser: null,
    _token: null,
    toast: null,
    domain: null,
    room: null
})

export const mutations = {
    UPDATE_DOMAIN: function (state, domain) {
        state.domain = domain        
    },
    UPDATE_ROOM: function (state, room) {
        state.room = room        
    },
}

export const actions = {
    async updateDomain(context, domain){
        context.commit('UPDATE_DOMAIN', domain)
       
        try{
            await this.$axios.get('/rooms/' + domain).then((result) => {
                context.commit('UPDATE_ROOM', result.data)
            })
        } catch (e) {
            //TODO show a 404 page
            $nuxt.$router.push('/404')
        }
    },
}

export const getters = {
    pivot(state){
        if(state.room){
            var editIndex = state.room.users.map(function(item) { return item.id; }).indexOf(state.auth.user.id);
            if(editIndex >= 0){
                return state.room.users[editIndex].pivot
            }
        }
        else return null
    },
    isOwner(state, getters){
        return getters.pivot && getters.pivot.role == 'owner'
    },
    isLoggedIn(state) {
        return state.auth.loggedIn
    },
    memberProfile(state) {
        return state.auth.user
    },
}