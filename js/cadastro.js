const formTecnico = document.querySelector("#form-tecnico");
const campoNomeTecnico = document.querySelector("#nome-tecnico");
const listaTecnicosElemento = document.querySelector("#lista-tecnicos");

const formEquipamento = document.querySelector("#form-equipamento");
const campoNomeEquipamento = document.querySelector("#nome-equipamento");
const listaEquipamentosElemento = document.querySelector("#lista-equipamentos");

let tecnicos = JSON.parse(localStorage.getItem("tecnicos")) || [];
let equipamentos = JSON.parse(localStorage.getItem("equipamentos")) || [];

function listarTecnicos() {
    listaTecnicosElemento.innerHTML = "";
    tecnicos.forEach(function(tec, indice) {
        const item = document.createElement("li");
        item.className = "list-group-item d-flex justify-content-between align-items-center";
        item.textContent = tec.nome;

        const botaoExcluir = document.createElement("button");
        botaoExcluir.textContent = "Excluir";
        botaoExcluir.className = "btn btn-sm btn-outline-danger";
        botaoExcluir.addEventListener("click", function() {
            tecnicos.splice(indice, 1);
            localStorage.setItem("tecnicos", JSON.stringify(tecnicos));
            listarTecnicos();
        });

        item.appendChild(botaoExcluir);
        listaTecnicosElemento.appendChild(item);
    });
}

function listarEquipamentos() {
    listaEquipamentosElemento.innerHTML = "";
    equipamentos.forEach(function(equip, indice) {
        const item = document.createElement("li");
        item.className = "list-group-item d-flex justify-content-between align-items-center";
        item.textContent = equip.nome;

        const botaoExcluir = document.createElement("button");
        botaoExcluir.textContent = "Excluir";
        botaoExcluir.className = "btn btn-sm btn-outline-danger";
        botaoExcluir.addEventListener("click", function() {
            equipamentos.splice(indice, 1);
            localStorage.setItem("equipamentos", JSON.stringify(equipamentos));
            listarEquipamentos();
        });

        item.appendChild(botaoExcluir);
        listaEquipamentosElemento.appendChild(item);
    });
}

formTecnico.addEventListener("submit", function(evento) {
    evento.preventDefault();
    const nome = campoNomeTecnico.value.trim();
    if (nome === "") return;

    tecnicos.push({ nome: nome });
    localStorage.setItem("tecnicos", JSON.stringify(tecnicos));
    formTecnico.reset();
    listarTecnicos();
});

formEquipamento.addEventListener("submit", function(evento) {
    evento.preventDefault();
    const nome = campoNomeEquipamento.value.trim();
    if (nome === "") return;

    equipamentos.push({ nome: nome });
    localStorage.setItem("equipamentos", JSON.stringify(equipamentos));
    formEquipamento.reset();
    listarEquipamentos();
});

listarTecnicos();
listarEquipamentos();