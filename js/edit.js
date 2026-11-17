const formulario = document.querySelector("#form-editar-chamado");
const campoNome = document.querySelector("#edit-nome");
const campoSetor = document.querySelector("#edit-setor");
const campoEquipamento = document.querySelector("#edit-equipamento");
const campoTecnico = document.querySelector("#edit-tecnico");
const campoStatus = document.querySelector("#edit-status");
const campoProblema = document.querySelector("#edit-problema");
const campoSolucao = document.querySelector("#edit-solucao");
const botaoExcluir = document.querySelector("#botao-excluir");

let chamados = JSON.parse(localStorage.getItem("chamados")) || [];
let tecnicos = JSON.parse(localStorage.getItem("tecnicos")) || [];
let equipamentos = JSON.parse(localStorage.getItem("equipamentos")) || [];

const parametros = new URLSearchParams(window.location.search);
const idChamado = Number(parametros.get("id"));

const indice = chamados.findIndex(function(c) {
    return c.id === idChamado;
});

function preencherSelects() {
    campoEquipamento.innerHTML = "";
    equipamentos.forEach(function(equip) {
        const opcao = document.createElement("option");
        opcao.value = equip.nome;
        opcao.textContent = equip.nome;
        campoEquipamento.appendChild(opcao);
    });

    campoTecnico.innerHTML = '<option value="">Sem técnico definido</option>';
    tecnicos.forEach(function(tec) {
        const opcao = document.createElement("option");
        opcao.value = tec.nome;
        opcao.textContent = tec.nome;
        campoTecnico.appendChild(opcao);
    });
}

function carregarChamadoNaTela() {
    if (indice === -1) {
        alert("Chamado não encontrado!");
        window.location.href = "index.html";
        return;
    }

    const chamado = chamados[indice];
    document.querySelector("#titulo-edicao").textContent = "Editar Chamado #" + chamado.id;

    campoNome.value = chamado.nome;
    campoSetor.value = chamado.setor;
    campoEquipamento.value = chamado.equipamento;
    campoTecnico.value = chamado.tecnico;
    campoStatus.value = chamado.status;
    campoProblema.value = chamado.problema;
    campoSolucao.value = chamado.solucao;
}

formulario.addEventListener("submit", function(evento) {
    evento.preventDefault();

    const novoStatus = campoStatus.value;
    const tecnicoEscolhido = campoTecnico.value;
    const textoSolucao = campoSolucao.value.trim();

    if (novoStatus === "Em andamento" && tecnicoEscolhido === "") {
        alert("Regra de negócio: Para colocar 'Em andamento', selecione um técnico!");
        return;
    }

    if (novoStatus === "Resolvido" && (tecnicoEscolhido === "" || textoSolucao === "")) {
        alert("Regra de negócio: Para marcar como 'Resolvido', informe o técnico e a solução!");
        return;
    }

    chamados[indice].nome = campoNome.value.trim();
    chamados[indice].setor = campoSetor.value;
    chamados[indice].equipamento = campoEquipamento.value;
    chamados[indice].tecnico = tecnicoEscolhido;
    chamados[indice].status = novoStatus;
    chamados[indice].problema = campoProblema.value.trim();
    chamados[indice].solucao = textoSolucao;

    localStorage.setItem("chamados", JSON.stringify(chamados));
    alert("Chamado atualizado com sucesso!");
    window.location.href = "index.html";
});

botaoExcluir.addEventListener("click", function() {
    const confirmou = confirm("Deseja realmente excluir este chamado?");
    if (confirmou) {
        chamados.splice(indice, 1);
        localStorage.setItem("chamados", JSON.stringify(chamados));
        alert("Chamado excluído!");
        window.location.href = "index.html";
    }
});

preencherSelects();
carregarChamadoNaTela();