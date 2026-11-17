// Encontra os campos para abrir um chamado.
const formulario = document.querySelector("#form-abrir-chamado");
const campoNome = document.querySelector("#nome-novo");
const campoSetor = document.querySelector("#setor-novo");
const campoEquipamento = document.querySelector("#equipamento-novo");
const campoProblema = document.querySelector("#problema-novo");

// Carrega os chamados já guardados.
let chamados = JSON.parse(localStorage.getItem("chamados")) || [];

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
        status: "Ativo",
        tecnico: "",
        solucao: "",
        data: dataHoje
    };

    // Guarda o chamado e volta para a lista.
    chamados.push(novoChamado);
    localStorage.setItem("chamados", JSON.stringify(chamados));

    alert("Chamado #" + novoChamado.id + " cadastrado com sucesso!");
    window.location.href = "index.html";
});