let versao = 8

let arquivos = [
"/",
"css/main.css",
"js/efeitoParticulas.js",
"js/typewritter.js",
"https://fonts.googleapis.com/css?family=K2D|Open+Sans|Titillium+Web",
"https://use.fontawesome.com/releases/v5.4.1/css/all.css",
"https://unpkg.com/aos@next/dist/aos.css",
"https://cdn.jsdelivr.net/gh/cferdinandi/smooth-scroll@14/dist/smooth-scroll.polyfills.min.js",
"https://unpkg.com/aos@next/dist/aos.js"
]

self.addEventListener("install", function(){
    console.log("Instalou")
})

self.addEventListener("activate", function(){
    caches.open("pwa-arquivos-" + versao).then(cache => {
        cache.addAll(arquivos)
            .then(function(){
                caches.delete("ceep-arquivos-" + (versao - 1 ))   
                caches.delete("ceep-arquivos")   
            })
        
    })
})


self.addEventListener("fetch", function(event){

    let pedido = event.request
    let promiseResposta = caches.match(pedido).then(respostaCache => {
        let resposta = respostaCache ? respostaCache : fetch(pedido)
        return resposta
    })

    event.respondWith(promiseResposta)

})

