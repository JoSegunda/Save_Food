// Change the setting currently changing
function SetActive(element){
    const currentChoice = document.getElementsByClassName("active")[0]
    currentChoice.classList.remove("active")
    currentChoice.classList.add("disabled")

    const newChoice = document.getElementById(element)
    newChoice.classList.remove("disabled")
    newChoice.classList.add("active")

    // Hide the previous one
    const lastInfo = document.getElementsByClassName("show-info")[0]
    lastInfo.classList.remove("show-info")
    lastInfo.classList.add("hide-info")

    //Get class for us to show
    var displayId = "show-"+element
    const currentInfo = document.getElementById(displayId)
    currentInfo.classList.remove("hide-info")
    currentInfo.classList.add("show-info")
    
    // Carregar dados quando muda de tab
    if (element === "rest-info") {
        loadRestaurants();
    } else if (element === "client-info") {
        loadClients();
    } else if (element === "offers-info") {
        loadAdminOffers();
    }
}

// Carregar dados quando a página abre
document.addEventListener("DOMContentLoaded", () => {
    loadRestaurants();
});

// ================= RESTAURANTES =================
async function loadRestaurants() {
    const container = document.querySelector("#show-rest-info");
    if (!container) return;
    
    container.innerHTML = "<p>A carregar restaurantes...</p>";
    
    try {
        const response = await fetch("https://magno.di.uevora.pt/tweb/t1/admin/restaurante/list");
        const data = await response.json();
        
        // console.log("Restaurantes (admin):", data);
        
        if (data.status === "ok" && data.restaurante_set && data.restaurante_set.length > 0) {
            displayAdminRestaurants(data.restaurante_set, container);
        } else {
            container.innerHTML = "<p>Nenhum restaurante encontrado.</p>";
        }
    } catch (error) {
        container.innerHTML = "<p>Erro ao carregar restaurantes.</p>";
        console.error("Erro:", error);
    }
}

function displayAdminRestaurants(restaurants, container) {
    let html = `
        <div class="admin-section">
            <h2>Restaurantes (${restaurants.length})</h2>
            
            <div class="search-filter">
                <input type="text" id="filter-restaurants" placeholder="Filtrar por nome ou morada..." 
                       onkeyup="filterTable('restaurants-table', this.value)">
            </div>
            
            <div class="table-container">
                <table id="restaurants-table" class="admin-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Morada</th>
                            <th>Localização</th>
                            <th>Coordenadas</th>
                            <th>Contacto</th>
                        </tr>
                    </thead>
                    <tbody>`;
    
    restaurants.forEach(rest => {
        html += `
                        <tr>
                            <td>${rest.restaurante_id || 'N/A'}</td>
                            <td>${rest.nome || 'N/A'}</td>
                            <td>${rest.morada || 'N/A'}</td>
                            <td>${rest.localizacao || 'N/A'}</td>
                            <td>${rest.coordenadas || 'N/A'}</td>
                            <td>${rest.contacto || 'N/A'}</td>
                        </tr>`;
    });
    
    html += `
                    </tbody>
                </table>
            </div>
        </div>`;
    
    container.innerHTML = html;
}

// CLIENTES
async function loadClients() {
    const container = document.querySelector("#show-client-info");
    if (!container) return;
    
    container.innerHTML = "<p>A carregar clientes...</p>";
    
    try {
        // API específica do admin para clientes
        const response = await fetch("https://magno.di.uevora.pt/tweb/t1/admin/cliente/list");
        const data = await response.json();
        
        // console.log("Clientes (admin):", data);
        
        if (data.status === "ok" && data.cliente_set && data.cliente_set.length > 0) {
            displayAdminClients(data.cliente_set, container);
        } else {
            container.innerHTML = "<p>Nenhum cliente encontrado.</p>";
        }
    } catch (error) {
        container.innerHTML = "<p>Erro ao carregar clientes.</p>";
        console.error("Erro:", error);
    }
}

function displayAdminClients(clients, container) {
    let html = `
        <div class="admin-section">
            <h2>Clientes (${clients.length})</h2>
            
            <div class="search-filter">
                <input type="text" id="filter-clients" placeholder="Filtrar por nome ou email..." 
                       onkeyup="filterTable('clients-table', this.value)">
            </div>
            
            <div class="table-container">
                <table id="clients-table" class="admin-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Zona/Cidade</th>
                            <th>Contacto</th>
                            <th>Reservas</th>
                        </tr>
                    </thead>
                    <tbody>`;
    
    clients.forEach(client => {
        html += `
                        <tr>
                            <td>${client.cliente_id || 'N/A'}</td>
                            <td>${client.nome || 'N/A'}</td>
                            <td>${client.email || 'N/A'}</td>
                            <td>${client.zona || client.cidade || 'N/A'}</td>
                            <td>${client.contacto || client.telefone || 'N/A'}</td>
                            <td>${client.num_reservas || '0'}</td>
                        </tr>`;
    });
    
    html += `
                    </tbody>
                </table>
            </div>
        </div>`;
    
    container.innerHTML = html;
}

// OFERTAS
async function loadAdminOffers() {
    const container = document.querySelector("#show-offers-info");
    if (!container) return;
    
    container.innerHTML = "<p>A carregar ofertas...</p>";
    
    try {
        const response = await fetch("https://magno.di.uevora.pt/tweb/t1/admin/oferta/list");
        const data = await response.json();
        
        // console.log("Ofertas (admin):", data);
        
        if (data.status === "ok" && data.oferta_set && data.oferta_set.length > 0) {
            displayAdminOffers(data.oferta_set, container);
        } else {
            container.innerHTML = "<p>Nenhuma oferta encontrada.</p>";
        }
    } catch (error) {
        container.innerHTML = "<p>Erro ao carregar ofertas.</p>";
        console.error("Erro:", error);
    }
}

function displayAdminOffers(offers, container) {
    let html = `
        <div class="admin-section">
            <h2>Ofertas (${offers.length})</h2>
            
            <div class="search-filter">
                <input type="text" id="filter-offers" placeholder="Filtrar por nome ou restaurante..." 
                       onkeyup="filterTable('offers-table', this.value)">
            </div>
            
            <div class="table-container">
                <table id="offers-table" class="admin-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Restaurante ID</th>
                            <th>Descrição</th>
                            <th>Unidades</th>
                            <th>Reservadas</th>
                            <th>Data</th>
                            <th>Foto</th>
                        </tr>
                    </thead>
                    <tbody>`;
    
    offers.forEach(offer => {
        html += `
                        <tr>
                            <td>${offer.oferta_id || 'N/A'}</td>
                            <td>${offer.nome || offer.titulo || 'N/A'}</td>
                            <td>${offer.restaurante_id || 'N/A'}</td>
                            <td>${offer.descricao ? offer.descricao.substring(0, 50) + '...' : 'N/A'}</td>
                            <td>${offer.unidades || '0'}</td>
                            <td>${offer.reservadas || '0'}</td>
                            <td>${offer.data || 'Hoje'}</td>
                            <td>${offer.foto ? 'Sim' : 'Não'}</td>
                        </tr>`;
    });
    
    html += `
                    </tbody>
                </table>
            </div>
        </div>`;
    
    container.innerHTML = html;
}

// FILTRAR DADOS 
function filterTable(tableId, searchTerm) {
    const table = document.getElementById(tableId);
    if (!table) return;
    
    const rows = table.getElementsByTagName("tr");
    searchTerm = searchTerm.toLowerCase();
    
    for (let i = 1; i < rows.length; i++) { // Começa em 1 para pular o header
        const cells = rows[i].getElementsByTagName("td");
        let shouldShow = false;
        
        for (let j = 0; j < cells.length; j++) {
            const cellText = cells[j].textContent || cells[j].innerText;
            if (cellText.toLowerCase().includes(searchTerm)) {
                shouldShow = true;
                break;
            }
        }
        
        rows[i].style.display = shouldShow ? "" : "none";
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}