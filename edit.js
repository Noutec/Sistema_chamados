// Encontra os campos usados para editar o chamado.
const formulario = document.querySelector("#form-editar-chamado");
const campoNome = document.querySelector("#edit-nome");
const campoSetor = document.querySelector("#edit-setor");
const campoEquipamento = document.querySelector("#edit-equipamento");
const campoTecnico = document.querySelector("#edit-tecnico");
const campoStatus = document.querySelector("#edit-status");
const campoProblema = document.querySelector("#edit-problema");
const campoSolucao = document.querySelector("#edit-solucao");
const campoPrioridade = document.querySelector("#edit-prioridade");
const campoCategoria = document.querySelector("#edit-categoria");
const botaoExcluir = document.querySelector("#botao-excluir");

const chamados = lerChamados();
const chamado = chamados && buscarChamado(chamados);

// Coloca as informações atuais nos campos.
function carregarChamadoNaTela() {
    document.querySelector("#titulo-edicao").textContent = "Chamado #" + chamado.id + " · " + chamado.nome;
    preencherStatus(document.querySelector("#status-atual"), chamado.status);
    document.querySelector("#voltar-detalhes").href = "details.html?id=" + chamado.id;

    campoNome.value = chamado.nome;
    campoSetor.value = chamado.setor;
    preencherCatalogo(campoEquipamento, "equipamentos", chamado.equipamento);
    preencherCatalogo(campoTecnico, "tecnicos", chamado.tecnico ?? "");
    campoStatus.value = chamado.status;
    campoProblema.value = chamado.problema;
    campoSolucao.value = chamado.solucao ?? "";
    campoPrioridade.value = chamado.prioridade ?? "";
    campoCategoria.value = chamado.categoria ?? "";
    document.querySelector("#painel-edicao").hidden = false;
}

function mostrarErroEdicao(texto) {
    document.querySelector("#painel-edicao").hidden = true;
    const mensagem = document.querySelector("#edicao-mensagem");
    mensagem.textContent = texto;
    mensagem.hidden = false;
    document.querySelector("#edicao-voltar").hidden = false;
}

function atualizarChamado(alterar) {
    const registros = lerChamados();
    if (!registros) return;

    const indice = registros.findIndex(registro => registro.id === chamado.id);
    if (indice === -1) {
        mostrarErroEdicao("Chamado não encontrado.");
        return;
    }

    alterar(registros, indice);
    if (gravarChamados(registros)) window.location.href = "index.html#lista";
}

if (chamado) {
    carregarChamadoNaTela();

    // Confere as informações e guarda as alterações.
    formulario.addEventListener("submit", function(evento) {
        evento.preventDefault();

        const nome = campoNome.value.trim();
        const equipamento = campoEquipamento.value.trim();
        const problema = campoProblema.value.trim();
        const novoStatus = campoStatus.value;
        const tecnicoEscolhido = campoTecnico.value.trim();
        const textoSolucao = campoSolucao.value.trim();

        if (nome.length < 3 || !equipamento || problema.length < 5) {
            alert("Preencha o nome (mínimo de 3 caracteres), o equipamento e o problema (mínimo de 5 caracteres).");
            return;
        }
        // Exige um técnico para iniciar o atendimento.
        if (novoStatus === "Em andamento" && tecnicoEscolhido === "") {
            alert("Para colocar o chamado em andamento, informe o técnico.");
            return;
        }

        // Exige um técnico e uma solução para concluir o chamado.
        if (novoStatus === "Resolvido" && (tecnicoEscolhido === "" || textoSolucao === "")) {
            alert("Para resolver o chamado, informe o técnico e a solução.");
            return;
        }

        const equipamentos = lerRegistros("equipamentos");
        const tecnicos = lerRegistros("tecnicos");
        if (!equipamentos || !tecnicos) return;
        if (equipamento !== chamado.equipamento && !equipamentos.some(registro => registro.nome === equipamento)) {
            alert("Selecione um equipamento cadastrado.");
            return;
        }
        if (tecnicoEscolhido && tecnicoEscolhido !== chamado.tecnico &&
            !tecnicos.some(registro => registro.nome === tecnicoEscolhido)) {
            alert("Selecione um técnico cadastrado.");
            return;
        }

        atualizarChamado(function(registros, indice) {
            Object.assign(registros[indice], {
                nome: nome,
                setor: campoSetor.value,
                equipamento: equipamento,
                tecnico: tecnicoEscolhido,
                status: novoStatus,
                problema: problema,
                solucao: textoSolucao,
                prioridade: campoPrioridade.value,
                categoria: campoCategoria.value
            });
        });
    });

    // Apaga o chamado depois da confirmação.
    botaoExcluir.addEventListener("click", function() {
        if (confirm("Deseja realmente excluir este chamado?")) {
            atualizarChamado(function(registros, indice) {
                registros.splice(indice, 1);
            });
        }
    });
} else {
    mostrarErroEdicao(chamados ? "Chamado não encontrado." : "Não foi possível carregar o chamado.");
}
