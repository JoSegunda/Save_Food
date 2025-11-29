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
    const resp = await fetch("https://magno.di.uevora.pt/tweb/t1/oferta/list");
    const data = await resp.json();

    const container = document.getElementById("listar-ofertas");
    container.innerHTML = "";

    data.forEach(o => {
        container.innerHTML += `
            <div class="oferta-card">
                <img src="${o.foto}" class="img-oferta">
                <h3>${o.nome}</h3>
                <p>${o.descricao}</p>
                <p><strong>Unidades:</strong> ${o.unidades}</p>
                <button onclick="reservar(${o.oferta_id})">Reservar</button>
            </div>
        `;
    });
}
