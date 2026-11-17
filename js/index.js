// Encontra os itens da página principal.
const grupos = document.querySelectorAll("tbody[data-status]");
const campoBusca = document.querySelector("#campo-busca");
const filtroStatus = document.querySelector("#filtro-status");
const filtroSetor = document.querySelector("#filtro-setor");
const ordemLista = document.querySelector("#ordem-lista");

const chamados = lerChamados();

// Filtra e organiza a lista de chamados.
function listarChamados() {
    if (!chamados) return;

    for (const grupo of grupos) {
        while (grupo.rows.length > 1) grupo.deleteRow(1);
    }

    // Usa o que foi escrito e as opções escolhidas.
    const textoBusca = campoBusca.value.trim().toLowerCase();
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
        if (!Object.hasOwn(situacoes, chamado.status)) return;
        const linha = document.createElement("tr");

        const colunaNumero = document.createElement("th");
        colunaNumero.textContent = "#" + chamado.id;

        const colunaNome = document.createElement("td");
        colunaNome.textContent = chamado.nome;

        const colunaSetor = document.createElement("td");
        colunaSetor.textContent = chamado.setor;

        const colunaEquipamento = document.createElement("td");
        colunaEquipamento.textContent = chamado.equipamento;

        // Usa uma cor diferente para cada situação.
        const colunaStatus = document.createElement("td");
        const badge = document.createElement("span");
        badge.className = "badge";
        preencherStatus(badge, chamado.status);
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
        linha.append(colunaNumero, colunaNome, colunaSetor, colunaEquipamento, colunaStatus, colunaAcoes);
        linha.id = "chamado-" + chamado.id;
        const grupo = Array.from(grupos).find(grupo => grupo.dataset.status === chamado.status);
        grupo?.appendChild(linha);
    });

    for (const grupo of grupos) {
        if (grupo.rows.length === 1) {
            const celula = grupo.insertRow().insertCell();
            celula.colSpan = 6;
            celula.className = "text-secondary";
            celula.textContent = "Nenhum chamado encontrado neste status.";
        }
    }
}

// Atualiza a lista quando a busca ou as opções mudam.
campoBusca.addEventListener("input", listarChamados);
filtroStatus.addEventListener("change", listarChamados);
filtroSetor.addEventListener("change", listarChamados);
ordemLista.addEventListener("change", listarChamados);

// Mostra o resumo e a lista ao abrir a página.
if (chamados) {
    document.querySelector("#ind-total").textContent = chamados.length;
    atualizarIndicadores(chamados);
    listarChamados();
}