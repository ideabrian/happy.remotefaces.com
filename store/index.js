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
    deets(state){
        return state.auth.user.deets[0]
    },
    isOwner(state, getters){
        return getters.deets && getters.deets.role == 'owner'
    },
    isLoggedIn(state) {
        return state.auth.loggedIn
    },
    memberProfile(state) {
        return state.auth.user
    },
}