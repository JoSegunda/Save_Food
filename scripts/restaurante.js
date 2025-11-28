document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#ofertas");
  const feedback = feedbackBox();
  const offersContainer = document.querySelector("#ofertas-disponiveis");

  loadOffers();

  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // Not to reload

    const mealName = document.querySelector("#meal_name").value.trim();
    const description = document.querySelector("#description").value.trim();
    const doses = document.querySelector("#doses").value;
    const imageUrl = document.getElementById("image");

    const data = new URLSearchParams();
    data.append("nome", mealName);
    data.append("descricao", description);
    data.append("foto", imageUrl);
    data.append("unidades", doses);
    data.append("restaurante_id", 1); // <-- POR AGORA, FICA FIXO

    try {
      console.log("Iniciando Fetch");
      const response = await fetch(
        "https://magno.di.uevora.pt/tweb/t1/oferta/insert",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: data.toString(),
        }
      );

      const json = await response.json();

      if (json.status === "ok") {
        showFeedback(
          "sucesso",
          "Oferta criada com sucesso! ID: " + json.oferta_id
        );
        form.reset();
        loadOffers();
      } else {
        showFeedback("Erro", json.erro || "Erro desconhecido");
      }
    } catch (error) {
      showFeedback("Erro", "Erro de ligação ao servidor");
    }
  });

  // Criar Caixa de Feedback
  function feedbackBox() {
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
  async function loadOffers() {
    offersContainer.innerHTML = "<h1>Suas ofertas ativas</h1> <p>A carregar ....</p>";

    await sleep(3000);
    try {
      const resp = await fetch("https://magno.di.uevora.pt/tweb/t1/oferta/list");
      const data = await resp.json();

      console.log("Resposta completa da API:", data);

      if (!data.oferta_set || !Array.isArray(data.oferta_set) || data.oferta_set.length === 0) {
        offersContainer.innerHTML = "<p>Nenhuma Oferta Encontrada.</p>";
        return;
      }

      // CORREÇÃO: Filtrar apenas as ofertas do restaurante_id = 1
        const ofertasDoRestaurante = data.oferta_set.filter(oferta => oferta.restaurante_id == 1);
        
        if (ofertasDoRestaurante.length === 0) {
            offersContainer.innerHTML = "<p>Nenhuma oferta ativa para o seu restaurante.</p>"
            return
        }

      // Contéudo dentro do card de ofertas
      let html = "<h1>Suas ofertas ativas</h1>";
      data.forEach((o) => {
        html += `
            <div class="oferta-card">
                    <div class="oferta-card-img" style="background-image: url('${
                      o.foto || "https://via.placeholder.com/150"
                    }')"></div>
                    <div class="oferta-card-info">
                        <h4>${o.nome}</h4>
                        <p><strong>Descrição:</strong> ${o.descricao}</p>
                        <p><strong>Quantidade:</strong> ${o.unidades}</p>
                        <p><strong>ID:</strong> ${o.oferta_id}</p>
                    </div>
                </div>`;
      });

      offersContainer.innerHTML = html;
      
    } catch (error) {
        offersContainer.innerHTML = `<p>Erro ao carregar ofertas: ${error.message}</p>`
        console.error("Erro ao carregar ofertas:", error);
    }
  }
});

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
