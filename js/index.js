// Encontra os itens da página principal.
const listaChamadosElemento = document.querySelector("#lista-chamados");
const campoBusca = document.querySelector("#campo-busca");
const filtroStatus = document.querySelector("#filtro-status");
const filtroSetor = document.querySelector("#filtro-setor");
const ordemLista = document.querySelector("#ordem-lista");
const botaoTema = document.querySelector("#btn-tema");

// Carrega os chamados já guardados.
let chamados = JSON.parse(localStorage.getItem("chamados")) || [];

// Define a prioridade pelo tipo de problema.
function verificarPrioridade(problema) {
    const texto = problema.toLowerCase();
    if (texto.includes("servidor") || texto.includes("fora do ar") || texto.includes("não liga")) {
        return "Urgente (2h)";
    }
    if (texto.includes("vpn") || texto.includes("rede") || texto.includes("impressora")) {
        return "Média (8h)";
    }
    return "Normal (24h)";
}

// Atualiza os números mostrados no resumo.
function atualizarIndicadores() {
    let total = chamados.length;
    let ativos = 0;
    let andamento = 0;
    let resolvidos = 0;

    chamados.forEach(function(chamado) {
        if (chamado.status === "Ativo") ativos++;
        if (chamado.status === "Em andamento") andamento++;
        if (chamado.status === "Resolvido") resolvidos++;
    });

    document.querySelector("#ind-total").textContent = total;
    document.querySelector("#ind-ativos").textContent = ativos;
    document.querySelector("#ind-andamento").textContent = andamento;
    document.querySelector("#ind-resolvidos").textContent = resolvidos;
}

// Filtra e organiza a lista de chamados.
function listarChamados() {
    listaChamadosElemento.innerHTML = "";

    // Usa o que foi escrito e as opções escolhidas.
    const textoBusca = campoBusca.value.toLowerCase();
    const statusEscolhido = filtroStatus.value;
    const setorEscolhido = filtroSetor.value;
    const ordem = ordemLista.value;

    // Mantém apenas os chamados que combinam com a busca e as opções.
    let listaFiltrada = chamados.filter(function(chamado) {
        const bateTexto = chamado.nome.toLowerCase().includes(textoBusca) ||
                          chamado.problema.toLowerCase().includes(textoBusca) ||
                          String(chamado.id).includes(textoBusca);
        const bateStatus = statusEscolhido === "" || chamado.status === statusEscolhido;
        const bateSetor = setorEscolhido === "" || chamado.setor === setorEscolhido;

        return bateTexto && bateStatus && bateSetor;
    });

    // Coloca os chamados na ordem escolhida.
    listaFiltrada.sort(function(a, b) {
        if (ordem === "asc") {
            return a.id - b.id;
        }
        return b.id - a.id;
    });

    // Mostra cada chamado que restou.
    listaFiltrada.forEach(function(chamado) {
        const linha = document.createElement("tr");

        const colunaNumero = document.createElement("th");
        colunaNumero.textContent = "#" + chamado.id;

        const colunaNome = document.createElement("td");
        colunaNome.textContent = chamado.nome;

        const colunaSetor = document.createElement("td");
        colunaSetor.textContent = chamado.setor;

        const colunaEquipamento = document.createElement("td");
        colunaEquipamento.textContent = chamado.equipamento;

        const colunaPrioridade = document.createElement("td");
        colunaPrioridade.textContent = verificarPrioridade(chamado.problema);

        // Usa uma cor diferente para cada situação.
        const colunaStatus = document.createElement("td");
        const badge = document.createElement("span");
        badge.textContent = chamado.status;
        badge.className = "badge text-bg-secondary";
        if (chamado.status === "Ativo") badge.className = "badge text-bg-danger";
        if (chamado.status === "Em andamento") badge.className = "badge text-bg-warning";
        if (chamado.status === "Resolvido") badge.className = "badge text-bg-success";
        colunaStatus.appendChild(badge);

        // Adiciona os links para ver ou editar o chamado.
        const colunaAcoes = document.createElement("td");
        colunaAcoes.className = "text-end";

        const linkDetalhes = document.createElement("a");
        linkDetalhes.textContent = "Detalhes";
        linkDetalhes.href = "details.html?id=" + chamado.id;
        linkDetalhes.className = "btn btn-sm btn-outline-primary me-1";

        const linkEditar = document.createElement("a");
        linkEditar.textContent = "Editar";
        linkEditar.href = "edit.html?id=" + chamado.id;
        linkEditar.className = "btn btn-sm btn-outline-secondary";

        colunaAcoes.append(linkDetalhes, linkEditar);
        linha.append(colunaNumero, colunaNome, colunaSetor, colunaEquipamento, colunaPrioridade, colunaStatus, colunaAcoes);
        listaChamadosElemento.appendChild(linha);
    });
}

// Troca entre o tema claro e o escuro.
botaoTema.addEventListener("click", function() {
    const temaAtual = document.documentElement.getAttribute("data-bs-theme");
    if (temaAtual === "dark") {
        document.documentElement.setAttribute("data-bs-theme", "light");
        botaoTema.textContent = "Modo Escuro";
    } else {
        document.documentElement.setAttribute("data-bs-theme", "dark");
        botaoTema.textContent = "Modo Claro";
    }
});

// Atualiza a lista quando a busca ou as opções mudam.
campoBusca.addEventListener("input", listarChamados);
filtroStatus.addEventListener("change", listarChamados);
filtroSetor.addEventListener("change", listarChamados);
ordemLista.addEventListener("change", listarChamados);

// Mostra o resumo e a lista ao abrir a página.
atualizarIndicadores();
listarChamados();