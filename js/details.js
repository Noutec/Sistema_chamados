// Carrega os chamados e identifica qual foi escolhido.
const containerDetalhe = document.querySelector("#detalhe-chamado");
let chamados = JSON.parse(localStorage.getItem("chamados")) || [];

// Procura o chamado pelo número recebido no endereço da página.
const parametros = new URLSearchParams(window.location.search);
const idChamado = Number(parametros.get("id"));

const indice = chamados.findIndex(function(c) {
    return c.id === idChamado;
});

// Avisa se o chamado não existir.
if (indice === -1) {
    containerDetalhe.innerHTML = "<p>Chamado não encontrado.</p>";
} else {
    const chamado = chamados[indice];

    // Mostra as informações do chamado.
    const card = document.createElement("div");
    card.className = "card border-0 shadow-sm p-4";

    const titulo = document.createElement("h2");
    titulo.className = "h4 mb-3";
    titulo.textContent = "Chamado #" + chamado.id + " - " + chamado.status;

    const pNome = document.createElement("p");
    pNome.innerHTML = "<strong>Aberto por:</strong> " + chamado.nome;

    const pSetor = document.createElement("p");
    pSetor.innerHTML = "<strong>Setor:</strong> " + chamado.setor;

    const pEquip = document.createElement("p");
    pEquip.innerHTML = "<strong>Equipamento:</strong> " + chamado.equipamento;

    const pData = document.createElement("p");
    pData.innerHTML = "<strong>Data:</strong> " + chamado.data;

    const pTecnico = document.createElement("p");
    pTecnico.innerHTML = "<strong>Técnico responsável:</strong> " + (chamado.tecnico || "Aguardando atendimento");

    const pProblema = document.createElement("p");
    pProblema.innerHTML = "<strong>Problema:</strong> " + chamado.problema;

    const pSolucao = document.createElement("p");
    pSolucao.innerHTML = "<strong>Solução:</strong> " + (chamado.solucao || "Ainda não resolvido");

    // Cria os botões para editar ou voltar à lista.
    const divBotoes = document.createElement("div");
    divBotoes.className = "d-flex flex-wrap justify-content-between gap-2 mt-3";

    const divEsquerda = document.createElement("div");

    const linkEditar = document.createElement("a");
    linkEditar.textContent = "Editar chamado";
    linkEditar.href = "edit.html?id=" + chamado.id;
    linkEditar.className = "btn btn-primary me-2";

    const linkVoltar = document.createElement("a");
    linkVoltar.textContent = "Voltar para todos";
    linkVoltar.href = "index.html";
    linkVoltar.className = "btn btn-outline-secondary";

    divEsquerda.append(linkEditar, linkVoltar);
    divBotoes.append(divEsquerda);
    card.append(titulo, pNome, pSetor, pEquip, pData, pTecnico, pProblema, pSolucao, divBotoes);
    containerDetalhe.appendChild(card);
}