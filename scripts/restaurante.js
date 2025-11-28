console.log("Working")

document.addEventListener("DOMContentLoaded", () =>{

    const form = document.querySelector("#ofertas")
    const feedback = feedbackBox();
    const offersContainer = document.querySelector("#Ofertas disponíveis")

    loadOffers()
})

// CARREGAR OFERTAS ATIVAS
async function loadOffers(){
    offersContainer.innerHtml = "<h1>Suas ofertas ativas</h1> <p>A carregar ....</p>"

    try {
        const resp = await fetch("https://magno.di.uevora.pt/tweb/t1/oferta/list")
        const ofertas = await resp.json();

        if(!Array.isArray(ofertas)){
            offersContainer.innerHtml = "<p>Nenhuma Oferta Encontrada.</p>"
            return
        }
    } catch (error) {
        
    }
}