function setActive(id){
    // Current item
    const previousItem = document.getElementsByClassName("active")[0]
    previousItem.classList.remove("active")
    previousItem.classList.add("disabled")

    // New Item
    const newActiveItem = document.getElementById(id)
    newActiveItem.classList.remove("disabled")
    newActiveItem.classList.add("active")

    // remove current description
    const currentlyDisplaying = document.getElementsByClassName("show")[0]
    currentlyDisplaying.classList.remove("show")
    currentlyDisplaying.classList.add("no-show")
    // Adding new description
    var show = "show-"+id
    const newDisplay = document.getElementById(show)
    newDisplay.classList.remove("no-show")
    newDisplay.classList.add("show")
}

window.onload = () => {
    loadOffers();
    loadRestaurants();
}

async function loadOffers() {
    const container = document.querySelector("#listar-ofertas");
    if (!container) return;
    
    container.innerHTML = "<p>A carregar ofertas...</p>";
    
    try {
        const response = await fetch("https://magno.di.uevora.pt/tweb/t1/oferta/list");
        const data = await response.json();
        
        // console.log("Ofertas recebidas:", data);
        
        if (data.status === "ok" && data.oferta_set && data.oferta_set.length > 0) {
            displayOffers(data.oferta_set, container);
        } else {
            container.innerHTML = "<p>Nenhuma oferta disponível hoje.</p>";
        }
    } catch (error) {
        container.innerHTML = "<p>Erro ao carregar ofertas.</p>";
        console.error("Erro:", error);
    }
}

function displayOffers(offers, container) {
    let html = "<div class='offers-grid'>";
    
    offers.forEach(offer => {
        html += `
        <div class="offer-card">
            <div class="offer-image" style="background-image: url('${offer.foto || 'https://via.placeholder.com/150'}')"></div>
            <div class="offer-info">
                <h4>${offer.nome || offer.titulo || 'Sem nome'}</h4>
                <p><strong>Restaurante ID:</strong> ${offer.restaurante_id}</p>
                <p class="description">${offer.descricao || 'Sem descrição'}</p>
                <p><strong>Unidades disponíveis:</strong> ${offer.unidades}</p>
                <p><strong>ID Oferta:</strong> ${offer.oferta_id}</p>
                <button class="reserve-btn" onclick="reserveOffer(${offer.oferta_id})">
                    Reservar
                </button>
            </div>
        </div>`;
    });
    
    html += "</div>";
    container.innerHTML = html;
    container.classList.remove("no-show");
}

// RESERVAR OFERTA
// RESERVAR OFERTA - VERSÃO COM DEBUG
async function reserveOffer(offerId) {
    if (!confirm("Reservar esta oferta?")) {
        return;
    }
    
    const clienteId = 1; // ID simulado
    const unidades = prompt("Quantas unidades? ")
    
    try {
        const data = new URLSearchParams();
        data.append("oferta_id", offerId);
        data.append("cliente_id", clienteId);
        data.append("unidades", unidades);
        
        
        const response = await fetch("https://magno.di.uevora.pt/tweb/t1/oferta/reserve", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: data.toString()
        });
        
        const responseText = await response.text();
        
        let result;
        try {
            result = JSON.parse(responseText);
        } catch (error) {
            console.error("Erro ao parsear JSON:", error);
            alert("❌ Erro: Resposta inválida do servidor");
            return;
        }
        
        // Verificar diferentes formatos de resposta
        if (result.status === "ok" || result.sucesso === true) {
            alert("✅ Reserva efetuada com sucesso!");
            if (result.reserva_id) {
                console.log("ID da reserva:", result.reserva_id);
            }
            loadOffers(); // Atualiza a lista
        } else if (result.erro) {
            alert("❌ Erro: " + result.erro);
        } else if (result.message) {
            alert("❌ Erro: " + result.message);
        } else {
            console.error("Formato de resposta desconhecido:", result);
            alert("❌ Erro desconhecido do servidor");
        }
    } catch (error) {
        console.error("Erro completo:", error);
        alert("❌ Erro de ligação ao servidor: " + error.message);
    }
}

async function loadRestaurants() {
    const container = document.querySelector("#listar-restaurantes");
    if (!container) return;
    
    container.innerHTML = "<p>A carregar restaurantes...</p>";
    container.classList.remove("no-show");
    
    try {
        const response = await fetch("https://magno.di.uevora.pt/tweb/t1/restaurante/list");
        const data = await response.json();
        
        // console.log("Restaurantes recebidos:", data);
        
        if (data.status === "ok" && data.restaurante_set && data.restaurante_set.length > 0) {
            displayRestaurants(data.restaurante_set, container);
        } else {
            container.innerHTML = "<p>Nenhum restaurante disponível.</p>";
        }
    } catch (error) {
        container.innerHTML = "<p>Erro ao carregar restaurantes.</p>";
        console.error("Erro:", error);
    }
}

function displayRestaurants(restaurants, container) {
    let html = "<div class='restaurants-grid'>";
    
    restaurants.forEach(restaurant => {
        html += `
        <div class="restaurant-card">
            <div class="restaurant-info">
                <h3>${restaurant.nome || 'Sem nome'}</h3>
                <p><strong>Morada:</strong> ${restaurant.morada || 'Não disponível'}</p>
                <p><strong>Localização:</strong> ${restaurant.localizacao || 'Não disponível'}</p>
                <p><strong>Coordenadas:</strong> ${restaurant.coordenadas || 'Não disponível'}</p>
                <p><strong>ID:</strong> ${restaurant.restaurante_id}</p>
            </div>
        </div>`;
    });
    
    html += "</div>";
    container.innerHTML = html;
}