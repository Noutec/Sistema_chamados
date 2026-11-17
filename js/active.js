
// Busca os chamados já guardados.
const listaChamadosElemento = document.querySelector("tbody[data-status]");
const chamados = lerChamados();

// Mostra apenas os chamados ativos.
function listarPorStatus() {
    if (!chamados) return;
    atualizarIndicadores(chamados);

    // Limpa a tabela antes de preenchê-la.
    listaChamadosElemento.innerHTML = "";

    const filtrados = chamados.filter(function(chamado) {
        return chamado.status === "Ativo";
    });

    const quantidade = filtrados.length;
    document.querySelector("#resumo-status").textContent =
        quantidade === 1 ? "1 chamado aguarda atendimento." : quantidade + " chamados aguardam atendimento.";

    if (quantidade === 0) {
        const celula = listaChamadosElemento.insertRow().insertCell();
        celula.colSpan = 7;
        celula.className = "text-secondary";
        celula.textContent = "Nenhum chamado neste status.";
    }

    // Cria uma linha para cada chamado encontrado.
    filtrados.forEach(function(chamado) {
        const linha = document.createElement("tr");
        linha.id = "chamado-" + chamado.id;

        const colunaNumero = document.createElement("th");
        colunaNumero.scope = "row";
        colunaNumero.textContent = "#" + chamado.id;

        const colunaNome = document.createElement("td");
        colunaNome.textContent = chamado.nome;

        const colunaSetor = document.createElement("td");
        colunaSetor.textContent = chamado.setor;

        const colunaEquipamento = document.createElement("td");
        colunaEquipamento.textContent = chamado.equipamento;

        const colunaProblema = document.createElement("td");
        colunaProblema.textContent = chamado.problema;

        const colunaData = document.createElement("td");
        colunaData.textContent = chamado.data;

        // Adiciona o link para ver os detalhes.
        const colunaAcoes = document.createElement("td");
        colunaAcoes.className = "text-end";

        const linkDetalhes = document.createElement("a");
        linkDetalhes.textContent = "Ver detalhes";
        linkDetalhes.href = "details.html?id=" + chamado.id;
        linkDetalhes.className = "btn btn-sm btn-outline-primary";

        colunaAcoes.appendChild(linkDetalhes);
        linha.append(colunaNumero, colunaNome, colunaSetor, colunaEquipamento, colunaProblema, colunaData, colunaAcoes);
        listaChamadosElemento.appendChild(linha);
    });
}

// Atualiza a lista ao abrir a página.
listarPorStatus();