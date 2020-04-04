<template>
    <div v-if="$store.getters.isLoggedIn">
        <div class="container mt-6 text-right">
            
            <nuxt-link to="/settings" v-if="$store.getters.isOwner" class="mr-10">room settings</nuxt-link>
            <nuxt-link to="/logout">logout</nuxt-link>
        </div>
    </div>
</template>