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
        // Contéudo dentro do card de ofertas
        let html = "<h1>Suas ofertas ativas</h1>"
        ofertas.forEach(o =>{
            html += `
            <div class="oferta-card">
                    <div class="oferta-card-img" style="background-image: url('${o.imagem || "https://via.placeholder.com/150"}')"></div>
                    <div class="oferta-card-info">
                        <h4>${o.titulo}</h4>
                        <p><strong>Descrição:</strong> ${o.descricao}</p>
                        <p><strong>Quantidade:</strong> ${o.quantidade}</p>
                        <p><strong>ID:</strong> ${o.id}</p>
                    </div>
                </div>`;
        })
    } catch (error) {
        offersContainer.innerHtml="<p>Erro ao carregar ofertas.</p>"
    }
}