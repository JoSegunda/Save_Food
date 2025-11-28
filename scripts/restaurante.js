console.log("Working")

document.addEventListener("DOMContentLoaded", () =>{

    const form = document.querySelector("#ofertas")
    const feedback = feedbackBox();
    const offersContainer = document.querySelector("#Ofertas disponíveis")

    loadOffers()
})

function loadOffers(){
    offersContainer.innerHtml = "<h1>Suas ofertas ativas</h1> <p>A carregar ....</p>"
}