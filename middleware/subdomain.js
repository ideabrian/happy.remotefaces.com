//this file determines whether the domain is a subdomain of remotefaces.com, or its own domain, and then stores the result in the store.js so we know what info to load
export default function ({ store, redirect }) {    
    

    if(store.state.domain && store.state.room){
        //do nothing, as we already have this information
    }else{
        var host = window.location.host
    
        //if on development server, remove port number
        if(host.includes(":")){
            host = host.split(":")[0]
        }

        //face.com is used as localhost on dev machine with https://stackoverflow.com/questions/19016553/add-subdomain-to-localhost-url
        if(host.includes(".remotefaces.com") || host.includes(".face.com")){
            store.dispatch('updateDomain', host.split(".")[0]).then(response => {
                //do nothing - a little trickery to force wait
            })
        }else{
            //if here, this is a primary domain
            store.dispatch('updateDomain', host).then(response => {
                //do nothing - a little trickery to force wait
            })
        }
    }
    

}