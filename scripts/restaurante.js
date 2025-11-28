

document.addEventListener("DOMContentLoaded", () =>{

    const form = document.querySelector("#ofertas")
    const feedback = feedbackBox();
    const offersContainer = document.querySelector("#Ofertas disponíveis")

    loadOffers()

    form.addEventListener("submit", async (e) => {
        e.preventDefault() // Not to reload

        const mealName = document.querySelector("#meal_name").value.trim();
        const description = document.querySelector("#description").value.trim();
        const doses = document.querySelector("#doses").value;
        const imageUrl = "https://via.placeholder.com/150";

        const novaOferta = {
            "titulo": mealName,
            "descricao": description,
            "quantidade": parseInt(doses),
            "imagem": imageUrl
        }

        // Mandar para o servidor
        try {
            const response = await fetch("https://magno.di.uevora.pt/tweb/t1/oferta/insert",{
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(novaOferta)
            })

            const data = await response.json()

            if(data.erro){
                showFeedback("Erro",+ data.erro)
                return
            }

            showFeedback("sucesso","Oferta criada! Código: "+data.codigo)

            form.reset();     // limpar inputs
            loadOffers();     // atualizar lista
        } catch (error) {
            showFeedback("Erro","Erro de ligação ao servidor")
        }
    })

    // Criar Caixa de Feedback
    function createFeedbackBox() {
        const box = document.createElement("div");
        box.id = "feedback-box";
        box.style.display = "none";
        box.style.padding = "15px";
        box.style.marginTop = "20px";
        box.style.borderRadius = "8px";
        box.style.fontWeight = "600";
        document.querySelector("#offers").prepend(box);
        return box;
    }
    // Mostrar Feedback
    function showFeedback(type, msg) {
        feedback.style.display = "block";
        feedback.innerText = msg;

        if (type === "sucesso") {
            feedback.style.background = "#d4f8d4";
            feedback.style.color = "#1d572e";
            feedback.style.border = "2px solid #2b8f3e";
        } else {
            feedback.style.background = "#f9d6d6";
            feedback.style.color = "#8f1f1f";
            feedback.style.border = "2px solid #b82d2d";
        }
    }


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
        });
        offersContainer.innerHtml = html
    } catch (error) {
        offersContainer.innerHtml="<p>Erro ao carregar ofertas.</p>"
    }
}

})


