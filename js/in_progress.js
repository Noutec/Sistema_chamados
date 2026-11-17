// Busca os chamados já guardados.
const listaChamadosElemento = document.querySelector("#lista-chamados");
const chamados = JSON.parse(localStorage.getItem("chamados")) || [];

// Mostra apenas os chamados em andamento.
function listarPorStatus() {
    // Limpa a tabela antes de preenchê-la.
    listaChamadosElemento.innerHTML = "";

    const filtrados = chamados.filter(function(chamado) {
        return chamado.status === "Em andamento";
    });

    // Cria uma linha para cada chamado encontrado.
    filtrados.forEach(function(chamado) {
        const linha = document.createElement("tr");

        const colunaNumero = document.createElement("th");
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