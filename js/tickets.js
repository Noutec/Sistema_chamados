const situacoes = {
    "Ativo": { rotulo: "Aguardando atendimento", cor: "danger", pagina: "active" },
    "Em andamento": { rotulo: "Em andamento", cor: "warning", pagina: "in-progress" },
    "Resolvido": { rotulo: "Resolvido", cor: "success", pagina: "resolved" }
};

function lerRegistros(chave) {
    try {
        const registros = JSON.parse(localStorage.getItem(chave) ?? "[]");
        if (Array.isArray(registros)) return registros;
    } catch {
        // A leitura pode falhar se o armazenamento estiver indisponível ou o JSON for inválido.
    }
    alert("Não foi possível ler os dados no armazenamento do navegador.");
    return null;
}

function gravarRegistros(chave, registros) {
    try {
        localStorage.setItem(chave, JSON.stringify(registros));
        return true;
    } catch {
        alert("Não foi possível salvar as alterações no armazenamento do navegador.");
        return false;
    }
}

function buscarChamado(chamados) {
    const id = new URLSearchParams(window.location.search).get("id");
    if (!id) return undefined;
    return chamados.find(chamado => chamado.id === Number(id));
}

function preencherStatus(badge, status) {
    const situacao = situacoes[status];
    badge.textContent = situacao.rotulo;
    badge.classList.add("text-bg-" + situacao.cor);
}

function atualizarIndicadores(chamados) {
    for (const [status, situacao] of Object.entries(situacoes)) {
        const contador = document.querySelector('[data-contador="' + situacao.pagina + '"]');
        contador.textContent = chamados.filter(chamado => chamado.status === status).length;
    }
}

function lerChamados() {
    return lerRegistros("chamados");
}

function gravarChamados(chamados) {
    return gravarRegistros("chamados", chamados);
}

function preencherCatalogo(select, chave, valorAtual = "") {
    const registros = lerRegistros(chave) || [];
    const nomes = registros.map(registro => registro.nome);
    // Permite editar chamados gravados antes da tela de cadastros.
    if (valorAtual && !nomes.includes(valorAtual)) nomes.push(valorAtual);
    for (const nome of nomes) select.add(new Option(nome, nome));
    select.value = valorAtual;
}

// Prazo de atendimento em horas corridas, conforme a prioridade atual.
const prazosAtendimento = { baixa: 24, media: 8, alta: 2 };

function mostrarPrazo(chamado) {
    const horas = prazosAtendimento[chamado.prioridade];
    if (!chamado.abertoEm || !horas) return "Não disponível para este chamado";

    const prazo = new Date(chamado.abertoEm + horas * 60 * 60 * 1000);
    const horario = prazo.toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" });
    if (chamado.status === "Resolvido") return horario;
    return horario + (Date.now() > prazo.getTime() ? " · Atrasado" : " · No prazo");
}
