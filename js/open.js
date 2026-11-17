// Encontra os campos para abrir um chamado.
const formulario = document.querySelector("#form-abrir-chamado");
const campoNome = document.querySelector("#nome-novo");
const campoSetor = document.querySelector("#setor-novo");
const campoEquipamento = document.querySelector("#equipamento-novo");
const campoProblema = document.querySelector("#problema-novo");
const campoPrioridade = document.querySelector("#prioridade-novo");
const campoCategoria = document.querySelector("#categoria-novo");

preencherCatalogo(campoEquipamento, "equipamentos");

// Guarda o chamado quando o formulário é enviado.
formulario.addEventListener("submit", function(evento) {
    evento.preventDefault();

    const nome = campoNome.value.trim();
    const setor = campoSetor.value;
    const equipamento = campoEquipamento.value.trim();
    const problema = campoProblema.value.trim();

    // Confere se os campos foram preenchidos.
    if (nome.length < 3 || setor === "" || equipamento === "" || problema.length < 5) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    const equipamentos = lerRegistros("equipamentos");
    if (!equipamentos) return;
    if (!equipamentos.some(registro => registro.nome === equipamento)) {
        alert("Selecione um equipamento cadastrado.");
        return;
    }

    const chamados = lerChamados();
    if (!chamados) return;

    // Escolhe o próximo número e guarda a data de hoje.
    let maiorId = 1000;
    chamados.forEach(function(c) {
        if (c.id > maiorId) {
            maiorId = c.id;
        }
    });

    const agora = new Date();
    const dataHoje = String(agora.getDate()).padStart(2, "0") + "/" + String(agora.getMonth() + 1).padStart(2, "0");

    // Prepara os dados do novo chamado.
    const novoChamado = {
        id: maiorId + 1,
        nome: nome,
        setor: setor,
        equipamento: equipamento,
        problema: problema,
        prioridade: campoPrioridade.value,
        categoria: campoCategoria.value,
        status: "Ativo",
        tecnico: "",
        solucao: "",
        data: dataHoje,
        abertoEm: agora.getTime()
    };

    // Guarda o chamado e volta para a lista.
    chamados.push(novoChamado);
    if (!gravarChamados(chamados)) return;

    alert("Chamado #" + novoChamado.id + " cadastrado com sucesso!");
    window.location.href = "index.html";
});